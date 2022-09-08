---
title: 'Parte 2 (0.5 horas)'
sidebar_position: 3
---
## ¿Cómo derivar un programa a partir de un listado de regexes?
Es posible convertir el listado de expresiones regulares en un _autómata finito determinístico_ (DFA). Tal como descripto en Tiger 2.4 y Dragon 3.7, cada expresión regular se convierte en un _autómata finito no determinístico_ (NFA) de forma directa. Luego se combinan los NFA en un único NFA, que se convierte a un DFA por medio de un algoritmo.

### Ambigüedades

Algunos strings pueden interpretarse como más de un tipo de token. Por ejemplo, en C, la secuencia de caracteres `while` podría interpretarse como una variable, ya que está compuesta de caracteres alfanuméricos y no inicia con un número. Sin embargo, el lexer de C la interpreta como un token. Esto sucede porque los keywords tienen mayor prioridad que las variables. En los ejercícios de esta sección, los tokens están ordenados de más prioritario a menos prioritario. Por ejemplo en el caso de English Commander, `DO` es un DO pero no una palabra; en Numbersoup `0110` es un BIN pero no un BINHEX.

## Cómo graficar

No es necesario incluir el estado muerto ni el estado inválido ni las transiciones a los mismos. Al respecto de esto, seguir la figura 2.7 del tiger book, que representa el DFA abusando la notación. Recomendamos evitar incluir estos estados (ni las transiciones correspondientes) para que el diagrama sea más claro y sencillo.

## Consigna
Diseñar el diagrama de los DFA correspondientes a los lenguajes descriptos a continuación. Se recomienda usar draw.io .

### Brainfuck adder
|Descripcion informal|tipo de token|
|-|-|
|signo `+`| suma |
|signo `-`| resta |
|secuencia de signos `+` y `-`| número entero |

### English Commander
|Descripcion informal|tipo de token|
|-|-|
|palabra `DO`|DO|
|palabra `DON`|DON|
|palabra `DONE`|DONE|
|cualquier palabra| palabra |

### Numbersoup
|Descripcion informal|tipo de token|
|-|-|
|número binario|BIN|
|número decimal|DEC|
|número hexadecimal|HEX|
|número hexadecimal seguido de `x` seguido de un número binario| BINHEX |

### LOL
Ejemplos

```
PARARARARA LOLOLOLOLO LIRIRIRIRILILI PEPEPE
```

```
PA PE LI LO RI
```

|Descripcion informal|tipo de token|
|-|-|
|Palabra compuesta por las sílabas `PA` y/o `RA`|#A|
|Palabra compuesta por las sílabas `PE`|#E|
|Palabra compuesta por las sílabas `RI` y/o `LI`|#I|
|Palabra compuesta por las sílabas `LO`|#O|
