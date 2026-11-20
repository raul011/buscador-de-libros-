import { PORTADA_PLACEHOLDER } from '../api/normalizar'
import { useFavoritos } from '../hooks/useFavoritos'

function BookCard({ libro, esFavorito: propEsFavorito, onVerDetalles, onAlternarFavorito: propAlternar }) {
    // Leemos el estado de favoritos directamente del Context para eliminar prop drilling
    const { esFavorito: contextEsFavorito, alternarFavorito: contextAlternar } = useFavoritos()

    const esFavorito = propEsFavorito !== undefined ? propEsFavorito : contextEsFavorito(libro.id)
    const onAlternarFavorito = propAlternar || contextAlternar
    const { imagen, titulo, autor } = libro

    const alFallarImagen = (evento) => {
        if (evento.currentTarget.src !== PORTADA_PLACEHOLDER) {
            evento.currentTarget.src = PORTADA_PLACEHOLDER
        }
    }

    return (
        <article className="book-card">
            <div className="card-portada-contenedor">
                <img
                    src={imagen}
                    alt={`Portada de ${titulo}`}
                    loading="lazy"
                    onError={alFallarImagen}
                />
            </div>

            <div className="book-info">
                <h4 title={titulo}>{titulo}</h4>
                <p className="nombre-autor">{autor}</p>

                <div className="book-footer">
                    <div className="acciones-tarjeta">
                        <button
                            type="button"
                            className="boton-detalles"
                            onClick={() => onVerDetalles(libro)}
                        >
                            Detalles
                        </button>
                        <button
                            type="button"
                            className="boton-corazon"
                            aria-pressed={esFavorito}
                            aria-label={
                                esFavorito
                                    ? `Quitar ${titulo} de favoritos`
                                    : `Agregar ${titulo} a favoritos`
                            }
                            onClick={() => onAlternarFavorito(libro)}
                        >
                            <svg
                                className="icono-corazon"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill={esFavorito ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BookCard
