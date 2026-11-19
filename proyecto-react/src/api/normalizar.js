export const PORTADA_PLACEHOLDER = 'https://placehold.co/200x280?text=Sin+Portada'

function esNumero(valor) {
    return typeof valor === 'number' && Number.isFinite(valor)
}

function esTexto(valor) {
    return typeof valor === 'string' && valor.trim() !== ''
}

export function normalizarLibro(doc = {}, indice = 0) {
    const clave = esTexto(doc.key) ? doc.key : `libro-${indice}`
    const anio = esNumero(doc.first_publish_year) ? doc.first_publish_year : 'N/D'
    const ediciones = esNumero(doc.edition_count) ? doc.edition_count : 1

    const autor =
        Array.isArray(doc.author_name) && esTexto(doc.author_name[0])
            ? doc.author_name[0]
            : 'Autor desconocido'

    const categoria =
        Array.isArray(doc.subject) && esTexto(doc.subject[0]) ? doc.subject[0] : 'General'

    const isbn = Array.isArray(doc.isbn) && esTexto(doc.isbn[0]) ? doc.isbn[0] : 'N/D'

    let descripcion = ''
    if (esTexto(doc.description)) {
        descripcion = doc.description
    } else if (doc.description && esTexto(doc.description.value)) {
        descripcion = doc.description.value
    } else if (Array.isArray(doc.first_sentence) && esTexto(doc.first_sentence[0])) {
        descripcion = doc.first_sentence[0]
    } else if (esTexto(doc.first_sentence)) {
        descripcion = doc.first_sentence
    }

    const resumen = esNumero(doc.first_publish_year)
        ? `Publicado en ${doc.first_publish_year}. Ediciones disponibles: ${ediciones}.`
        : `Ediciones disponibles: ${ediciones}.`

    return {
        id: clave,
        titulo: esTexto(doc.title) ? doc.title : 'Sin título',
        autor,
        anio,
        categoria,
        resumen,
        descripcion: descripcion || resumen,
        isbn,
        imagen: esNumero(doc.cover_i)
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : PORTADA_PLACEHOLDER,
        enlace: clave.startsWith('/works/') ? `https://openlibrary.org${clave}` : '',
    }
}
