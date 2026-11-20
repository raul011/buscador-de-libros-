# Buscador de Libros

Proyecto de la materia Programacion Web 1. Es un buscador de libros que consume datos de la API pública de Open Library.

## 🌐 URL publicada

**http://www.tecnoweb.org.bo/inf240/grupo04sx/**

---

## 🚀 Cómo correr el proyecto localmente

```bash
# 1. Instalar dependencias
cd proyecto-react
npm install

# 2. Modo desarrollo (con hot-reload)
npm run dev

# 3. Correr los tests
npm test

# 4. Correr el linter
npm run lint

# 5. Generar el build de producción
npm run build

# 6. Previsualizar el build localmente
npm run preview
```

---

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

# Práctica de la semana : Estructura del Estado Compartido (Context API)

En esta práctica dimos estructura al estado compartido del proyecto para **eliminar el prop drilling** y centralizar la información global usando la **Context API de React**.

## 1. Identificación de los estados compartidos
Analizando el flujo de datos de la aplicación, identificamos dos estados que necesitaban ser compartidos entre componentes lejanos:

1. **Estado de Favoritos (`FavoritosContext`)**:
   - **Componentes que lo usan:**
     - `Header.jsx`: para mostrar la cantidad actualizada de favoritos `Favoritos (X)`.
     - `BookCard.jsx`: para pintar el corazón (`♥` o `♡`) según si el libro ya está guardado y permitir agregarlo o quitarlo con un clic.
     - `DetalleLibro.jsx`: para alternar el estado de favorito desde la ventana flotante de detalles.
     - `Favoritos.jsx`: para renderizar la lista completa de libros guardados por el usuario.
   - **Problema previo (Prop Drilling):** `App.jsx` tenía que recibir el estado de favoritos y pasarlo manualmente hacia abajo a través de props (`esFavorito`, `onAlternarFavorito`, `cantidadFavoritos`, etc.).

2. **Estado del Tema / Modo de lectura (`ThemeContext`)**:
   - **Componentes que lo usan:**
     - `Header.jsx`: para alternar y mostrar el tema actual (`🧸 Infantil`, `📚 Juvenil`, `🎓 Adultos`).
     - `index.css`: sincroniza con el atributo `data-tema` en el DOM para aplicar las paletas de color en toda la página.

## 2. Decisión técnica: ¿Por qué Context API?
Elegimos la **Context API nativa de React** (en lugar de Redux Toolkit) porque:
- Resuelve exactamente el problema del prop drilling sin necesidad de instalar librerías externas adicionales.
- Mantiene el código limpio, intuitivo y liviano para una aplicación de este alcance.
- Se combina perfectamente con custom hooks (`useFavoritos`, `useTema`) para una experiencia de desarrollo modular.
- Incluye persistencia automática en `localStorage`, de modo que al recargar la página no se pierden ni los favoritos ni el tema elegido.

## 3. Estructura implementada
- **`src/context/FavoritosContext.jsx`**: Proveedor (`FavoritosProvider`) que expone `favoritos`, `cantidadFavoritos`, `esFavorito(id)` y `alternarFavorito(libro)`.
- **`src/context/ThemeContext.jsx`**: Proveedor (`ThemeProvider`) que expone `tema`, `alternarTema()` y `cambiarTema(nuevoTema)`.
- **`src/hooks/useFavoritos.js`** y **`src/hooks/useTema.js`**: Hooks personalizados para consumir los contextos de forma directa y segura.
- **Envoltorio global en `App.jsx` / `main.jsx`**: Toda la aplicación queda cubierta por ambos proveedores.

## 4. Eliminación del Prop Drilling
Cada componente ahora lee directamente el dato donde se necesita:
- `Header` ya no recibe `cantidadFavoritos` ni `tema` por props; los lee directamente con `useFavoritos()` y `useTema()`.
- `BookCard` y `DetalleLibro` llaman directamente a `useFavoritos()` para comprobar y alternar el libro actual.
- `Favoritos` consume la lista global sin intermediarios.
- `App.jsx` quedó simplificado y enfocado únicamente en la navegación y la consulta a la API de Open Library.

## 5. Verificación de actualización en la interfaz
- Al hacer clic en el corazón de cualquier tarjeta, el contador del `Header` sube/baja inmediatamente y el corazón cambia de estado en tiempo real.
- Si se abre el modal de detalles (`DetalleLibro`), el botón refleja el estado sincronizado al instante.
- Al alternar el tema en el `Header`, los colores de fondo, tarjetas y textos se transforman en toda la interfaz sin recargar.


---

# Práctica U3 Final: Probado, Publicado y Documentado

## 1. Pruebas (Vitest + React Testing Library)

### Librerías instaladas
```
vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jsdom
```

### Archivos de test

| Archivo | Tipo | Qué prueba |
|---|---|---|
| `src/api/normalizar.test.js` | **Unitaria** | `normalizarLibro()`: doc completo, valores por defecto, portadas inválidas |
| `src/App.test.jsx` | **Componente** | Carga inicial, búsqueda con debounce, error + reintentar, vacío, favoritos, detalle + Escape, cambio de temas, cargar más, ordenar por año |

### Cómo correr los tests
```bash
cd proyecto-react
npm test          # corre todos los tests una vez
npm run test:watch  # modo interactivo (re-corre al guardar)
```

### Ejemplo de prueba unitaria (`normalizar.test.js`)
```js
it('usa valores por defecto cuando faltan campos', () => {
    const libro = normalizarLibro({})
    expect(libro.titulo).toBe('Sin título')
    expect(libro.autor).toBe('Autor desconocido')
    expect(libro.anio).toBe('N/D')
})
```

### Ejemplo de prueba de componente con userEvent (`App.test.jsx`)
```js
it('agrega favoritos y los muestra en su vista', async () => {
    const usuario = userEvent.setup()
    render(<App />)
    await screen.findByText('Libro 1')

    await usuario.click(
        screen.getByRole('button', { name: 'Agregar Libro 1 a favoritos' })
    )

    expect(screen.getByRole('button', { name: 'Favoritos (1)' })).toBeInTheDocument()
})
```

---

## 2. Linter (Oxlint)

El proyecto usa **oxlint** (compatible con ESLint, mucho más rápido).

```bash
cd proyecto-react
npm run lint          # muestra errores y warnings
npm run lint -- --fix # arregla automáticamente lo que puede
```

**Resultado:** 0 errores, 2 warnings esperados (`setState` en effect — patrón intencional para carga asíncrona).

---

## 3. Build y Preview

```bash
cd proyecto-react
npm run build    # genera la carpeta dist/ lista para producción
npm run preview  # sirve el build localmente para verificarlo
```

El build queda en `proyecto-react/dist/` con todos los assets optimizados y el `base` configurado al subdirectorio del grupo.

---

## 4. Configuración del base de Vite

En `vite.config.js` se configuró el `base` al subdirectorio del grupo en tecnoweb:

```js
export default defineConfig({
  base: '/inf240/grupo04sx/',
  // ...
})
```

Esto hace que todos los assets (`/assets/*.js`, `/assets/*.css`) apunten al subdirectorio correcto en el servidor.

---

## 5. Deploy en tecnoweb por FTP/SSH

### Pasos para publicar

1. Generar el build:
   ```bash
   cd proyecto-react
   npm run build
   ```

2. Subir el contenido de `proyecto-react/dist/` al servidor tecnoweb en el directorio `/inf240/grupo04sx/` usando FTP o SSH (FileZilla, WinSCP, o `scp`).

3. Verificar que la URL funcione:
   **http://www.tecnoweb.org.bo/inf240/grupo04sx/**

### Con SCP (SSH)
```bash
scp -r proyecto-react/dist/* usuario@tecnoweb.org.bo:/ruta/inf240/grupo04sx/
```

### Con FileZilla / WinSCP
- Host: `tecnoweb.org.bo`
- Directorio remoto: `/inf240/grupo04sx/`
- Subir todo el contenido de la carpeta `dist/`
