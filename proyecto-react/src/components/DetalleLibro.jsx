import { useEffect, useRef, useState } from 'react'
import { PORTADA_PLACEHOLDER } from '../api/normalizar'

function DetalleLibro({ libro, esFavorito, onCerrar, onAlternarFavorito }) {
    const cerrarRef = useRef(null)
    const [descripcionApi, setDescripcionApi] = useState(null)
    const [cargandoDesc, setCargandoDesc] = useState(false)

    // Consultamos la descripción completa de la obra desde la API de Open Library
    useEffect(() => {
        if (!libro?.id || !String(libro.id).startsWith('/works/')) return

        let cancelado = false

        fetch(`https://openlibrary.org${libro.id}.json`)
            .then((res) => {
                if (!res.ok) throw new Error('HTTP ' + res.status)
                return res.json()
            })
            .then((data) => {
                if (cancelado || !data) return
                let texto = null
                if (typeof data.description === 'string') {
                    texto = data.description
                } else if (data.description && typeof data.description.value === 'string') {
                    texto = data.description.value
                }
                if (texto) {
                    setDescripcionApi(texto)
                }
            })
            .catch(() => {
                // Si la obra no tiene descripción extendida o falla la red,
                // se utiliza la descripción o resumen inicial del libro
            })
            .finally(() => {
                if (!cancelado) {
                    setCargandoDesc(false)
                }
            })

        return () => {
            cancelado = true
        }
    }, [libro?.id])

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

    const textoDescripcion = descripcionApi || libro.descripcion || libro.resumen

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
                    ✕
                </button>

                <div className="modal-portada-wrap">
                    <img
                        className="modal-portada"
                        src={libro.imagen}
                        alt={`Portada de ${libro.titulo}`}
                        onError={alFallarImagen}
                    />
                </div>

                <div className="modal-contenido">
                    <h3 id="detalle-titulo" className="modal-titulo">
                        {libro.titulo}
                    </h3>
                    <p className="modal-autor">{libro.autor}</p>

                    <div className="modal-datos-grid">
                        <div className="modal-dato-item">
                            <span className="modal-dato-label">AÑO</span>
                            <span className="modal-dato-valor">{libro.anio}</span>
                        </div>
                        <div className="modal-dato-item">
                            <span className="modal-dato-label">ISBN</span>
                            <span className="modal-dato-valor">{libro.isbn}</span>
                        </div>
                    </div>

                    <div className="modal-descripcion-caja">
                        <p className="modal-descripcion-texto">
                            {textoDescripcion}
                        </p>
                        {cargandoDesc && (
                            <span className="cargando-desc-aviso">
                                Consultando sinopsis detallada…
                            </span>
                        )}
                    </div>

                    <div className="modal-acciones">
                        <button
                            type="button"
                            className="boton-modal-favorito boton-favorito"
                            aria-pressed={esFavorito}
                            onClick={() => onAlternarFavorito(libro)}
                        >
                            {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        </button>

                        {libro.enlace && (
                            <a
                                className="boton-modal-enlace boton-enlace"
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
