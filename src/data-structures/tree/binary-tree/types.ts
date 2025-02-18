/**
 * Interface for a generic Tree Node.
 * @template T The type of data stored in the node.
 */
export interface ITreeNode<T> {
    /**
     * Get the data stored in the node.
     */
    getData(): T;

    /**
     * Data to set on the node.
     * @param data data to set on the node.
     */
    setData(data: T): void;

    /**
     * Get the Left-Node.
     */
    getLeft(): ITreeNode<T> | null;

    /**
     * Set the node on the left.
     * @param node node to set on the left.
     */
    setLeft(node: ITreeNode<T> | null): void;

    /**
     * Get the Right-Node.
     */
    getRight(): ITreeNode<T> | null;

    /**
     * Set the node on the right.
     * @param node node to set on the right.
     */
    setRight(node: ITreeNode<T> | null): void;
}

/**
 * Interface for a Binary Tree data structure.
 * @template T The type of data stored in the Binary Tree nodes.
 */
export interface IBinaryTree<T> {
    /**
     * Get the root node.
     */
    getRoot(): ITreeNode<T> | null;

    /**
     * Get if the BinaryTree is Empty.
     */
    isEmpty(): boolean;

    /**
     * Gets number of nodes in the BinaryTree (Count of nodes).
     */
    size(): number;

    /**
     * Clears the BinaryTree.
     */
    clear(): void;

    /**
     * Insert data into the BinaryTree.
     * @param data data to insert into the BinaryTree.
     */
    insert(data: T): void;

    /**
     * Searches a BinaryTree for a node with the data.
     * @param data data to search for in the BinaryTree.
     */
    search(data: T): boolean;

    /**
     * Returns an array of the nodes in Left(full subtree)-Root-Right(full-subtree) order.
     */
    inOrderTraversal(): T[];

    /**
     * Returns an array of the nodes in Root-Left(full subtree)-Right(full-subtree) order.
     */
    preOrderTraversal(): T[];

    /**
     * Returns an array of the nodes in Left(full subtree)-Right(full-subtree)-Root order.
     */
    postOrderTraversal(): T[];

    /**
     * Returns an array of the nodes in "Breadth-First Ordering" (Level by level).
     */
    levelOrderTraversal(): T[];

    /**
     * The height of the BinaryTree
     */
    getHeight(): number;

    /**
     * (Optional) Returns an array representation of the tree (e.g., level order).
     * Useful for debugging and testing.
     * @returns An array of elements in the tree.
     */
    toArray(): T[];
}

/**
 * Interface for a Binary Search Tree (BST) data structure.
 * Extends IBinaryTree and adds BST-specific operations.
 * @template T The type of data stored in the BST nodes. Data must be comparable.
 */
export interface IBinarySearchTree<T> extends IBinaryTree<T> {
    /**
     * Inserts new data into the BinarySearchTree.
     * @param data data to insert within the BinarySearchTree
     */
    insert(data: T): void;

    /**
     * Deletes data from within the BinarySearchTree.
     * @param data data to delete from the BinarySearchTree
     */
    delete(data: T): ITreeNode<T> | null;

    /**
     * Searches the BinarySearchTree for specific data.
     * @param data data to search for within the BinarySearchTree
     */
    search(data: T): boolean;

    /**
     * Finds the minimum value in the BinarySearchTree.
     */
    findMin(): T | undefined;

    /**
     * Finds the maximum value in the BinarySearchTree.
     */
    findMax(): T | undefined;
}