export class Node<T> {
  next: Node<T> | null = null

  constructor(public value: T) {}
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length = 0;

  push(value: T) {
    this.length++
    const node = new Node(value);

    // when the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      // sets the node as next for the tail
      this.tail!.next = node;

      // updates the current tail (the old tail will be the predecessor of the current one)
      this.tail = node;
    }
  }
}
