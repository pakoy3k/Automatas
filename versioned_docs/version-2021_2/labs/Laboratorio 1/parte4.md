---
title: Parte 4 (1 horas)
sidebar_position: 5
---

## Consigna
**Completar las implementaciones de `EnglishCommander.java`, `Numbersoup.java` y `Lol.java` de forma que pasen los tests correspondientes, que utilizan `ManualLexer.java`.** Si surge la necesidad de agregar más test, se pueden crear nuevos archivos con test adicionales.

## Explicación detallada
En la carpeta `parte4` del código se encuentran los siguientes archivos:
```
main/java/ar/uba/fi/compiladores/parte4
├── EnglishCommander
│   ├── Automata.java
│   ├── State.java
│   └── TokenTypes.java
├── Lol
│   ├── Automata.java
│   ├── State.java
│   └── TokenTypes.java
└── Numbersoup
    ├── Automata.java
    ├── State.java
    └── TokenTypes.java
```

Mientras que en la carpeta de tests se encuentran los siguientes:
```
test/java/ar/uba/fi/compiladores/parte4
├── EnglishCommanderTest.java
├── LolTest.java
└── NumbersoupTest.java
```

Para cada lenguage, deben completarse el `Automata.java` y el enumerado de estados del autómata, es decir, `State.java`, y deben permanecer idénticos *el test correspondiente* y el archivo de nombre `TokenTypes.java`.

## Consejos
- Lo que hay que hacer en esta parte concretamente es "transcribir" a código los autómatas que se graficaron en la parte 2 a una función de transición y un listado de estados.
- Puede resultar de gran ayuda analizar la implementación de `BrainfuckAdder` para entender mejor cómo se maneja el estado muerto, los estados de error, etc.
