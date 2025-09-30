import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { isWithinInterval, subDays } from 'date-fns';

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  isoDate?: string;
}

interface Article {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

export async function GET() {
  try {
    const parser = new Parser({
      customFields: {
        item: ['description', 'content:encoded']
      }
    });

    const feed = await parser.parseURL('https://www.tvenserio.com/feed/');
    
    // Obtener la fecha de hace 7 días
    const sevenDaysAgo = subDays(new Date(), 7);
    const now = new Date();

    // Filtrar artículos de los últimos 7 días
    const recentArticles: Article[] = feed.items
      .filter((item: RSSItem) => {
        if (!item.isoDate && !item.pubDate) return false;
        
        const articleDate = new Date(item.isoDate || item.pubDate || '');
        return isWithinInterval(articleDate, { start: sevenDaysAgo, end: now });
      })
      .slice(0, 10) // Limitar a 10 artículos máximo
      .map((item: RSSItem) => ({
        title: item.title || 'Sin título',
        link: item.link || '#',
        pubDate: item.isoDate || item.pubDate || '',
        summary: item.contentSnippet?.substring(0, 150) || 'Sin descripción disponible'
      }));

    return NextResponse.json({
      success: true,
      articles: recentArticles,
      feedTitle: feed.title || 'TVenserio',
      feedDescription: feed.description || ''
    });

  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener los artículos',
        articles: []
      },
      { status: 500 }
    );
  }
}