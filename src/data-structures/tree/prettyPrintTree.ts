import {ITreeNode} from "./binary-tree/types.ts";

/**
 * Console.log's a pretty string representation of a Binary Tree.
 * @template T The type of data stored in the tree nodes.
 * @param root The root node of the Binary Tree.
 */
export function prettyPrintTree<T>(
    root: ITreeNode<T> | null,
): void {
    if (!root) {
        console.log("(empty tree)");
    }

    const lines: string[] = [];

    function traverse(node: ITreeNode<T> | null, indent: string, isRight: boolean, isRoot: boolean) {
        if (!node) {
            return;
        }

        const nodeValue = node.getData();
        const linePrefix = isRoot ? "" : indent + (isRight ? "R └── " : "L ├── ");
        lines.push(linePrefix + String(nodeValue));

        const childIndent = isRoot ? "" : indent + (isRight ? "R     " : "L │   ");

        traverse(node.getLeft(), childIndent, false, false);
        traverse(node.getRight(), childIndent, true, false);
    }

    traverse(root, "", false, true);
    console.log(lines.join('\n'));
}