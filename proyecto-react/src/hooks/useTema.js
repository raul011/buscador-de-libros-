import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'buscador-libros:tema'

function leerTemaInicial() {
    try {
        const guardado = localStorage.getItem(CLAVE)
        if (guardado === 'claro' || guardado === 'oscuro') return guardado
    } catch {
        // sin localStorage usamos la preferencia del sistema
    }

    const prefiereOscuro = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    return prefiereOscuro ? 'oscuro' : 'claro'
}

export function useTema() {
    const [tema, setTema] = useState(leerTemaInicial)

    useEffect(() => {
        document.documentElement.dataset.tema = tema

        try {
            localStorage.setItem(CLAVE, tema)
        } catch {
            // sin persistencia, el tema funciona durante la sesión
        }
    }, [tema])

    const alternarTema = useCallback(() => {
        setTema((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'))
    }, [])

    return { tema, alternarTema }
}
