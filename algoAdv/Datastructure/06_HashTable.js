"use strict";

class ListNode {
    constructor(data, key, next = null, prev = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
        this.key = key;
    }
}

class LinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 1;
    }

    get(index) {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            return null;
        }
        
        let currentNode = this.head;

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        return currentNode.data;
    }

    insertAtBegining(key, data) {
        let newNode = new ListNode(data, key, this.head);

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        this.length++;

        return this.head;
    }

    insertAtEnd(key, data) {
        let newNode = new ListNode(data, key);

        if (this.tail === null) {
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        if(this.head === null)
        {
            this.head = newNode;
        }

        this.length++;

        return this.tail;
    }

    insertAt(index, key, data)
    {
        if(!Number.isInteger(index) || index < 0 || index > this.length)
        {
            return this;
        }

        if(index === 0)
        {
            this.insertAtBegining(data);
        } else if(index === this.length - 1)
        {
            this.insertAtEnd(data);
        } else 
        {
            let previousNode = this.head;
    
            for(let i = 0; i < index - 1; i++)
            {
                previousNode = previousNode.next;    
            }
    
            let nextNode = previousNode.next;
    
            let newNode = new ListNode(data, key, nextNode);
            newNode.prev = previousNode;
            previousNode.next = newNode;
        }


        this.length++;
        return this;
    }

    removeKey(key)
    {
        let node = this.head;
    
        for(let i = 0; i < this.length - 1; i++)
        {
            if(node && node.key === key)
            {
                let deletedNode = node;
                let nextNode = deletedNode.next;
                let previousNode = deletedNode.prev;

                if(previousNode)
                {
                    previousNode.next = nextNode;
                }

                if(nextNode)
                {
                    nextNode.prev = node;
                }
                return this;
            }
            node = node.next;
        }

        return this;
    }

    remove(index)
    {
        if(!Number.isInteger(index) || index < 0 || index > this.length)
        {
            return this;
        }

        if(index === 0)
        {
            this.head = this.head.next;
            this.head.prev = null;
        } else if(index === this.length - 1)
        {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else 
        {
            let previousNode = this.head;
    
            for(let i = 0; i < index - 1; i++)
            {
                previousNode = previousNode.next;    
            }
    
            let deletedNode = previousNode.next;
            let nextNode = deletedNode.next;
    
            previousNode.next = nextNode;
            nextNode.prev = previousNode;
        }

        this.length--;
        return this;
    }

    printList() {
        let array = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            array.push(currentNode.data);
            currentNode = currentNode.next;
        }

        console.log(array.join(' <--> '));
        return this;
    }
}

class HashTable
{
    constructor(size = 20)
    {
        this.buckets = [];
        this.size = size;
    }

    simpleHash(key)
    {
        return key.toString().length;
    }

    hashKey(key)
    {
        if(!Number.isInteger(key))
        {
            key = this.simpleHash(key);
        }

        return key % this.size;
    }

    add(key, data)
    {
        const hashedKey = this.hashKey(key);

        if(!this.buckets[hashedKey])
        {
            this.buckets[hashedKey] = new LinkedList();
        }

        this.buckets[hashedKey].insertAtEnd(key, data);
    }

    remove(key)
    {
        const hashedKey = this.hashKey(key);

        if(this.buckets[hashedKey])
        {
            this.buckets[hashedKey].removeKey(key)
        }
    }

    get(key) 
    {
        const hashedKey = this.hashKey(key);

        if(this.buckets[hashedKey])
        {
            return this.buckets[hashedKey].get(key);
            
        }  

        return null;
    }

    printHashTable()
    {
        for(const key in this.buckets)
        {
            console.log(key);
            this.buckets[key].printList();
        }
    }
}

let hash = new HashTable();
hash.add(5, "test");
hash.add("Vive le formage", "C'est bon le formage");
hash.add("12345", "encore un test");
hash.printHashTable();
hash.remove(5);
hash.printHashTable();
hash.remove("12345");
hash.printHashTable();
