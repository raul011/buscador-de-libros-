# Buscador de Libros

Proyecto de la materia Programacion Web 1. Es un buscador de libros que consume datos de una API publica.

# 1. Recurso

El recurso principal son los Libros. Todo el proyecto gira en torno a buscar y mostrar libros.

# 2. Endpoints (CRUD)

Las rutas que necesito para los libros son:

- **GET /api/libros** -> trae todos los libros
- **GET /api/libros/:id** -> trae un libro por su id
- **POST /api/libros** -> agrega un libro nuevo
- **PUT /api/libros/:id** -> edita un libro (por ejemplo si me equivoque con el autor)
- **DELETE /api/libros/:id** -> elimina un libro

# 3. Ejemplo del JSON

Si hago un GET a un libro me devuelve algo asi:

```json
{
  "id": 1,
  "titulo": "Steve Jobs",
  "autor": "Walter Isaacson",
  "categoria": "Biografia",
  "anio": 2011,
  "isbn": "12345",
  "resumen": "La biografia de Steve Jobs..."
}
```

# 4. Lenguaje de BackEnd

**Lenguaje:** Node.js con Express

**Por que lo elegí:**
Lo elegi porque en la materia ya usamos JavaScript para el frontend entonces me parece lo mas logico seguir con el mismo lenguaje en el backend. Ademas con Express es bastante facil y rapido levantar un servidor, no hay que configurar mucho.

---

# 5. API publica usada

**API:** Open Library  
**URL:** https://openlibrary.org/search.json

La use para traer los libros reales en vez de tener datos inventados. Es gratuita y no necesita clave ni registro.

## Como la uso

Para buscar libros mando un GET asi:

```
https://openlibrary.org/search.json?q=harry potter&limit=12
```

El `q` es el termino de busqueda y `limit` es cuantos resultados quiero.

Para las portadas uso esta otra URL con el id de la portada que viene en la respuesta:

```
https://covers.openlibrary.org/b/id/8091016-M.jpg
```

## Ejemplo de lo que devuelve

```json
{
  "key": "/works/OL45804W",
  "title": "Clean Code",
  "author_name": ["Robert C. Martin"],
  "first_publish_year": 2008,
  "cover_i": 8091016,
  "isbn": ["9780132350884"],
  "edition_count": 10
}
```

## Como lo use en React

En `App.jsx` hice el fetch dentro de un useEffect para que cargue los libros cuando abre la pagina:

```js
useEffect(() => {
  fetch('https://openlibrary.org/search.json?q=programacion&limit=12')
    .then(res => res.json())
    .then(data => setDatos(data.docs))
    .catch(err => setError('no se pudo conectar'))
}, [busqueda])
```

---

# Practica U3-2 : Convertir el GET en una Lista en Pantalla

En esta practica teniamos que mostrar los datos de la API en pantalla usando React, ya no solo en la consola.

Lo que hice fue meter el fetch dentro de un useEffect en App.jsx. Use tres estados: uno para guardar los libros y  otro para saber si esta cargando y otro para el error. Mientras espera que lleguen los datos muestra un spinner y si falla la peticion sale un mensaje de error.

Para mostrar los libros use .map() y le pase el key que viene del id de Open Library (doc.key). Modifique App.jsx para toda la logica y en index.css agregue los estilos del spinner y el bloque de error.

---

# Practica de la semana: Estado compartido con Context API

## Punto 1: Estado que comparten varios componentes

Identifique que el estado de la busqueda lo comparten varios componentes:

- **Hero** necesita el termino buscado y el mensaje de resultados.
- **App** necesita la lista de libros, el estado de carga y el error.
- **BookCard** necesita cada libro de la lista.

Antes ese estado vivia en `App.jsx` y se pasaba a `Hero` mediante props (`onBuscar` y `mensaje`), lo que era **prop drilling**.

## Punto 2: Gestion con Context API

Elegi **Context API** (en vez de Redux Toolkit) porque el estado es simple y la app es chica; no hace falta instalar dependencias extra.

- `src/context/librosContext.js`: crea el contexto y el hook `useLibros()`.
- `src/context/LibrosProvider.jsx`: contiene los estados (`busqueda`, `datos`, `cargando`, `error`), el `useEffect` con el fetch y las acciones `buscar` y `reintentar`.
- `src/main.jsx`: envuelve `<App />` con `<LibrosProvider>`.

## Punto 3: Eliminar el prop drilling

`Hero` ya no recibe `onBuscar` ni `mensaje` por props: ahora los obtiene con `useLibros()`. `App` tampoco pasa props y lee `datos`, `cargando`, `error` y `termino` directamente del contexto.

## Punto 4: Verificar que la interfaz se actualiza

Como todos los consumidores leen del mismo provider, cuando cambia `busqueda` se actualizan a la vez el mensaje del Hero, la lista de libros, el spinner y el error.

## Punto 5: Decision anotada

La decision fue usar Context API por ser suficiente para este tamaño de proyecto, evitando la complejidad de Redux Toolkit. Los comentarios en el codigo explican cada cambio realizado.
