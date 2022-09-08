---
title: Introducción
sidebar_position: 1
---
## Bibliografía

Tiger book: 2.1, 2.2, 2.3

## ¿Qué es un lexer? (tiger 2.1)
Un lexer convierte una secuencia de caracteres en una secuencia de **tokens**.

### Ejemplo

Fragmento de código:
```c
float matchO(char *s) { /* find a zero */
    if (!strncmp(s, "0.0", 3))
    return 0.;
}
```

Secuencia de tokens que podría extraer el lexer de C:

```python
    [
        
        (KEYWORD_FLOAT), (ID,"match0"), (LEFT_PAREN), (KEYWORD_CHAR), (STAR), (ID,"s"),(RIGHT_PAREN), (LEFT_BRACE),

        (KEYWORD_IF),(LEFT_PAREN),(BANG),(ID,"strcmp"),(LEFT_PAREN),(ID,"s"),(COMMA),(STRING,"0.0"),(COMMA),(NUM,"3"),(RIGHT_PAREN),(RIGHT_PAREN),

        (KEYWORD_RETURN),(REAL,"0."),(SEMICOLON),
        
        (RIGHT_BRACE),
        
        (EOF),
    ]
```

Notar que:
- El lexer hace desaparecer los comentarios
- El lexer hace desaparecer el espacio en blanco

## ¿Cómo describe un lexer? (tiger 2.2)
Para describir un lexer, lo único que necesitamos es un listado de expresiones regulares. Las expresiones regulares que están más arriba tienen mayor prioridad que las que están más abajo en la lista.

### Ejemplo
Algunas de las expresiones regulares que podría haber en el ejemplo anterior:

| Expresión regular | tipo de token |
|-|-|
| `float`   | `KEYWORD_FLOAT` |
| `(`       | `LEFT_PAREN` |
| `[0-9]+`  | `NUM`  |
|`([0-9]+\.[0-9]*)\|([0-9]*\.[0-9]+)`| `REAL` |
| `[a-z][a-zO-9]*` | `ID`|

Notar que:
- `float` podría interpretarse como un `ID`, pero se interpreta como `KEYWORD_FLOAT`, debido a su posición en la lista
- `floated` sería un `ID` y no un `KEYWORD_FLOAT` con un `ed` colgando, debido a que el lexer busca la coincidencia más larga (_longest match_).