// ─────────────────────────────────────────────
//  PROVIDER DEL ESTADO COMPARTIDO
// ─────────────────────────────────────────────
// Práctica: "gestionar el estado compartido con Context API".
// Toda la lógica que antes vivía en App.jsx (búsqueda, fetch, carga y error)
// se mueve aquí para que cualquier componente pueda leerla con useLibros().
import { useEffect, useState } from 'react'
import { LibrosContext } from './librosContext'

// URL de la API pública (Open Library)
const API_BASE = 'https://openlibrary.org/search.json'

// Esta función toma un libro de la API y lo acomoda para usarlo en la tarjeta.
function formatearLibro(doc, index) {
    return {
        // id unico que viene de Open Library
        id: doc.key || `libro-${index}`,
        titulo: doc.title || 'Sin título',
        autor: doc.author_name ? doc.author_name[0] : 'Autor desconocido',
        anio: doc.first_publish_year || 'N/D',
        categoria: doc.subject ? doc.subject[0] : 'General',
        resumen: `Publicado en ${doc.first_publish_year || 'fecha desconocida'}. Ediciones disponibles: ${doc.edition_count || 1}.`,
        isbn: doc.isbn ? doc.isbn[0] : 'N/D',
        imagen: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : 'https://placehold.co/200x280?text=Sin+Portada',
        enlace: `https://openlibrary.org${doc.key}`,
    }
}

function LibrosProvider({ children }) {
    // ── Estado compartido ──────────────────────────────────────────────
    const [busqueda, setBusqueda] = useState('')       // término buscado
    const [datos, setDatos] = useState([])             // lista de libros
    const [cargando, setCargando] = useState(false)    // boolean
    const [error, setError] = useState(null)           // string | null
    // ──────────────────────────────────────────────────────────────────

    // El fetch se mantiene dentro de un useEffect y se repite cada vez
    // que cambia el término de búsqueda.
    useEffect(() => {
        const termino = busqueda.trim()
        const url = termino
            ? `${API_BASE}?q=${encodeURIComponent(termino)}&limit=12`
            : `${API_BASE}?q=programacion&limit=12`

        setCargando(true)
        setError(null)

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`)
                }
                return res.json()
            })
            .then((data) => {
                setDatos(data.docs.map(formatearLibro))
                setCargando(false)
            })
            .catch((err) => {
                console.error('Error en fetch:', err)
                setError('No se pudo conectar con Open Library. Verifica tu conexión e intenta de nuevo.')
                setCargando(false)
            })
    }, [busqueda])

    // Acciones que exponemos a los componentes.
    // Así Hero ya no recibe onBuscar por props.
    const buscar = (texto) => setBusqueda(texto)
    const reintentar = () => setBusqueda((prev) => prev + ' ')

    // Mensaje de resultados calculado una sola vez en el contexto.
    const termino = busqueda.trim()
    let mensaje = ''
    if (termino && !cargando) {
        mensaje = datos.length > 0
            ? `${datos.length} resultado(s) para "${termino}"`
            : `No se encontraron libros para "${termino}"`
    }

    // Valor que comparten todos los consumidores del contexto.
    const valorCompartido = {
        busqueda,
        datos,
        cargando,
        error,
        termino,
        mensaje,
        buscar,
        reintentar,
    }

    return (
        <LibrosContext.Provider value={valorCompartido}>
            {children}
        </LibrosContext.Provider>
    )
}

export default LibrosProvider
