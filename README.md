# Buscador de libros — Open Library API

Aplicación **100% frontend** para buscar libros usando la API pública de
[Open Library](https://openlibrary.org). Está hecha con React + Vite y no tiene
servidor propio, base de datos ni proxy: el navegador consume la API directamente
con `fetch`.

## Características

- Búsqueda por título, autor o tema con **debounce** de 350 ms.
- Cancelación de peticiones obsoletas con `AbortController`.
- Filtros por categoría, idioma y año.
- Orden por relevancia, año o título.
- Paginación con el botón **Cargar más**.
- Modal de detalle con enlace a la ficha de Open Library.
- Favoritos guardados en `localStorage`.
- Tema claro/oscuro persistente.
- Estados de carga, sin resultados y error con reintento.

## Stack

| Herramienta | Uso |
|---|---|
| React 19 | Interfaz y estado |
| Vite 8 | Servidor de desarrollo y build estático |
| CSS puro | Estilos y variables de tema |
| Oxlint | Lint |
| Vitest + Testing Library | Tests |

> Vite y Vitest son herramientas de desarrollo. La aplicación publicada es un
> sitio estático: no hay backend en ningún momento.

## Cómo correr el proyecto

```bash
cd proyecto-react
npm install
npm run dev
```

Luego abre la URL que muestra Vite (normalmente `http://localhost:5173`).

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve el build de producción. |
| `npm test` | Ejecuta los tests una vez. |
| `npm run test:watch` | Tests en modo interactivo. |
| `npm run lint` | Analiza el código con Oxlint. |

## Estructura

```text
proyecto-react/
├── src/
│   ├── api/
│   │   ├── normalizar.js      # doc de Open Library -> modelo único
│   │   └── openLibrary.js     # armado de URL + fetch
│   ├── components/            # Header, Hero, Filtros, BookCard, ...
│   ├── hooks/
│   │   ├── useBuscador.js     # debounce, filtros, orden y paginación
│   │   ├── useFavoritos.js    # favoritos en localStorage
│   │   └── useTema.js         # tema claro/oscuro
│   ├── test/                  # setup y fixtures de pruebas
│   ├── App.jsx
│   └── index.css
├── docs/ (en la raíz del repo)
└── package.json
```

## API usada

```text
GET https://openlibrary.org/search.json?q=harry%20potter&limit=12&offset=0
```

Parámetros opcionales que usa la app:

- `subject`: categoría o tema.
- `lang`: código de idioma (`spa`, `eng`, …).
- `first_publish_year`: año de primera publicación.

Las portadas salen de:

```text
https://covers.openlibrary.org/b/id/<cover_i>-M.jpg
```

No requiere clave ni registro. La API es de **solo lectura**.

## Documentación de diseño

- [Casos de uso y diagramas](docs/casos_de_uso.md)
- [Guía de estilo](docs/guia_de_estilo.md)

## Limitaciones conocidas

- La app depende de la disponibilidad y de los límites de Open Library.
- El ordenamiento se aplica sobre los resultados ya cargados, no sobre el total.
- Los filtros por `subject` funcionan mejor con términos en inglés (los que usa
  Open Library en sus datos).
- Los favoritos viven solo en el navegador donde se guardaron.
- La carpeta raíz del repositorio (`index.html`, `app.js`, `styles.css`) es la
  primera maqueta estática de la materia; la aplicación final es la de
  `proyecto-react/`.
