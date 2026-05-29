/*
    La complexité logarithmique porte son nom car elle a une complexité de log 2 N (ou 2 est la base).

    Le graphique de la complexité de cette fonction est logarithmique.

    f(4)
        \ Level 1
        f(2)
            \ Level 2
            f(1)
    
    Ici nous avons eu des appels sur deux niveaux, ce qui est égal à log2(4) = 2

    f(8)
        \ Level 1
        f(4)
            \ Level 2
            f(2)
                \ Level 3 log2(8) = 3
                f(1)
    f(16)
        \ Level 1
        f(8)
            \ Level 2
            f(4)
                \ Level 3
                f(2)
                    \ Level 4 log2(16) = 4
                    f(1)

    Donc dans ce cas, nous avons un nombre de sous appels, de notre fonction récusive,
    égal au logarithme en base 2 de N. soit O(log N).
*/

function logarithmique(n)
{
    // O(1)
    if(n === 0)
    {
        return;
    }

    console.log(n); // O(1)
    n = Math.floor(n / 2); // O(1)

    logarithmique(n);
}

// logarithmique(65);

function lognEx(n)
{
    // Ici notre while loop a aussi une complexité de O(log N)
    // Car le nombre d'itération de notre loop sera égal au log2(N).
    while(n > 1)
    {
        console.log(n);
        n = Math.floor(n / 2);
    }
}

lognEx(65);