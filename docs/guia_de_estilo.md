# Guía de Estilo - Práctica Semana

## 1. Análisis de Interfaz
**App que elegí:** Amazon (sección de libros)

- **Jerarquía:** Lo primero que resalta es la barra de búsqueda que es súper grande. Después están los filtros a la izquierda y los libros al medio. Funciona bastante bien porque se encuentra rápido lo que buscas, aunque a veces la página se siente un poco saturada.
- **Color:** Es fondo blanco básico con detalles naranjas y azules. Los botones para comprar son amarillos/naranjas para que te llamen la atención rápido.
- **Tipografía:** Usan letras normales (tipo Arial). Se lee bien pero la verdad es un poco aburrida, no tiene mucho diseño moderno.
- **UX:** Es fácil de usar, los filtros ayudan un montón para buscar por año o idioma y carga rapidísimo.

## 2. Paleta de Colores
Para esta sección, definí 3 paletas distintas para que los colores cambien dependiendo de la edad que ingrese el usuario. Todas están en RGB.

**Paleta Niños:** (Basada en el tema Naranja de Chrome)
- Fondo: `rgb(255, 248, 240)` (un blanco cálido)
- Principal: `rgb(210, 105, 30)` (naranja fuerte del tema, para botones)
- Secundario: `rgb(255, 185, 125)` (naranja claro para detalles o acentos)
- Texto: `rgb(60, 40, 20)` (café oscuro para que se lea bien sin ser negro)

**Paleta Jóvenes:** (Basada en el tema Morado de Chrome)
- Fondo: `rgb(35, 30, 45)` (gris oscuro con tono morado)
- Principal: `rgb(115, 85, 170)` (el morado oscuro del tema para botones)
- Secundario: `rgb(215, 205, 245)` (el lila clarito para resaltar iconos o links)
- Texto: `rgb(245, 245, 250)` (blanco)

**Paleta Adultos:** (Basada en el tema Azul que tienes seleccionado en la foto)
- Fondo: `rgb(32, 36, 42)` (gris oscuro elegante)
- Principal: `rgb(45, 85, 145)` (el azul oscuro de arriba del círculo, para botones)
- Secundario: `rgb(165, 195, 235)` (el celeste claro de abajo, para acentos)
- Texto: `rgb(248, 250, 252)` (blanco hueso)

*(Revisé que en las tres paletas el texto tenga buen contraste y se pueda leer sin problemas).*

## 3. Tipografía
Voy a usar **Inter**. Es sin serifas, limpia y se ve más moderna que la de Amazon.

Los tamaños van a ser (pensados para pantalla de celular):
- H1 (Títulos grandes): 28px en negrita.
- H2 (Subtítulos de secciones): 22px seminegrita.
- H3 (Títulos de cada libro): 18px.
- Párrafos (Para el resumen del libro): 16px normal.
- Detalles (Nombres de autores): 14px y con un texto más gris.

## 4. Jerarquía visual
En mi pantalla principal de búsquedas, el orden en el que quiero que el usuario vea las cosas (adaptado para celular) es:
1. **La barra de búsqueda:** Arriba de todo, fija para que siempre esté a mano.
2. **Los resultados:** Las portadas de los libros ocupando el centro en una grilla de dos columnas.
3. **Búsqueda directa:** En lugar de saturar con botones de filtros, usamos un diseño minimalista solo con el ícono de la lupa dentro de la barra.

# PROTOTIPO FIGMA PUBLICADO : 
https://www.figma.com/design/go7QGVB94oVItHvlT9YMKG/Untitled?node-id=0-1&t=6F5Pp7JlxvEL5GOC-1 