/*
    La complexitée exponentielle va progresser en fonction de 2^N (ou 3^N, soit un nombre supérieur à 1 exposant l'entrée).

    Dans la fonction suivante nous avons un nombre d'appel par niveau égal à 2 ^ N.
*/

function exponentialEx(n)
{
    if(n === 1)
    {
        return 1;
    }

    return exponentialEx(n - 2) + exponentialEx(n - 1);
}

/*
    si n = 0 ou 1 

        fib(1)  O(N)

    si n = 2

        fib(2)
        /   \
    fib(1)  fib(0)  O(2^1)

    si n = 3 
                fib(3)
                /   \
        fib(2)          fib(1)
        /   \
    fib(1)  fib(0)

    si n = 4 

                    fib(4)
                    /   \
              fib(3)            fib(2)      O(2^1)
              /   \             /   \
        fib(2)     fib(1)   fib(1)  fib(0)  O(2^2)
        /   \
    fib(1)  fib(0)                          si on compte que les appels de toutes les fonctions supérieurs sont faites on obtient O(2^3)

    Donc en réalité notre fonction fib est une fonction O(2^N-1) mais comme on ignore les constantes cela fait une complexité de O(2^N).
*/

function fib(n)
{
    if(n === 0)
    {
        return 0;
    }

    if(n === 1)
    {
        return 1;
    }

    return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));