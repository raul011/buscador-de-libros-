import Header from './components/Header'
import Hero from './components/Hero'
import BookCard from './components/BookCard'
import Footer from './components/Footer'
// Práctica: ahora App lee el estado compartido desde el contexto.
// Ya no define useState ni useEffect ni pasa props a Hero.
import { useLibros } from './context/librosContext'

function App() {
  // Todo el estado y las acciones vienen del contexto (LibrosProvider).
  const { datos, cargando, error, termino, reintentar } = useLibros()

  return (
    <>
      <Header />

      <main>
        {/* Hero ya no recibe onBuscar ni mensaje: los toma del contexto. */}
        <Hero />

        <section className="books-section">
          <h3 className="titulo-seccion">
            {termino ? `Resultados para "${termino}"` : 'Libros Destacados'}
          </h3>

          {/* Mostrar "Cargando..." */}
          {cargando && (
            <div className="estado-carga">
              <div className="spinner"></div>
              <p>Cargando libros desde Open Library...</p>
            </div>
          )}

          {/* Mensaje de error amigable */}
          {error && !cargando && (
            <div className="estado-error">
              <span className="error-icono">📚</span>
              <p className="error-titulo">Algo salió mal</p>
              <p className="error-detalle">{error}</p>
              <button className="btn-reintentar" onClick={reintentar}>
                Reintentar
              </button>
            </div>
          )}

          {/* Renderizar lista con .map() y key único */}
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
