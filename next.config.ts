import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para subcarpeta en hosting
  basePath: '/link-in-bio', // Cambia por el nombre de tu carpeta
  assetPrefix: '/link-in-bio',
  trailingSlash: true,
  
  // Configuración para export estático
  output: 'export',
  
  // Optimizaciones para hosting estático
  images: {
    unoptimized: true,
  },
  
  // Configuración para trailing slash
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
