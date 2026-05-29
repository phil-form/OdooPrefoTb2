// Calcul de performance 

/*
    Pour calculer la performance d'un algorithme, on peut le faire de plusieurs façons.

    Par exemple écrire deux programmes avec deux algorithmes différents, les lancer et timer le temps d'exécution.

    Prenons un exemple, nous voulons savoir toutes les combinaison de 
        a + b + c = n
    ou a, b et c varie de 0 à n.

    nous pouvons par exemple sous linux utiliser la commande "time" qui va nous permettre de timer un programme executer.

    Nous pourrions ainsi tester plusieurs algorithmes et en faire un graphique.

    Le problème de cette méthode :
        - elle est très longue (un algorithme peut prendre des fois plusieurs heures d'exécution).
        - elle va dépendre de la machine donc les données peuvent varier d'un pc à l'autre,
            ou même lié à d'autres facteurs externes (combien de programmes en cours d'exécution sur la machine).

    C'est pour pallier ces problèmes que l'on a créé la méthode Big O notation (O pour ordre de magnitude)
*/

// Big O Notation

/*
    Complexité algorithmique :
    Big O notation ou O() est un standard de calcul de performance d'un algorithme.

    Cette méthode permet d'avoir une idée de la performance d'un algorithme.

    Nous allons voir les principales :

        - Constantes O(1)
        - Logarithmique O(log N)
        - Linear O(N)
        - Linearithmique O(N log N)
        - Quadratique et Polynomiale O(N^2), O(N^3), ...
        - Exponentielle O(2^N), O(3^N), ...

    Le classement précédent va de la plus efficace à la moins efficace.
*/

// Constantes
/*
    Les constantes sont des partie des algorithmes qui peut importe l'entrée auront toujours le même temps d'exécution.

    exemples :
*/

let i = 5; // l'assignation devra toujours se faire.

if(i <= 5) // le if statement sera toujours vérifié.
{
    console.log(i + 5); // même si l'output ne sera pas toujours exécutée, cette ligne aura un impact
        // mineur sur les performances de notre algorithme, ce qui fait qu'on la considérera bien comme étant une constante.
}

console.log(i); // l'output sera toujours exécutée.
