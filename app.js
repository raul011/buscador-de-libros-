document.addEventListener("DOMContentLoaded", function() {
    let formulario = document.getElementById("search-form");
    let inputBusqueda = document.getElementById("search-input");
    let mensaje = document.getElementById("search-message");

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault(); // evitamos que la pagina recargue

        let texto = inputBusqueda.value;

        // validamos que no este vacio
        if (texto === "") {
            mensaje.textContent = "Por favor, escribe el nombre del libro o autor.";
            mensaje.style.color = "red";
        } else {
            mensaje.textContent = "Buscando: " + texto + "...";
            mensaje.style.color = "green";
        }
    });
});
