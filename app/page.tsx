'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
    console.log('Fetching RSS articles...');
    
    // Intentar diferentes proxies CORS
    const proxies = [
      'https://api.allorigins.win/get?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://api.codetabs.com/v1/proxy?quest='
    ];
    
    const rssUrl = 'https://www.tvenserio.com/feed/';
    
    for (const proxyUrl of proxies) {
      try {
        const fullUrl = proxyUrl + encodeURIComponent(rssUrl);
        console.log('Trying proxy:', proxyUrl);
        
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          console.log('Proxy failed:', response.status);
          continue;
        }
        
        let xmlContent = '';
        
        // Diferentes formas de obtener el contenido según el proxy
        if (proxyUrl.includes('allorigins')) {
          const data = await response.json();
          xmlContent = data.contents;
        } else {
          xmlContent = await response.text();
        }
        
        console.log('XML content received, length:', xmlContent.length);
        
        // Parse del XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        // Verificar si hay errores de parsing
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          console.log('XML parse error:', parseError.textContent);
          continue;
        }
        
        const items = xmlDoc.querySelectorAll('item');
        console.log('Found items:', items.length);
        
        if (items.length === 0) {
          continue;
        }
        
        // Obtener la fecha de hace 7 días
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const articles: Article[] = [];
        
        items.forEach((item, index) => {
          if (index >= 20) return; // Limitar a 20 artículos para tener más opciones
          
          const title = item.querySelector('title')?.textContent || 'Sin título';
          const link = item.querySelector('link')?.textContent || '#';
          const pubDateStr = item.querySelector('pubDate')?.textContent || '';
          
          // Obtener descripción de diferentes elementos posibles
          let description = item.querySelector('description')?.textContent || 
                           item.querySelector('content\\:encoded')?.textContent ||
                           item.querySelector('summary')?.textContent || 
                           'Sin descripción';
          
          // Limpiar HTML y limitar texto
          description = description.replace(/<[^>]*>/g, '').trim();
          if (description.length > 150) {
            description = description.substring(0, 150) + '...';
          }
          
          // Verificar si el artículo es de los últimos 7 días
          if (pubDateStr) {
            const pubDate = new Date(pubDateStr);
            if (pubDate >= sevenDaysAgo) {
              articles.push({
                title: title.trim(),
                link: link.trim(),
                pubDate: pubDateStr,
                summary: description
              });
            }
          }
        });
        
        console.log('Articles found in last 7 days:', articles.length);
        
        // Si encontramos artículos, retornarlos
        if (articles.length > 0) {
          return articles.slice(0, 15); // Máximo 15 artículos
        }
        
        // Si no hay artículos recientes, mostrar los más recientes en general
  const allArticles: Article[] = [];
  Array.from(items).slice(0, 15).forEach((item) => {
          const title = item.querySelector('title')?.textContent || 'Sin título';
          const link = item.querySelector('link')?.textContent || '#';
          const pubDateStr = item.querySelector('pubDate')?.textContent || '';
          
          let description = item.querySelector('description')?.textContent || 
                           item.querySelector('content\\:encoded')?.textContent ||
                           'Sin descripción';
          
          description = description.replace(/<[^>]*>/g, '').trim();
          if (description.length > 150) {
            description = description.substring(0, 150) + '...';
          }
          
          allArticles.push({
            title: title.trim(),
            link: link.trim(),
            pubDate: pubDateStr,
            summary: description
          });
        });
        
        console.log('Returning all recent articles:', allArticles.length);
        return allArticles;
        
      } catch (proxyError) {
        console.log('Proxy error:', proxyError);
        continue;
      }
    }
    
    // Si todos los proxies fallan, retornar artículos de muestra
    console.log('All proxies failed, returning sample articles');
    return getSampleArticles();
    
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return getSampleArticles();
  }
};

// Función para obtener artículos de muestra cuando falla el RSS
const getSampleArticles = (): Article[] => {
  return [
    {
      title: "Los mejores estrenos de series de la semana",
      link: "https://www.tvenserio.com",
      pubDate: new Date().toISOString(),
      summary: "Descubre las series más esperadas que llegan esta semana a las principales plataformas de streaming."
    },
    {
      title: "Análisis: El futuro del entretenimiento digital",
      link: "https://www.tvenserio.com",
      pubDate: new Date(Date.now() - 86400000).toISOString(), // Ayer
      summary: "Un análisis profundo sobre las tendencias que marcarán el rumbo del entretenimiento en los próximos años."
    },
    {
      title: "Reseña: La serie del momento que todos comentan",
      link: "https://www.tvenserio.com",
      pubDate: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
      summary: "Nuestra reseña completa de la serie que ha capturado la atención de millones de espectadores."
    }
  ];
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
        // En caso de error, mostrar artículos de muestra
        setArticles(getSampleArticles());
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
  <div className="w-full bg-green-800 text-white py-1">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/link-in-bio/tvenserio.png"
            alt="Logo TVenserio"
            width={192}
            height={192}
            className="mx-auto mb-2 w-48 h-48 object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-green-600">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-green-600 bg-white">
              <Image
                src="/link-in-bio/avatar.png"
                alt="Avatar TVenserio"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">TVenserio.com</h2>
            <p className="text-gray-600">Estamos. Creemos.</p>
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700 mb-4">
              <p className="text-sm">⚠️ Mostrando contenido de ejemplo. Los artículos en tiempo real se cargarán próximamente.</p>
            </div>
          )}

          {!loading && (
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