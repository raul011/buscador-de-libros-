import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { crearDoc, crearDocs, respuestaError, respuestaOk } from './test/fixtures'

let fetchMock

beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('App', () => {
    it('carga los libros destacados al iniciar', async () => {
        fetchMock.mockResolvedValue(respuestaOk(crearDocs(2)))

        render(<App />)

        expect(await screen.findByText('Libro 1')).toBeInTheDocument()
        expect(screen.getByText('Libro 2')).toBeInTheDocument()
        expect(fetchMock).toHaveBeenCalledWith(
            expect.stringContaining('q=programacion'),
            expect.anything(),
        )
    })

    it('busca con debounce y muestra los resultados', async () => {
        const usuario = userEvent.setup()
        fetchMock
            .mockResolvedValueOnce(respuestaOk(crearDocs(1)))
            .mockResolvedValue(respuestaOk([crearDoc({ title: 'Harry Potter' })]))

        render(<App />)
        await screen.findByText('Libro 1')

        await usuario.type(screen.getByLabelText(/Buscar libros/), 'harry')

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2), { timeout: 2000 })
        expect(fetchMock).toHaveBeenLastCalledWith(
            expect.stringContaining('q=harry'),
            expect.anything(),
        )
        expect(await screen.findByText('Harry Potter')).toBeInTheDocument()
    })

    it('muestra el error y permite reintentar', async () => {
        const usuario = userEvent.setup()
        fetchMock
            .mockResolvedValueOnce(respuestaError(500))
            .mockResolvedValue(respuestaOk(crearDocs(1)))

        render(<App />)

        expect(await screen.findByText(/No se pudo conectar con Open Library/)).toBeInTheDocument()

        await usuario.click(screen.getByRole('button', { name: 'Reintentar' }))

        expect(await screen.findByText('Libro 1')).toBeInTheDocument()
    })

    it('muestra el estado vacío cuando no hay resultados', async () => {
        fetchMock.mockResolvedValue(respuestaOk([], 0))

        render(<App />)

        expect(await screen.findByText('No se encontraron libros.')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Limpiar búsqueda y filtros' }),
        ).toBeInTheDocument()
    })

    it('agrega favoritos y los muestra en su vista', async () => {
        const usuario = userEvent.setup()
        fetchMock.mockResolvedValue(respuestaOk(crearDocs(1)))

        render(<App />)
        await screen.findByText('Libro 1')

        await usuario.click(
            screen.getByRole('button', { name: 'Agregar Libro 1 a favoritos' }),
        )

        expect(screen.getByRole('button', { name: 'Favoritos (1)' })).toBeInTheDocument()
        expect(
            JSON.parse(localStorage.getItem('buscador-libros:favoritos')),
        ).toHaveLength(1)

        await usuario.click(screen.getByRole('button', { name: 'Favoritos (1)' }))

        expect(
            await screen.findByRole('heading', { name: 'Mis favoritos (1)' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Libro 1')).toBeInTheDocument()
    })

    it('abre el detalle y lo cierra con Escape', async () => {
        const usuario = userEvent.setup()
        fetchMock.mockResolvedValue(respuestaOk(crearDocs(1)))

        render(<App />)
        await screen.findByText('Libro 1')

        await usuario.click(screen.getByRole('button', { name: 'Detalles' }))

        const dialogo = screen.getByRole('dialog')
        expect(within(dialogo).getByRole('heading', { name: 'Libro 1' })).toBeInTheDocument()
        expect(
            within(dialogo).getByRole('link', { name: 'Ver en Open Library' }),
        ).toBeInTheDocument()

        await usuario.keyboard('{Escape}')

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('cambia entre los temas infantil, juvenil y adultos y lo persiste', async () => {
        const usuario = userEvent.setup()
        fetchMock.mockResolvedValue(respuestaOk(crearDocs(1)))

        render(<App />)
        await screen.findByText('Libro 1')

        // Estado inicial: infantil
        expect(document.documentElement).toHaveAttribute('data-tema', 'infantil')

        // 1er clic: cambia a modo juvenil
        await usuario.click(screen.getByRole('button', { name: 'Cambiar a modo juvenil' }))
        expect(document.documentElement).toHaveAttribute('data-tema', 'juvenil')
        expect(localStorage.getItem('buscador-libros:tema')).toBe('juvenil')
        expect(screen.getByRole('button', { name: 'Cambiar a modo adultos' })).toBeInTheDocument()

        // 2do clic: cambia a modo adultos
        await usuario.click(screen.getByRole('button', { name: 'Cambiar a modo adultos' }))
        expect(document.documentElement).toHaveAttribute('data-tema', 'adultos')
        expect(localStorage.getItem('buscador-libros:tema')).toBe('adultos')
        expect(screen.getByRole('button', { name: 'Cambiar a modo infantil' })).toBeInTheDocument()

        // 3er clic: vuelve a modo infantil
        await usuario.click(screen.getByRole('button', { name: 'Cambiar a modo infantil' }))
        expect(document.documentElement).toHaveAttribute('data-tema', 'infantil')
        expect(localStorage.getItem('buscador-libros:tema')).toBe('infantil')
    })

    it('carga más resultados sin borrar los anteriores', async () => {
        const usuario = userEvent.setup()
        fetchMock
            .mockResolvedValueOnce(respuestaOk(crearDocs(2), 4))
            .mockResolvedValueOnce(
                respuestaOk(
                    [
                        crearDoc({
                            key: '/works/OL9W',
                            title: 'Libro 3',
                            author_name: ['Autor 3'],
                        }),
                    ],
                    4,
                ),
            )

        render(<App />)
        await screen.findByText('Libro 1')

        await usuario.click(screen.getByRole('button', { name: 'Cargar más' }))

        expect(await screen.findByText('Libro 3')).toBeInTheDocument()
        expect(screen.getByText('Libro 1')).toBeInTheDocument()
        expect(fetchMock).toHaveBeenLastCalledWith(
            expect.stringContaining('offset=12'),
            expect.anything(),
        )
    })

    it('conserva los resultados si falla al cargar más', async () => {
        const usuario = userEvent.setup()
        fetchMock
            .mockResolvedValueOnce(respuestaOk(crearDocs(2), 4))
            .mockResolvedValueOnce(respuestaError(500))

        render(<App />)
        await screen.findByText('Libro 1')

        await usuario.click(screen.getByRole('button', { name: 'Cargar más' }))

        expect(await screen.findByText(/No se pudo conectar con Open Library/)).toBeInTheDocument()
        expect(screen.getByText('Libro 1')).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Cargar más' })).not.toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()
    })

    it('ordena los resultados por año', async () => {
        const usuario = userEvent.setup()
        fetchMock.mockResolvedValue(
            respuestaOk([
                crearDoc({ key: '/works/A', title: 'Viejo', first_publish_year: 1950 }),
                crearDoc({ key: '/works/B', title: 'Nuevo', first_publish_year: 2020 }),
            ]),
        )

        render(<App />)
        await screen.findByText('Viejo')

        await usuario.selectOptions(screen.getByLabelText('Ordenar por'), 'anio-reciente')

        const titulos = screen
            .getAllByRole('heading', { level: 4 })
            .map((titulo) => titulo.textContent)

        expect(titulos).toEqual(['Nuevo', 'Viejo'])
    })
})
