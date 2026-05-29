/**
 * Best : O(n)
 * Average : O(n^2)
 * Worst : O(n^2)
 * 
 * Space complexity O(1)
 */

/*
    Fonctionnement :
        - On va parcourir le tableau de droite à gauche.
        - On compare chaque élément avec l'élément à sa gauche.
        - Insérer l'item à sa position dans le tableau.
        - Nous obtiendrons des partitions triées et non triées.

    On parcoure le tableau, et on compare l'index actuel avec l'élément à sa gauche.
    N'ayant pas d'élément à sa gauche, nous le marquons comme trié et on incrémente v.
     v                          v
    [2, 8, 5, 3, 9, 4] -> [|2|, 8, 5, 3, 9, 4]

    Maintenant nous comparons 2 et 8, 2 < 8 nous ajoutons 8 à la partition triée.
    Et nous incrémentons v.
          v                         v
    [|2|, 8, 5, 3, 9, 4] -> [|2, 8| 5, 3, 9, 4]

    Maintenant nous comparons 8 et 5, 8 > 5, nous les inversons 8 par 5 dans
    nos 3 premier item sont donc dansla parition triée, on incrémente ensuite v.
            v                         v
    [|2, 8| 5, 3, 9, 4] -> [|2, 5, 8| 3, 9, 4]

    8 > 3, nous inversons donc leur position, puis 5 > 3, nous les inversons aussi.
               v                      v                      v
    [|2, 5, 8| 3, 9, 4] -> [|2, 5, 3| 8, 9, 4] -> [|2, 3, 5, 8| 9, 4] 
                  v                         v
    [|2, 3, 5, 8| 9, 4] -> [|2, 3, 5, 8, 9| 4]
                     v                      v
    [|2, 3, 5, 8| 9, 4] -> [|2, 3, 5, 8, 4| 9] -> [|2, 3, 5, 4, 8| 9] -> [|2, 3, 4, 5, 8, 9|]
*/

// Function to sort an array using insertion sort
function insertionSort(arr, n) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
}