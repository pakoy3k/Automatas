---
title: Parte 5 (1 horas)
sidebar_position: 8
---
# Parte 5: Completar Calc.y

Se provee `Calc.y`, que implementa una parte del [lenguaje de operaciones matemáticas](./gramatica), además de las clases `CalcToken` y `CalcFakeLexer`, que implementan un lexer a partir de un listado de tokens literal, evitandonos de esta forma integrar jlex. 

Se proveen además algunos test ya implementados en `AdditionCalcTest.java`. 

:::tip
No se recomienda implementar las mismas reglas de sintaxis que en [la definición LL1](./gramatica).
:::

## Consigna
**Modificar  `Calc.y` de forma que pasen los tests de `test/.../parte5/CalcTest.java`.**. Deben agregarse las reglas de producción de la multiplicación y las expresiones entre paréntesis.
