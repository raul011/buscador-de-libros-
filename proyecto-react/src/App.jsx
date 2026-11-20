import { useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Filtros from './components/Filtros'
import BookCard from './components/BookCard'
import Paginacion from './components/Paginacion'
import DetalleLibro from './components/DetalleLibro'
import Favoritos from './components/Favoritos'
import Footer from './components/Footer'
import { useBuscador } from './hooks/useBuscador'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritosProvider } from './context/FavoritosContext'

function AppContenido() {
    const buscador = useBuscador()

    const [vista, setVista] = useState('buscar')
    const [seleccionado, setSeleccionado] = useState(null)

    const irAInicio = useCallback(() => {
        setSeleccionado(null)
        setVista('buscar')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const abrirFavoritos = useCallback(() => {
        setSeleccionado(null)
        setVista('favoritos')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const volverABuscar = useCallback(() => {
        setVista('buscar')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const hayFiltrosActivos =
        buscador.hayFiltros ||
        buscador.orden !== 'relevancia' ||
        Boolean(buscador.terminoAplicado)

    return (
        <>
            <Header
                onIrInicio={irAInicio}
                onVerFavoritos={abrirFavoritos}
            />

            <main>
                {vista === 'buscar' ? (
                    <>
                        <Hero
                            texto={buscador.texto}
                            mensaje={buscador.mensaje}
                            onCambiarTexto={buscador.cambiarTexto}
                            onBuscar={buscador.buscarAhora}
                        />

                        <section
                            className="books-section"
                            id="libros"
                            aria-labelledby="titulo-libros"
                        >
                            <h3 className="titulo-seccion" id="titulo-libros">
                                {buscador.terminoAplicado
                                    ? `Resultados para "${buscador.terminoAplicado}"`
                                    : 'Libros destacados'}
                            </h3>

                            <Filtros
                                key={`${buscador.criterios.categoria}|${buscador.criterios.idioma}|${buscador.criterios.anio}`}
                                categoria={buscador.criterios.categoria}
                                idioma={buscador.criterios.idioma}
                                anio={buscador.criterios.anio}
                                orden={buscador.orden}
                                onAplicar={buscador.aplicarFiltros}
                                onCambiarOrden={buscador.cambiarOrden}
                                onLimpiar={buscador.limpiar}
                                hayFiltros={hayFiltrosActivos}
                            />

                            {buscador.cargando && buscador.libros.length === 0 && (
                                <div className="estado-carga">
                                    <div className="spinner" aria-hidden="true"></div>
                                    <p>Cargando libros desde Open Library…</p>
                                </div>
                            )}

                            {buscador.error && (
                                <div className="estado-error" role="alert">
                                    <p className="error-titulo">Algo salió mal</p>
                                    <p className="error-detalle">{buscador.error}</p>
                                    <button
                                        type="button"
                                        className="boton-primario"
                                        onClick={buscador.reintentar}
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            )}

                            {buscador.libros.length > 0 && (
                                <>
                                    <div className="books-grid">
                                        {buscador.libros.map((libro) => (
                                            <BookCard
                                                key={libro.id}
                                                libro={libro}
                                                onVerDetalles={setSeleccionado}
                                            />
                                        ))}
                                    </div>

                                    {!buscador.error && (
                                        <Paginacion
                                            cargados={buscador.libros.length}
                                            total={buscador.total}
                                            hayMas={buscador.hayMas}
                                            cargando={buscador.cargandoMas}
                                            onCargarMas={buscador.cargarMas}
                                        />
                                    )}
                                </>
                            )}

                            {!buscador.cargando &&
                                !buscador.error &&
                                buscador.libros.length === 0 && (
                                    <div className="estado-vacio">
                                        <p>
                                            {buscador.terminoAplicado
                                                ? `No se encontraron libros para "${buscador.terminoAplicado}".`
                                                : 'No se encontraron libros.'}
                                        </p>
                                        <p>Intenta con otro título, autor o quitando filtros.</p>
                                        <button
                                            type="button"
                                            className="boton-primario"
                                            onClick={buscador.limpiar}
                                        >
                                            Limpiar búsqueda y filtros
                                        </button>
                                    </div>
                                )}
                        </section>
                    </>
                ) : (
                    <Favoritos
                        onVerDetalles={setSeleccionado}
                        onVolver={volverABuscar}
                    />
                )}
            </main>

            <Footer />

            {seleccionado && (
                <DetalleLibro
                    libro={seleccionado}
                    onCerrar={() => setSeleccionado(null)}
                />
            )}
        </>
    )
}

function App() {
    return (
        <ThemeProvider>
            <FavoritosProvider>
                <AppContenido />
            </FavoritosProvider>
        </ThemeProvider>
    )
}

export default App
