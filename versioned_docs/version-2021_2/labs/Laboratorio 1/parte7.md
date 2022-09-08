---
title: Parte 7 (2 horas)
sidebar_position: 9
---
A continuación se realizará un lexer de un lisp personalizado, que tiene los siguientes tokens:

|token|definición|
|-|-|
|nombre|cualquier cadena de letras, números, símbolos o guiones bajos, que no empieza con un número|
|número|secuencia de dígitos decimales|
|`(`| iniciar lista |
|`)`| cerrar lista |
|string|cadena de caracteres encerrados entre comillas dobles, en el cual se puede usar el caracter `\` para _escapear_ el caracter contrabarra o el caracter comilla doble.|

El lexer debe ignorar comentarios: desde la ocurrencia de `//` hasta el final de la línea.

## Consigna
**Completar el archivo `Compilisp.jflex` para que pasen los test del archivo `CompilispTest.java`**. Modificar unicamente `Compilisp.jflex`. En caso de ser necesario agregar más tests, hacerlo en un archivo aparte.

## Consejos
- Basarse en el [ejemplo del manual](https://www.jflex.de/manual.html#Example) de jflex. Compilisp.jflex va a terminar siendo una versión reducida del ejemplo.
- Para parsear strings es necesario usar la opción `%state`, y varias más.
- También será necesario usar la sintaxis `<STATE> regex action`, que se puede usar también de la siguiente forma:

    ```
    <STATE> regex1 action1
    <STATE> regex2 action2
    <STATE> regex3 action3
    ```
    equivale a 
    ```
    <STATE> {
        regex1 action1
        regex2 action2
        regex3 action3
    }
    ```
- En este lenguaje es necesario devolver un `Token<T>` como en los primeros, ya que es necesario devolver al mismo tiempo el `TokenType` y el contenido del string.
