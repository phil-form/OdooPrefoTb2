"use strict";

class ListNode {
    constructor(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class LinkedList {

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 1;
    }

    insertAtBegining(data) {
        let newNode = new ListNode(data, this.head);

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        this.length++;

        return this.head;
    }

    insertAtEnd(data) {
        let newNode = new ListNode(data);

        if (this.tail === undefined) {
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        if(this.head === undefined)
        {
            this.head = newNode;
        }

        this.length++;

        return this.tail;
    }

    insertAt(index, data)
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
    
            let newNode = new ListNode(data, nextNode);
            newNode.prev = previousNode;
            previousNode.next = newNode;
        }


        this.length++;
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
            this.head.prev = undefined;
        } else if(index === this.length - 1)
        {
            this.tail = this.tail.prev;
            this.tail.next = undefined;
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
        while (currentNode !== undefined) {
            array.push(currentNode.data);
            currentNode = currentNode.next;
        }

        console.log(array.join(' <--> '));
        return this;
    }
}

let list = new LinkedList();
list.insertAtBegining(5);
list.printList();
list.insertAtBegining(7);
list.printList();
list.insertAtEnd(8);
list.printList();
list.insertAt(2, 12)
list.printList();
list.remove(2)
list.printList();