---
sidebar_position: 4
---
# Trabajo práctico

El objetivo de este trabajo práctico es la construcción de un compilador completo.

## Alcance
Se debe desarrollar un traductor de **Compischeme 2** a assembly x86 compatible con `nasm`, acompañado de una suite de tests automáticos. **Compischeme 2** es una versión de Compischeme más amistosa para ser compilada, más similar a C.

### Diferencias entre Compischeme y Compischeme 2

#### Tipos de datos y cierres
Compischeme sólo tiene variables numéricas `int`, **no incluye listas, strings ni funciones como tipo de dato**. Las funciones unicamente se pueden crear adentro de `define`: no se pueden pasar como parámetro ni asignar a una variable local. Nótese que esta es una restricción aún más fuerte que la que existe en C, que sí permite asignar apuntadores a funciones. Como consecuencia de esto, **no incluye cierres**.

#### Nueva sintaxis: `define`
Hace una definición global. Compischeme no incluía esta función, sino unicamente definiciones locales con `let`. Hay 2 tipos de usos de `define`: 
- Definir variables globales: **Ejemplo:** `(define x 5)` asigna 5 a `x`
- Definir funciones: **Ejemplo:** `( define inc (lambda (x) (+ x 1)) )`

:::danger
Todos los usos de `lambda` que no estén dentro de `define` serán inválidas
:::

#### Nueva sintaxis: `display`
`display` muestra el contenido de una variable por `stdout`. **Ejemplo:**  `(display x)` imprime el contenido de `x` por `stdout`.

#### Nueva sintaxis: `print`
`print` muestra un texto `stdout`. Nótese que Compischeme 2 no tiene un tipo de dato `string`, sino que el texto siempre debe incluirse como literal. **Ejemplo:**  `(print "hola")` imprime `hola` por `stdout`.

#### Nueva sintaxis: `read`
`read` lee un número de stdin y devuelve su valor. **Ejemplo:** `(  display ( + (read) (read) )  )`
:::tip
Se recomienda usar el [repo `esqueleto-assembler`](https://github.com/compiladores/esqueleto-assembler) para ver implementaciones posibles de `display`, `print` y `read`.
:::

### Parser y lexer
Hay 2 alternativas para realizar el parser y el lexer:
1. Aprovechar el parser y lexer del laboratorio 3, agregándole la nueva sintaxis **(Se recomienda hacer esto)**.
2. Utilizar ANTLR para lexer y parser.

### Suite de tests
El alcance de este trabajo práctico incluye pruebas automáticas, cuyo peso en la nota es 5 de 10 puntos. Se deben escribir pruebas al nivel de unit tests y pruebas de integración. Puede ser una buena idea usar mocks para aislar la clase testeada, junto con inyección de dependencia. No es necesario usar algún framework para realizar inyección de dependencia sino que pueden hacerlo "a mano" en los constructores.

Las pruebas de integración deben invocar al compilador, enviarle datos al programa compilado por `stdin` y extraer datos por `stdout` para ejecutar aserciones. Para los tests de integración, se recomienda usar python y el [módulo subprocess](https://docs.python.org/3/library/subprocess.html).

### Variables

Las variables se almacenarán en la sección `data`, tal como se hace en la invocación de la función de `scanf` del ejemplo ([la línea 16](https://github.com/compiladores/esqueleto-assembler/blob/9f0118353236c0058bc60accb1c37bd25c4c8645/7.scanf.asm#L16) guarda espacio para una variable en el data). En el ejemplo, la función de `glib` escribe a `fgets_buffer`, pero se pueden usar los corchetes para escribir a memoria o leer de memoria usando la instrucción `mov`, tal como se realiza en la [línea 48](https://github.com/compiladores/esqueleto-assembler/blob/9f0118353236c0058bc60accb1c37bd25c4c8645/7.scanf.asm#L48).

### Funciones

Las funciones deben usar las instrucciones `call` y `ret`. No es necesario pasar los parámetros por el stack ni usando la ABI que se describió en la clase de assembler. Ya que cada variable tiene su lugar en la sección data, para pasar argumentos unicamente se deben copiar valores entre direcciones de la sección `data`. Usar menos espacio en la sección `data` o el aprovechamiento del stack para pasaje de argumentos se considera una optimización.

## Resumen
- Deberán usar ANTLR para parser y lexer, ó reutilizar el combo bison + flex
- Deberán implementar el TP usando java.
- Deberán compilar **Compischeme 2**, una versión modificada del lenguaje del lab 3. Al contrario de compischeme, no van a tener:
    - tipos de datos que no sean números
    - closures (cierres ó clausuras)
    - nueva sintaxis: `(define x 5)` define una variable global con el valor 5. Al asignarle un lambda, esto equivale a una definición de función de C. Sólo puede haber `define` en el scope global de los archivos de **Compischeme 2**.
    - nueva función: `(display x)` muestra el contenido de `x` por stdout.
    - nueva sintaxis: `(print "texto")` muestra el texto por stdout (no es una variable string).
    - nueva función: `(read)` lee un número de stdin y lo devuelve
- Las variables se almacenarán en la sección `data` y no en el stack, tal como en la práctica de assembly. Así, cada variable (local o global) tiene su lugar en la sección `data`.

## Criterios de evaluación
- 5 puntos: implementación. Puntos positivos para la implementación:
    - implementación realizada: 2 puntos
    - El código muestra separation of concerns: 
        - alguna SoC: 1 punto
        - buena SoC: 2 punto
    - Se utiliza algún tipo de inyección de dependencia para hacer que las clases sean facilmente testeables: 1 punto
- 5 puntos: testing. Puntos positivos para la implementación:
    - presencia de tests de integración donde se pruebe la ejecución de archivos compischeme: 
        - entre 4 y 7 programas de 10 líneas o más: 2 puntos
        - 8 o más programas de 10 líneas o más: 3 puntos
    - tests que no sean de integración:
        - se testea 1 clase: 1 punto
        - se testean 2 clases o más: 2 puntos
