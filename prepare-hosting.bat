@echo off
echo ========================================
echo    PREPARANDO PARA HOSTING ESTATICO
echo ========================================
echo.

echo 1. Copiando version estatica...
copy "app\page-static.tsx" "app\page.tsx" >nul
echo    ✓ Version estatica activada

echo.
echo 2. Generando build estatico...
call npm run build:static
echo    ✓ Build completado

echo.
echo 3. Archivos listos en carpeta 'out'
echo.
echo ========================================
echo           INSTRUCCIONES
echo ========================================
echo.
echo 1. Ve a la carpeta 'out'
echo 2. Comprime todo el contenido
echo 3. Sube el archivo a tu hosting
echo 4. Extrae en public_html/link/
echo 5. Accede a: https://tu-dominio.com/link/
echo.
echo ¡Listo para subir al hosting!
echo ========================================
pause