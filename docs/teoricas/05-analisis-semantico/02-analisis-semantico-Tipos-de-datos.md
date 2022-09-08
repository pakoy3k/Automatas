---
title: Analisis Semantico
sidebar_position: 2
---
### Tipos de Datos y  Verificación de Tipos

Una de las tareas principales de un compilador es el cálculo y mantenimiento de la información de tipos de datos (inferencia de tipos), y el uso detal información para asegurar que cada parte de un programa tenga sentido bajo las reglas detipo del lenguaje (verificación de tipos).

La información del tipo de dato puede ser estática o dinámica, o una mezcla de las dos.

​     LISP &#x2013;> Dinámica 

​     C, Ada &#x2013;> Estática

Teóricamente un tipo de dato es un conjunto de valores, o más precisamente, un conjunto de valores con ciertas operaciones sobre ellos.

En el terreno de la construcción de compiladores estos conjuntos por lo regular se describen mediante una expresión de tipo, que es un nombre de tipo &#x2013;> integer, o una expresión estructurada tal como array[1..10] of real.

La información de tipo puede almacenarse:

1 En la tabla de símbolos (ver tabla de símbolos)

2 En la tabla de tipos

1.  Introducción

    Un lenguaje de programación siempre contiene un número de tipos incluidos, llamados **tipos predefinidos**. Normalmente corresponden a tipos numéricos, dependientes de la arquitectura de la máquina. También tipos elementales como **char** o **boolean**. Éstos se denominan tipos **simples de datos**. Ejemplo: Enteros &#x2013;> complemento a 2.
    
    -   Dado un conjunto de tipos predefinidos, se pueden crear nuevos tipos de datos utilizando **constructores de tipos** (array, struct, record) .
    
    -   Estos constructores pueden veres como funciones que toman tipos existentes como parámetros y devuelven nuevos tipos con una estructura que depende del constructor; **tipos estructurados**.

2.  Tabla de tipos

    Generalmente, la tabla de tipos contiene información del nombre del tipo, el tamaño, el padre si se trata de un tipo compuesto, y alguna información más dependiendo del compilador.
    
    -   La tabla suele estar ordenada por el nombre del tipo ya que no se debe repetir el mismo tipo.
        -   Si el compilador **no admite ámbitos anidados** con una sola tabla, es suficiente.
        
        -   Si el compilador **admite ámbitos anidados**, es necesario gestionarlos mediante la utilización de una pila de tablas.
    
    1.  Los campos mínimos necesarios:
    
        -   Nombre: puede ser un int
            - Tipo base: se utiliza para tipos compuestos char[] &#x2013;> tipo base char
            
            - Padre: es el tipo en el caso de declarar registros o structs
            
            - Dimensión: número de elementos de un tipo predefinido contenido en un tipo estructurado
            
            - Mínimo: se utiliza para el caso de la definición de arreglos
            
            - Máximo: ídem, pero el máximo índice
            
            - Ámbito: es el ámbito donde se definió el tipo; normalmente inicia en 0, se va incrementando o decrementando según se mueva uno dentro de los distintos ámbitos. Cuando se sale de un ámbito se deben eliminar todos los tipos que declaramos en él
            
              
        
        | cod | nombre | tipo base | padre | dimension | min | max | amb |
        |--- |------ |--------- |----- |--------- |--- |--- |--- |
        |     |        |           |       |           |     |     |     |
        
        Ejemplo:
        
        ```Pascal
        Program P;
        
           Type vector = array[5..10] of integer;
           var v : vector;  x : integer;
        
           begin
              v[7] := 15;
              x:= v[7];
           end;
        ```
        
        Se procesa la línea 1.
        
        Tabla de tipos:
        
        | Cod | Nombre  | TipoBase | Padre | Dimensión | Mínimo | Máximo | Ámbito |
        |--- |------- |-------- |----- |--------- |------ |------ |------ |
        | 0   | integer | -1       | -1    | 1         | -1     | -1     | 0      |
        | 1   | boolean | -1       | -1    | 1         | -1     | -1     | 0      |
        
        Tabla de símbolos:
        
        | Cod | Nombre | Categoría | Tipo | NumPar | ListaPar | Dirección | Ámbito |
        |--- |------ |--------- |---- |------ |-------- |--------- |------ |
        |     |        |           |      |        |          |           |        |
        
        Se procesa la línea 2.
        
        Tabla de tipos:
        
        | Cod | Nombre  | TipoBase | Padre | Dimensión | Mínimo | Máximo | Ámbito |
        |--- |------- |-------- |----- |--------- |------ |------ |------ |
        | 0   | integer | -1       | -1    | 1         | -1     | -1     | 0      |
        | 1   | boolean | -1       | -1    | 1         | -1     | -1     | 0      |
        | 2   | vector  | 0        | -1    | 6         | 5      | 10     | 0      |
        |     |         |          |       |           |        |        |        |
        
        Tabla de símbolos:
        
        | Cod | Nombre | Categoría | Tipo | NumPar | ListaPar | Dirección | Ámbito |
        |--- |------ |--------- |---- |------ |-------- |--------- |------ |
        |     |        |           |      |        |          |           |        |
        
        Se procesa la línea 3.
        
        Tabla de tipos:
        
        | Cod | Nombre  | TipoBase | Padre | Dimensión | Mínimo | Máximo | Ámbito |
        |--- |------- |-------- |----- |--------- |------ |------ |------ |
        | 0   | integer | -1       | -1    | 1         | -1     | -1     | 0      |
        | 1   | boolean | -1       | -1    | 1         | -1     | -1     | 0      |
        | 2   | vector  | 0        | -1    | 6         | 5      | 10     | 0      |
        |     |         |          |       |           |        |        |        |
        
        Tabla de símbolos:
        
        | Cod | Nombre | Categoría | Tipo | NumPar | ListaPar | Dirección | Ámbito |
        |--- |------ |--------- |---- |------ |-------- |--------- |------ |
        | 1   | x      | variable  | 0    | -1     | null     | 9006      | 0      |
        |     |        |           |      |        |          |           |        |
        
        Gramática de declaraciones modula 2
        
        S &rarr; var id: T; 
        
        T &rarr; array[num.. num] of T;
        
         T &rarr; real | integer | char;
        
        Construir un traductor (transpilador) a C
        
        ```C
        int x;
        float y[4];
        ```
        
        Dada una gramática con atributos se debe:
        
        1.  Decidir los atributos y asignarlos a los símbolos
        
        2.  Se deben insertar las acciones semánticas necesarias
        
        3.  Tener en cuenta:
            
            i. Si todos los atributos son sintetizados, se pondrán las acciones S. Después de los atributos implicados, lo mejor es situarlos al final de la regla de producción. Los atributos sintetizados siempre hay que calcularlos después que hayan tomado valor los demás atributos.
            
            ii. Si hay atributos heredados:
            
            -   Un atributo heredado A.h **debe** calcularse antes que aparezca el símbolo A.
            -   Un atributo sintetizado A.S **no debe** utilizarse antes de que aparezca el símbolo A.
            
            iii. Una acción semántica no debe referirse a un atributo sintetizado de un símbolo a la derecha de la acción.
        
        Abributos no terminales
        
        T &rarr; **REAL** 
        
        ​    { 
        
        ​         T.array=""; 
        
        ​         T.tipo="float"; 
        
        ​    } 
        
        | **INTEGER** 
        
           {
        
        ​       T.array=""; 
        
        ​       T.tipo="int"; 
        
        ​    } 
        
        | **CHAR** 
        
        ​    { 
        
        ​        T.array=""; 
        
        ​         T.tipo="char"; 
        
        ​     }
        
        
        
        T &rarr; array[num.. num1] of T1; 
        
        ​    {
        
        ​        T.Tipo=T1.Tipo;
        
        ​         int lbound=atol(num); 
        
        ​         int hbound=atol(num1); 
        
        ​         int indice=hbound-lbound; 
        
        ​         if [T.array=='/0'] 
        
        ​        {
        
        ​              T.array="[" + str(indice) + "]"; 
        ​         } 
        
        ​        else 
        
        ​        { 
        
        ​               T.array="[" + str(indice) +"]" + T1.array; 
        
        ​        } 
        
        }
        
        S &rarr; var id: T; 
        
        ​         { 
        
        ​          if [T.array=='/0'] 
        
        ​                 S.trad= T.tipo + id.lexema +";"; 
        
        ​           else 
        
        ​                 S.trad= T.tipo. + id.lexema + T.array " ";"; }
        
        Ejercicio:
        
        Dada la siguiente gramática :
        
        E &rarr; E + E
        
        E &rarr; E \* E
        
        E &rarr; (E)
        
        E &rarr; num | id
        
        num es int, id un identificador de la tabla de símbolos.



