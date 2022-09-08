---
title: Parte 5 (0.5 horas)
sidebar_position: 7
---
Se provee en este esqueleto el archivo `parte5/Hello.flex`, que incluye un lexer muy simple de un lenguaje que unicamente contiene los tokens `hello`, `world` y caracteres `<espacio>`.

## Consigna
**Modificar `Hello.jflex` para que pasen todas las pruebas de `HelloTest.java`.** No se debe modificar el contenido de `HelloTest.java`, en caso de ser necesario agregar más pruebas, hacerlo en un archivo separado.

## Consejos
- para que pase `testNumbersAreLexed` hay que una nueva regla léxica que capture números
- para que pase `testBadCharacter` hay que basarse en el [ejemplo del manual](https://www.jflex.de/manual.html#Example). [Aquí](https://github.com/jflex-de/jflex/tree/master/jflex/examples/) se pueden encontrar otros ejemplos (mirar los archivos `.jflex`). Java tiene un sistema de excepciones tipadas, con lo cual es necesario agregar una opción de configuración que permita lanzar la excepción desde el método yylex.
