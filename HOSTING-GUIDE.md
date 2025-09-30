# 🌐 Guía para Hosting en Subcarpeta

## 🛠️ Configuración Actual

Tu aplicación está configurada para funcionar en la ruta: `/link`

**Si quieres cambiar la carpeta:**
1. Edita `next.config.ts`
2. Cambia `basePath: '/link'` por `basePath: '/tu-carpeta'`
3. Cambia `assetPrefix: '/link'` por `assetPrefix: '/tu-carpeta'`

## 📦 Pasos para Generar Archivos Estáticos

### Opción 1: Build Estático (Recomendado para hosting shared)

```bash
# 1. Usar la versión estática (sin API routes)
copy app\page-static.tsx app\page.tsx

# 2. Generar build estático
npm run build:static

# 3. Los archivos están en la carpeta 'out'
```

### Opción 2: Build Normal (Para VPS con Node.js)

```bash
# 1. Usar la versión con API routes
# (mantener app\page.tsx actual)

# 2. Ajustar next.config.ts para quitar 'output: export'
# 3. Generar build
npm run build

# 4. Subir toda la aplicación y ejecutar npm start
```

## 📁 Estructura para Subir al Hosting

### Para Hosting Estático (opción 1):
```
tu-dominio.com/
├── link/                    ← Tu carpeta
│   ├── index.html
│   ├── _next/
│   │   ├── static/
│   │   └── ...
│   └── ...
└── otros-archivos-del-sitio
```

### Para VPS/Hosting con Node.js (opción 2):
```
tu-servidor/
├── link-in-bio/             ← Carpeta de la aplicación
│   ├── .next/
│   ├── app/
│   ├── package.json
│   ├── next.config.ts
│   └── ...
└── nginx.conf (proxy a puerto 3000)
```

## 🔧 Instrucciones Específicas por Tipo de Hosting

### 📂 Hosting Compartido (cPanel, etc.)

1. **Preparar archivos:**
   ```bash
   # Usar versión estática
   copy app\page-static.tsx app\page.tsx
   npm run build:static
   ```

2. **Subir archivos:**
   - Comprimir carpeta `out`
   - Subir y extraer en `public_html/link/`
   - URL: `https://tu-dominio.com/link/`

### 🖥️ VPS (DigitalOcean, AWS, etc.)

1. **Subir código completo**
2. **Instalar dependencias:**
   ```bash
   npm install --production
   ```
3. **Configurar proxy (Nginx):**
   ```nginx
   location /link/ {
       proxy_pass http://localhost:3000/;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```
4. **Iniciar aplicación:**
   ```bash
   npm run build
   npm start
   ```

### ☁️ Hostings específicos

#### **Hostinger, GoDaddy, Namecheap:**
- Usar método estático
- Subir carpeta `out` a `public_html/link/`

#### **GitHub Pages:**
```bash
npm run build:static
# Subir carpeta 'out' a branch gh-pages
```

## 🔍 Troubleshooting

### Problema: Enlaces no funcionan
**Solución:** Verificar que `basePath` en `next.config.ts` coincida con tu carpeta

### Problema: CSS no carga
**Solución:** Verificar que `assetPrefix` esté configurado correctamente

### Problema: API no funciona
**Solución:** Usar la versión estática (`page-static.tsx`) que no depende de API routes

## ✅ Checklist Final

- [ ] Configurar `basePath` en `next.config.ts` con tu carpeta
- [ ] Elegir versión estática o con API
- [ ] Ejecutar build correspondiente
- [ ] Subir archivos a hosting
- [ ] Verificar que la URL funciona: `https://tu-dominio.com/tu-carpeta/`

## 🚀 Comandos Rápidos

```bash
# Para hosting estático
copy app\page-static.tsx app\page.tsx
npm run build:static
# Subir carpeta 'out' como 'link'

# Para VPS
npm run build
npm start
# Configurar proxy web server
```