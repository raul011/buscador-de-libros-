import { normalizarLibro } from './normalizar'

export const RESULTADOS_POR_PAGINA = 12

const API_BASE = 'https://openlibrary.org/search.json'
const TERMINO_POR_DEFECTO = 'programacion'

function limpiar(valor) {
    return typeof valor === 'string' ? valor.trim() : ''
}

export async function buscarLibros({
    termino = '',
    categoria = '',
    idioma = '',
    anio = '',
    offset = 0,
    signal,
} = {}) {
    const consulta = limpiar(termino) || TERMINO_POR_DEFECTO

    const parametros = new URLSearchParams({
        q: consulta,
        limit: String(RESULTADOS_POR_PAGINA),
        offset: String(Math.max(0, Number(offset) || 0)),
    })

    const subject = limpiar(categoria)
    const lang = limpiar(idioma)
    const anioFiltro = limpiar(anio)

    if (subject) parametros.set('subject', subject)
    if (lang) parametros.set('lang', lang)
    if (/^\d{4}$/.test(anioFiltro)) parametros.set('first_publish_year', anioFiltro)

    const respuesta = await fetch(`${API_BASE}?${parametros.toString()}`, { signal })

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`)
    }

    const datos = await respuesta.json()
    const docs = Array.isArray(datos.docs) ? datos.docs : []

    return {
        libros: docs.map((doc, indice) => normalizarLibro(doc, indice)),
        total: Number.isFinite(datos.numFound) ? datos.numFound : docs.length,
    }
}
