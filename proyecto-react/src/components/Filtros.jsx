import { useState } from 'react'

const CATEGORIAS = [
    { valor: '', etiqueta: 'Todas' },
    { valor: 'fantasy', etiqueta: 'Fantasía' },
    { valor: 'science fiction', etiqueta: 'Ciencia ficción' },
    { valor: 'history', etiqueta: 'Historia' },
    { valor: 'biography', etiqueta: 'Biografía' },
    { valor: 'science', etiqueta: 'Ciencia' },
    { valor: 'romance', etiqueta: 'Romance' },
    { valor: 'mystery', etiqueta: 'Misterio' },
    { valor: 'poetry', etiqueta: 'Poesía' },
    { valor: 'art', etiqueta: 'Arte' },
    { valor: 'philosophy', etiqueta: 'Filosofía' },
]

const IDIOMAS = [
    { valor: '', etiqueta: 'Todos' },
    { valor: 'spa', etiqueta: 'Español' },
    { valor: 'eng', etiqueta: 'Inglés' },
    { valor: 'por', etiqueta: 'Portugués' },
    { valor: 'fra', etiqueta: 'Francés' },
    { valor: 'ita', etiqueta: 'Italiano' },
    { valor: 'deu', etiqueta: 'Alemán' },
]

const ORDENES = [
    { valor: 'relevancia', etiqueta: 'Relevancia' },
    { valor: 'anio-reciente', etiqueta: 'Año: más reciente' },
    { valor: 'anio-antiguo', etiqueta: 'Año: más antiguo' },
    { valor: 'titulo', etiqueta: 'Título A–Z' },
]

function Filtros({
    categoria,
    idioma,
    anio,
    orden,
    onAplicar,
    onCambiarOrden,
    onLimpiar,
    hayFiltros,
}) {
    const [borrador, setBorrador] = useState({ categoria, idioma, anio })

    const cambiar = (campo) => (evento) => {
        const valor = evento.target.value
        setBorrador((anterior) => ({ ...anterior, [campo]: valor }))
    }

    const manejarSubmit = (evento) => {
        evento.preventDefault()
        onAplicar(borrador)
    }

    return (
        <form className="filtros" onSubmit={manejarSubmit} aria-label="Filtros de búsqueda">
            <label className="filtro">
                <span>Categoría</span>
                <select value={borrador.categoria} onChange={cambiar('categoria')}>
                    {CATEGORIAS.map((opcion) => (
                        <option key={opcion.valor || 'todas'} value={opcion.valor}>
                            {opcion.etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <label className="filtro">
                <span>Idioma</span>
                <select value={borrador.idioma} onChange={cambiar('idioma')}>
                    {IDIOMAS.map((opcion) => (
                        <option key={opcion.valor || 'todos'} value={opcion.valor}>
                            {opcion.etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <label className="filtro">
                <span>Año</span>
                <input
                    type="number"
                    inputMode="numeric"
                    min="1000"
                    max="2100"
                    placeholder="Ej: 2008"
                    value={borrador.anio}
                    onChange={cambiar('anio')}
                />
            </label>

            <label className="filtro">
                <span>Ordenar por</span>
                <select value={orden} onChange={(evento) => onCambiarOrden(evento.target.value)}>
                    {ORDENES.map((opcion) => (
                        <option key={opcion.valor} value={opcion.valor}>
                            {opcion.etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <div className="filtros-acciones">
                <button type="submit" className="boton-primario">
                    Aplicar
                </button>
                <button
                    type="button"
                    className="boton-secundario"
                    onClick={onLimpiar}
                    disabled={!hayFiltros}
                >
                    Limpiar
                </button>
            </div>
        </form>
    )
}

export default Filtros
