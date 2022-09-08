---
title: Introducción a Bison
sidebar_position: 8
---
# Introducción a Bison
Fuente: [Manual oficial de bison](https://www.gnu.org/software/bison/manual/html_node)

Bison es una versión más de nueva de yacc, que es retrocompatible y permite exportar parsers en java. Bison trabaja con archivos `.y` que son casi idénticos a los de yacc.

## Estructura ([fuente](https://www.gnu.org/software/bison/manual/html_node/Grammar-Outline.html))
```
%{
  Prologue
%}

Bison declarations

%%
Grammar rules
%%

Epilogue
```
El prólogo y el epílogo permiten introducir código java antes o después del parser generado por bison. No usaremos estas secciones. Las otras se describen brevemente a continuación.

## Declaraciones bison ([fuente](https://www.gnu.org/software/bison/manual/html_node/Java-Declarations-Summary.html))
Son configuraciones generales sobre el parser que Bison generará.

- `%language "Java"` el parser emitido es código java
- `%define api.parser.class {Calc}` Define el nombre de la clase parser generada (en este caso `Calc`).
- `%define api.parser.public` Hace que la visibilidad de la clase del parser sea pública
- `%define package {ar.uba.fi.compiladores.parte5}` Package de la clase generada.
- `%define api.value.type {Number}` Define el tipo de los [_valores semánticos_](https://www.gnu.org/software/bison/manual/html_node/Semantic-Values.html). Un valor semántico es el resultado de la aplicación del token. En el caso de la calculadora, este tipo es `Number`. En el caso del intérprete de lisp construido en la parte 4, estos son valores de tipo `Object`. Un parser que no procese el programa a medida que lo analiza podría devolver una clase que represente un nodo del ábrol de sintaxis abstracto. Un compilador podría devolver una porción del programa compilado.
- `%token L_PAREN`: define un símbolo terminal (en este caso, `L_PAREN`).
- `%code { <código java> }`: codigo java inyectado en la clase generada, lo cual permite agregar propiedades y métodos.
- `%code imports { <imports java> }`: Permite importar clases para usarlos en el código de la clase generada
- `%code init { <código java> }`: Código que se ejecuta en el constructor del parser generado.

## Reglas de derivación ([fuente](https://www.gnu.org/software/bison/manual/html_node/Rules-Syntax.html))

La regla
$$
factor \rightarrow \text{ ( } \{exp\} \text{ ) } | \text{number}
$$

Se escribe como:
```
factor: L_PAREN exp R_PAREN | NUMBER ;
```

Para capturar la sintaxis, hay que escribir _acciones_, que son código java entre corchetes, de la siguiente manera:

```
factor: 
 L_PAREN exp R_PAREN    { $$=$2; System.out.printLn("("+$2+")");}
| NUMBER                { $$=$1; System.out.printLn("number!" + $1); }
;
```

Este código java es "especial". Se agregan las siguientes variables:
- `$$`: valor semántico que devuelve esta regla
- `$n` donde `n` es un  número: devuelve el valor semántico del `n`-avo token producido por la regla.

## Integración del parser generado por bison

### Integración con maven

En el `pom.xml` del lab 2 se agregó una etapa a la compilación que llama al comando `bison` para cada uno de los archivos `.y` del proyecto, y almacena los parser java generados en `lab2/target/generated-sources/bison`. 

:::danger
Cuando un archivo `.y` está mal escrito, la generación falla silenciosamente. Es necesario correr la tarea maven `compile` y verificar en los logs si el archivo se generó mal.
:::

El comando `bison` está instalado en el `devcontainer`. De no usar el `devcontainer`, será necesario instalarlo.

### Integración con el resto del código

La clase parser generada recibe como parámetro de su constructor un lexer. Este lexer debe implementar una interfaz que está escrita dentro del parser. Es decir, si el parser se llama `Calc`, la interfaz del lexer a implementar es `Calc.Lexer`. Métodos de la interfaz:
- `yylex()`: Devuelve el _tipo_ del siguiente token. Este tipo es un `int`. La interfaz `Lexer` define constantes estáticas `int`, cada una de las cuales tiene el nombre de uno de los símbolos terminales, y cuyo valor es el `int` correspondiente.
- `getLVal()`: Devuelve el valor semántico del último token devuelto por `yylex()`. Si el mismo no tiene valor semántico (como en el caso de `(` ó `+`), no se debe arrojar un error.
- `yyerror(msg)`: Emite un error.