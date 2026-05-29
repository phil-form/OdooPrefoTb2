/*
    Les binary trees sont très intéressent, mais il y a toujours un problème.

    Que ce passe t'il si le binary tree ressemble à ça : 

            17
           /
          11
         /
        8
       /
      5
     /
    1

    Dans ce cas, on perds tous les avantages du binary tree et le binary tree se comporte comme une liste.
    Donc pour retrouver la node 1 nous aurons besoin de parcourir toutes les nodes.

    Pour palier à ce problème nous avons les Balanced search trees. Ces arbres vont tendre à respecter une complexitée de O(log n).

    Un Red Black tree est un balanced binary tree spéciale respectant un certains nombre de critères :
        - Les nodes sont soit rouges soit noir
        - La root et les leaves (NIL) du tree sont noir
        - Si une node est rouge, alors elle DOIT avoir des enfants noir.
        - Tous les chemins menant d'une node à ses descendant NILs contiennent le même nombre de node noire.

    Un petit exemple :

            8 B
           /   \
         5 R   15 R
         / \    |  \
       NIL NIL 12 B 19 B
               / |   /   \
              /  |   NIL  23 R
            9 R  13 R     /  \
            / |  |  \    NIL  NIL
         NIL NIL NIL NIL
    
    Ce que ce tree respecte :
        - Le root node et tous les nils nodes sont noire
        - Toutes les nodes rouges ont des enfants noir.
        - Tous les chemins d'une node vers ses descendants noirs ont le même nombre de node noires. 
          Ici le RBT a une black height de 2 (on ne compte pas la node de départ Donc ici 8 -> 5 B++ -> NIL B++ 
          ou 8 -> 15R -> 12B++ -> 13R -> NIL B++).
          Chaque node a sa propre black height (5 a une black height de 1).

    Le chemin le plus long depuis la root vers un NIL n'est pas plus long que deux fois la longeur du chemin le plus court.

    Pour pouvoir blancé un red black tree, nous devrons utiliser des rotations, leur but sera :
        - Modifier la structure du tree pour réaranger ses sub-trees.
        - Réduire la hauteur du tree.
            - max height de O(log n)
            - On peut modifier la taille en montant les sub trees plus large et en descendant les sub-trees plus petit.
        - Les rotations ne modifie pas l'ordre des éléments (les éléments plus large resteront à droite et les plus petits seront à gauche)
    
    Left rotation :
            5                   10
           / \                 /  \
          /   \               /    \
         2    10      ->     5     12
             /  \           / \
            /    \         /   \
           8     12       2     8
          / \                  / \
         /   \                /   \
        6     9              6     9
    
    L'enfant de 10 plus petit que 10 devient l'enfant plus grand que 5 et 10 devient le parent de 5.
    La right rotation est la même chose mais dans le sense inverse, donc l'enfant le plus grand de 5 devient l'enfant le plus petit de 10
    et 5 devient le parent de 10 (soit dans le sense inverse).

    Pseudo code :

    y = x.right                 // set y
    x.right = y.left            // tourne le subtree gauche de y dans le subtree droit de x
    if y.left != NIL
        y.left.parent = x
    y.parent = x.parent         // lie les parents de x à y
    if x.parent == NIL          // si le parent de x est NIL
        T.root = y              // alors le tree root = y
    else if x == x.parent.left  // si non si x l'enfant de gauche de son parent
        x.parent.left = y       // alors y devient l'enfant de gauche
    else            
        x.parent.right = y      // si non y devient l'enfant de droite.
    y.left = x                  // on place x à gauche d'y
    x.parent = y                // y devient le parent de x.

    La complexitée de cette algorithme est de 1.

    Insertion :
    
    Petit rappel :
                B B
               / \
              D B A R
                 /
                Z R
    
    B est le grand parent de Z
    D est l'oncle de Z
    A est la parent de Z.

    Les étapes d'une insertion :
        - La node insérée est de couleur rouge. (On colorie la node en rouge, ce qui violera sans doute l propriété 2 et 3, qui sont simple à résoudre)
        - On va recolorer et faire des rotations de node pour palier à la violation des règles régissant le RBT.

    Une fois une node insérée il y a 4 scénarios possibles :
        - La node insérée peut être la root
        - L'oncle de la node insérée peut être rouge
        - L'oncle de la node insérée peut être noir (deux cas possible triangle ou ligne)
                
    Solution :
        - Si la node insérée est la root :
            - La node étant rouge, on la recolorie pour qu'elle soit noire.

        - Si la node insérée a un oncle rouge :
            - on recolore le parent, l'oncle et les grands parents.

        - Si la nouvelle node, son parent et son grand parent forme un triangle :
            B B
             \
              A R
             /
            Z R

            Alors on fait une rotation de A et Z
            B B
             \
              Z R
               \
                A R
        - Si la nouvelle node, sont parent et son grand parent forme une ligne :
            B B
           / \
          C B A R
             / \
            D B Z R
        Alors on fait une rotation du parent et du grand parent et on recolor le parent et grand parent.
           A B
           / \
          B R Z R
          / \
        C B D B

    Pseudo code :
    
    RB Insert(T, z) :
    y = NIL
    x = T.root
    while x != NIL
        y = x
        if z.key < x.key
            x = x.left
        else
            x = x.right
    z.parent = y
    if y == NIL
        T.root = z
    else if z.key < y.key
        y.left = z
    else 
        y.right = z
    
    z.left = NIL
    z.right = NIL
    z.color = RED

    RB insertFixUp(T, z) :
    while z.parent.color == RED
        if z.parent == z.parent.parent.left
            y = z.parent.parent.right
            if y.color == RED                   // CASE 1
                z.parent.color = BLACK
                y.color = BLACK
                z.parent.parent.color = RED
                z = z.parent.parent
            else 
                if z == z.parent.right          // CASE 2
                    z = z.parent
                    LeftRotate(T, z)
                z.parent.color = BLACK          // CASE 3
                z.parent.parent.color = RED
                RightRotate(T, z.parent.parent)
        else
            y = z.parent.parent.left
            if y.color == RED
                z.parent.color = BLACK
                y.color = BLACK
                z.parent.parent.color = RED
                z = z.parent.parent
            else 
                if z == z.parent.left
                    z = z.parent
                    RightRotate(T, z)
                z.parent.color = BLACK
                z.parent.parent.color = RED
                LeftRotate(T, z.parent.parent)
    root.color = BLACK                          // case 0

            
    Exemple l'arbre vient d'être initialisé :
    INSERT 15
        -> case 0 on change la couleur.
            15 R -> 15 B

    INSERT 15
        -> aucun cas, car il n'y a pas de violations
    
            15 B
            /
          5 R
    
    INSERT 1
        -> il y a bien une violation :
            - 1 est l'enfant de 5 qui est lui aussi rouge
        Analysons le problème :
            - l'oncle de 1 est l'enfant de droite de 15 qui est NIL est donc Noir.
            - Nous nous trouvons dans le cas 3, car il y a une ligne formée entre 15 5 et 1 et l'oncle est noire.
            - On va donc effectuer une rotation du grand parent dans la direction opposée de celle menant à 1
            - On change la couleur du parent et du grand parent.

            15 B
            /   \
           5 R   NIL B
          /
        1 R

             5 B
            /   \
           1 R   15 R

    Complexité :
        Insert O(log n) => lié à la hauteure maximum du tree
        Mettre la couleur de la node en rouge O(1)
        Fixé les violations O(log n) (car on peut avoir à fixé l'arbre jusquà sa racine)
            rotation O(1)
            recolor O(1)
        
        temps d'insertion total O(log n)

    Pour le delete il y a 6 cas possibles :
            1 La node a delete est une leaf rouge :
                - On la delete tout simplement.
            2 La double black (DB) node est le root :
                - La DB devient simplement noir.
            3 Le frère de la node DB est noir et ses enfants sont noir :
                - On supprime DB
                - Son frère devient rouge
                - si le parent est noir, alors il devient le nouveau DB, si non il devient noir.
            4 Si le frère est rouge :
                - on échange les couleurs du parent et du frère.
                - On fait une rotation sur le parent dans la direction de DB
                - On regarde quel cas s'applique encore à ce tree et on s'occupe du problème.
            5 Le frère est noir et l'enfant éloigné est noir et l'enfant proche est rouge
                - on échange les couleurs du frère avec l'enfant rouge.
                - on fait une rotation sur le frère en diraction opposée à DB
                - On applique aussi le cas 6
            6 Le frère est noir et l'enfant proche est noir et l'éloigné rouge
                - on échange les couleurs du parent de DB avec son frère
                - On fait une rotation du parent dans la direciton de DB
                - On retire le DB et on en fait une node noir normale
                - On change la couleur de l'enfant éloigné du frère de rouge à noir.

    delete(T, z)
        if z.left == NIL or z.right == NIL  // Si il n'y a qu'un ou aucun enfant alors y prend la valeur de z.
            y = z
        else
            y = findMin(z.right)            // Si deux enfant, il faut trouvé le remplaçant.
        if y.left != NIL                    // assigner l'enfant existant de y à x
            x = y.left                      
        else
            x = y.right
        x.parent = y.parent                 // assigner le parent de y a x

        if y.parent == NIL                  // si la parent de y est NIL Case 2
            T.root = x                      // alors le root devient x
        else if y == y.parent.left          // si non on remplace y par x.
            y.parent.left = x
        else
            y.parent.right = x
        if y != z                           // si y != z la clé de z devient la clé de y ainsi que ses données
            z.key = y.key
        if y.colour == BLACK                // si la couleur de y est noir, alors on fixe.
            deleteFixup(T, x)
                                            // Cas 1 la node est rouge et n'a pas d'enfant.

    deleteFixup(T, x)
            while x != root && x.color == BLACK
                if x == x.parent.left
                    w = x.parent.left
                    if w.colour == RED          // Case 4 sibling is red
                        w.colour = BLACK
                        x.parent.color = RED
                        leftRotate(T, x.parent)
                        w = x.parent.right
                    if w.left.colour == BLACK and w.right.color == BLACK    // Case 3 sibling both children are black
                        w.colour = RED
                        x = x.parent
                    else 
                        if w.right.colour == BLACK // Case 5 sibling Left child is red, right is black
                            w.left.colour = BLACK
                            w.colour = RED
                            rightRotate(T, w)
                            w = x.parent.right
                        w.colour = x.parent.colour  // Case 6 sibling right child is red, Left is black
                        x.parent.colour = BLACK
                        w.right.colour = BLACK
                        leftRotate(T, x.parent)
                        x = T.root
                else (La même chose mais inverser les left et right)
            
            x.colour = BLACK

*/      

const RED_NODE = true;
const BLACK_NODE = false;

class RBTNode
{
    constructor(parent = null)
    {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
        this.color = BLACK_NODE;
        this.parent = parent;
    }
}

class RedBlackTree
{
    constructor()
    {
        this.root = null;
        this.size = 0;
    }

    isNilNode(node)
    {
        return node === null || 
            (node.key === null && node.value === null && node.color === BLACK_NODE && node.left === null && node.right === null);
    }

    createLeafNode(parent)
    {
        let newNode = new RBTNode(parent);

        return newNode;
    }

    createNode(key, value)
    {
        let node = new RBTNode();

        node.key = key;
        node.value = value;

        let leftLeaf = new RBTNode(node);
        leftLeaf.color = BLACK_NODE;
        leftLeaf.left = null;
        leftLeaf.right = null;

        let rightLeaf = new RBTNode(node);
        rightLeaf.color = BLACK_NODE;
        rightLeaf.left = null;
        rightLeaf.right = null;

        node.left = leftLeaf;
        node.right = rightLeaf;

        return node;
    }

    /**
     * Complexity: O(1).
     *       y                   x
     *      / \                 / \
     *     x  Gamma   <====   alpha y
     *   /  \                      / \
     * alpha beta               beta Gamma
     * method
     * param Node node Node.
     * return Node
     */
    rotateLeft(node)
    {
        const y = node.right;

        if (this.isNilNode(y.left)) {
            node.right = this.createLeafNode(node);
        } else {
            node.right = y.left;
        }

        if (!this.isNilNode(y.left)) {
            y.left.parent = node;
        }

        y.parent = node.parent;
        
        if (this.isNilNode(node.parent)) {
            this.root = y;
        } else {
            if (node === node.parent.left) {
                node.parent.left = y;
            } else {
                node.parent.right = y;
            }
        }
        y.left = node;
        node.parent = y;
    }

    /**
     * Complexity: O(1).
     * 
     *       y                   x
     *      / \                 / \
     *     x  Gamma   ====>   alpha y
     *   /  \                      / \
     * alpha beta               beta Gamma
     * 
     * method
     * param Node node Node.
     * return Node
     */
    rotateRight(node)
    {
        const y = node.left;

        if (this.isNilNode(y.right)) {
            node.left = this.createLeafNode(node);
        } else {
            node.left = y.right;
        }

        if (!this.isNilNode(y.right)) {
            y.right.parent = node;
        }

        y.parent = node.parent;
        
        if (this.isNilNode(node.parent)) {
            this.root = y;
        } else {
            if (node === node.parent.right) {
                node.parent.right = y;
            } else {
                node.parent.left = y;
            }
        }
        y.right = node;
        node.parent = y;
    }

    insert(key, value)
    {
        let y = null;
        let x = this.root;

        const z = this.createNode(key, value);

        if (this.root == null) {
            this.root = z;
            z.color = BLACK_NODE;
            z.parent = null;
        } else {
            while (!this.isNilNode(x)) {
                y = x;
                if (z.key < x.key) {
                    x = x.left;
                } else {
                    x = x.right;
                }
            }
            z.parent = y;
            // current node parent is root
            if (z.key < y.key) {
                y.left = z;
            } else {
                y.right = z;
            }
            // y.right is now z
            z.left = this.createLeafNode(z);
            z.right = this.createLeafNode(z);
            z.color = RED_NODE;
            this.fixInsert(z);
        }
    }

    /**
    * A method to fix RB TREE
    * when uncle is RED
    * Change color of parent and uncle as BLACK.
    * Color of grand parent as RED.
    * Change node = node’s grandparent, repeat steps 2 and 3 for new x.
    * ---------------------------------------------------------------
    * when uncle is BLACK
    * left_left_case
    * left_right_case
    * right_right_case
    * right_left_case
    */
    fixInsert(node)
    {
        while (node.parent != null && node.parent.color === RED_NODE) {

            let uncle = null;

            if (node.parent === node.parent.parent.left) {
                uncle = node.parent.parent.right;
        
                if (uncle != null && uncle.color === RED_NODE) {
                    node.parent.color = BLACK_NODE;
                    uncle.color = BLACK_NODE;
                    node.parent.parent.color = RED_NODE;
                    node = node.parent.parent;
                    continue;
                }
                if (node === node.parent.right) {
                    // Double rotation needed
                    node = node.parent;
                    this.rotateLeft(node);
                }
                node.parent.color = BLACK_NODE;
                node.parent.parent.color = RED_NODE;
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
                this.rotateRight(node.parent.parent);
            } else {
                uncle = node.parent.parent.left;
                if (uncle != null && uncle.color === RED_NODE) {
                    node.parent.color = BLACK_NODE;
                    uncle.color = BLACK_NODE;
                    node.parent.parent.color = RED_NODE;
                    node = node.parent.parent;
                    continue;
                }
                if (node === node.parent.left) {
                    // Double rotation needed
                    node = node.parent;
                    this.rotateRight(node);
                }
                node.parent.color = BLACK_NODE;
                node.parent.parent.color = RED_NODE;
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
                this.rotateLeft(node.parent.parent);
            }
        }
        this.root.color = BLACK_NODE;
    }

    transplant(u, v) {
        if (u.parent == null) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }

        v.parent = u.parent;
    }

    /**
     * method
     * param Node node Node.
     * return Node
     */
    remove(key) {
        const z = this.search(key);
        if (z == null) {
            return;
        }
        let x;
        let y = z;
        let y_original_color = y.color;
        if (this.isNilNode(z.left)) {
            x = z.right;
            this.transplant(z, z.right);
        } else if (this.isNilNode(z.right)) {
            x = z.left;
            this.transplant(z, z.left);
        } else {
            y = this.min(z.right);
            y_original_color = y.color;
            x = y.right;
            if (y.parent === z) {
                x.parent = y;
            } else {
                this.transplant(y, y.right);
                y.right = z.right;
                y.right.parent = y;
            }
            this.transplant(z, y);
            y.left = z.left;
            y.left.parent = y;
            y.color = z.color;
        }
        if (y_original_color === BLACK_NODE) {
            this.removeFix(x);
        }
    }

    /**
     * a method to fix remove key
     */
    removeFix(node) {
        while (node !== this.root && node.color === BLACK_NODE) {
            if (node === node.parent.left) {
                let w = node.parent.right;
                if (w.color === RED_NODE) {
                    w.color = BLACK_NODE;
                    node.parent.color = RED_NODE;
                    this.rotateLeft(node.parent);
                    w = node.parent.right;
                }
                if (w.left.color === BLACK_NODE && w.right.color === BLACK_NODE) {
                    w.color = RED_NODE;
                    node = node.parent;
                    continue;
                } else if (w.right.color === BLACK_NODE) {
                    w.left.color = BLACK_NODE;
                    w.color = RED_NODE;
                    w = node.parent.right;
                }
                if (w.right.color === RED_NODE) {
                    w.color = node.parent.color;
                    node.parent.color = BLACK_NODE;
                    w.right.color = BLACK_NODE;
                    this.rotateLeft(node.parent);
                    node = this.root;
                }
            } else {
                let w = node.parent.left;
                if (w.color === RED_NODE) {
                    w.color = BLACK_NODE;
                    node.parent.color = RED_NODE;
                    this.rotateRight(node.parent);
                    w = node.parent.left;
                }
                if (w.right.color === BLACK_NODE && w.left.color === BLACK_NODE) {
                    w.color = RED_NODE;
                    node = node.parent;
                } else if (w.left.color === BLACK_NODE) {
                    w.right.color = BLACK_NODE;
                    w.color = RED_NODE;
                    this.rotateLeft(w);
                    w = node.parent.left;
                }
                if (w.left.color === RED_NODE) {
                    w.color = node.parent.color;
                    node.parent.color = BLACK_NODE;
                    w.left.color = BLACK_NODE;
                    this.rotateRight(node.parent);
                    node = this.root;
                }
            }
        }
        node.color = BLACK_NODE;
    }

    findMin()
    {
        if(this.root === null)
        {
            return null;
        }

        let node = this.root;

        while(!this.isNilNode(node.left))
        {
            node = node.left;
        }

        return node;
    }

    search(key)
    {
        let node = this.root;
        while (node != null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else if (key === node.key) {
                return node;
            } else {
                return null;
            }
        }
        return null;
    }

    min(node)
    {
        if (node === null || node === undefined) {
            return {};
        }
        while (!this.isNilNode(node.left)) {
            node = node.left;
        }
        return node;
    }

    getNode(node, key) {
        if (!node || key == node.key) {
            ans = node;
            return node;
        } else if (key > node.key) {
            return getNode(node.right, key);
        } else {
            return getNode(node.right, key);
        }
    }

    getRootNode()
    {
        return this.root;
    }

    printBTree(node)
    {
        if(!this.isNilNode(node))
        {
            this.printBTree(node.left);
            console.log(node.value);
            this.printBTree(node.right);
        }
    }
}

var btree = new RedBlackTree();
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

console.log(btree.search(22));
