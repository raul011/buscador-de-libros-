import { PORTADA_PLACEHOLDER } from '../api/normalizar'

function BookCard({ libro, esFavorito, onVerDetalles, onAlternarFavorito }) {
    const { imagen, categoria, anio, titulo, autor, resumen, isbn } = libro

    const alFallarImagen = (evento) => {
        if (evento.currentTarget.src !== PORTADA_PLACEHOLDER) {
            evento.currentTarget.src = PORTADA_PLACEHOLDER
        }
    }

    return (
        <article className="book-card">
            <img
                src={imagen}
                alt={`Portada de ${titulo}`}
                loading="lazy"
                onError={alFallarImagen}
            />
            <div className="book-info">
                <div className="datos-extra">
                    <span className="categoria">{categoria}</span>
                    <span className="anio-pub">{anio}</span>
                </div>

                <h4 title={titulo}>{titulo}</h4>
                <p className="nombre-autor">{autor}</p>
                <p className="resumen">{resumen}</p>

                <div className="book-footer">
                    <span className="codigo-isbn">ISBN: {isbn}</span>
                    <div className="acciones-tarjeta">
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
                            {esFavorito ? '♥' : '♡'}
                        </button>
                        <button
                            type="button"
                            className="boton-detalles"
                            onClick={() => onVerDetalles(libro)}
                        >
                            Detalles
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BookCard
