import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buscarLibros, RESULTADOS_POR_PAGINA } from '../api/openLibrary'

const CRITERIOS_INICIALES = {
    termino: '',
    categoria: '',
    idioma: '',
    anio: '',
}

const ESPERA_DEBOUNCE = 350

function compararLibros(a, b, orden) {
    const anioDe = (libro) => (typeof libro.anio === 'number' ? libro.anio : 0)

    switch (orden) {
        case 'anio-reciente':
            return anioDe(b) - anioDe(a)
        case 'anio-antiguo':
            return anioDe(a) - anioDe(b)
        case 'titulo':
            return String(a.titulo).localeCompare(String(b.titulo), 'es')
        default:
            return 0
    }
}

export function useBuscador() {
    const [consulta, setConsulta] = useState({ ...CRITERIOS_INICIALES, offset: 0 })
    const [libros, setLibros] = useState([])
    const [total, setTotal] = useState(0)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [texto, setTexto] = useState('')
    const [orden, setOrden] = useState('relevancia')

    const consultaRef = useRef(consulta)

    useEffect(() => {
        consultaRef.current = consulta
    }, [consulta])

    const debounceRef = useRef(null)
    const peticionRef = useRef(0)

    useEffect(() => {
        const controlador = new AbortController()
        peticionRef.current += 1
        const idPeticion = peticionRef.current
        let activa = true

        buscarLibros({ ...consulta, signal: controlador.signal })
            .then(({ libros: nuevos, total: totalApi }) => {
                if (!activa || idPeticion !== peticionRef.current) return

                setLibros((anteriores) =>
                    consulta.offset === 0 ? nuevos : [...anteriores, ...nuevos],
                )
                setTotal(totalApi)
                setError(null)
            })
            .catch((fallo) => {
                if (!activa || idPeticion !== peticionRef.current) return
                if (fallo?.name === 'AbortError') return

                console.error('Error al buscar libros:', fallo)
                setError(
                    'No se pudo conectar con Open Library. Verifica tu conexión e intenta de nuevo.',
                )
            })
            .finally(() => {
                if (!activa || idPeticion !== peticionRef.current) return
                setCargando(false)
            })

        return () => {
            activa = false
            controlador.abort()
        }
    }, [consulta])

    useEffect(() => () => clearTimeout(debounceRef.current), [])

    const iniciarConsulta = useCallback((cambios) => {
        const anterior = consultaRef.current
        const siguiente = { ...anterior, ...cambios, offset: 0 }

        const sinCambios =
            siguiente.termino === anterior.termino &&
            siguiente.categoria === anterior.categoria &&
            siguiente.idioma === anterior.idioma &&
            siguiente.anio === anterior.anio &&
            anterior.offset === 0

        if (sinCambios) return

        setCargando(true)
        setError(null)
        setLibros([])
        setConsulta(siguiente)
    }, [])

    const cambiarTexto = useCallback(
        (valor) => {
            setTexto(valor)
            clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(() => {
                iniciarConsulta({ termino: valor.trim() })
            }, ESPERA_DEBOUNCE)
        },
        [iniciarConsulta],
    )

    const buscarAhora = useCallback(() => {
        clearTimeout(debounceRef.current)
        iniciarConsulta({ termino: texto.trim() })
    }, [iniciarConsulta, texto])

    const aplicarFiltros = useCallback(
        (filtros) => {
            clearTimeout(debounceRef.current)
            const anio = String(filtros.anio ?? '').trim()

            iniciarConsulta({
                categoria: String(filtros.categoria ?? '').trim(),
                idioma: String(filtros.idioma ?? '').trim(),
                anio: /^\d{4}$/.test(anio) ? anio : '',
            })
        },
        [iniciarConsulta],
    )

    const limpiar = useCallback(() => {
        clearTimeout(debounceRef.current)
        setTexto('')
        setOrden('relevancia')
        iniciarConsulta({ ...CRITERIOS_INICIALES })
    }, [iniciarConsulta])

    const reintentar = useCallback(() => {
        setCargando(true)
        setError(null)
        setConsulta((anterior) => ({ ...anterior }))
    }, [])

    const cargarMas = useCallback(() => {
        if (cargando) return

        setCargando(true)
        setError(null)
        setConsulta((anterior) => ({
            ...anterior,
            offset: anterior.offset + RESULTADOS_POR_PAGINA,
        }))
    }, [cargando])

    const librosOrdenados = useMemo(() => {
        if (orden === 'relevancia') return libros
        return [...libros].sort((a, b) => compararLibros(a, b, orden))
    }, [libros, orden])

    const mensaje = useMemo(() => {
        if (cargando && libros.length === 0) return 'Buscando libros…'
        if (error && libros.length === 0) return 'No se pudieron cargar los libros.'
        if (consulta.termino) {
            return total > 0
                ? `${total} resultado(s) para "${consulta.termino}"`
                : `No se encontraron libros para "${consulta.termino}"`
        }
        return ''
    }, [cargando, libros.length, error, consulta.termino, total])

    return {
        texto,
        mensaje,
        terminoAplicado: consulta.termino,
        criterios: {
            categoria: consulta.categoria,
            idioma: consulta.idioma,
            anio: consulta.anio,
        },
        orden,
        libros: librosOrdenados,
        total,
        cargando,
        cargandoMas: cargando && libros.length > 0,
        error,
        hayMas: libros.length > 0 && libros.length < total,
        hayFiltros: Boolean(consulta.categoria || consulta.idioma || consulta.anio),
        cambiarTexto,
        buscarAhora,
        aplicarFiltros,
        cambiarOrden: setOrden,
        limpiar,
        reintentar,
        cargarMas,
    }
}
