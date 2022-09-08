---
title: JFlex 
sidebar_position: 6
---
Los ejercicios anteriores te guiaron por el desarrollo de lexers "a mano". Existen programas que son capaces de convertir automaticamente la descripción de un lenguaje de programación en un lexer. Es decir, a partir de un conjunto ordenado de expresiones regulares ordenado como descripto anteriormente, generan un lexer escrito en algún lenguaje de programación.

En el provisto se integra JFlex como plugin de maven, y con algunas configuraciones extras en `pom.xml` se hizo que cada vez que el desarrollador guarda un archivo terminado en `.jflex`, se genere el archivo correspondiente en la carpeta `lab1/target/generated-sources/jflex` (siempre que se use un IDE integrado con maven). La forma "manual" de realizar la integración es corriendo el generador de lexers como un programa aparte en la línea de comandos, que simplemente recibe un archivo `.flex` y emite un archivo `.java`. La integración realizada en maven incluye este paso intermedio en la compilación.

##  Estructura de un archivo `.jflex`
La estructura de un archivo `.jflex` está descripta en [esta sección](https://www.jflex.de/manual.html#Example) de su manual oficial. Aquí se incluye un brevísimo resumen. 

El archivo tiene 3 secciones separadas por los caracteres `%%`. A continuación se explica cada sección:

```
<usercode>
%%
<opciones y declaraciones>
%%
<reglas léxicas>
```

- **usercode**: código java que va arriba de la clase generada. En este laboratorio unicamente se utiliza esta sección para incluir la declaración `package`.
- **opciones y declaraciones**: Aquí se permite declarar expresiones regulares que se pueden usar como parte de otras expresiones regulares, y se pueden incluir diversas opciones precedidas del signo `%`. En este laboratorio solamente utilizaremos las siguientes opciones:
    - `%public`: hace que la clase sea pública en vez de tener visibilidad de paquete
    - `%class "classname"`: especifica el nombre de la clase generada
    - `%type "classname"`: especifica el valor que debe retornar el método `yylex`, que es el retornado por el bloque incluído en la sección de reglas léxicas
    - `%yylexthrow`: Especifica qué clases de excepciones incluir en la declaración `throws` del método `yylex`.
    - `%state`: se explica más adelante
- **reglas léxicas**: tienen 2 formas:
    - `expr { action }`: Si se encuentra una ocurrencia de la expresión regular `expr`, se ejecuta `action`.
    - `<STATE> expr { action }`: Se explica más adelante

JFlex permite crear lexers que ejecutan código arbitrario en cada bloque `{ action }`, introducir variables de instancia, etc. En este laboratorio vamos a restringirnos a lexers sencillos, que unicamente scanean un archivo y devuelven tokens.

## Interfaz de la clase generada
Se detalla una parte de la interfaz de la clase generada (la parte que usaremos en el laboratorio).

- constructor: recibe un `java.io.Reader` como parámetro
- `yylex()`: Similar a `extractToken`, avanza por el `Reader` ejecutando un autómata y ejecuta el código correspondiente a la primera expresión regular que _matchea_.
- `yybegin(STATE)`: explicado más adelante.
- `yytext()`: devuelve el último `String` matcheado por `yylex()`
- `.yyatEOF()`: indica si terminó de recorrerse el `reader`.
