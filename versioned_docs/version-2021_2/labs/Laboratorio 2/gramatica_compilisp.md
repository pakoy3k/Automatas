---
title: Gramática de compilisp
sidebar_position: 6
---

A lo largo de las siguientes secciones se utilizará la siguiente gramática de lisp, expresada como EBNF

$$
input \rightarrow \{ line \}
$$
$$
line \rightarrow [sExp] \text{ \n}
$$

$$
sExp \rightarrow atom | list
$$

$$
atom \rightarrow \text{number} | \text{symbol} | \text{string}
$$

$$
list \rightarrow \text{( )} 
| \text{ ( } \{sExp\} \text{ ) } 
| \text{ ( } \{sExp\} \text{ . } sExp \text{ ) } 
| \text{ ' } sExp
$$