/*
    La complexité quadratique évoluera en fonction du carré de l'entrée.
*/

function linearFunction(arr)
{
    // La complexité de cet algorithme contient donc des constantes que l'on ne prend pas en compte.
    // Ainsi que deux O(N), ce qui donne O(N * N) soit O(N^2)
    for(let i = 0; i < arr.length; i++) // O(N) au plus l'array sera grand au plus la fonction prendra du temps.
    {
        for(let j = 0; j < arr.length; j++) // O(N)
        {
            console.log(arr.length);    // O(1)
            let test = ((2000 * 5) / 2) + arr.length; // O(1)
            console.log(test); // O(1)
        }
    }
}