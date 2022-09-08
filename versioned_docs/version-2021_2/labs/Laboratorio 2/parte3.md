---
title: Parte 3 (1 hora)
sidebar_position: 5
---
# parte 3: parseo general

En esta sección del trabajo práctico se construye la parte del parser que determina qué acción llevar a cabo sobre la `LL1Machine` a partir de la menor cantidad de información posible. El algoritmo de decisión se aisló de forma que haya que escribirlo en el método `parse` de `AutomaticParser.java`. La característica definitoria de los parsers LL(1) es justamente que pueden trabajar a partir de esta poquísima información.

El método `parse` incluye la parte del algoritmo donde se accede la tabla de análisis sintáctico. Formalmente, esto requeriría la construcción de los conjuntos $Primero(A)$ y $Siguiente(A)$, tal como descripto en la teórica. En este caso no es necesario calcular la tabla explicitamente sino que se puede diseñar informalmente.

## Consigna

**Completar el métodos de `AutomaticParser.java` de forma que pasen los tests de `test/.../parte3/AutomaticParserTest.java`.**.

## Consejos
1. `LL1Machine` detecta casos en los cuales `parse()` no llama ningún método, o realiza más de una invocación. Evitar estos casos.
2. Aprovechar los casos `default` de las estructuras `switch`, bloques `else`, etc. No es necesario especificar la tabla con excesiva precisión.
