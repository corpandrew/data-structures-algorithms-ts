This timeline is roughly organized from simpler to more complex data structures. Feel free to adjust the pace to your learning.  The "fake applications" are just to give you context; you don't need to build full applications, just think about how the data structure could be used.

### Week 1: Foundations - Arrays and Strings

**Data Structure Focus:** Arrays (and by extension, Strings as character arrays in many languages)

**Fake Application:**  Let's imagine you're building a very basic "To-Do List" application.

**Algorithms to Implement:**

*   [x] **Basic Array Operations:**
    *   [x] Create an array of a fixed size.
    *   [x] Insert an element at a specific index.
    *   [x] Access an element at a specific index.
    *   [x] Update an element at a specific index.
    *   [x] Delete an element at a specific index (shifting elements).
    *   [x] Get the size/length of the array.
*   [x] **Searching in an Array:**
    *   [x] Linear Search: Find a specific element in an array.
*   [x] **Simple Array Algorithms (To-Do List Context):**
    *   [x] `addItem(item)`:  Adds a to-do item to the end of the array.
    *   [x] `removeItem(index)`: Removes a to-do item at a given index.
    *   [x] `markComplete(index)`:  (If you represent to-do items as objects/structs, you could add a "completed" flag and toggle it).
    *   [x] `listItems()`: Prints all to-do items in the array.
*   [ ] **String Algorithms (Basic):**
    *   [x] Reverse a string.
    *   [ ] Check if a string is a palindrome.
    *   [ ] Count the occurrences of a specific character in a string.

### Week 2: Linked Lists

**Data Structure Focus:** Linked Lists (Singly and Doubly Linked Lists)

**Fake Application:** Imagine building a simple "Undo/Redo" feature for a text editor or drawing application.  Linked lists are great for maintaining a history of actions.

**Algorithms to Implement:**

*   [ ] **Singly Linked List:**
    *   [ ] Create a Node class (with `data` and `next` pointer).
    *   [ ] Create a LinkedList class (with `head` pointer).
    *   [ ] `insertAtBeginning(data)`: Insert a new node at the beginning of the list.
    *   [ ] `insertAtEnd(data)`: Insert a new node at the end of the list.
    *   [ ] `insertAtIndex(data, index)`: Insert a new node at a specific index.
    *   [ ] `deleteFromBeginning()`: Delete the first node.
    *   [ ] `deleteFromEnd()`: Delete the last node.
    *   [ ] `deleteAtIndex(index)`: Delete a node at a specific index.
    *   [ ] `search(data)`: Search for a node with given data.
    *   [ ] `reverseList()`: Reverse the linked list.
    *   [ ] `printList()`: Print all elements of the list.
*   [ ] **Doubly Linked List:**
    *   [ ] Create a Node class (with `data`, `next`, and `prev` pointers).
    *   [ ] Create a DoublyLinkedList class (with `head` and `tail` pointers).
    *   [ ] Implement similar insertion, deletion, search, and print operations as for Singly Linked List, but leveraging the `prev` pointers.
    *   [ ] `reverseList()` (Doubly Linked List version - might be slightly different).
*   [ ] **Undo/Redo Application (Conceptual):**
    *   [ ] Think about how a doubly linked list could store "actions" in your undo/redo history.  Each node could represent an action.
    *   [ ] Implement `undo()` (move backwards in the list) and `redo()` (move forwards).

### Week 3: Stacks and Queues

**Data Structure Focus:** Stacks and Queues

**Fake Application:**

*   **Stack:**  Imagine a browser history (back button functionality).
*   **Queue:**  Imagine a print queue or a task scheduler.

**Algorithms to Implement:**

*   [ ] **Stack (using Array or Linked List):**
    *   [ ] Create a Stack class.
    *   [ ] `push(item)`: Add an item to the top of the stack.
    *   [ ] `pop()`: Remove and return the item from the top of the stack.
    *   [ ] `peek()`: Return the item at the top of the stack without removing it.
    *   [ ] `isEmpty()`: Check if the stack is empty.
    *   [ ] `size()`: Return the number of items in the stack.
*   [ ] **Queue (using Array or Linked List):**
    *   [ ] Create a Queue class.
    *   [ ] `enqueue(item)`: Add an item to the back of the queue.
    *   [ ] `dequeue()`: Remove and return the item from the front of the queue.
    *   [ ] `peek()` (front): Return the item at the front of the queue without removing it.
    *   [ ] `isEmpty()`: Check if the queue is empty.
    *   [ ] `size()`: Return the number of items in the queue.
*   [ ] **Stack/Queue Application Examples:**
    *   [ ] **Stack:** Implement a simple expression evaluator for balanced parentheses (e.g., `isValidParentheses(string expression)`).
    *   [ ] **Queue:** Implement a basic breadth-first search (BFS) traversal (we'll get to graphs later, but you can conceptually think of traversing levels of a tree-like structure).

### Week 4 & 5: Trees - Binary Trees and Binary Search Trees (BSTs)

**Data Structure Focus:** Binary Trees and Binary Search Trees

**Fake Application:**  Imagine building a simple contact list that you want to search and sort efficiently. A BST can help with sorted storage and quick lookups.

**Algorithms to Implement:**

*   [ ] **Binary Tree (Basic):**
    *   [ ] Create a TreeNode class (with `data`, `left`, and `right` pointers).
    *   [ ] Create a BinaryTree class (with `root` pointer).
    *   [ ] **Tree Traversals:**
        *   [ ] In-order traversal (Left-Root-Right)
        *   [ ] Pre-order traversal (Root-Left-Right)
        *   [ ] Post-order traversal (Left-Right-Root)
        *   [ ] Level-order traversal (Breadth-First Search using a Queue)
    *   [ ] `getHeight(node)`: Calculate the height of a binary tree or subtree.
    *   [ ] `countNodes(node)`: Count the number of nodes in a binary tree.
*   [ ] **Binary Search Tree (BST):**
    *   [ ] Create a BSTNode class (same as TreeNode).
    *   [ ] Create a BinarySearchTree class (with `root` pointer).
    *   [ ] `insert(data)`: Insert a new node into the BST, maintaining BST property.
    *   [ ] `search(data)`: Search for a node with given data in the BST.
    *   [ ] `delete(data)`: Delete a node from the BST, handling different cases (leaf, one child, two children).
    *   [ ] `findMin(node)`: Find the node with the minimum value in a subtree.
    *   [ ] `findMax(node)`: Find the node with the maximum value in a subtree.
*   [ ] **BST Application (Contact List - Conceptual):**
    *   [ ] Think about how you could store contact names in a BST, ordered alphabetically.
    *   [ ] Implement `addContact(name)` (insert into BST).
    *   [ ] Implement `findContact(name)` (search in BST).
    *   [ ] Implement `listContactsAlphabetically()` (in-order traversal).

### Week 6: Hash Tables (Hash Maps)

**Data Structure Focus:** Hash Tables (or Hash Maps)

**Fake Application:**  Imagine building a simple in-memory cache to quickly retrieve data based on keys.

**Algorithms to Implement:**

*   [ ] **Hash Table Implementation:**
    *   [ ] Choose a hashing function (simple ones for practice, e.g., modulo based).
    *   [ ] Decide on a collision resolution strategy:
        *   [ ] Separate Chaining (using Linked Lists at each index)
        *   [ ] Open Addressing (e.g., Linear Probing, Quadratic Probing - Separate Chaining is often simpler to implement first).
    *   [ ] Create a HashTable class.
    *   [ ] `put(key, value)`: Insert a key-value pair into the hash table.
    *   [ ] `get(key)`: Retrieve the value associated with a given key.
    *   [ ] `remove(key)`: Remove a key-value pair from the hash table.
    *   [ ] `containsKey(key)`: Check if a key exists in the hash table.
    *   [ ] `size()`: Get the number of key-value pairs in the hash table.
*   [ ] **Hash Table Application (Cache - Conceptual):**
    *   [ ] Think about how you could use a hash table to store cached data, where the key is the data identifier and the value is the data itself.
    *   [ ] Implement `cacheData(key, data)` (put in hash table).
    *   [ ] Implement `getCachedData(key)` (get from hash table).

### Week 7 & 8: Heaps and Priority Queues

**Data Structure Focus:** Heaps (Min-Heap, Max-Heap) and Priority Queues

**Fake Application:** Imagine building a task scheduler where tasks need to be prioritized based on urgency.

**Algorithms to Implement:**

*   [ ] **Heap (Min-Heap):**
    *   [ ] Create a MinHeap class (often implemented using an array).
    *   [ ] `insert(value)`: Insert a new value into the min-heap, maintaining heap property (heapify up).
    *   [ ] `extractMin()`: Remove and return the minimum value (root) from the min-heap, maintaining heap property (heapify down).
    *   [ ] `peekMin()`: Return the minimum value without removing it.
    *   [ ] `heapify()` (build a heap from an array).
    *   [ ] `size()`: Get the number of elements in the heap.
*   [ ] **Max-Heap:**
    *   [ ] Implement a MaxHeap class (similar to MinHeap, but with max-heap property).
    *   [ ] Implement `insert`, `extractMax`, `peekMax`, `heapify` for Max-Heap.
*   [ ] **Priority Queue (using Heap):**
    *   [ ] Create a PriorityQueue class (using either Min-Heap or Max-Heap depending on priority definition - e.g., Min-Heap for lowest priority value being highest priority).
    *   [ ] `enqueue(item, priority)`: Add an item with a priority to the priority queue.
    *   [ ] `dequeue()`: Remove and return the item with the highest priority.
    *   [ ] `peek()`: Return the item with the highest priority without removing it.
*   [ ] **Priority Queue Application (Task Scheduler - Conceptual):**
    *   [ ] Think about how you can use a priority queue to schedule tasks based on priority levels.
    *   [ ] `addTask(taskName, priority)` (enqueue with priority).
    *   [ ] `getNextTask()` (dequeue to get the highest priority task).

### Week 9 & 10: Graphs - Basic Graph Representation and Traversal

**Data Structure Focus:** Graphs (Adjacency Matrix, Adjacency List)

**Fake Application:** Imagine building a simplified social network where you want to find connections between people.

**Algorithms to Implement:**

*   [ ] **Graph Representation:**
    *   [ ] **Adjacency Matrix:**
        *   [ ] Implement a Graph class using an adjacency matrix to represent edges.
        *   [ ] `addVertex(vertex)`: Add a new vertex to the graph.
        *   [ ] `addEdge(vertex1, vertex2)`: Add an edge between two vertices (undirected graph for now).
        *   [ ] `hasEdge(vertex1, vertex2)`: Check if an edge exists between two vertices.
        *   [ ] `getNeighbors(vertex)`: Get a list of neighbors for a given vertex.
    *   [ ] **Adjacency List:**
        *   [ ] Implement a Graph class using an adjacency list (e.g., using a dictionary/map where keys are vertices and values are lists of neighbors).
        *   [ ] Implement `addVertex`, `addEdge`, `hasEdge`, `getNeighbors` for Adjacency List representation.
*   [ ] **Graph Traversal Algorithms:**
    *   [ ] **Breadth-First Search (BFS):**
        *   [ ] Implement BFS traversal starting from a given vertex.
        *   [ ] Use a queue to manage vertices to visit.
    *   [ ] **Depth-First Search (DFS):**
        *   [ ] Implement DFS traversal starting from a given vertex (recursive or iterative using a stack).
*   [ ] **Graph Application (Social Network - Conceptual):**
    *   [ ] Think about how vertices could represent people and edges could represent friendships.
    *   [ ] Implement `areConnected(person1, person2)` using BFS or DFS to check if there is a path between two people (friends of friends, etc.).

### Week 11 & 12: More Graph Algorithms (Optional - Depending on Interview Focus)

**Data Structure Focus:** Graphs (Advanced Algorithms)

**Fake Application:** Expanding on the social network or thinking about route planning/network connections.

**Algorithms to Implement (Choose based on your interview focus and time):**

*   [ ] **Shortest Path Algorithms:**
    *   [ ] **Dijkstra's Algorithm:** Find the shortest path from a source vertex to all other vertices in a weighted graph (non-negative weights).
    *   [ ] (Optional) Bellman-Ford Algorithm: Shortest paths in a weighted graph, can handle negative weights (but not negative cycles).
*   [ ] **Minimum Spanning Tree (MST) Algorithms:**
    *   [ ] **Prim's Algorithm:** Find a minimum spanning tree for a weighted undirected graph.
    *   [ ] (Optional) Kruskal's Algorithm: Another MST algorithm (often uses disjoint sets data structure).
*   [ ] **Graph Application (Route Planning - Conceptual):**
    *   [ ] Think about how vertices could be locations and edges could be roads with weights representing distances.
    *   [ ] Use Dijkstra's algorithm to find the shortest route between two locations.

**Important Notes:**

*   **Implement from Scratch:** The key here is to implement these data structures and algorithms *yourself* without using built-in library implementations (unless explicitly allowed or for comparison later). This is how you truly understand them.
*   **Testing:**  Write unit tests for each data structure and algorithm to ensure they work correctly. Test edge cases and boundary conditions.
*   **Time and Space Complexity:** For each data structure and algorithm, analyze and understand its time and space complexity (Big O notation).
*   **Practice Problems:** After implementing each data structure and its algorithms, practice solving coding problems on platforms like LeetCode, HackerRank, etc., that utilize these concepts.
*   **Focus on Fundamentals:**  Solid understanding of these fundamental data structures and algorithms is crucial for most software engineering interviews, especially at the mid-senior level.


your-dsa-practice/
├── src/
│   ├── data-structures/
│   │   ├── array/
│   │   │   └── array.ts
│   │   ├── linked-list/
│   │   │   └── linked-list.ts
│   │   ├── stack/
│   │   │   └── stack.ts
│   │   ├── queue/
│   │   │   └── queue.ts
│   │   ├── binary-tree/
│   │   │   └── binary-tree.ts
│   │   └── ... (other data structures)
│   ├── algorithms/
│   │   ├── searching/
│   │   │   └── linear-search.ts
│   │   ├── sorting/
│   │   │   └── bubble-sort.ts
│   │   └── ... (other algorithm categories)
│   └── index.ts
├── test/
│   ├── data-structures/
│   │   ├── array/
│   │   │   └── array.test.ts
│   │   ├── linked-list/
│   │   │   └── linked-list.test.ts
│   │   ├── stack/
│   │   │   └── stack.test.ts
│   │   ├── queue/
│   │   │   └── queue.test.ts
│   │   ├── binary-tree/
│   │   │   └── binary-tree.test.ts
│   │   └── ... (tests for other data structures)
│   ├── algorithms/
│   │   ├── searching/
│   │   │   └── linear-search.test.ts
│   │   ├── sorting/
│   │   │   └── bubble-sort.test.ts
│   │   └── ... (tests for other algorithm categories)
├── package.json
├── tsconfig.json
└── README.md