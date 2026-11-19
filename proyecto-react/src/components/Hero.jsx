function Hero({ texto, mensaje, onCambiarTexto, onBuscar }) {
    const manejarSubmit = (evento) => {
        evento.preventDefault()
        onBuscar()
    }

    return (
        <section className="hero-section" id="buscador">
            <div className="contenido-banner">
                <h2>Encuentra el libro que más te guste</h2>
                <p>Explora miles de títulos, autores y géneros en un solo lugar.</p>

                <form className="search-bar" role="search" onSubmit={manejarSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar por título o autor…"
                        aria-label="Buscar libros por título o autor"
                        value={texto}
                        onChange={(evento) => onCambiarTexto(evento.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>

                <p className="search-message" role="status" aria-live="polite">
                    {mensaje}
                </p>
            </div>
        </section>
    )
}

export default Hero
