import { useCallback, useEffect, useState } from 'react'
import { FavoritosContext } from './FavoritosContext'

const CLAVE = 'buscador-libros:favoritos'

function leerFavoritos() {
    try {
        const guardado = localStorage.getItem(CLAVE)
        const datos = JSON.parse(guardado)
        return Array.isArray(datos) ? datos : []
    } catch {
        // si localStorage no está disponible, arrancamos sin favoritos
        return []
    }
}

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState(leerFavoritos)

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(favoritos))
        } catch {
            // si el navegador bloquea localStorage, los favoritos viven solo en memoria
        }
    }, [favoritos])

    const esFavorito = useCallback(
        (id) => favoritos.some((libro) => libro.id === id),
        [favoritos],
    )

    const alternarFavorito = useCallback((libro) => {
        if (!libro?.id) return

        setFavoritos((anteriores) => {
            const existe = anteriores.some((guardado) => guardado.id === libro.id)
            return existe
                ? anteriores.filter((guardado) => guardado.id !== libro.id)
                : [...anteriores, libro]
        })
    }, [])

    return (
        <FavoritosContext.Provider value={{ favoritos, esFavorito, alternarFavorito }}>
            {children}
        </FavoritosContext.Provider>
    )
}
