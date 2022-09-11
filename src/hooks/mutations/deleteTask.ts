import { useMutation } from "@tanstack/react-query";
import produce from "immer";
import { useTaskStore } from "../../context";
import { findNodeAndDeleteById, findNodeInTreeByNodeId } from "../../helper";
import axios from "../useApi";
import { TaskInterface } from "./../../interfaces/Task";

export default function useDeleteTask() {
	const { setTasks } = useTaskStore();

	return useMutation(
		(values: { id: number }) =>
			axios.delete(`/tasks/${values.id}`).then((response) => response.data),
		{
			onSuccess: (_, { id }: { id: number }) => {
				setTasks(
					produce((draft: any) => {
						let node: TaskInterface | undefined = findNodeInTreeByNodeId(
							draft,
							id,
						);
						if (!node) return;
						if (node.parent) {
							let parent = findNodeInTreeByNodeId(draft, node.parent);
							parent &&
								(parent.children = [...parent.children, ...node.children]);
							findNodeAndDeleteById(draft, id);
						} else {
							return draft.filter((node: TaskInterface) => node.id !== id);
						}
					}),
				);
			},
			onError: (e) => console.error(e),
		},
	);
}
