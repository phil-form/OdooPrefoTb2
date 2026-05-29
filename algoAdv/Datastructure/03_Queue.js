/*
    Une stack est une datastructure qui va fonctionner par le principe FIFO (First In First Out).
    C'est donc le première élément introduit dans la stack qui en sera retiré en premier.

    -------------
    | Element 1 |
    | Element 2 |
    | Element 3 |
    | Element 4 |
    | Element 5 |
    | Element 6 |
    | Element 7 |
    | Element 8 |
    -------------

    push(Element 9)

    -------------
    | Element 1 |
    | Element 2 |
    | Element 3 |
    | Element 4 |
    | Element 5 |
    | Element 6 |
    | Element 7 |
    | Element 8 |
    | Element 9 |
    -------------

    pop() => return Element 1

    -------------
    | Element 2 |
    | Element 3 |
    | Element 4 |
    | Element 5 |
    | Element 6 |
    | Element 7 |
    | Element 8 |
    | Element 9 |
    -------------

    Il existe aussi des double ended queue qui peuvent être utiliser en FIFO ou LIFO.
*/