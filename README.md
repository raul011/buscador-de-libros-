# Práctica: Diseño del BackEnd - Buscador de Libros

Esta es la documentación de la API para el proyecto del buscador de libros.

# 1. Recurso
La entidad principal de mi proyecto son los Libros. Todo el proyecto se trata de buscar y mostrar información sobre ellos.

# 2. Endpoints (CRUD)
Las rutas que voy a necesitar para manejar los libros son:

- **GET /api/libros** -> Para obtener la lista completa de los libros.
- **GET /api/libros/:id** -> Para sacar la información de un solo libro específico.
- **POST /api/libros** -> Para guardar un libro nuevo.
- **PUT /api/libros/:id** -> Para actualizar o editar los datos de un libro (por ejemplo si me equivoqué de autor).
- **DELETE /api/libros/:id** -> Para borrar un libro.

# 3. Ejemplo del JSON
Si hago un GET a un libro, la API me devolvería algo así:

```json
{
  "id": 1,
  "titulo": "Steve Jobs",
  "autor": "Walter Isaacson",
  "categoria": "Biografía",
  "anio": 2011,
  "isbn": "12345",
  "resumen": "La biografía de Steve Jobs..."
}
```

# 4. Lenguaje de BackEnd
**Lenguaje:** Node.js (JavaScript) con Express.

**Justificación:**
Elegí hacer el backend con Node.js porque ya estamos usando JavaScript en la parte visual del proyecto para la materia. Así no me complico aprendiendo un lenguaje nuevo desde cero y puedo aprovechar lo que ya sé. Creo que es más fácil tener todo el proyecto en un solo lenguaje, además es súper rápido levantar un servidor básico con Express.
