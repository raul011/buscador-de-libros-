import { useContext, useState, useEffect, useCallback } from 'react'
import { ThemeContext } from '../context/themeContextInstance'

const CLAVE = 'buscador-libros:tema'

function leerTemaInicial() {
    try {
        const guardado = localStorage.getItem(CLAVE)
        if (guardado === 'infantil' || guardado === 'juvenil' || guardado === 'adultos') {
            return guardado
        }
        if (guardado === 'oscuro') return 'juvenil'
        if (guardado === 'claro') return 'infantil'
    } catch {
        // sin localStorage
    }

    return 'infantil'
}

/**
 * Hook para gestionar los 3 temas: 'infantil', 'juvenil' y 'adultos'.
 * Si existe un ThemeProvider en el árbol, utiliza su contexto;
 * de lo contrario maneja su propio estado local reactivo.
 */
export function useTema() {
    const context = useContext(ThemeContext)
    const [temaLocal, setTemaLocal] = useState(leerTemaInicial)

    const alternarTemaLocal = useCallback(() => {
        setTemaLocal((actual) => {
            if (actual === 'infantil') return 'juvenil'
            if (actual === 'juvenil') return 'adultos'
            return 'infantil'
        })
    }, [])

    const cambiarTemaLocal = useCallback((nuevoTema) => {
        if (nuevoTema === 'infantil' || nuevoTema === 'juvenil' || nuevoTema === 'adultos') {
            setTemaLocal(nuevoTema)
        }
    }, [])

    useEffect(() => {
        if (!context) {
            document.documentElement.dataset.tema = temaLocal
            if (document.body) {
                document.body.dataset.tema = temaLocal
            }
            try {
                localStorage.setItem(CLAVE, temaLocal)
            } catch {
                // sin persistencia
            }
        }
    }, [context, temaLocal])

    if (context) {
        return context
    }

    return {
        tema: temaLocal,
        alternarTema: alternarTemaLocal,
        cambiarTema: cambiarTemaLocal,
        setTema: setTemaLocal,
    }
}
