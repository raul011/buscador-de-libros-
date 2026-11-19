function Header({
    tema,
    cantidadFavoritos,
    onIrInicio,
    onVerFavoritos,
    onAlternarTema,
}) {
    return (
        <header className="main-header" id="inicio">
            <div className="logo">
                <h1>Buscador de libros</h1>
            </div>
            <nav className="main-nav" aria-label="Navegación principal">
                <ul>
                    <li>
                        <button type="button" className="nav-boton" onClick={onIrInicio}>
                            Inicio
                        </button>
                    </li>
                    <li>
                        <button type="button" className="nav-boton" onClick={onVerFavoritos}>
                            Favoritos ({cantidadFavoritos})
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="boton-tema"
                            onClick={onAlternarTema}
                            aria-label={
                                tema === 'oscuro' ? 'Activar modo claro' : 'Activar modo oscuro'
                            }
                        >
                            {tema === 'oscuro' ? 'Modo claro' : 'Modo oscuro'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
