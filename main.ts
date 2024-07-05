export class Node<T> {
  next: Node<T> | null = null

  constructor(public value: T) {}
}
