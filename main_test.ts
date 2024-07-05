import { assert, assertEquals, assertExists, assertFalse, assertNotEquals } from "jsr:@std/assert";
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
    assertEquals(list.push(1), list);
    assertEquals(list.head!.value, 1)
    assertEquals(list.tail!.value, 1)
    assertEquals(list.length, 1)

    assertEquals(list.push(2), list)
    assertEquals(list.tail!.value, 2)
    assertEquals(list.length, 2)
    
    assertEquals(list.push(3), list)
    assertEquals(list.tail!.value, 3)
    assertEquals(list.length, 3)
    

    assertEquals(list.push("yep"), list)
    assertEquals(list.tail!.value, "yep")
    assertEquals(list.length, 4)
  });

  await t.step("should be able to pop values", async (t) => {
    const list = new SinglyLinkedList<number>()

    await t.step("should return null if the list is empty", () => {
      assertEquals(list.pop(), null)
    })

    await t.step("should return the last item added to the list", async (t) => {
      list.push(1)
      list.push(2)
      list.push(3)

      assertEquals(list.pop()!.value, 3)

      await t.step("list length should decrease", () => {
        assertEquals(list.length, 2)
      })

      await t.step("should be able to pop recursively", () => {
        assertEquals(list.pop()!.value, 2)
        assertEquals(list.pop()!.value, 1)
      })
    });
  });

  await t.step("should be able to shift values", async (t) => {
    const list = new SinglyLinkedList<number>()

    await t.step("should return null if the list is empty", () => {
      assertEquals(list.shift(), null)
    })

    await t.step("should be the first item on the list", () => {
      for (let i = 1; i <= 5; i++) {
        list.push(i)
      }

      for (let i = 1; i <= 5; i++) {
        assertEquals(list.shift()!.value, i)
      }
    })

    await t.step("should set the tail to null if there's the single item is shifted", () => {
      assertEquals(list.length, 0)

      list.push(1)
      assertEquals(list.length, 1)

      assertEquals(list.shift()!.value, 1)

      assertEquals(list.tail, null)
    })
  })

  await t.step("should be able to unshift values", () => {
    const list = new SinglyLinkedList<number | string>()
    assertEquals(list.unshift(1), list);
    assertEquals(list.head!.value, 1)
    assertEquals(list.tail!.value, 1)
    assertEquals(list.length, 1)

    assertEquals(list.unshift(2), list)
    assertEquals(list.head!.value, 2)
    assertEquals(list.length, 2)

    assertEquals(list.unshift(3), list)
    assertEquals(list.head!.value, 3)
    assertEquals(list.length, 3)

    assertEquals(list.unshift("yep"), list)
    assertEquals(list.head!.value, "yep")
    assertEquals(list.length, 4)
  })

  await t.step("should be able to get an item by it's position", async (t) => {
    const list = new SinglyLinkedList<number>();

    list.push(1)
    list.push(2)
    list.push(3)

    assertEquals(list.get(0)!.value, 1)
    assertEquals(list.get(1)!.value, 2)
    assertEquals(list.get(2)!.value, 3)

    await t.step("should return the tail for (list.length - 1)", () => {
      assertEquals(list.get(list.length - 1), list.tail)
    })

    await t.step("should return null", async (t) => {
      const list = new SinglyLinkedList<number>();

      await t.step("if the list is empty", () => {
        assertEquals(list.get(0), null)
        assertEquals(list.get(10), null)
        assertEquals(list.get(100), null)
        assertEquals(list.get(1000), null)
      })

      await t.step("if the index is less than zero", () => {
        assertEquals(list.get(-1), null)
        assertEquals(list.get(-10), null)
        assertEquals(list.get(-100), null)
        assertEquals(list.get(-1000), null)
      })

      await t.step("if the index is higher or equal than the list length", () => {
        list.push(1)
        list.push(10)

        assertEquals(list.get(3), null)
        assertEquals(list.get(list.length), null)
      })
    })
  })

  await t.step("should be able to set an item by position", async (t) => {
    const list = new SinglyLinkedList();

    list.push(1)
    list.push(2)
    list.push(1)
    list.push(4)
    list.push(5)

    assert(list.set(2, 3))

    assertEquals(list.get(2)!.value, 3)

    await t.step("should return false if the position isn't found", () => {
      assertFalse(list.set(list.length, 100))
    })
  })

  await t.step("should be able to insert an item by position", async (t) => {
    const list = new SinglyLinkedList()


    assert(list.insert(0, 1))
    assertEquals(list.get(0)!.value, 1)

    assert(list.insert(0, 0))
    assertEquals(list.get(0)!.value, 0)

    assert(list.insert(1, 2))
    assertEquals(list.get(1)!.value, 2)

    assert(list.insert(2, 3))
    assertEquals(list.get(2)!.value, 3)

    await t.step("should return false if the position is less than zero", () => {
      assertFalse(list.insert(-1, 10))
      assertFalse(list.insert(-10, 10))
      assertFalse(list.insert(-100, 10))
    })
  })

  await t.step("should be able to remove an item by position", async (t) => {
    const list = new SinglyLinkedList()

    list.push(1)
    list.push(2)
    list.push(3)
    list.push(4)
    list.push(5)

    assertEquals(list.remove(4)!.value, 5)
    assertEquals(list.remove(0)!.value, 1)

    // restoring the list to its original state
    list.unshift(1)
    list.push(5)

    assertEquals(list.remove(2)!.value, 3)

    await t.step("should return null", async (t) => {
      const list = new SinglyLinkedList()

      await t.step("if the position is less than zero", () => {
        assertEquals(list.remove(-1), null)
        assertEquals(list.remove(-10), null)
        assertEquals(list.remove(-100), null)
        assertEquals(list.remove(-1000), null)
      })

      await t.step("if the position is greater than the length", () => {
        list.push(1)
        list.push(2)
        list.push(3)

        assertEquals(list.remove(list.length + 1), null )
      })
    })
  })

  await t.step("should be able to reverse a list", () => {
    const list = new SinglyLinkedList()

    list.push(1)
    list.push(2)
    list.push(3)
    list.push(4)
    list.push(5)

    list.reverse()

    assertEquals(list.get(0)!.value, 5)
    assertEquals(list.get(1)!.value, 4)
    assertEquals(list.get(2)!.value, 3)
    assertEquals(list.get(3)!.value, 2)
    assertEquals(list.get(4)!.value, 1)
  })
})
