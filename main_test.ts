import { assertEquals, assertExists, assertNotEquals } from "jsr:@std/assert";
import { Node, SinglyLinkedList } from "./main.ts";

Deno.test("Node", async (t) => {
  await t.step("should be defined", () => {
    assertExists(Node)
  })

  await t.step("should hold a value", () => {
    const node = new Node(1)
    assertEquals(node.value, 1)
  })

  await t.step("should have a next property", async (t) => {
    const node = new Node(1)
    assertNotEquals(node.next, undefined)

    await t.step("should be null by default", () => {
      assertEquals(node.next, null)
    });

    await t.step("should be able to hold nodes recursively", () => {
      let cur = node;
      let i = 2;
      const max = 10
      while (cur != null && i <= max) {
        cur.next = new Node(i)
        cur = cur.next
        i++
      }
      
      // iterate over the nodes checking starts with one and goes until max
      cur = node;
      i = 1;
      while (cur.next != null && i <= max) {
        assertEquals(cur.value, i)
        cur = cur.next
        i++
      }
    })
  })
})

Deno.test("SinglyLinkedList", async (t) => {
  await t.step("should be defined", () => {
    assertExists(SinglyLinkedList)
  });

  await t.step("should have a head", () => {
    const list = new SinglyLinkedList()
    assertNotEquals(list.head, undefined)
  });

  await t.step("should be able to push values", () => {
    const list = new SinglyLinkedList<number | string>()
    list.push(1);
    assertEquals(list.head!.value, 1)
    assertEquals(list.tail!.value, 1)
    assertEquals(list.length, 1)
    list.push(2)
    assertEquals(list.tail!.value, 2)
    assertEquals(list.length, 2)
    list.push(3)
    assertEquals(list.tail!.value, 3)
    assertEquals(list.length, 3)
    list.push("yep")
    assertEquals(list.tail!.value, "yep")
    assertEquals(list.length, 4)
  });
})
