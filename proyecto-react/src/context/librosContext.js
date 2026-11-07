// ─────────────────────────────────────────────
//  CONTEXTO COMPARTIDO DE LIBROS
// ─────────────────────────────────────────────
// Práctica: "dar estructura al estado compartido".
// Aquí se define el contexto que comparten los componentes que necesitan
// la búsqueda y los libros (Hero, App, BookCard, etc.).
import { createContext, useContext } from 'react'

// El contexto arranca en null para poder detectar si alguien usa el hook
// fuera del provider.
export const LibrosContext = createContext(null)

// Hook personalizado para leer el estado compartido sin pasar props.
// Ejemplo: const { datos, buscar } = useLibros()
export function useLibros() {
    const contexto = useContext(LibrosContext)
    if (!contexto) {
        throw new Error('useLibros debe usarse dentro de <LibrosProvider>')
    }
    return contexto
}
