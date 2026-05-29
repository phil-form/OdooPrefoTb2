/**
 * Best : O(n)
 * Average : O(n^2)
 * Worst : O(n^2)
 * 
 * Space complexity : O(n)
 */
 arr = [];

 for(let i = 0; i < 100; i++)
 {
     arr.push(Math.floor(Math.random() * 100));
 }
 
//  console.log(arr);
 console.log(bubbleSort([5, 1, 3, 2, 9, 8]));

/*
    Le bubble sort est l'algorithme le plus simple :
        - On va parcourir le tableau et comparer chaque élément avec
          l'élément suivant.
        - Si l'élément du bas est plus grand que celui de l'index supérieur
          alors on les inverse.

    1 ère itération
        [5<=>1 , 3 , 2 , 9 , 8]
        [1 , 5<=>3 , 2 , 9 , 8]
        [1 , 3 , 5<=>2 , 9 , 8]
        [1 , 3 , 2 , 5---9 , 8]
        [1 , 3 , 2 , 5 , 9<=>8] FIN
    2 ème itération
        [1---3 , 2 , 5 , 8 , 9]
        [1 , 3<=>2 , 5 , 8 , 9]
        [1 , 2 , 3---5 , 8 , 9]
        [1 , 2 , 3 , 5---8 , 9]
        [1 , 2 , 3 , 5 , 8---9]

    Comme on peut le constater, après la première itération le dernier élément du tableau est déjà
    le plus grand.

    On peut donc optimiser l'algorithme en ne regardant plus les éléments que l'on sait triés
    (soit le dernier index de chaque itération).
*/

function bubbleSort(arr){
    let len = arr.length;

    let swapped = false;

    for(let i = 0; i < len; i++){
        for(let j = 0; j < len - i - 1; j++){
            if(arr[j] > arr[j + 1]){
                swapped = true;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                console.log(i, j, j + 1, arr);
            }
        }

        if (!swapped) {
            break;
        }

        swapped = false;
    }
    return arr;
 }
