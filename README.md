# Sora Company - Real Estate Website

Una aplicación web moderna y minimalista para la inmobiliaria Sora Company, construida con Next.js, Tailwind CSS y Supabase.

## 🚀 Características

- **Diseño moderno y responsivo** con Tailwind CSS
- **Server-Side Rendering** para óptimo SEO
- **Video background hero** con animaciones GSAP
- **Smooth scroll animations** en toda la aplicación
- **Secciones informativas** (About, Services, Stats, Contact)
- **Integración con Supabase** para datos dinámicos
- **Páginas de listado** para casas y terrenos
- **Páginas de detalle** con galerías de imágenes
- **Formulario de contacto** para generación de leads (landing + detail pages)
- **Filtros de precio** para casas
- **Animaciones suaves con GSAP** y transiciones
- **Contador animado** de estadísticas
- **100% TypeScript** para type-safety

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Una cuenta en Supabase con el esquema de base de datos configurado
- npm o yarn como gestor de paquetes

## 🔧 Configuración

1. **Clonar el repositorio** (si aplica) o usar el directorio actual

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
   
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-proyecto-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

   Obtén estas credenciales desde tu dashboard de Supabase en:
   `Configuración del Proyecto → API → Project URL y anon/public key`

4. **Verificar la base de datos**:
   
   Asegúrate de que tu base de datos Supabase tenga las tablas correctas:
   - `casas` con relación a `casa_imagen`
   - `terrenos` con relación a `terreno_imagen`
   - `leads` para el formulario de contacto
   - Las políticas RLS (Row Level Security) configuradas correctamente

## 🚀 Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Construir para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── casas/
│   │   ├── [slug]/      # Página de detalle de casa
│   │   └── page.tsx     # Listado de casas
│   ├── terrenos/
│   │   ├── [slug]/      # Página de detalle de terreno
│   │   └── page.tsx     # Listado de terrenos
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio
│   ├── globals.css      # Estilos globales
│   └── not-found.tsx    # Página 404
├── components/
│   ├── ContactForm.tsx      # Formulario de leads
│   ├── FeaturedProperties.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ImageGallery.tsx     # Galería con navegación
│   ├── LoadingSkeleton.tsx
│   ├── Navbar.tsx
│   └── PropertyCard.tsx
├── lib/
│   ├── supabase.ts      # Cliente de Supabase
│   └── utils.ts         # Utilidades (formatCurrency, etc.)
└── types/
    └── database.ts      # Tipos TypeScript del schema
```

## 🎨 Personalización

### Colores

Los colores principales se definen en `tailwind.config.ts`. El color de acento por defecto es Navy Blue (#1e3a8a). Para cambiarlo:

```typescript
colors: {
  primary: {
    600: '#tu-color-aqui',
    // ... otros tonos
  }
}
```

### Contenido

- **Hero Section**: Edita `src/components/Hero.tsx` para cambiar el mensaje principal
- **Footer**: Actualiza `src/components/Footer.tsx` con tu información de contacto real

## 📝 Notas Importantes

### Imágenes de Placeholder

Las tarjetas de propiedades usan un placeholder cuando no hay imágenes (`/placeholder-property.jpg`). Asegúrate de:
1. Agregar una imagen placeholder en `public/placeholder-property.jpg`, o
2. Subir imágenes reales a Supabase Storage para todas las propiedades

### Configuración de Supabase Storage

Si estás usando Supabase Storage para las imágenes:
1. Crea un bucket llamado `props` (público)
2. Asegúrate de que las URLs en `casa_imagen` y `terreno_imagen` apunten correctamente

### Row Level Security (RLS)

Las políticas RLS están configuradas para:
- **Lectura pública**: Solo propiedades con `estado = 'publicado'`
- **Escritura**: Solo usuarios autenticados con rol admin/editor
- **Leads**: INSERT público, SELECT solo para autenticados

## 🐛 Solución de Problemas

### Error: "Missing Supabase environment variables"

Verifica que tu archivo `.env.local` exista y contenga las variables correctas.

### Las imágenes no cargan

1. Verifica que las URLs en la base de datos sean accesibles
2. Revisa la configuración de `next.config.js` para permitir el dominio de tus imágenes
3. Si usas Supabase Storage, verifica que el bucket sea público

### No aparecen propiedades

1. Verifica que haya propiedades con `estado = 'publicado'` en la base de datos
2. Revisa las políticas RLS en Supabase
3. Abre la consola del navegador para ver errores de API

## 📄 Licencia

Este proyecto es parte de Sora Company.

## 🤝 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo.
