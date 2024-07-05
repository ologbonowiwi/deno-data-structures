export class Node<T> {
  next: Node<T> | null = null

  constructor(public value: T) {}
}

export class SinglyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length = 0;
}
