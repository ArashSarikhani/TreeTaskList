import { useMutation } from "@tanstack/react-query";
import produce from "immer";
import { findNodeInTreeByNodeId } from "../../helper";
import axios from "../useApi";
import { useTaskStore } from "./../../context/index";
import { TaskInterface } from "./../../interfaces/Task";

export default function useCompleteTask() {
	const { setTasks } = useTaskStore();

	return useMutation(
		(values: { id: number }) => axios.patch(`/tasks/${values.id}`, values),
		{
			onSuccess: ({ data }) => {
				setTasks(
					produce((draft: any) => {
						let node: TaskInterface | undefined = findNodeInTreeByNodeId(
							draft,
							data.id,
						);
						if (node) {
							node.state = node.state === 1 ? -1 : 1;
						}
					}),
				);
			},
			onError: (e) => console.error(e),
		},
	);
}
