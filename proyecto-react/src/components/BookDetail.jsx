import { useState, useEffect } from 'react'

function BookDetail({ libro, onVolver }) {
  const [descripcionApi, setDescripcionApi] = useState(null)
  const [cargandoDetalle, setCargandoDetalle] = useState(false)

  // Si el libro proviene de Open Library y tiene una key de obra (/works/...),
  // intentamos consultar la sinopsis completa
  useEffect(() => {
    if (!libro.id || !String(libro.id).startsWith('/works/')) return

    let cancelado = false
    setCargandoDetalle(true)

    fetch(`https://openlibrary.org${libro.id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener el detalle')
        return res.json()
      })
      .then((data) => {
        if (cancelado) return

        if (data.description) {
          const textoDesc =
            typeof data.description === 'string'
              ? data.description
              : data.description.value || null
          setDescripcionApi(textoDesc)
        }
      })
      .catch(() => {
        // Si falla o no tiene descripción, mantenemos el resumen inicial
      })
      .finally(() => {
        if (!cancelado) {
          setCargandoDetalle(false)
        }
      })

    return () => {
      cancelado = true
    }
  }, [libro.id])

  // Si la API devolvió sinopsis completa la usamos; sino, mostramos el resumen inicial
  const descripcion = descripcionApi || libro.resumen

  return (
    <section className="detalle-seccion">
      {/* Barra de navegación superior de la vista de detalle */}
      <div className="detalle-nav">
        <button type="button" className="btn-volver" onClick={onVolver}>
          <span className="flecha">←</span> Volver al catálogo
        </button>

        <div className="detalle-breadcrumb">
          <span>Inicio</span> &gt; <span>Libros</span> &gt;{' '}
          <strong>{libro.titulo}</strong>
        </div>
      </div>

      {/* Contenedor principal del detalle */}
      <div className="detalle-card">
        {/* Columna Izquierda: Portada y Enlace externo */}
        <div className="detalle-col-izquierda">
          <div className="detalle-portada-wrap">
            <img
              src={libro.imagenGrande || libro.imagen}
              alt={`Portada de ${libro.titulo}`}
              className="detalle-portada"
              onError={(e) => {
                // Fallback por si la imagen grande falla al cargar
                e.currentTarget.src =
                  libro.imagen || 'https://placehold.co/350x500?text=Sin+Portada'
              }}
            />
          </div>

          <button type="button" className="btn-leer">
            Empezar a Leer
          </button>
        </div>

        {/* Columna Derecha: Información completa */}
        <div className="detalle-col-derecha">
          <div className="detalle-badges">
            <span className="categoria-badge">{libro.categoria}</span>
            <span className="anio-badge">Año {libro.anio}</span>
            {libro.isbn && libro.isbn !== 'N/D' && (
              <span className="isbn-badge">ISBN: {libro.isbn}</span>
            )}
          </div>

          <h2 className="detalle-titulo">{libro.titulo}</h2>
          <p className="detalle-autor">
            Por <span>{libro.autor}</span>
          </p>

          {libro.primeraFrase && (
            <blockquote className="detalle-cita">
              "{libro.primeraFrase}"
            </blockquote>
          )}

          <div className="detalle-bloque">
            <h3>Sinopsis / Resumen</h3>
            {cargandoDetalle ? (
              <p className="texto-cargando">Cargando sinopsis extendida...</p>
            ) : (
              <p className="detalle-descripcion">{descripcion}</p>
            )}
          </div>

          {libro.categorias && libro.categorias.length > 0 && (
            <div className="detalle-bloque">
              <h3>Temas relacionados</h3>
              <div className="detalle-tags">
                {libro.categorias.map((cat, idx) => (
                  <span key={idx} className="tag-tema">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookDetail
