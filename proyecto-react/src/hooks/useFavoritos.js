import { useContext, useState, useEffect, useCallback } from 'react'
import { FavoritosContext } from '../context/favoritosContextInstance'

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

/**
 * Hook para gestionar los favoritos en cualquier componente.
 * Si se encuentra dentro de <FavoritosProvider>, consume el Context API compartido.
 * De lo contrario, mantiene su propio estado local reactivo como respaldo.
 */
export function useFavoritos() {
    const context = useContext(FavoritosContext)
    const [favoritosLocal, setFavoritosLocal] = useState(leerFavoritosInicial)

    useEffect(() => {
        if (!context) {
            try {
                localStorage.setItem(CLAVE, JSON.stringify(favoritosLocal))
            } catch {
                // sin persistencia
            }
        }
    }, [context, favoritosLocal])

    const esFavoritoLocal = useCallback(
        (id) => favoritosLocal.some((libro) => libro.id === id),
        [favoritosLocal],
    )

    const alternarFavoritoLocal = useCallback((libro) => {
        if (!libro?.id) return

        setFavoritosLocal((anteriores) => {
            const existe = anteriores.some((guardado) => guardado.id === libro.id)
            return existe
                ? anteriores.filter((guardado) => guardado.id !== libro.id)
                : [...anteriores, libro]
        })
    }, [])

    if (context) {
        return context
    }

    return {
        favoritos: favoritosLocal,
        cantidadFavoritos: favoritosLocal.length,
        esFavorito: esFavoritoLocal,
        alternarFavorito: alternarFavoritoLocal,
    }
}
