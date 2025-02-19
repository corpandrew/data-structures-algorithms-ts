import {IBinarySearchTree, ITreeNode} from "../binary-tree/types.ts";

/**
 * Interface for an AVL Tree Node.
 * Extends IBSTNode to include AVL-specific properties like height.
 * @template T The type of data stored in the AVL node. Must be comparable.
 * @interface IAVLTreeNode
 * @extends {ITreeNode<T>}
 */
export interface IAVLTreeNode<T> extends ITreeNode<T> {

    /**
     * Get the Left-Node.
     */
    getLeft(): IAVLTreeNode<T> | null;

    /**
     * Set the node on the left.
     * @param node node to set on the left.
     */
    setLeft(node: IAVLTreeNode<T> | null): void;

    /**
     * Get the Right-Node.
     */
    getRight(): IAVLTreeNode<T> | null;

    /**
     * Set the node on the right.
     * @param node node to set on the right.
     */
    setRight(node: IAVLTreeNode<T> | null): void;

    /**
     * Gets the height of the AVL node.
     * Height is used for AVL tree balancing.
     * @returns {number} The height of the node.
     * @memberof IAVLTreeNode
     */
    getHeight(): number;

    /**
     * Sets the height of the AVL node.
     * @param {number} height The new height to set for the node.
     * @memberof IAVLTreeNode
     */
    setHeight(height: number): void;
}

/**
 * Interface for an AVL Tree data structure.
 * Extends IBinarySearchTree and defines AVL-specific behavior.
 * @template T The type of data stored in the AVL Tree nodes. Data must be comparable.
 * @interface IAVLTree
 * @extends {IBinarySearchTree<T>}
 */
export interface IAVLTree<T> extends IBinarySearchTree<T> {
    /**
     * Gets the root node of the AVL Tree.
     * @returns {IAVLTreeNode<T> | null} The root node, or null if the tree is empty.
     * @memberof IAVLTree
     * @override
     */
    getRoot(): IAVLTreeNode<T> | null;

    /**
     * Inserts data into the AVL Tree.
     * AVL Trees treat insertion differently (to maintain balance), marking it here for clarity.
     * @param data data to insert into the tree.
     * @override
     */
    insert(data: T): void;

    /**
     * Deletes data from within the AVL Tree.
     * AVL Trees treat insertion differently (to maintain balance), marking it here for clarity.
     * @param data data to delete from the AVL Tree.
     * @override
     */
    delete(data: T): IAVLTreeNode<T> | null;
}