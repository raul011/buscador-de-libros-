import { useState } from 'react'

function Hero({ onBuscar, mensaje }) {
    const [texto, setTexto] = useState('')

    const manejarSubmit = (e) => {
        e.preventDefault()
        onBuscar(texto)
    }

    return (
        <section className="hero-section">
            <div className="contenido-banner">
                <h2>Encuentra el libro que mas te guste</h2>
                <p>Explora miles de títulos, autores y géneros en un solo lugar.</p>

                <form className="search-bar" onSubmit={manejarSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar por título, autor ..."
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>

                <p className="search-message">{mensaje}</p>
            </div>
        </section>
    )
}

export default Hero