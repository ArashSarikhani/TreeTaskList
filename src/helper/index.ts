import { TaskInterface } from "./../interfaces/Task";

export function makeTree(
	nodes: Partial<TaskInterface>[],
	root: number | null | undefined = null,
) {
	return nodes?.reduce((subtree: any, node) => {
		if (node.parent === root) {
			subtree.push({
				...node,
				children: makeTree(
					nodes.filter((n) => n.id !== root),
					node.id,
				),
			});
		}
		return subtree;
	}, []);
}

export function checkStatusOfNode(
	node: TaskInterface,
	status: number[] = [],
): number[] | undefined {
	status.push(node.state);
	if (!node.children) return status;
	for (const child of node.children) {
		checkStatusOfNode(child, status);
	}
	return status;
}

export function insertInTree(tree: TaskInterface[] | any, node: TaskInterface) {
	var found: TaskInterface | null = null;
	function recursiveFinInTree(subtree: TaskInterface[]): any {
		for (let i = 0; i < subtree.length && !found; i++) {
			if (subtree[i].id === node.parent) {
				subtree[i].children?.push(node);
				found = subtree[i];
			}
			recursiveFinInTree(tree[i].children);
		}
		return false;
	}
	recursiveFinInTree(tree);
	if (found) return found;
}
export function findNodeInTreeByNodeId(
	tree: TaskInterface[],
	id: number,
): TaskInterface | undefined {
	for (const node of tree) {
		if (node.id === id) return node;
		const search = node.children && findNodeInTreeByNodeId(node.children, id);
		if (search) return search;
	}
}

export function findNodeAndDeleteById(tree: TaskInterface[], id: number) {
	for (const node of tree)
		node.children = node.children.filter((n) => {
			if (n.id === id) {
				return false;
			} else {
				findNodeAndDeleteById(n.children, id);
				return true;
			}
		});
}
