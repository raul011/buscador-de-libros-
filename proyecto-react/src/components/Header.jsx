function Header() {
    return (
        <header className="main-header">
            <div className="logo">
                <h1>Buscador de libros</h1>
            </div>
            <nav className="main-nav">
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Categorías</a></li>
                    <li><a href="#">Novedades</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header