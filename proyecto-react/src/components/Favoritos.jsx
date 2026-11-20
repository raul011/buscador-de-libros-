import { useFavoritos } from '../hooks/useFavoritos'
import BookCard from './BookCard'

function Favoritos({ favoritos: propFavoritos, onVerDetalles, onVolver }) {
    // Leemos la lista de favoritos directamente del Context API
    const { favoritos: contextFavoritos } = useFavoritos()
    const favoritos = propFavoritos || contextFavoritos

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
                            onVerDetalles={onVerDetalles}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Favoritos
