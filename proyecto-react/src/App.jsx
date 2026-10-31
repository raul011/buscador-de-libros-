import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import BookCard from './components/BookCard'
import Footer from './components/Footer'

// ─────────────────────────────────────────────
//  URL de la API pública (Open Library)
// ─────────────────────────────────────────────
const API_BASE = 'https://openlibrary.org/search.json'

// esta funcion toma un libro de la API y lo acomoda para usarlo en la tarjeta
function formatearLibro(doc, index) {
  return {
    // id unico que viene de Open Library
    id: doc.key || `libro-${index}`,
    titulo: doc.title || 'Sin título',
    autor: doc.author_name ? doc.author_name[0] : 'Autor desconocido',
    anio: doc.first_publish_year || 'N/D',
    categoria: doc.subject ? doc.subject[0] : 'General',
    resumen: `Publicado en ${doc.first_publish_year || 'fecha desconocida'}. Ediciones disponibles: ${doc.edition_count || 1}.`,
    isbn: doc.isbn ? doc.isbn[0] : 'N/D',
    imagen: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : 'https://placehold.co/200x280?text=Sin+Portada',
    enlace: `https://openlibrary.org${doc.key}`,
  }
}

function App() {
  // Término de búsqueda ingresado por el usuario
  const [busqueda, setBusqueda] = useState('')

  // ── PUNTO 2: los tres estados ──────────────────────────────────────
  const [datos, setDatos] = useState([])       // datos: lista de libros
  const [cargando, setCargando] = useState(false) // cargando: boolean
  const [error, setError] = useState(null)     // error: string | null
  // ──────────────────────────────────────────────────────────────────

  // ── PUNTO 1: fetch dentro de useEffect ────────────────────────────
  useEffect(() => {
    // Construimos la URL según si hay búsqueda o no
    const termino = busqueda.trim()
    const url = termino
      ? `${API_BASE}?q=${encodeURIComponent(termino)}&limit=12`
      : `${API_BASE}?q=programacion&limit=12`

    // Activamos el estado de carga y limpiamos errores anteriores
    setCargando(true)
    setError(null)

    fetch(url)
      .then((res) => {
        // Verificamos que la respuesta sea exitosa
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        // PUNTO 1 → datos recibidos: guardamos en estado
        const librosFormateados = data.docs.map(formatearLibro)
        setDatos(librosFormateados)
        setCargando(false)
      })
      .catch((err) => {
        // PUNTO 2 → estado de error
        console.error('Error en fetch:', err)
        setError('No se pudo conectar con Open Library. Verifica tu conexión e intenta de nuevo.')
        setCargando(false)
      })
  }, [busqueda]) // se vuelve a ejecutar cada vez que cambia busqueda
  // ──────────────────────────────────────────────────────────────────

  // Mensaje de resultados para el Hero
  const termino = busqueda.trim()
  let mensaje = ''
  if (termino && !cargando) {
    mensaje = datos.length > 0
      ? `${datos.length} resultado(s) para "${termino}"`
      : `No se encontraron libros para "${termino}"`
  }

  return (
    <>
      <Header />

      <main>
        <Hero onBuscar={setBusqueda} mensaje={mensaje} />

        <section className="books-section">
          <h3 className="titulo-seccion">
            {termino ? `Resultados para "${termino}"` : 'Libros Destacados'}
          </h3>

          {/* ── PUNTO 4: Mostrar "Cargando..." ── */}
          {cargando && (
            <div className="estado-carga">
              <div className="spinner"></div>
              <p>Cargando libros desde Open Library...</p>
            </div>
          )}

          {/* ── PUNTO 4: Mensaje de error amigable ── */}
          {error && !cargando && (
            <div className="estado-error">
              <span className="error-icono">📚</span>
              <p className="error-titulo">Algo salió mal</p>
              <p className="error-detalle">{error}</p>
              <button
                className="btn-reintentar"
                onClick={() => setBusqueda((prev) => prev + ' ')}
              >
                Reintentar
              </button>
            </div>
          )}

          {/* ── PUNTO 3: Renderizar lista con .map() y key único ── */}
          {!cargando && !error && datos.length > 0 && (
            <div className="books-grid">
              {datos.map((libro) => (
                // key={libro.id} → id único de Open Library (doc.key)
                <BookCard key={libro.id} libro={libro} />
              ))}
            </div>
          )}

          {/* Sin resultados */}
          {!cargando && !error && termino && datos.length === 0 && (
            <div className="estado-vacio">
              <p>🔍 No se encontraron libros para <strong>"{termino}"</strong>.</p>
              <p>Intenta con otro título o autor.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App