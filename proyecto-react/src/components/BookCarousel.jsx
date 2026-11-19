import { useRef } from 'react'

function BookCarousel({ titulo, libros = [], cargando = false, onSeleccionarLibro }) {
  const trackRef = useRef(null)

  const desplazarse = (direccion) => {
    if (trackRef.current) {
      const cantidad = direccion === 'izq' ? -340 : 340
      trackRef.current.scrollBy({ left: cantidad, behavior: 'smooth' })
    }
  }

  return (
    <section className="carousel-seccion">
      <div className="carousel-header">
        <h3 className="carousel-titulo">{titulo}</h3>
        <div className="carousel-controles">
          <button
            type="button"
            className="btn-flecha-carousel"
            onClick={() => desplazarse('izq')}
            aria-label={`Desplazar hacia la izquierda en ${titulo}`}
          >
            ‹
          </button>
          <button
            type="button"
            className="btn-flecha-carousel"
            onClick={() => desplazarse('der')}
            aria-label={`Desplazar hacia la derecha en ${titulo}`}
          >
            ›
          </button>
        </div>
      </div>

      {cargando ? (
        <div className="carousel-cargando">
          <div className="spinner-chico"></div>
          <p>Cargando libros desde Open Library...</p>
        </div>
      ) : libros.length > 0 ? (
        <div className="carousel-track" ref={trackRef}>
          {libros.map((libro, idx) => (
            <article
              key={libro.id || `carousel-${idx}`}
              className="carousel-card"
              onClick={() => onSeleccionarLibro(libro)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSeleccionarLibro(libro)
                }
              }}
            >
              <div className="carousel-portada-wrap">
                <img
                  src={libro.imagen}
                  alt={`Portada de ${libro.titulo}`}
                  className="carousel-portada"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/200x280?text=Sin+Portada'
                  }}
                />
              </div>
              <div className="carousel-info">
                <h4 className="carousel-card-titulo" title={libro.titulo}>
                  {libro.titulo}
                </h4>
                <p className="carousel-card-autor" title={libro.autor}>
                  {libro.autor}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="carousel-cargando">
          <p>No se encontraron libros para esta sección.</p>
        </div>
      )}
    </section>
  )
}

export default BookCarousel
