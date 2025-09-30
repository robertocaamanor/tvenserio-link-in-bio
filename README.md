# TVenserio - Link in Bio 🎬

Una aplicación moderna de "link in bio" para TVenserio.com, diseñada con Next.js 15 y Tailwind CSS, que captura y muestra automáticamente los artículos más recientes de los últimos 7 días desde el feed RSS.

## ✨ Características

- **Diseño Verde Elegante**: Paleta de colores verdes coherente con la marca TVenserio
- **Artículos en Tiempo Real**: Obtiene automáticamente los últimos artículos de los últimos 7 días desde el RSS de TVenserio
- **Responsive**: Diseño adaptable para todos los dispositivos
- **Enlaces Sociales**: Acceso rápido a todas las redes sociales de TVenserio
- **Performance Optimizada**: Construido con Next.js 15 y Turbopack
- **TypeScript**: Código type-safe y mantenible

## 🚀 Tecnologías

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **RSS Parser** - Parsing del feed RSS
- **date-fns** - Manipulación de fechas
- **Turbopack** - Bundler ultrarrápido

## 📦 Instalación

1. Clona el repositorio:
\`\`\`bash
git clone [url-del-repositorio]
cd link-in-bio-tvenserio
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🌐 API Endpoints

### GET /api/articles
Obtiene los artículos de los últimos 7 días desde el RSS de TVenserio.

**Respuesta:**
\`\`\`json
{
  "success": true,
  "articles": [
    {
      "title": "Título del artículo",
      "link": "https://www.tvenserio.com/articulo",
      "pubDate": "2024-01-01T12:00:00.000Z",
      "summary": "Resumen del artículo..."
    }
  ],
  "feedTitle": "TVenserio",
  "feedDescription": "Descripción del feed"
}
\`\`\`

## 🎨 Personalización

### Colores
Los colores principales están definidos en `app/globals.css`:
- Verde principal: `#16a34a`
- Verde oscuro: `#15803d`
- Verde claro: `#22c55e`

### Enlaces Sociales
Puedes modificar los enlaces sociales en `app/page.tsx` en la sección "Social Links".

## 📱 Características del Diseño

- **Header**: Fondo verde con gradiente y branding de TVenserio
- **Perfil**: Logo circular, descripción y enlaces sociales
- **Artículos Recientes**: Lista de artículos con títulos, resúmenes y fechas
- **Información de Contacto**: Email y llamada a la acción
- **Footer**: Copyright y derechos reservados

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📈 SEO y Metadata

La aplicación incluye metadata optimizada para SEO:
- Title y description optimizados
- Open Graph tags para redes sociales
- Twitter Card metadata
- Robots.txt configuration

## 🌍 Internacionalización

- Idioma: Español (es)
- Formato de fechas: Español con date-fns
- Zona horaria: Automática del navegador

## 📄 Licencia

© 2024 TVenserio.com - Todos los derechos reservados

## 🤝 Contribución

Este es un proyecto privado para TVenserio.com. Para consultas o sugerencias, contacta a: hola@tvenserio.com
