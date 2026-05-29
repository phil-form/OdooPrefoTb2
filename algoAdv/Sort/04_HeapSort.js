/**
 * Best : O(n log n)
 * Average : O(n log n)
 * Worst : O(n log n)
 * 
 * Space complexity O(1)
 */

/*
    Quelques définitions :
        - un heap est un binary tree ordonné.
        - C'est un max heap quand le parent > que l'enfant.

    Exemple d'un max heap :
    [9, 8, 3, 1, 5, 2]

            9
           / \
          /   \
         8     3
        / \    /
        1  5  2

    Nous allons avoir besoin de plusieurs fonctions :
        - build max heap :
            Celle-ci créera un max heap à partir d'un unordered array.
        - heapify :
            Elle fera la même chose que le max heap, mais supposera qu'une
            partie est déjà ordonnée.

    Exemple de fonctionnement de l'algorithme :

    [2, 8, 5, 3, 9, 1]
    
            2
           / \
          /   \
         8     5
        / \    /
        3  9  1

    On va appeler max heap pour créer un max heap de l'array :

    [9, 8, 5, 3, 2, 1]
    
            9
           / \
          /   \
         8     5
        / \    /
        3  2  1

    Nous allons maintenant swap le tree root avec le dernière élément de l'array.

    [1, 8, 5, 3, 2, 9]
    
            1
           / \
          /   \
         8     5
        / \    /
        3  2  9

    Nous pouvons maintenant considérer 9 comme étant trié (vu que c'était l'élément le plus grand).

    [1, 8, 5, 3, 2, 9]
    
            1
           / \
          /   \
         8     5
        / \    /
        3  2  9
    Nous pouvons maintenant appeler heapify car seulement notre 1 n'est plus à sa place dans le tree.
    9 a été retiré du tree.

    [1, 8, 5, 3, 2| 9]  ->  [8, 1, 5, 3, 2 | 9]  -> [8, 3, 5, 1, 2 | 9]
    
            1                   8               8
           / \                 / \             / \
          /   \               /   \           /   \
         8     5     -->     1     5   -->   3     5
        / \   //            / \             / \
        3  2  9            3  2            1  2

    Maintenant que nous avons de nouveau un max heap nous pouvons interchanger le max avec le dernier
    élément du tableau. Nous pouvons considérer 8 comme étant trié.

    [2, 3, 5, 1 | 8 | 9]
    
            2
           / \ 
          /   \ 
         3     5
        / \\
        1  8

    Nous allons rappeler heapify sur cette pour recréer le maxheap :

    [2, 3, 5, 1 | 8 | 9] -> [5, 3, 2, 1 | 8 | 9] 
    
            2               5
           / \             / \
          /   \           /   \
         3     5         3     2
        /               /
        1               1

    Nous allons encore une fois place le tree root à la fin de notre tableau :

    [1, 3, 2 | 5 | 8 | 9] 
    
            1
           / \ 
          /   \ 
         3     2 
        //
        5

    On rappel heapify :

    [1, 3, 2 | 5 | 8 | 9]  -> [3, 1, 2 | 5 | 8 | 9]
    
          1               3
         / \    -->      / \
        3   2           1   2

    Et on replace le root à la fin :

    [2, 1 | 3 | 5 | 8 | 9]
    
          2
         / \\
        1   3
        
    On rappel heapify (qui ne changera rien dans ce cas)

    [2, 1 | 3 | 5 | 8 | 9]
    
        2
       /
      1

    et ensuite on replace notre root à la fin : 

    [1 | 2 | 3 | 5 | 8 | 9]
    
        1
       //
      2

    Maintenant nous n'avons plus qu'un index le tableau est donc trié.
*/

 arr = [];

 for(let i = 0; i < 100; i++)
 {
     arr.push(Math.floor(Math.random() * 100));
 }
 
//  console.log(arr);
 console.log(buildMaxHeap([5, 1, 3, 2, 9, 8]));
 console.log(heapSort([5, 1, 3, 2, 9, 8]));

function heapSort(arr)
{
    // On construit le max heap.
    buildMaxHeap(arr);

    // On récupère l'index le plus élevé.
    let end = arr.length - 1;
    
    while(end > 0)
    {
        // On inverse l'index le plus élevé avec l'index 0;
        swap(arr, 0, end);
        // On appel heapify pour recréer le max heap.
        heapify(arr, 0, end);
        end--;
    }

    return arr;
}

function buildMaxHeap(arr)
{
    let i = Math.floor((arr.length / 2) - 1);

    // On parcourt le tableau dans le sens inverse
    // Et on appelle heapify sur un array de plus en plus grand
    // On part de i (qui est égal à la moitier du tableau)
    // et on va jusqu'à 0. Ce qui va créer un max heap de notre tableau.
    while(i >= 0)
    {
        heapify(arr, i, arr.length);
        i--;
    }

    return arr;
}

function heapify(arr, i, max)
{
    let index;
    let leftChild;
    let rightChild;

    // tant que i < que le max.
    while(i < max)
    {
        index = i;

        // on récupère le left child de i
        leftChild = (2 * i) + 1;
        // ainsi que son right child
        rightChild = leftChild + 1;

        // si le leftChild est un index valide et qu'il est plus petit
        // que l'index, alors l'index devient le leftChild (on cherche le plus petit enfant)
        if(leftChild < max && arr[leftChild] > arr[index])
        {
            index = leftChild;
        }

        // Pareil mais cette fois avec le right child.
        if(rightChild < max && arr[rightChild] > arr[index])
        {
            index = rightChild;
        }

        // Si l'index est toujours égal à i alors, il n'y a rien à faire.
        if(index === i)
        {
            return;
        }

        // On swap i avec l'index sélectionner (soit le plus petit enfant).
        swap(arr, i, index);
        console.log(i, index, arr);

        // on passe l'index comme étant le nouveau parent à regarder.
        i = index;
    }
}

function swap(arr, i, j)
{
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}