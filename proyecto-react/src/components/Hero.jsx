function Hero({ texto, mensaje, onCambiarTexto, onBuscar }) {
    const manejarSubmit = (evento) => {
        evento.preventDefault()
        onBuscar()
    }

    return (
        <section className="hero-section" id="buscador">
            <div className="contenido-banner">
                <h2>Encuentra el libro que más te guste</h2>
                <p>Explora miles de títulos,autores y géneros en un solo lugar</p>

                <form className="search-bar" role="search" onSubmit={manejarSubmit}>
                    <input
                        type="text"
                        placeholder="Título,autor"
                        aria-label="Buscar libros por título o autor"
                        value={texto}
                        onChange={(evento) => onCambiarTexto(evento.target.value)}
                    />
                    <button type="submit" aria-label="Buscar">
                        <svg
                            className="icono-buscar"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </form>

                {mensaje && (
                    <p className="search-message" role="status" aria-live="polite">
                        {mensaje}
                    </p>
                )}
            </div>
        </section>
    )
}

export default Hero
