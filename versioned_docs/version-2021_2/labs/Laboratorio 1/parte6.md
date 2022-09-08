---
title: Parte 6 (1.5 horas)
sidebar_position: 8
---
## Consigna
**Completar los archivos `.flex` de la carpeta `parte6` de forma que pasen todas las pruebas de la carpeta `parte6`.** No se permite modificar el contenido de los archivos de pruebas, en caso de ser necesario agregar más pruebas, hacerlo en un archivo separado.

## Consejos
- La parte 6 consiste en expresar los 4 lenguajes trabajados previamente como archivos `.jflex`. Se aconseja proceder de la siguiente manera:
    1. expresar los tipos de token como expresiones regulares (en las tablas de la parte 2 se hizo una descripción informal)
    2. Transcribir las expresiones regulares a los archivos `.jflex`. La sintaxis de las expresiones regulares de JFlex está descripta [aquí](https://www.jflex.de/manual.html#LexRules). Es posible que difieran un poco de las expresiones regulares de java o grep, o de la sintaxis dada en la teórica.
- Para BrainfuckAdder será necesario "escapear" caracteres, ya que el `+` y el `-` son caracteres propios de la sintaxis de expresiones regulares Para esto se pueden encerrar los literales entre comillas o usar el caracter `\`. Ver la sintaxis de expresiones regulares de jflex [aquí](https://www.jflex.de/manual.html#LexRules).
- En los lenguages LOL y numbersoup se requiere agregar reglas adicionales para detectar algunos tokens mal formados. Estos tokens mal formados en algún sentido están "implícitos" en la definción informal que se hizo previamente del lenguaje, y en los test.