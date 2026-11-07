import { useState } from 'react'
// Práctica: Hero consume el estado compartido del contexto en vez de
// recibir onBuscar y mensaje por props (se eliminó el prop drilling).
import { useLibros } from '../context/librosContext'

function Hero() {
    const [texto, setTexto] = useState('')
    const { buscar, mensaje } = useLibros()

    const manejarSubmit = (e) => {
        e.preventDefault()
        // La acción buscar vive en el contexto, no en las props.
        buscar(texto)
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

                {/* mensaje también viene del contexto. */}
                <p className="search-message">{mensaje}</p>
            </div>
        </section>
    )
}

export default Hero
