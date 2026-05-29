/**
 * Best : O(n log n)
 * Average : O(n log n)
 * Worst : O(n^2)
 * 
 * Space complexity : O(log n)
 */

/*
    Le quick sort, comme le merge sort est une algorithme qui va diviser notre tableau 
    pour le trier. Pour ce faire on va utiliser un pivot et trier ce qui est plus grand
    à sa droite et ce qui est plus petit à sa gauche.

    On va d'abord devoir passer une première fois en choissisant un pivot (généralement on
    utilisera l'index le plus bas). Ensuite on trie tout ce qui est plus grand que cet index.
    à sa droite et le reste à sa gauche.

    Une fois qu'on a classer ces éléments on répète l'opération sur les deux sous tableau,
    donc sur les éléments à sa droite, et sur les éléments à sa gauche.

    On fait ensuite celà de façon récursive jusqu'à ne plus qu'avoir un tableau d'une taille de 1.

    Exemple : 
    
    On sélectionne un pivot (ici je vais prendre l'élément avec le plus grand index)
                    p
    [2, 6, 5, 1, 7, 3]

    Nous allons ensuite parcourir le tableau avec deux pointeurs :
        - un qui nous servira à déterminer la position à laquelle partionner le tableau. (v)
        - l'autre qui parcourera le tableau et vérifiera si l'élément est plus petit 
          ou plus grand que notre pivot (^)
    Au début ces deux pointeurs pointeront le même élément.

     v              p
    [2, 6, 5, 1, 7, 3]
     ^
    
    Maintenant nous vérifions si l'élément est plus petit que le pivot :
        5 > 8, nous allons donc, inverser 5 avec l'index pointé par ^ (soit avec lui même)
        Nous allons aussi incrémenter ^ et v de 1
     v              p
    [2, 6, 5, 1, 7, 3]
     ^
    Ici l'élément est plus grand, donc nous n'incrémentons que v.
        v           p
    [2, 6, 5, 1, 7, 3]
        ^
    Nous refaisons la même opération car 5 > 3
           v        p
    [2, 6, 5, 1, 7, 3]
        ^
    
    Maintenant 1 < 3 donc nous allons swapper ^ et v et les incrémenter.
              v     p                 v     p
    [2, 6, 5, 1, 7, 3]  ->  [2, 1, 5, 6, 7, 3]
        ^                       ^
    7 étant plus grand que 3, nous ne faisons qu'incrémenter v, mais nous sommes 
    à la fin du tableau. Nous ne faison donc rien, mais inverson p et ^
                 v  p                    v  p
    [2, 1, 5, 6, 7, 3]  ->  [2, 1, 3, 6, 7, 5]
           ^                       ^
    Maintenant tous les éléments à droite de ^ sont plus grand que ^ 
    et ceux à gauches sont plus petits.

    Nous allons donc paritionner notre tableau en deux à partir de ^
    [2, 1] et [6, 7, 5]

    Nous refaisons la même opération sur ces deux partitions :

    Ici on doit swap v et ^ et incrémenter, ensuite on incrémente, 
    comme on est au bout on inverse p et ^
     v  p      v  p
    [2, 1] -> [1, 2]
     ^         ^
    les nouvelles paritions ayant une taille de 1, on ne refais donc plus l'opération 
    et celles ci sont triées.

    6 > 5  on ne fait rien et incrémente v
     v     p
    [6, 7, 5]
     ^
    7 > 5  on ne fait rien et incrémente v, comme on ne peut plus
    l'incrémenter on échange p et ^
        v  p         v  p
    [6, 7, 5] -> [5, 7, 6]
     ^            ^
    
    Nouvelles partitions :
    [] [7, 6]

    7 > 6 on incrémente v, mais on ne sais plus incrémenter v donc on swap p et ^
     v  p      v  p
    [7, 6] -> [6, 7]
     ^         ^

    Nous nouvelles paritions ont une taille de 1 donc on ne sais plus les diviser.
    Nous avons donc les partitions suivantes dans cette ordre :
    [1] [2] [3] [5] [6] [7]

    Comme ces paritions sont toutes une partie d'un même tableau, nous avons donc le 
    tableau trié suivant :
    [1, 2, 3, 5, 6, 7]
*/
 arr = [];

 for(let i = 0; i < 100; i++)
 {
     arr.push(Math.floor(Math.random() * 100));
 }
 
// console.log(arr);
// console.log(quickSort(arr, 0, arr.length - 1));
console.log(quickSort([5, 1, 3, 2, 9, 8], 0, 5));

function swap(arr, i, j)
{
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;

    console.log(i, j, arr);
}

/* This function takes last element as pivot, places
   the pivot element at its correct position in sorted
   array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   of pivot */
function partition(arr, low, high) {
 
    // pivot
    let pivot = arr[high];
    console.log(pivot);
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = low;
 
    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller
        // than the pivot
        if (arr[j] < pivot) {
            // Increment index of
            // smaller element
            swap(arr, i, j);
            i++;
        }
    }
    swap(arr, i, high);

    return i;
}
 
/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
function quickSort(arr, low, high) {
    if (low < high) {
        // pi is partitioning index, arr[p]
        // is now at right place
        let pi = partition(arr, low, high);
        console.log(low, high, pi);
        // Separately sort elements before
        // partition and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }

    return arr;
}