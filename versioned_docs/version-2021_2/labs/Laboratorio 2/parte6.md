---
title: Parte 6 (2 horas)
sidebar_position: 9
---
# parte 6: Parser de lisp con Bison.

## Consigna
**Modificar  `Compilisp.y` de forma que pasen los tests de `test/.../parte6/CompilispTest.java`.**. Se pueden crear nuevos archivos pero **NO** modificar el archivo de tests. En caso de requerir agregar más tests, hacerlo en un archivo aparte. **Mantener los mismos tokens del `Compilisp.y` base.**

## Consejos
- Puede venir bien usar `%define api.parser.extends {superclass}` para definir los métodos que requieran más lógica en una clase distinta. Usar superclases requiere algunas declaraciones más, incluidas en el archivo `Compilisp.y` provisto
- El resto de los parámetros ajustables para java se puede encontrar [aquí](https://www.gnu.org/software/bison/manual/html_node/Java-Declarations-Summary.html)
- Los tests son los mismos que para la parte 4, con lo cual no es necesario implementar más comportamiento, sólo adaptar el de esa parte.