# Laboratorio 3
## Introducción
En este laboratorio realizaremos un intérprete de una parte pequeña del lenguaje Scheme r5rs, definido en [este pdf](https://schemers.org/Documents/Standards/R5RS/r5rs.pdf). La fracción que implementaremos de r5rs es ínfima, pero el stándard citado incluye una gramática y una semántica formal, lo cual puede ser de mucha ayuda para escribir la gramática. Este texto no incluye una definición de la gramática y la semántica sino que se proveen tests como parte del esqueleto. Estos servirán como una especificación informal de la fracción de r5rs que se debe implementar.

## Contenido del esqueleto
- Proyecto java y devcontainer configurados
- Un archivo `jflex` con el contenido mínimo para que el proyecto compile (debe completarse en la parte 1)
- Una gramática de bison que tiene la definición de `datum` [r5rs 7.1.2]
- `LexerHelper.java` permite integrar bison y jflex
- `ParserHelper`: La clase generada por bison hereda de esta, entonces desde el archivo bison se pueden llamar a sus métodos.
- Carpeta `value`: Contiene la definición de la clase abstracta `SemVal` y sus hijas, que representan valores semánticos de bison. Incluye además una interfaz para un visitor, y un extractor que permite obtener el valor interno de cualquier `SemVal`
- `Displayer.java`: Visitor que convierte valores de nuestro scheme en un string.
- Suite de tests: Consiste en un archivo que utiliza los `ParameterizedTest` de JUnit para ejecutar los tests que se encuentran en la carpeta `resources`. A cada parte del laboratorio le corresponde uno o más de estos archivos csv. Estos archivos no deben ser modificados (ni los `.csv` ni los `.java`). De ser necesario agregar tests, hacerlo en archivos nuevos. **Todos los demás archivos se pueden modificar a gusto, el esqueleto se provee como una ayuda.**

## Parte 1: lexer (2 horas)
El documento que describe `r5rs` utiliza la notación EBNF para describir los tokens y las reglas gramaticales. El archivo `.y` ya incluye algunas reglas gramaticales, las cuales inducen un conjunto de tokens. Dado que el parser ya incluye las reglas necesarias para que funcione `1.quotation.csv` (_datum_), basta completar `CompischemeLexer.jflex`.

Concretamente, en esta primera parte debe describirse en el archivo `jflex` todos los tokens que vienen declarados en el archivo `.y`:

```
%token QUOTE
%token ABBREV_QUOTE
%token QUASIQUOTE
%token ABBREV_QUASIQUOTE
%token LPAREN
%token RPAREN
%token HASH_LPAREN
%token COMMA
%token COMMA_AT
%token DOT
%token IDENTIFIER
%token BOOLEAN
%token NUMBER
%token CHARACTER
%token STRING
```

Para saber qué expresión regular vincular a cada tipo de token, se debe revisar la sección 7.1 de [la especificación r5rs](https://schemers.org/Documents/Standards/R5RS/r5rs.pdf). El archivo `.y` es una traducción casi literal del contenido de la sección 7.1. Las reglas gramaticales tienen el mismo nombre en el archivo `.y` del esqueleto y en la especificación.

### Defectos de la parte 1
- hubo una confusión con la `quasiquotation`, puede eliminarse del archivo `.jflex`.
- recordá agregar la regla para detectar espacios, ya que sin eso se reciben errores de sintaxis todo el tiempo.

### Consigna
**Completar con el contenido mínimo posible el archivo `CompischemeLexer.jflex` de forma que el test que ejecuta `1.quotation.csv` tenga un resultado positivo.**

### Consejos importantes
- No separar como tokens todos los _keywords_ del lenguaje r5rs, sino unicamente los necesarios para que pase el test. Los demás tokens se añaden en las siguientes partes.
- JFlex prioriza las reglas según su orden de aparición en el archivo, con lo cual no es necesario tener los tokens _variable_ e _identifier_ separados tal como figuran en r5rs. Todas las variables son identifier.

## Parte 2: funciones (2 horas)
Para hacer que pasen los tests cuyos archivos csv inician con el número 2, se deben añadir al parser las reglas _procedure call_ y _variable_ (r5rs 7.1.3). Se recomienda capturar las variables como un subtipo de `SemVal` separado, pero no incluir ningun tipo de gestión de contexto aún (se recomienda hacerlo en la parte 6): el método que capture la regla _procedure call_ puede simplemente buscar el nombre de la función invocada (`+`, `equals`, etc.) en un diccionario. Se recomienda, además, no implementar aún un `SemVal` que almacene la invocación a una función, sino hacer que el parser devuelva el `SemVal` que la ejecución tiene como resultado.

Concretamente, en esta parte se recomienda que realicen las siguientes tareas:
1. Hace falta implementar _variable_ porque, si no, el parser va a detectar un error de sintaxis al encontrarse con los nombres de funciones. En r5rs, las funciones de la librería estándard son variables.
2. Capturar la sintaxis del tipo de expresión _procedure call_. _procedure call_ se debe derivar de _expression_, tal como en r5rs, y debe ser una regla aparte porque adentro de una _procedure call_ hay varias _expression_.
3. crear un método en el `ParserHelper` que reciba la función invocada y sus argumentos. Esta función se debe invocar desde el archivo `.y`, y debe ser la acción de la regla _procedure call_.
4. Implementar cada una de las funciones para hacer pasar los tests. **Se recomienda no iniciar por la función equal sino por las matemáticas o las binarias**.

### Consigna
**Hacer que los test que ejecutan `2.1.equality.csv`, `2.2.bool.csv` y `2.3.maths.csv` tengan un resultado positivo.**

## Parte 3: funciones de listas (1 hora)
A partir del trabajo realizado en la parte 2, agregar funciones de listas. Si bien `ListSemVal.java` está implementado usando un `LinkedList`, puede ser una buena decisión reemplazar esa implementación por una que utilice el concepto de [cons cell](https://en.wikipedia.org/wiki/Cons), es decir, implementarlas usando pares ordenados. No debería ser necesario agregar nuevas reglas en el archivo bison para hacer pasar los tests de la parte 3.

### Consigna
**Hacer que los test que ejecutan `3.1.lists.csv`, `3.2.lists.core.csv` y `2.3.maths.csv` tengan un resultado positivo.**

## Parte 4 (3 horas)
Esta parte consiste en la adición de efectos secundarios. Para esto se deben añadir dos nuevos tipos de expressiones: `set!` y `begin`. La expresión `set!` asigna variables, y la expresión `begin` evalúa expresiones en secuencia. Para poder ejecutar `begin` hay que distinguir la etapa de parsing y la etapa de evaluación. La _procedure call_ ahora debe ser _lazy_, es decir, debe capturar un cómputo que se realizará en el futuro, pero no llevarlo a cabo. A partir de ahora, leer un `SemVal` debe ser distinto de _evaluar_ o _ejecutar_ un `SemVal`.

Recomendamos encarar esta parte en dos etapas:
1. **Primero realizar un refactor** que separe la lectura y la ejecución. Usar los tests de partes anteriores para verificar que todo sigue funcionando. La ejecución debe tener acceso a un contexto, de forma que `set!` pueda hacer algo.
2. **Luego, implementar las instrucciones nuevas**

Por ahora se debe implementar un único contexto global. La implementación de scopes se hará en otra etapa.

### Consigna
**Hacer que los test que ejecutan `4.begin.set.csv` tengan un resultado positivo.**

## Parte 5 (1.5 horas)
Aprovechando la captura de expresiones en de la parte 4, implementar `if` y `repeat`. `if` no es una función porque sólo se evalúa una rama, lo cual implica que sólo los efectos secundarios de la rama correcta deben ejecutarse. `repeat` repite la ejecución del segundo parámetro según indique el primer parámetro.

### Consigna
**Hacer que los test que ejecutan `5.if.csv` y `5.repeat.csv` tengan un resultado positivo.**

## Parte 6 (1.5 horas)
La semántica relacionada a los tests de la parte 6 se encuentra en r5rs 4.2.2. Esta etapa consiste en la adición de _scopes_ o _contextos_, para eso es necesario modificar el algoritmo de evaluación extraído en la parte 4 para que reciba adicionalmente un _contexto_, que se debe poder variar de alguna forma, o pasar como parámetro. En esta etapa debe surgir una clase que represente el concepto de "contexto" que debe poder apuntar a su contexto envolvente, para poder utilizarlo de "fallback": En caso de que una variable no esté en cierto contexto, hay que ir a buscarla al contexto envolvente. Se recomienda que esta nueva clase tenga los siguientes métodos:
- get
- set
- bind

`let` y `let*` tienen una semántica especial: `let*` funciona como un listado de asignaciones de cualquier lenguaje de programación, pero `let` excluye del contexto de ejecución de las asignaciones a las demás variables asignadas en el mismo `let`. Es decir, si un `let` asigna `x` y luego `y`, **no** tendrá `x` disponible al asignar `y`, mientras que para `let*` esto **sí** se cumple.

### Consigna
**Hacer que el test que ejecuta `6.let.csv` tenga un resultado positivo.**

## Parte 7 (1.5 horas)
En esta parte se debe implementar `lambda`, que permite crear nuevas funciones. Su semántica está descripta en r5rs 4.1.4, pero no debe implementarse completa. Es importante definir, en caso de que no exista aún, una clase que represente funciones. Las funciones `+`, `-`, `equal?`, etc, deben ser valores de este tipo, almacenados en un contexto de ejecución que es el más exterior de todos (o _global_). Cuando el parser encuentra una expresión `lambda`, debe crear un nuevo `SemVal` que almacene el lambda. Cuando se evalúa el lambda, se debe devolver una instancia de la misma clase que la obtenida al evaluar las variables `+`, `-`, `equal?`, etc.

Así, es importante reconocer la diferencia entre una _función_ y un _lambda_: el resultado de la evaluación del _lambda_ es una _función_.

La _función_ creada por un _lambda_ se ejecuta en el contexto de ejecución original del _lambda_, independientemente de dónde sea invocada. A este contexto se le llama _cierre_ (en inglés _closure_). En el test `complexTest` se crean dos funciones que actúan sobre una variable `x`, que queda oculta pero aún existe.

### Consigna
**Hacer que el test que ejecuta `7.lambda.csv` y `complextTest` tengan un resultado positivo.**
