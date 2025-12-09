# Video and Image Assets

## Required Files

### Videos
- **Hero Background Video**: `/public/videos/hero-background.mp4`
  - Recomendaciones:
    - Duración: 10-30 segundos
    - Tamaño: < 5MB para mejor rendimiento
    - Formato: MP4 (H.264 codec)
    - Resolución: 1920x1080 (Full HD)
    - Loop seamless (que el final conecte con el inicio)
  - Sugerencias de contenido:
    - Aerial shots de propiedades
    - Arquitectura moderna
    - Interiores de lujo
    - Time-lapse de ciudad/desarrollo

### Images

- **Hero Poster**: `/public/images/hero-poster.jpg`
  - Imagen que se muestra mientras carga el video
  - Misma proporción que el video (16:9)
  - Optimizada para web (< 500KB)

- **About Building**: `/public/images/about-building.jpg`
  - Imagen para la sección "Acerca de Nosotros"
  - Edificio o desarrollo representativo
  - Recomendación: 1200x800px
  - Formato: JPG optimizado

## Alternativas si no tienes video propio

### 1. Placeholder temporal
El Hero está configurado para mostrar un gradiente de fallback si el video no existe.

### 2. Descargar video gratuito
Sitios recomendados para videos gratuitos:
- **Pexels Videos**: https://www.pexels.com/videos/
- **Pixabay**: https://pixabay.com/videos/
- **Coverr**: https://coverr.co/

Busca términos como:
- "real estate"
- "modern architecture"
- "luxury home"
- "aerial city"

### 3. Generar con IA
Herramientas como Runway ML o Pika Labs pueden generar videos cortos.

## Ubicación de archivos

```
public/
├── videos/
│   └── hero-background.mp4    <- Coloca tu video aquí
└── images/
    ├── hero-poster.jpg         <- Poster del video
    └── about-building.jpg      <- Imagen About section
```

## Optimización

Para optimizar tu video antes de subirlo:

```bash
# Con FFmpeg (si lo tienes instalado)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1920:1080 -b:v 2M hero-background.mp4
```

O usa herramientas online como:
- HandBrake (gratuito)
- CloudConvert
- Online-Convert

## Estado actual

El sitio funcionará perfectamente sin el video, mostrando el gradiente de fondo. 
Cuando estés listo, simplemente coloca los archivos en las ubicaciones indicadas.
