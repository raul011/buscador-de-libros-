import { useState, useEffect, useCallback } from 'react'
import { ThemeContext } from './themeContextInstance'

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
        // sin localStorage usamos el valor por defecto
    }

    return 'infantil'
}

export function ThemeProvider({ children }) {
    const [tema, setTema] = useState(leerTemaInicial)

    useEffect(() => {
        document.documentElement.dataset.tema = tema
        if (document.body) {
            document.body.dataset.tema = tema
        }

        try {
            localStorage.setItem(CLAVE, tema)
        } catch {
            // sin persistencia
        }
    }, [tema])

    const alternarTema = useCallback(() => {
        setTema((actual) => {
            if (actual === 'infantil') return 'juvenil'
            if (actual === 'juvenil') return 'adultos'
            return 'infantil'
        })
    }, [])

    const cambiarTema = useCallback((nuevoTema) => {
        if (nuevoTema === 'infantil' || nuevoTema === 'juvenil' || nuevoTema === 'adultos') {
            setTema(nuevoTema)
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ tema, alternarTema, cambiarTema, setTema }}>
            {children}
        </ThemeContext.Provider>
    )
}
