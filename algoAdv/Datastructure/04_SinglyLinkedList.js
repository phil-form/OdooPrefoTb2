"use strict";

class ListNode {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.next = undefined;
        this.length = 0;
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
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        if(this.head === undefined)
        {
            this.head = newNode;
        }

        this.length++;
        return this.head;
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

        let currentNode = undefined;
        if(index === 0)
        {
            currentNode = this.head;
            this.head = this.head.next;
        } else if(index === this.length - 1)
        {
            currentNode = this.tail;
            //v!!!!
            this.tail = this.tail.prev;
            this.tail.next = undefined;
        } else 
        {
            let previousNode = this.head;
    
            for(let i = 0; i < index - 1; i++)
            {
                previousNode = previousNode.next;    
            }
    
            currentNode = previousNode.next;
            let nextNode = currentNode.next;
    
            previousNode.next = nextNode;
        }

        this.length--;
        return currentNode;
    }

    getNext()
    {
        if(this.next === undefined)
        {
            this.next = this.head;
        } else 
        {
            this.next = this.next.next;
        }

        return this.next
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
