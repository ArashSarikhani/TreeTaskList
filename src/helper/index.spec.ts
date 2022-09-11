import { TaskInterface } from "./../interfaces/Task";
import { checkStatusOfNode, makeTree } from "./index";

describe("Tree functions", () => {
	it("create tree from flat data", () => {
		const data = [
			{ id: 1, parent: null },
			{ id: 2, parent: 1 },
		];
		const tree = makeTree(data);
		expect(tree[0].children[0].parent).toBe(1);
	});

	it("create an array of status from all tree nodes and subtrees.", () => {
		const node: TaskInterface = {
			id: 1,
			name: "Task 1",
			state: -1,
			description: "",
			due_date: "1990-01-01",
			version: 1,
			parent: null,
			children: [
				{
					id: 2,
					name: "Task 1",
					state: 1,
					description: "",
					due_date: "1990-01-01",
					version: 1,
					parent: null,
					children: [
						{
							id: 2,
							name: "Task 1",
							state: 0,
							description: "",
							due_date: "1990-01-01",
							version: 1,
							parent: null,
							children: [],
						},
					],
				},
			],
		};
		const status = checkStatusOfNode(node);
		expect(status).toEqual([-1, 1, 0]);
	});
});
