import { useCallback, useEffect, useState } from 'react'
import { FavoritosContext } from './favoritosContextInstance'

const CLAVE = 'buscador-libros:favoritos'

function leerFavoritosInicial() {
    try {
        const guardado = localStorage.getItem(CLAVE)
        const datos = JSON.parse(guardado)
        return Array.isArray(datos) ? datos : []
    } catch {
        return []
    }
}

export function FavoritosProvider({ children }) {
    const [favoritos, setFavoritos] = useState(leerFavoritosInicial)

    useEffect(() => {
        try {
            localStorage.setItem(CLAVE, JSON.stringify(favoritos))
        } catch {
            // si el almacenamiento está restringido, se mantiene en memoria
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
        <FavoritosContext.Provider
            value={{
                favoritos,
                cantidadFavoritos: favoritos.length,
                esFavorito,
                alternarFavorito,
            }}
        >
            {children}
        </FavoritosContext.Provider>
    )
}
