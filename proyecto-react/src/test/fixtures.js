export function crearDoc(sobrescrituras = {}) {
    return {
        key: '/works/OL1W',
        title: 'Clean Code',
        author_name: ['Robert C. Martin'],
        first_publish_year: 2008,
        subject: ['Software engineering'],
        edition_count: 10,
        isbn: ['9780132350884'],
        cover_i: 8091016,
        ...sobrescrituras,
    }
}

export function crearDocs(cantidad = 2) {
    return Array.from({ length: cantidad }, (_, indice) =>
        crearDoc({
            key: `/works/OL${indice + 1}W`,
            title: `Libro ${indice + 1}`,
            author_name: [`Autor ${indice + 1}`],
            first_publish_year: 2000 + indice,
            isbn: [`978000000000${indice}`],
            cover_i: 100 + indice,
        }),
    )
}

export function respuestaOk(docs, numFound = docs.length) {
    return {
        ok: true,
        json: async () => ({ docs, numFound }),
    }
}

export function respuestaError(estado = 500) {
    return {
        ok: false,
        status: estado,
        json: async () => ({}),
    }
}
