import { createContext, useContext } from 'react'

export const FavoritosContext = createContext(null)

export function useFavoritosContext() {
    const contexto = useContext(FavoritosContext)

    if (!contexto) {
        throw new Error('useFavoritosContext debe usarse dentro de FavoritosProvider')
    }

    return contexto
}
