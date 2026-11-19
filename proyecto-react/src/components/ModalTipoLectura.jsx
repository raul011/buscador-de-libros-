function ModalTipoLectura({ tipoActual, onSeleccionar, onCerrar }) {
  const OPCIONES = [
    {
      id: 'infantil',
      icono: '🧸',
      titulo: 'Infantil',
      descripcion: 'Cuentos ilustrados, fábulas y aventuras mágicas para los más pequeños.',
      etiqueta: 'Para niños y primeros lectores',
    },
    {
      id: 'juvenil',
      icono: '📚',
      titulo: 'Juvenil',
      descripcion: 'Aventuras apasionantes, fantasía, misterio y novelas para jóvenes.',
      etiqueta: 'Para adolescentes y jóvenes',
    },
    {
      id: 'adultos',
      icono: '🎓',
      titulo: 'Adultos',
      descripcion: 'Literatura, desarrollo personal, novelas clásicas y divulgación.',
      etiqueta: 'Para lectores adultos',
    },
  ]

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo-id"
      >
        <button
          type="button"
          className="modal-btn-cerrar"
          onClick={onCerrar}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="modal-header">
          <h2 id="modal-titulo-id" className="modal-titulo">
            ¿Qué tipo de lectura buscas?
          </h2>
          <p className="modal-descripcion">
            Elige una opción para recomendarte los mejores libros:
          </p>
        </div>

        <div className="modal-opciones-grid">
          {OPCIONES.map((opc) => {
            const esActivo = tipoActual === opc.id
            return (
              <button
                key={opc.id}
                type="button"
                className={`modal-opcion-card modal-opcion-${opc.id} ${
                  esActivo ? 'activa' : ''
                }`}
                onClick={() => onSeleccionar(opc.id)}
              >
                <div className="opcion-icono-wrap">
                  <span className="opcion-icono">{opc.icono}</span>
                </div>
                <h3 className="opcion-titulo">{opc.titulo}</h3>
                <p className="opcion-desc">{opc.descripcion}</p>
                <span className="opcion-etiqueta">{opc.etiqueta}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ModalTipoLectura
