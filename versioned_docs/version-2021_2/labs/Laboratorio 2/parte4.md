---
title: Parte 4 (2 horas)
sidebar_position: 7
---
# parte 4: parser recursivo descendiente de un lisp

Los compiladores recursivos descendientes implementan el stack del parser LL1 de forma implícita en el stack de ejecución. Así, en vez de aplicar una regla de producción, se llama a una función que _ejecuta_ la regla de producción.

El parser recursivo descendiente tiene un método para cada símbolo no terminal. Para cada uno de ellos, se ejecutará un programa que se puede deducir interpretando el diagrama de sintaxis como un diagrama de flujo.
- Cada vez que debe encontrarse con un terminal en el diagrama de flujo, se invoca la función `match(TokenType)`, que verifica que el token sea el correcto y lo elimina; o lanza una excepción, si el token no es correcto.
- Cuando debe encontrarse con un no terminal, se invoca el método correspondiente a ese no terminal.

Todas las bifurcaciones del diagrama de sintaxis debe poder decidirse mirando únicamente el siguiente token, si la gramática es LL1.

## Estructura del código

`CompilispParser` es un parser de `Compilisp`, la sintaxis del lab 1. Debe implementar los métodos correspondientes a cada no terminal:
- `input()`
- `line()`
- `sExp()`
- `list()`
- `atom()`

Cada uno debe representar el diagrama de sintaxis correspondiente a un símbolo no terminal. Para esto, además de invocar los otros métodos-reglas, deben invocar los siguientes métodos (incluídos en el esqueleto):
- `match(TokenType)`: 
    - Si el `TokenType` coincide con el siguiente del programa, lo remueve
    - Si no coincide, arroja una excepción
- `nextToken()` devuelve el siguiente token sin eliminarlo. Si el programa terminó, arroja una excepción.
- `getProgramIsOver()` devuelve un booleano indicando si el programa terminó o no

## Especificación informal de la semántica
Este lenguaje es un lisp, con lo cual puede usarse scheme (`sudo apt install mit-scheme`) para probar algunas expresiones y "construir más test" y jugar con un lenguaje similar a compilisp.

$$
input \rightarrow \{ line \}
$$
Estético: devuelve un texto que es la concatenación de las líneas.

$$
line \rightarrow [sExp] \text{ \n}
$$
Estético: devuelve el valor de la sExp convertido a un string.

$$
sExp \rightarrow atom | list
$$
- Si es atom: devuelve el valor del atom
- si es list y su evaluación no está inhibida: Evaluación de la secuencia de $sExp$ (en caso de que no esté quoteada). El primer $sExp$ es la función y los siguientes son argumentos.
- Si es list y su evaluación está inhibida: devuelve una lista.

$$
atom \rightarrow \text{number} | \text{symbol} | \text{string}
$$
En el caso de number y string, devuelve el valor correspondiente. En el caso del símbolo, revisa si existe alguna variable con ese nombre y devuelve su valor. 

$$
list \rightarrow \text{( )} 
$$
Devuelve una lista vacía

$$
list \rightarrow  \text{ ( } \{sExp\} \text{ ) }
|  \text{ ( } \{sExp\} \text{ . } sExp \text{ ) }  
$$
Devuelve un listado de los $sExp$ de adentro. El punto no hace ninguna diferencia, es estético.

$$
list \rightarrow \text{ ' } sExp
$$
Devuelve en sExp de adentro inhibiendo su evaluación.

## Consigna
**Completar los métodos de `CompilispParser.java` de forma que pasen los tests de `test/.../parte4/CompilispParserTest.java`.**.

## Consejos
- Implementar unicamente las funcionalidades requeridas para que los test pasen (es decir, `+` y `-`), no más.
- Abusar del tipo `Object`. No implementar `CompilispParser` utilizando tipos seguros.
- `CompilispParser` debe evaluar el programa a medida que lo interpreta. Se recomienda llamar a la función de evaluación en `sExp`. La lista iniciada con `QUOTE` debe inhibir la evaluación de su contenido.
- Se recomienda desarrollar una función recursiva que convierta su contenido a `string`, e invocarla desde `line()`.