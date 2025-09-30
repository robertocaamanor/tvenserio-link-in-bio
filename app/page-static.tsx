'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
}

// Función para obtener artículos directamente desde el RSS
const fetchRSSArticles = async (): Promise<Article[]> => {
  try {
    // Para hosting estático, usamos un proxy CORS o servicio externo
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const rssUrl = encodeURIComponent('https://www.tvenserio.com/feed/');
    
    const response = await fetch(`${proxyUrl}${rssUrl}`);
    const data = await response.json();
    
    // Parse del XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    // Obtener la fecha de hace 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const articles: Article[] = [];
    
    items.forEach((item, index) => {
      if (index >= 10) return; // Limitar a 10 artículos
      
      const title = item.querySelector('title')?.textContent || 'Sin título';
      const link = item.querySelector('link')?.textContent || '#';
      const pubDateStr = item.querySelector('pubDate')?.textContent || '';
      const description = item.querySelector('description')?.textContent || 'Sin descripción';
      
      // Verificar si el artículo es de los últimos 7 días
      const pubDate = new Date(pubDateStr);
      if (pubDate >= sevenDaysAgo) {
        articles.push({
          title,
          link,
          pubDate: pubDateStr,
          summary: description.replace(/<[^>]*>/g, '').substring(0, 150) // Remover HTML y limitar texto
        });
      }
    });
    
    return articles;
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return [];
  }
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchRSSArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
        setError('Error al cargar los artículos');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <div className="w-full bg-green-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">TVenserio</h1>
          <p className="text-green-100 text-lg">Tu portal de entretenimiento y series</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-green-600">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">TV</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">TVenserio.com</h2>
            <p className="text-gray-600">Análisis, reseñas y noticias del mundo del entretenimiento</p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://www.tvenserio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium hover-lift"
            >
              🌐 Sitio Web
            </a>
            <a
              href="https://www.facebook.com/tvenserio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium hover-lift"
            >
              👥 Facebook
            </a>
            <a
              href="https://www.instagram.com/tvenseriocom_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium hover-lift"
            >
              📸 Instagram
            </a>
            <a
              href="https://www.youtube.com/@TVenseriocom"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-200 font-medium hover-lift"
            >
              🎥 YouTube
            </a>
          </div>

          {/* Additional Info */}
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium mb-2">📧 Contacto</p>
            <p className="text-green-700 text-sm">hola@tvenserio.com</p>
            <p className="text-green-600 text-xs mt-2">
              Síguenos para estar al día con las últimas novedades del entretenimiento
            </p>
          </div>
        </div>

        {/* Recent Articles Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="text-green-600 mr-2">📰</span>
            Últimos Artículos (7 días)
          </h3>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Cargando artículos...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {articles.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No hay artículos recientes de los últimos 7 días.
                </p>
              ) : (
                articles.map((article, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2 hover:text-green-700">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {article.title}
                      </a>
                    </h4>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    <p className="text-green-600 text-xs">
                      {article.pubDate && format(new Date(article.pubDate), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>© {currentYear} TVenserio.com - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}