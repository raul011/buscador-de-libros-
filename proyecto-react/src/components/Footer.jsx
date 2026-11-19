const ANIO_ACTUAL = new Date().getFullYear()

function Footer() {
    return (
        <footer className="main-footer">
            <p>Proyecto de Programación Web 1 — Buscador de libros</p>
            <div className="footer-links">
                <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">
                    Datos de Open Library
                </a>
                <span>© {ANIO_ACTUAL}</span>
            </div>
        </footer>
    )
}

export default Footer
