---
title: Parte 2 (1 horas)
sidebar_position: 4
---
# Parte 2: parseos específicos
En esta parte se trabaja con una clase llamada `LL1Machine`. Implementa la (escasa) lógica propia del parser LL1, exponiendo 2 operaciones (Louden 4.2.1):
1. apply: Reemplazar un no terminal de la parte superior de la pila por una cadena, aplicando una regla gramatical (se desapila el terminal y se apilan los símbolos de la derecha de la regla).
2. match: Eliminar el token superior de la pila y el primer token de la frase, si es que coinciden.

A partir de las llamadas a la aplicación de reglas gramaticales y a `match`, `LL1Machine` genera un *árbol de análisis gramatical*, que es una representación directa del proceso de parsing. El recorrido *preorder* de este árbol se utiliza para testear las derivaciones manuales.

Esta parte consiste en completar los métodos `ex1`, `ex2` y `ex3` del archivo `ManualParser.java` con llamadas a los métodos de `LL1Machine` sin incorporar ningún tipo de lógica. Es decir, `ex1`, `ex2` y `ex3` deben ser casos particulares para cada uno de los 3 ejemplo presentados en `ManualParserTest.java`, y no deben incorporar condiciones ni ciclos para automarizar el parseo. 

## Consigna
**Completar los métodos de `ManualParser.java` de forma que pasen los tests de `test/.../parte2/ManualParserTest.java`.** Los métodos de `ManualParser.java` deben estar conformados unicamente por llamadas a los métodos públicos de la instancia de `LL1Machine` pasada como arguento.

:::tip
Las instrucciones de `ManualParser.java` tendrán cierta relación con el contenido  de `Derivations.java`, lo cual puede ser útil para resolver este ejercicio más rápido.
:::