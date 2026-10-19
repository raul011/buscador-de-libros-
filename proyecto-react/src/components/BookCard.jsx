function BookCard({ libro }) {
    const { imagen, categoria, anio, titulo, autor, resumen, isbn } = libro

    return (
        <article className="book-card">
            <img src={imagen} alt={`Portada de ${titulo}`} />
            <div className="book-info">
                <div className="datos-extra">
                    <span className="categoria">{categoria}</span>
                    <span className="anio-pub">{anio}</span>
                </div>
                <h4 title={titulo}>{titulo}</h4>
                <p className="nombre-autor">{autor}</p>
                <p className="resumen">{resumen}</p>

                <div className="book-footer">
                    <span className="codigo-isbn">ISBN: {isbn}</span>
                    <a href="#" className="boton-detalles">Detalles</a>
                </div>
            </div>
        </article>
    )
}

export default BookCard