/*
    Binary Search trees

    Imaginons un array qui est dans l'ordre. Disons que je veuille savoir si la valeur 100 se trouve dedans.

    1 | 2 | 12 | 23 | 32 | 42 | 54 | 55 | 100 | 134

    La manière la plus simple de savoir si l'array contient bien 100 serait de parcourir celui ci et d'en comparer chaque valeur.
*/

let arr = [1, 2, 12, 23, 32, 42, 54, 55, 100, 134]

for(let i = 0; i < arr.length; i++)
{
    if(arr[i] === 100)
    {
        console.log("FOUND");
        break;
    }
}

/*
    Cette méthode fonctionne bien sur les petits tableaux, mais sera particulièrement gourmande pour les tableaux de grande taille,
    car sa complexité est linéaire (soit O(N) ).

    Serait-il possible de faire en sorte d'avoir un algorithme de recherche plus rapide ?

    Voyons la méthode du binary search.

    Pour cette méthode, nous allons diviser le tableau en deux parties égales et ensuite nous allons vérifier si la valeur cherchée
    est plus grande ou plus petite que la valeur centrale. Si celle-ci est plus grande, alors nous faisons la même chose sur la partie
    supérieure du tableau, sinon sur la partie inférieure.
*/

// arr = [1, 2, 12, 23, 32, 42, 54, 55, 100, 134]
arr = [];

for(let i = 1; i <= 1000000; i++)
{
    arr.push(i);    
}
let start = 0;
let end = arr.length -1;
let itteration = 0;
let value = 10;

console.log(binarySearch(arr, start, end, value));
console.log(`itterations : ${itteration} instead of ${value}`);

function binarySearch(arr, start, end, value)
{
    if(start > end || end >= arr.length)
    {
        return { found: false, error: "start or end index invalid!" };
    }

    let mid = Math.floor((start + end) / 2);
    console.log(`start : ${start}, end : ${end}, mid : ${mid}`);
    console.log(arr.slice(start, end + 1));
    console.log(`size : ${arr.slice(start, end + 1).length}`);
    itteration++;

    if(arr[mid] === value)
    {
        return { found: true, index: mid };
    }

    if(arr[mid] > value)
    {
        return binarySearch(arr, start, mid - 1, value);
    } else 
    {
        return binarySearch(arr, mid + 1, end, value);
    }
}

class BTNode
{
    constructor(key, data)
    {
        this.key = key;
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree
{
    constructor()
    {
        this.root = null;
    }

    insert(key, data)
    {
        var newNode = new BTNode(key, data);

        if(this.root === null)
        {
            this.root = newNode;
        } else 
        {
            this.insertIntoNode(this.root, newNode);
        }
    }

    insertIntoNode(node, newNode)
    {
        if(newNode.key < node.key)
        {
            if(node.left === null)
            {
                node.left = newNode;
            } else 
            {
                this.insertIntoNode(node.left, newNode);
            }
        } else 
        {
            if(node.right === null)
            {
                node.right = newNode;
            } else 
            {
                this.insertIntoNode(node.right, newNode);
            }
        }
    }

    remove(key)
    {
        this.root = this.removeFromNode(this.root, key);
    }

    removeFromNode(node, key)
    {
        if(node === null)
        {
            return null;
        }

        if(key < node.key)
        {
            node.left = this.removeFromNode(node.left, key);
            return node;
        }

        if(key > node.key)
        {
            node.right = this.removeFromNode(node.right, key);
            return node;
        } else 
        {
            if(node.left === null && node.right === null)
            {
                node = null;
                return node;
            }

            if(node.left === null)
            {
                node = node.right;
                return node;
            } else if(node.right === null)
            {
                node = node.left;
                return node;
            }
            let aux = this.findMin(node.right);
            node.data = aux.data;
            node.key = aux.key;
            
            node.right = this.removeFromNode(node.right, aux.key);
            return node;
        }
    }

    searchFromRoot(key)
    {
        return this.search(this.root, key);
    }

    search(node, key)
    {
        if(node === null)
        {
            return null;
        }

        if(key < node.key)
        {
            return this.search(node.left, key);
        } else if(key > node.key)
        {
            return this.search(node.right, key);
        }

        return node;
    }

    findMin(node)
    {
        if(node.left === null)
        {
            return node;
        }
        return this.findMin(node.left);
    }

    getRootNode()
    {
        return this.root;
    }

    printBTree(node)
    {
        if(node !== null)
        {
            this.printBTree(node.left);
            console.log(node.data);
            this.printBTree(node.right);
        }
    }
}

var btree = new BinarySearchTree();
btree.insert(15, "15");
btree.insert(25, "25");
btree.insert(10, "10");
btree.insert(7, "7");
btree.insert(22, "22");
btree.insert(17, "17");
btree.insert(13, "13");
btree.insert(5, "5");
btree.insert(9, "9");
btree.insert(27, "27");

console.log("print base tree");
var root = btree.getRootNode();
btree.printBTree(root);

console.log("Remove");
btree.remove(5);
btree.printBTree(root);
console.log("Remove");
btree.remove(15);
btree.printBTree(root);

console.log(btree.search(root, 22));