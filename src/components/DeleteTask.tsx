import { IconButton } from "@chakra-ui/react";
import { ReactElement } from "react";
import { VscTrash } from "react-icons/vsc";
import useDeleteTask from "../hooks/mutations/deleteTask";

export default function DeleteTask({ id }: { id: number }): ReactElement {
	const deleteTaskMutation = useDeleteTask();

	return (
		<IconButton
			icon={<VscTrash />}
			aria-label="remove task"
			variant="ghost"
			rounded="full"
			onClick={() =>
				deleteTaskMutation.mutate({
					id,
				})
			}
			isLoading={deleteTaskMutation.isLoading}
			disabled={deleteTaskMutation.isLoading}
		/>
	);
}
