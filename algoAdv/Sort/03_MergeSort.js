/**
 * Best : O(n log n)
 * Average : O(n log n)
 * Worst : O(n log n)
 * 
 * Space complexity O(n)
 */

/*
    Pour résoudre notre problème de tri, nous allons le réduire en plusieurs plus petits problèmes.

    [2, 8, 5, 3, 9, 4, 1, 7]

    Dans le merge sort, nous allons divisé notre tableau en deux, jusqu'a ne plus qu'avoir des 
    items individuel.

       [2, 8, 5, 3 | 9, 4, 1, 7]
      [2, 8 | 5, 3 | 9, 4 | 1, 7]
    [2 | 8 | 5 | 3 | 9 | 4 | 1 | 7]

    Maintenant que nous avons fini de splitter l'array, nous pouvons commencer le tri.
    Nous allons pour ce faire, regrouper les items deux par deux et les comparer/trié.
    [2 | 8 | 5 | 3 | 9 | 4 | 1 | 7]
      [2, 8 | 3, 5 | 4, 9 | 1, 7]

    Nos array temporaire sont trié, nous pouvons donc passer à l'étape suivante :
    [2, 8 | 3, 5 | 4, 9 | 1, 7]
     [2, 3, 5, 8 | 1, 4, 7, 9]

    Nous avons enfin plus que deux, tableau trié, nous pouvons donc les merge ensemble en les triants :
     [2, 3, 5, 8 | 1, 4, 7, 9]
      [1, 2, 3, 4, 5, 7, 8, 9]

    Nous avons maintenant notre tableau trié.

*/

arr = [];

for(let i = 0; i < 100; i++)
{
    arr.push(Math.floor(Math.random() * 100));
}

console.log(arr);
console.log(mergeSort(arr));

function mergeSort(arr) // O(log N)
{
    // On regarde si le tableau a une taille plus grande que 1
    // si on a qu'un élément alors l'array est déjà trié.
    if(arr.length < 2)
    {
        return arr;
    }

    // On cherhce l'index central de l'array et on split l'array en deux array à partir du centre.
    const middleIndex = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, middleIndex);
    const rightArr = arr.slice(middleIndex, arr.length);

    // On execute fait ensuite un mergeSort des deux sub-array.
    // const lArr = mergeSort(leftArr);
    // const rArr = mergeSort(rightArr);
    // et on fini par executer la fonction merge qui va fusioner et trié ces deux tableaux.
    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) // O(N)
{
    // on crée un nouveau tableau
    let resultArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // on parcourt les deux tableau jusqu'à arriver au bout de l'un d'eux
    /*
        Exemple d'itération :
        État de départ :
            resultArr []
            leftArr [2 <=, 14, 16]
            rightArr [1 <=, 4, 15]
        
        1ère itération :
            resultArr [1]
            leftArr [2 <=, 14, 16]
            rightArr [1, 4 <=, 15]

        2ème itération :
            resultArr [1, 2]
            leftArr [2, 14 <=, 16]
            rightArr [1, 4 <=, 15]
        
        3ème itération :
            resultArr [1, 2, 4]
            leftArr [2 <=, 14, 16]
            rightArr [1, 4, 15 <=]

        4ème itération :
            resultArr [1, 2, 4, 14]
            leftArr [2, 14, 16 <=]
            rightArr [1, 4, 15 <=]

        5ème itération :
            resultArr [1, 2, 4, 14, 15]
            leftArr [2, 14, 16 <=]
            rightArr [1, 4, 15]
    */
    while(leftIndex < leftArr.length && rightIndex < rightArr.length)
    {
        if(leftArr[leftIndex] < rightArr[rightIndex])
        {
            resultArr.push(leftArr[leftIndex]);
            leftIndex++;
        } else 
        {
            resultArr.push(rightArr[rightIndex]);
            rightIndex++;
        }
    }

    /*
        Le resultArr pour le moment ressemble à ça dans notre exemple : 
        [1, 2, 4, 14, 15] et nous pointons actuellement sur la dernière valeur de l'array ayant la plus haute valeur.
        leftArr [2, 14, 16 <=]
        rightArr [1, 4, 15]

        Nous pouvons donc utiliser concat et slice pour concatener les tableaux et mettre à la fin de resultArr
        la fin du tableau contenant le ou les plus grands nombre.

        leftArr.slice(leftIndex) = [16]
        rightArr.slice(rightIndex) = rien car rightIndex est l'index le plus haut du tableau.
        resulArr devient donc : [1, 2, 4, 14, 15, 16]
    */
    return resultArr.concat(leftArr.slice(leftIndex)).concat(rightArr.slice(rightIndex));
}