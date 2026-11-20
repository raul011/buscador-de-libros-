import { useEffect, useRef } from 'react'
import { PORTADA_PLACEHOLDER } from '../api/normalizar'
import { useFavoritosContext } from '../context/FavoritosContext'

function DetalleLibro({ libro, onCerrar }) {
    const { esFavorito, alternarFavorito } = useFavoritosContext()
    const esFavoritoActual = esFavorito(libro.id)
    const cerrarRef = useRef(null)

    useEffect(() => {
        const previamenteEnfocado = document.activeElement
        cerrarRef.current?.focus()

        const alPresionarTecla = (evento) => {
            if (evento.key === 'Escape') onCerrar()
        }

        document.addEventListener('keydown', alPresionarTecla)

        return () => {
            document.removeEventListener('keydown', alPresionarTecla)
            if (previamenteEnfocado instanceof HTMLElement) {
                previamenteEnfocado.focus()
            }
        }
    }, [onCerrar])

    const alFallarImagen = (evento) => {
        if (evento.currentTarget.src !== PORTADA_PLACEHOLDER) {
            evento.currentTarget.src = PORTADA_PLACEHOLDER
        }
    }

    return (
        <div className="modal-fondo" role="presentation" onClick={onCerrar}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="detalle-titulo"
                onClick={(evento) => evento.stopPropagation()}
            >
                <button
                    ref={cerrarRef}
                    type="button"
                    className="modal-cerrar"
                    onClick={onCerrar}
                    aria-label="Cerrar detalle"
                >
                    ×
                </button>

                <img
                    className="modal-portada"
                    src={libro.imagen}
                    alt={`Portada de ${libro.titulo}`}
                    onError={alFallarImagen}
                />

                <div className="modal-contenido">
                    <span className="categoria">{libro.categoria}</span>
                    <h3 id="detalle-titulo">{libro.titulo}</h3>
                    <p className="nombre-autor">{libro.autor}</p>

                    <dl className="modal-datos">
                        <div>
                            <dt>Año</dt>
                            <dd>{libro.anio}</dd>
                        </div>
                        <div>
                            <dt>ISBN</dt>
                            <dd>{libro.isbn}</dd>
                        </div>
                    </dl>

                    <p className="resumen">{libro.resumen}</p>

                    <div className="modal-acciones">
                        <button
                            type="button"
                            className="boton-favorito"
                            aria-pressed={esFavoritoActual}
                            onClick={() => alternarFavorito(libro)}
                        >
                            {esFavoritoActual ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        </button>

                        {libro.enlace && (
                            <a
                                className="boton-enlace"
                                href={libro.enlace}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver en Open Library
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleLibro
