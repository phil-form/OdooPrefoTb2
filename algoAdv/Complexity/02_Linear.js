/*
    La complexitée d'une fonction linéaire augmentera de manière linéaire par rapport à l'entrée.
*/

function linearFunction(arr)
{
    for(let i = 0; i < arr.length; i++) // O(N) au plus l'array sera grand au plus la fonction prendra du temps.
    {
        console.log(arr.length);    // O(1)
        let test = ((2000 * 5) / 2) + arr.length; // O(1)
        console.log(test); // O(1)
    }
}

function constantFunction(arr)
{
    console.log(arr.length);    // O(1)
}