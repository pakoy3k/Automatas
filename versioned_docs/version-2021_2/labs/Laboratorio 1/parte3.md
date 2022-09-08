---
title: Parte 3 (2 horas)
sidebar_position: 4
---
En esta parte y la siguiente vamos a implementar lexers para los 4 lenguajes planteados anteriormente. En la carpeta `parte3` se encuentran los siguientes elementos importantes:
- `LanguageAutomata.java`: Una interfaz que se usa para representar toda la información necesaria para expresar una autómata capaz de parsear un lenguaje:
    - Función de transición
    - Función que dice si un estado es final
    - Función que dice cuál es el estado "muerto", que es el que no tiene transiciones salientes.
    - otras cosas necesarias para definir el autómata
    
    La interfaz tiene 2 tipos genéricos. El tipo `S` es el tipo de los estados, y `T` representa los tipos de token. Así, la interfaz nos permite cambiar los tipos enumerados que se usan en el lenguaje.
- `ManualLexer.java`: A partir de un autómata que implementa `LanguageAutomata`, implementa un algoritmo que convierte strings en tokens "observando" el comportamiento de la función de transición. Expone 2 métodos, que deben completarse como parte del alcance de este laboratorio:
    - `extractToken(String program)` avanza por el `String` recibido como parámetro hasta alcanzar un estado muerto del autómata. Entonces devuelve el token correspondiente al último _estado final_, y la posición del último caracter donde se lo alcanzó.
    - `lex(String program)` Llama constantemente a `extractToken()`, hasta consumir la totalidad del programa.
- Carpeta `BrainfuckAdder`: Contiene el autómata y los tipos enumerados correspondientes a ese lenguage.

Por otra parte, en la carpeta de nombre `parte3` dentro de `test` se encuentra `ManualLexerTest`, que usa la implementación de `BrainfuckAdder` incluída para testear `ManualLexer`.

## Consigna
**Completar ManualLexer.java de forma que pasen los tests en ManualLexerTest.java. Se recomienda iniciar por los tests de `extractToken` y luego continuar con los de `lex`.** No se permite modificar los tests de `ManualLexerTest.java`, si se considera necesario agregar más pruebas, crear un archivo con pruebas adicionales.

## Consejos
1. Hacer pasar primero los tests que evalúan la función `extractToken`, y luego pasar a los tests de `lex`.
2. En el texto _tiger_, sección 2.3, subtítulo _RECOGNIZING THE LONGEST MATCH_ se describe el algoritmo que "observa" al autómata. No incluye una descripción formal del pseudocódigo.

## pseudocódigo

Se propone a continuación un pseudocódigo aproximado de los métodos a completar como parte de la consigna. **No copiarlo tal cual ya que se excluyeron detalles importantes tales como índices, excepciones, algunas variables, etc**.

```
extractToken(programa){
    estadoActual= ESTADO_INICIAL
    ultimoEstadoFinal=ninguno
    for(cada caracter del programa){
        estadoActual= TRANSCICION(estadoActual,caracter)
        if(ES_FINAL(estadoActual)){
            ultimoEstadoFinal=estadoActual
        }
        if(estadoActual=ESTADO_MUERTO){
            return ultimoEstadoFinal, posfinal
        }
    }
}
```

```
lex(programa){
    tokens=[]
    while(programa no está vacío){
        token = extractToken(programa)
        programa = programa sin los caracteres del token
        tokens.agregar( token )
    }
}
```