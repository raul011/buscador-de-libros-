import { useTema } from '../hooks/useTema'
import { useFavoritos } from '../hooks/useFavoritos'

function Header({
    tema: propTema,
    cantidadFavoritos: propCantidad,
    onIrInicio,
    onVerFavoritos,
    onAlternarTema: propAlternar,
}) {
    // Leemos el tema y favoritos directamente desde Context API para eliminar el prop drilling
    const { tema: contextTema, alternarTema: contextAlternar } = useTema()
    const { cantidadFavoritos: contextCantidad } = useFavoritos()

    const tema = propTema !== undefined ? propTema : contextTema
    const onAlternarTema = propAlternar || contextAlternar
    const cantidadFavoritos = propCantidad !== undefined ? propCantidad : contextCantidad

    const nombreTema = () => {
        if (tema === 'juvenil') return 'Juvenil'
        if (tema === 'adultos') return 'Adultos'
        return 'Infantil'
    }

    const obtenerAriaLabel = () => {
        if (tema === 'infantil') return 'Cambiar a modo juvenil'
        if (tema === 'juvenil') return 'Cambiar a modo adultos'
        return 'Cambiar a modo infantil'
    }

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
                            aria-label={obtenerAriaLabel()}
                            title="Alternar entre temas: Infantil → Juvenil → Adultos"
                        >
                            <svg
                                className="icono-usuario"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>{nombreTema()}</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
