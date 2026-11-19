import { describe, expect, it } from 'vitest'
import { normalizarLibro, PORTADA_PLACEHOLDER } from './normalizar'

describe('normalizarLibro', () => {
    it('convierte un doc completo de Open Library', () => {
        const libro = normalizarLibro({
            key: '/works/OL1W',
            title: 'Clean Code',
            author_name: ['Robert C. Martin'],
            first_publish_year: 2008,
            subject: ['Software engineering'],
            edition_count: 10,
            isbn: ['9780132350884'],
            cover_i: 8091016,
        })

        expect(libro).toMatchObject({
            id: '/works/OL1W',
            titulo: 'Clean Code',
            autor: 'Robert C. Martin',
            anio: 2008,
            categoria: 'Software engineering',
            isbn: '9780132350884',
            enlace: 'https://openlibrary.org/works/OL1W',
        })
        expect(libro.imagen).toBe('https://covers.openlibrary.org/b/id/8091016-M.jpg')
    })

    it('usa valores por defecto cuando faltan campos', () => {
        const libro = normalizarLibro({})

        expect(libro.titulo).toBe('Sin título')
        expect(libro.autor).toBe('Autor desconocido')
        expect(libro.anio).toBe('N/D')
        expect(libro.categoria).toBe('General')
        expect(libro.isbn).toBe('N/D')
        expect(libro.imagen).toBe(PORTADA_PLACEHOLDER)
        expect(libro.enlace).toBe('')
        expect(libro.id).toBe('libro-0')
    })

    it('ignora portadas inválidas', () => {
        const libro = normalizarLibro({ title: 'Sin portada', cover_i: 'abc' })
        expect(libro.imagen).toBe(PORTADA_PLACEHOLDER)
    })
})
