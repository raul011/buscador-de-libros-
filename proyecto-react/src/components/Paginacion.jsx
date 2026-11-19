function Paginacion({ cargados, total, hayMas, cargando, onCargarMas }) {
    if (!hayMas) return null

    return (
        <div className="paginacion">
            <p>
                Mostrando {cargados} de {total} resultados
            </p>
            <button
                type="button"
                className="boton-primario"
                onClick={onCargarMas}
                disabled={cargando}
            >
                {cargando ? 'Cargando…' : 'Cargar más'}
            </button>
        </div>
    )
}

export default Paginacion
