import React, { useState, useEffect } from 'react';

// Define a node class for circular linked list
class Node<T> {
    data: T;
    next: Node<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

// Define a circular linked list class
class CircularLinkedList<T> {
    head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    // Method to insert a node at the end of the circular linked list
    insert(data: T) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head; // Point back to itself to form circular structure
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }
    }

    // Method to update the head to a new node with given data
    updateHead(data: T) {
        if (this.head) {
            const newHead = new Node(data);
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newHead;
            newHead.next = this.head;
            this.head = newHead;
        }
    }

    // Method to render the circular linked list as a string for display
    toString() {
        if (!this.head) {
            return 'Empty Circular Linked List';
        }

        let current = this.head;
        let result = '';
        do {
            result += `${current.data} -> `;
            current = current.next!;
        } while (current !== this.head);
        result += `${this.head.data} (head)`;

        return result;
    }
}

// Example usage
const LinkedListComponent: React.FC = () => {
    const [circularList, setCircularList] = useState<CircularLinkedList<number> | null>(null);

    // Initialize the circular linked list on component mount
    useEffect(() => {
        const list = new CircularLinkedList<number>();
        list.insert(1);
        list.insert(2);
        list.insert(3);
        setCircularList(list);
    }, []);

    // Function to handle click on an element to update head and rerender list
    const handleClick = (data: number) => {
        if (circularList) {
            circularList.updateHead(data);
            setCircularList(new CircularLinkedList(circularList.head)); // Update state with new head
        }
    };

    return (
        <div>
            <h2>Circular Linked List Example</h2>
            {circularList && (
                <div>
                    <p>{circularList.toString()}</p>
                    <ul>
                        {Array.from({ length: 3 }, (_, index) => (
                            <li key={index} onClick={() => handleClick(index + 1)}>
                                Element {index + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LinkedListComponent;
