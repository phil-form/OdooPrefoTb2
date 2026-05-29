/*
    O(N!)

    Petit rappel de la factorielle : 
    3! = 1 * 2 * 3 = 6
    4! = 1 * 2 * 3 * 4 = 24
    ...
*/

function f(n)
{
    if(n === 0)
    {
        console.log("----- ZERO -----");
        return;
    }

    for(let i = 0; i < n; i++)
    {
        f(n - 1);
    }
}

f(3);