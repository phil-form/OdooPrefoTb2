/**
 * Best : O(n^2)
 * Average : O(n^2)
 * Worst : O(n^2)
 * 
 * Space complexity O(1)
 */

/*
    à chaque ittération, on va sélectionner le plus petits élément
    de la partition non triée et le mettre dans une parition triée.

    On va garder en mémoire le minimum actuel (v) et l'élément actuel (^).
    
    On démarre avec v et ^ qui pointe au début de notre array.
     v
    [2, 8, 5, 3, 9, 4, 1]
     ^

    On parcoure ensuite notre array à la recherche d'un élément plus petit :
    Une fois trouvé on place v dessus et on continue de parcourir le tableau
    à la recherche d'un nouveau minimum.
     v                                          v
    [2, 8, 5, 3, 9, 4, 1] -> [2, 8, 5, 3, 9, 4, 1]
     ------------------^                        ^

    Comme on est à la fin de notre tableau, on inverse cette élément avec celui
    du début de notre tableau, qui devient notre premier élément trié.
    On déplace ensuite les pointeurs au premnier élément non trié.
        v
    [1| 8, 5, 3, 9, 4, 2]
        ^
    On déplace ensuite v et à la recherche du minimum, quand on trouve un 
    élément plus petit, on déplace ^ à cet élément.
        ---v                     ------v                  ---------------v
    [1| 8, 5, 3, 9, 4, 2] -> [1| 8, 5, 3, 9, 4, 2] -> [1| 8, 5, 3, 9, 4, 2]
        ---^                     ------^                  ---------------^

    Une fois arrivé à la fin on inverse le première élément non trié avec le 
    minimum.
           v
    [1, 2| 5, 3, 9, 4, 8]
           ^
    On répète enuiste l'opération :
           ---v                     ------------v
    [1, 2| 5, 3, 9, 4, 8] -> [1, 2| 5, 3, 9, 4, 8]
           ---^                     ---^
    
    On inverse donc cet élément et on le place dans notre parition triée.
              v
    [1, 2, 3| 5, 9, 4, 8]
              ^
              ------v                  ---------v
    [1, 2, 3| 5, 9, 4, 8] -> [1, 2, 3| 5, 9, 4, 8]
              ------^                  ------^
    
                 v
    [1, 2, 3, 4| 9, 5, 8]
                 ^
                 ---v                     ------v
    [1, 2, 3, 4| 9, 5, 8] -> [1, 2, 3, 4| 9, 5, 8]
                 ---^                     ---^

                    v
    [1, 2, 3, 4, 5| 9, 8]
                    ^
                    ---v 
    [1, 2, 3, 4, 5| 9, 8]
                    ---^
    
    Nous sommes enfin arrivé à la fin de notre tableau, celui-ci est donc trié.
                       v
    [1, 2, 3, 4, 5, 8| 9]
                       ^ 
*/

function swap(arr,xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
 
function selectionSort(arr,  n)
{
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;

        for (j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min_idx])
            {
                min_idx = j;
            }
        }
 
        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
    }
}