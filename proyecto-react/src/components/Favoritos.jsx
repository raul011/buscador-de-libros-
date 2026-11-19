import BookCard from './BookCard'

function Favoritos({ favoritos, esFavorito, onVerDetalles, onAlternarFavorito, onVolver }) {
    return (
        <section className="books-section" aria-labelledby="titulo-favoritos">
            <h3 className="titulo-seccion" id="titulo-favoritos">
                Mis favoritos ({favoritos.length})
            </h3>

            {favoritos.length === 0 ? (
                <div className="estado-vacio">
                    <p>Todavía no guardaste ningún libro.</p>
                    <button type="button" className="boton-primario" onClick={onVolver}>
                        Volver a buscar
                    </button>
                </div>
            ) : (
                <div className="books-grid">
                    {favoritos.map((libro) => (
                        <BookCard
                            key={libro.id}
                            libro={libro}
                            esFavorito={esFavorito(libro.id)}
                            onVerDetalles={onVerDetalles}
                            onAlternarFavorito={onAlternarFavorito}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Favoritos
