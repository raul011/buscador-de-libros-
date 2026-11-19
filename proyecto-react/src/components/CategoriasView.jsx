import { useState, useEffect } from 'react'
import BookCard from './BookCard'

const API_BASE = 'https://openlibrary.org/search.json'

// Catálogo de categorías oficiales de Open Library
const CATEGORIAS_API = [
  {
    id: 'science_fiction',
    nombre: 'Ciencia Ficción',
    icono: '🚀',
    descripcion: 'Viajes espaciales, futuros distópicos y tecnología avanzada.',
  },
  {
    id: 'fantasy',
    nombre: 'Fantasía',
    icono: '🧙‍♂️',
    descripcion: 'Mundos mágicos, criaturas míticas y aventuras épicas.',
  },
  {
    id: 'mystery_and_detective_stories',
    nombre: 'Misterio y Detectives',
    icono: '🔍',
    descripcion: 'Crímenes por resolver, acertijos y tramas policiacas.',
  },
  {
    id: 'romance',
    nombre: 'Romance',
    icono: '💖',
    descripcion: 'Historias de amor, pasión y vínculos inolvidables.',
  },
  {
    id: 'horror',
    nombre: 'Terror y Suspenso',
    icono: '👻',
    descripcion: 'Relatos inquietantes, lo sobrenatural y horror psicológico.',
  },
  {
    id: 'poetry',
    nombre: 'Poesía',
    icono: '🎭',
    descripcion: 'Versos, poemas y la belleza lírica de la literatura.',
  },
  {
    id: 'plays',
    nombre: 'Teatro y Drama',
    icono: '🎬',
    descripcion: 'Obras de teatro clásicas y piezas dramáticas maestras.',
  },
  {
    id: 'programming',
    nombre: 'Programación',
    icono: '💻',
    descripcion: 'Desarrollo de software, código, algoritmos y desarrollo web.',
  },
  {
    id: 'computer_science',
    nombre: 'Ciencias de la Computación',
    icono: '🖥️',
    descripcion: 'Teoría computacional, redes, sistemas y datos.',
  },
  {
    id: 'science',
    nombre: 'Ciencia y Naturaleza',
    icono: '🔬',
    descripcion: 'Descubrimientos científicos, física, química y biología.',
  },
  {
    id: 'mathematics',
    nombre: 'Matemáticas',
    icono: '📐',
    descripcion: 'Álgebra, geometría, cálculo y lógica matemática.',
  },
  {
    id: 'children',
    nombre: 'Infantil y Niños',
    icono: '🧸',
    descripcion: 'Cuentos ilustrados, fábulas y lecturas para niños.',
  },
  {
    id: 'young_adult_fiction',
    nombre: 'Juvenil',
    icono: '📚',
    descripcion: 'Novelas y aventuras para adolescentes y jóvenes.',
  },
  {
    id: 'fairy_tales',
    nombre: 'Cuentos de Hadas',
    icono: '🧚',
    descripcion: 'Relatos mágicos y leyendas folclóricas populares.',
  },
  {
    id: 'comics_graphic_novels',
    nombre: 'Cómics y Manga',
    icono: '🦸',
    descripcion: 'Historietas, novelas gráficas y universos visuales.',
  },
  {
    id: 'history',
    nombre: 'Historia Universal',
    icono: '🏛️',
    descripcion: 'Eventos históricos, imperios y civilizaciones del mundo.',
  },
  {
    id: 'biography',
    nombre: 'Biografías y Memorias',
    icono: '👤',
    descripcion: 'Vidas inspiradoras de personajes históricos y líderes.',
  },
  {
    id: 'philosophy',
    nombre: 'Filosofía',
    icono: '📜',
    descripcion: 'Reflexiones sobre el ser, la moral, la ética y el pensamiento.',
  },
  {
    id: 'psychology',
    nombre: 'Psicología',
    icono: '🧠',
    descripcion: 'Comportamiento humano, emociones y desarrollo personal.',
  },
  {
    id: 'business',
    nombre: 'Negocios y Liderazgo',
    icono: '📈',
    descripcion: 'Estrategias empresariales, innovación y finanzas.',
  },
  {
    id: 'cookbooks',
    nombre: 'Cocina y Gastronomía',
    icono: '🍳',
    descripcion: 'Recetas, arte culinario y nutrición práctica.',
  },
  {
    id: 'travel',
    nombre: 'Viajes y Aventura',
    icono: '🌍',
    descripcion: 'Guías de viaje, países y relatos de expediciones.',
  },
  {
    id: 'health',
    nombre: 'Salud y Bienestar',
    icono: '🩺',
    descripcion: 'Nutrición, hábitos saludables y bienestar físico.',
  },
  {
    id: 'art',
    nombre: 'Arte y Diseño',
    icono: '🎨',
    descripcion: 'Pintura, escultura, historia del arte y diseño gráfico.',
  },
]

function CategoriasView({ onSeleccionarLibro, onVolverInicio, formatearLibro }) {
  const [filtroTexto, setFiltroTexto] = useState('')

  // Categoría seleccionada para ver sus libros
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [librosCategoria, setLibrosCategoria] = useState([])
  const [cargandoLibros, setCargandoLibros] = useState(false)
  const [errorLibros, setErrorLibros] = useState(null)

  // Cargar libros de Open Library cuando se selecciona una categoría
  useEffect(() => {
    if (!categoriaSeleccionada) return

    let cancelado = false
    setCargandoLibros(true)
    setErrorLibros(null)

    const url = `${API_BASE}?subject=${encodeURIComponent(categoriaSeleccionada.id)}&limit=12`

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelado) return
        const formateados = data.docs.map(formatearLibro)
        setLibrosCategoria(formateados)
        setCargandoLibros(false)
      })
      .catch((err) => {
        if (cancelado) return
        console.error('Error al cargar libros de la categoría:', err)
        setErrorLibros('No se pudieron obtener los libros de Open Library para esta categoría.')
        setCargandoLibros(false)
      })

    return () => {
      cancelado = true
    }
  }, [categoriaSeleccionada, formatearLibro])

  // Filtrado simple por texto para que el usuario encuentre rápido una categoría
  const categoriasFiltradas = CATEGORIAS_API.filter((cat) => {
    const texto = filtroTexto.toLowerCase()
    return (
      cat.nombre.toLowerCase().includes(texto) ||
      cat.descripcion.toLowerCase().includes(texto)
    )
  })

  // Si hay una categoría seleccionada, mostramos sus libros
  if (categoriaSeleccionada) {
    return (
      <section className="vista-categoria-libros">
        <div className="categoria-libros-nav">
          <button
            type="button"
            className="btn-volver"
            onClick={() => setCategoriaSeleccionada(null)}
          >
            <span className="flecha">←</span> Volver a categorías
          </button>

          <div className="detalle-breadcrumb">
            <span style={{ cursor: 'pointer' }} onClick={onVolverInicio}>
              Inicio
            </span>{' '}
            &gt;{' '}
            <span style={{ cursor: 'pointer' }} onClick={() => setCategoriaSeleccionada(null)}>
              Categorías
            </span>{' '}
            &gt; <strong>{categoriaSeleccionada.nombre}</strong>
          </div>
        </div>

        <div className="categoria-libros-header">
          <div className="categoria-libros-icono">{categoriaSeleccionada.icono}</div>
          <div>
            <h2 className="categoria-libros-titulo">{categoriaSeleccionada.nombre}</h2>
            <p className="categoria-libros-subtitulo">{categoriaSeleccionada.descripcion}</p>
          </div>
        </div>

        {cargandoLibros && (
          <div className="estado-carga">
            <div className="spinner"></div>
            <p>Cargando libros de {categoriaSeleccionada.nombre} desde Open Library...</p>
          </div>
        )}

        {errorLibros && !cargandoLibros && (
          <div className="estado-error">
            <span className="error-icono">📚</span>
            <p className="error-titulo">Error al consultar Open Library</p>
            <p className="error-detalle">{errorLibros}</p>
            <button
              className="btn-reintentar"
              onClick={() => setCategoriaSeleccionada({ ...categoriaSeleccionada })}
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargandoLibros && !errorLibros && librosCategoria.length > 0 && (
          <div className="books-grid">
            {librosCategoria.map((libro) => (
              <BookCard
                key={libro.id}
                libro={libro}
                onSeleccionarLibro={onSeleccionarLibro}
              />
            ))}
          </div>
        )}

        {!cargandoLibros && !errorLibros && librosCategoria.length === 0 && (
          <div className="estado-vacio">
            <p>No se encontraron libros disponibles en Open Library para esta categoría.</p>
          </div>
        )}
      </section>
    )
  }

  // Vista principal: Solo las categorías de Open Library
  return (
    <section className="vista-categorias">
      <div className="categorias-header-bloque">
        <button type="button" className="btn-volver" onClick={onVolverInicio}>
          <span className="flecha">←</span> Volver al inicio
        </button>

        <h2 className="categorias-titulo-principal">Categorías de Open Library</h2>
        <p className="categorias-descripcion-principal">
          Selecciona una categoría para explorar sus libros en la API pública:
        </p>

        {/* Buscador opcional para filtrar categorías */}
        <div className="categorias-barra-filtro">
          <input
            type="text"
            placeholder="Buscar categoría (ej. ciencia, terror, historia, infantil)..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            className="input-filtro-categorias"
          />
        </div>
      </div>

      {/* Cuadrícula directa de categorías */}
      <div className="categorias-grid">
        {categoriasFiltradas.map((cat) => (
          <article
            key={cat.id}
            className="categoria-card"
            onClick={() => setCategoriaSeleccionada(cat)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setCategoriaSeleccionada(cat)
              }
            }}
          >
            <div className="categoria-card-top">
              <span className="categoria-card-icono">{cat.icono}</span>
            </div>

            <h3 className="categoria-card-titulo">{cat.nombre}</h3>
            <p className="categoria-card-desc">{cat.descripcion}</p>

            <div className="categoria-card-footer">
              <span className="categoria-card-link">Ver libros →</span>
            </div>
          </article>
        ))}
      </div>

      {categoriasFiltradas.length === 0 && (
        <div className="estado-vacio">
          <p>No se encontraron categorías que coincidan con "{filtroTexto}".</p>
        </div>
      )}
    </section>
  )
}

export default CategoriasView
