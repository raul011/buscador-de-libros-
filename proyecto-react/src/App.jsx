import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import BookCard from './components/BookCard'
import Footer from './components/Footer'
import libros from './data/libros'

function App() {
  const [busqueda, setBusqueda] = useState('')

  const termino = busqueda.trim().toLowerCase()

  const librosFiltrados = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(termino) ||
      libro.autor.toLowerCase().includes(termino)
  )

  let mensaje = ''
  if (termino) {
    mensaje =
      librosFiltrados.length > 0
        ? `${librosFiltrados.length} resultado(s) para "${busqueda.trim()}"`
        : `No se encontraron libros para "${busqueda.trim()}"`
  }

  return (
    <>
      <Header />

      <main>
        <Hero onBuscar={setBusqueda} mensaje={mensaje} />

        <section className="books-section">
          <h3 className="titulo-seccion">Libros Destacados</h3>

          <div className="books-grid">
            {librosFiltrados.map((libro) => (
              <BookCard key={libro.id} libro={libro} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App