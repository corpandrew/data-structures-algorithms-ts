This timeline is roughly organized from simpler to more complex data structures. Feel free to adjust the pace to your
learning. The "fake applications" are just to give you context; you don't need to build full applications, just think
about how the data structure could be used.

### Day 1: Foundations - Arrays and Strings

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
*   [x] **String Algorithms (Basic):**
    *   [x] Reverse a string.
    *   [x] Check if a string is a palindrome.
    *   [x] Count the occurrences of a specific character in a string.

### Day 1: Linked Lists

**Data Structure Focus:** Linked Lists (Singly and Doubly Linked Lists)

**Fake Application:** Imagine building a simple "Undo/Redo" feature for a text editor or drawing application. Linked
lists are great for maintaining a history of actions.

**Algorithms to Implement:**

*   [x] **Singly Linked List:**
    *   [x] Create a Node class (with `data` and `next` pointer).
    *   [x] Create a LinkedList class (with `head` pointer).
    *   [x] `insertAtBeginning(data)`: Insert a new node at the beginning of the list.
    *   [x] `insertAtEnd(data)`: Insert a new node at the end of the list.
    *   [x] `insertAtIndex(data, index)`: Insert a new node at a specific index.
    *   [x] `deleteFromBeginning()`: Delete the first node.
    *   [x] `deleteFromEnd()`: Delete the last node.
    *   [x] `deleteAtIndex(index)`: Delete a node at a specific index.
    *   [x] `search(data)`: Search for a node with given data.
    *   [x] `reverseList()`: Reverse the linked list.
    *   [x] `printList()`: Print all elements of the list.
*   [x] **Doubly Linked List:**
    *   [x] Create a Node class (with `data`, `next`, and `prev` pointers).
    *   [x] Create a DoublyLinkedList class (with `head` and `tail` pointers).
    *   [x] Implement similar insertion, deletion, search, and print operations as for Singly Linked List, but
        leveraging the `prev` pointers.
    *   [x] `reverseList()` (Doubly Linked List version - might be slightly different).

### Day 2: Stacks and Queues

**Data Structure Focus:** Stacks and Queues

**Fake Application:**

* **Stack:**  Imagine a browser history (back button functionality).
* **Queue:**  Imagine a print queue or a task scheduler.

**Algorithms to Implement:**

*   [x] **Stack (using Array or Linked List):**
    *   [x] Create a Stack class.
    *   [x] `push(item)`: Add an item to the top of the stack.
    *   [x] `pop()`: Remove and return the item from the top of the stack.
    *   [x] `peek()`: Return the item at the top of the stack without removing it.
    *   [x] `isEmpty()`: Check if the stack is empty.
    *   [x] `size()`: Return the number of items in the stack.
*   [x] **Queue (using Array or Linked List):**
    *   [x] Create a Queue class.
    *   [x] `enqueue(item)`: Add an item to the back of the queue.
    *   [x] `dequeue()`: Remove and return the item from the front of the queue.
    *   [x] `peek()` (front): Return the item at the front of the queue without removing it.
    *   [x] `isEmpty()`: Check if the queue is empty.
    *   [x] `size()`: Return the number of items in the queue.
*   [x] **Stack Application Example:**
    *   [x] **Stack:** Implement a simple expression evaluator for balanced parentheses (e.g.,
        `isValidParentheses(string expression)`).

### Day 3: Trees - Binary Trees and Binary Search Trees (BSTs)

**Data Structure Focus:** Binary Trees and Binary Search Trees

**Fake Application:**  Imagine building a simple contact list that you want to search and sort efficiently. A BST can
help with sorted storage and quick lookups.

**Algorithms to Implement:**

*   [x] **Binary Tree (Basic):**
    *   [x] Create a TreeNode class (with `data`, `left`, and `right` pointers).
    *   [x] Create a BinaryTree class (with `root` pointer).
    *   [x] **Tree Traversals:**
        *   [x] In-order traversal (Left-Root-Right)
        *   [x] Pre-order traversal (Root-Left-Right)
        *   [x] Post-order traversal (Left-Right-Root)
        *   [x] Level-order traversal (Breadth-First Search using a Queue)
    *   [x] `getHeight(node)`: Calculate the height of a binary tree or subtree.
    *   [x] `countNodes(node)`: Count the number of nodes in a binary tree.
*   [x] **Binary Search Tree (BST):**
    *   [x] Create a BSTNode class (same as TreeNode).
    *   [x] Create a BinarySearchTree class (with `root` pointer).
    *   [x] `insert(data)`: Insert a new node into the BST, maintaining BST property.
    *   [x] `search(data)`: Search for a node with given data in the BST.
    *   [x] `delete(data)`: Delete a node from the BST, handling different cases (leaf, one child, two children).
    *   [x] `findMin(node)`: Find the node with the minimum value in a subtree.
    *   [x] `findMax(node)`: Find the node with the maximum value in a subtree.
*   [x] **BST Application (Contact List - Conceptual):**
    *   [x] Think about how you could store contact names in a BST, ordered alphabetically.
    *   [x] Implement `addContact(name)` (insert into BST).
    *   [x] Implement `findContact(name)` (search in BST).
    *   [x] Implement `listContactsAlphabetically()` (in-order traversal).

### Day 4: Hash Tables (Hash Maps)

**Data Structure Focus:** Hash Tables (or Hash Maps)

**Fake Application:**  Imagine building a simple in-memory cache to quickly retrieve data based on keys.

**Algorithms to Implement:**

*   [ ] **Hash Table Implementation:**
    *   [ ] Choose a hashing function (simple ones for practice, e.g., modulo based).
    *   [ ] Decide on a collision resolution strategy:
        *   [ ] Separate Chaining (using Linked Lists at each index)
        *   [ ] Open Addressing (e.g., Linear Probing, Quadratic Probing - Separate Chaining is often simpler to
            implement first).
    *   [ ] Create a HashTable class.
    *   [ ] `put(key, value)`: Insert a key-value pair into the hash table.
    *   [ ] `get(key)`: Retrieve the value associated with a given key.
    *   [ ] `remove(key)`: Remove a key-value pair from the hash table.
    *   [ ] `containsKey(key)`: Check if a key exists in the hash table.
    *   [ ] `size()`: Get the number of key-value pairs in the hash table.
*   [ ] **Hash Table Application (Cache - Conceptual):**
    *   [ ] Think about how you could use a hash table to store cached data, where the key is the data identifier and
        the value is the data itself.
    *   [ ] Implement `cacheData(key, data)` (put in hash table).
    *   [ ] Implement `getCachedData(key)` (get from hash table).

### Day 5: Heaps and Priority Queues

**Data Structure Focus:** Heaps (Min-Heap, Max-Heap) and Priority Queues

**Fake Application:** Imagine building a task scheduler where tasks need to be prioritized based on urgency.

**Algorithms to Implement:**

*   [ ] **Heap (Min-Heap):**
    *   [ ] Create a MinHeap class (often implemented using an array).
    *   [ ] `insert(value)`: Insert a new value into the min-heap, maintaining heap property (heapify up).
    *   [ ] `extractMin()`: Remove and return the minimum value (root) from the min-heap, maintaining heap property (
        heapify down).
    *   [ ] `peekMin()`: Return the minimum value without removing it.
    *   [ ] `heapify()` (build a heap from an array).
    *   [ ] `size()`: Get the number of elements in the heap.
*   [ ] **Max-Heap:**
    *   [ ] Implement a MaxHeap class (similar to MinHeap, but with max-heap property).
    *   [ ] Implement `insert`, `extractMax`, `peekMax`, `heapify` for Max-Heap.
*   [ ] **Priority Queue (using Heap):**
    *   [ ] Create a PriorityQueue class (using either Min-Heap or Max-Heap depending on priority definition - e.g.,
        Min-Heap for lowest priority value being highest priority).
    *   [ ] `enqueue(item, priority)`: Add an item with a priority to the priority queue.
    *   [ ] `dequeue()`: Remove and return the item with the highest priority.
    *   [ ] `peek()`: Return the item with the highest priority without removing it.
*   [ ] **Priority Queue Application (Task Scheduler - Conceptual):**
    *   [ ] Think about how you can use a priority queue to schedule tasks based on priority levels.
    *   [ ] `addTask(taskName, priority)` (enqueue with priority).
    *   [ ] `getNextTask()` (dequeue to get the highest priority task).

### Day 6: Graphs - Basic Graph Representation and Traversal

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
        *   [ ] Implement a Graph class using an adjacency list (e.g., using a dictionary/map where keys are vertices
            and values are lists of neighbors).
        *   [ ] Implement `addVertex`, `addEdge`, `hasEdge`, `getNeighbors` for Adjacency List representation.
*   [ ] **Graph Traversal Algorithms:**
    *   [ ] **Breadth-First Search (BFS):**
        *   [ ] Implement BFS traversal starting from a given vertex.
        *   [ ] Use a queue to manage vertices to visit.
    *   [ ] **Depth-First Search (DFS):**
        *   [ ] Implement DFS traversal starting from a given vertex (recursive or iterative using a stack).
*   [ ] **Graph Application (Social Network - Conceptual):**
    *   [ ] Think about how vertices could represent people and edges could represent friendships.
    *   [ ] Implement `areConnected(person1, person2)` using BFS or DFS to check if there is a path between two people (
        friends of friends, etc.).

### Day 7: More Graph Algorithms (Optional - Depending on Interview Focus)

**Data Structure Focus:** Graphs (Advanced Algorithms)

**Fake Application:** Expanding on the social network or thinking about route planning/network connections.

**Algorithms to Implement (Choose based on your interview focus and time):**

*   [ ] **Shortest Path Algorithms:**
    *   [ ] **Dijkstra's Algorithm:** Find the shortest path from a source vertex to all other vertices in a weighted
        graph (non-negative weights).
    *   [ ] (Optional) Bellman-Ford Algorithm: Shortest paths in a weighted graph, can handle negative weights (but not
        negative cycles).
*   [ ] **Minimum Spanning Tree (MST) Algorithms:**
    *   [ ] **Prim's Algorithm:** Find a minimum spanning tree for a weighted undirected graph.
    *   [ ] (Optional) Kruskal's Algorithm: Another MST algorithm (often uses disjoint sets data structure).
*   [ ] **Graph Application (Route Planning - Conceptual):**
    *   [ ] Think about how vertices could be locations and edges could be roads with weights representing distances.
    *   [ ] Use Dijkstra's algorithm to find the shortest route between two locations.

**Important Notes:**

* **Implement from Scratch:** The key here is to implement these data structures and algorithms *yourself* without using
  built-in library implementations (unless explicitly allowed or for comparison later). This is how you truly understand
  them.
* **Testing:**  Write unit tests for each data structure and algorithm to ensure they work correctly. Test edge cases
  and boundary conditions.
* **Time and Space Complexity:** For each data structure and algorithm, analyze and understand its time and space
  complexity (Big O notation).
* **Practice Problems:** After implementing each data structure and its algorithms, practice solving coding problems on
  platforms like LeetCode, HackerRank, etc., that utilize these concepts.
* **Focus on Fundamentals:**  Solid understanding of these fundamental data structures and algorithms is crucial for
  most software engineering interviews, especially at the mid-senior level.