import { IconButton } from "@chakra-ui/react";
import React, { memo } from "react";
import { VscThumbsdown, VscThumbsup } from "react-icons/vsc";
import useCompleteTask from "../hooks/mutations/completeTask";
import { TaskInterface } from "../interfaces/Task";
type Props = {
	task: TaskInterface;
};

function ToogleTaskState({ task }: Props) {
	const completeTaskMutation = useCompleteTask();
	return (
		<IconButton
			icon={
				task.state === 0 || task.state === -1 ? (
					<VscThumbsup />
				) : (
					<VscThumbsdown />
				)
			}
			aria-label={
				[0, 1].includes(task.state)
					? "Click to incomplete"
					: "Click to complete"
			}
			variant="ghost"
			rounded="full"
			isLoading={completeTaskMutation.isLoading}
			onClick={() =>
				completeTaskMutation.mutate({
					id: task.id,
				})
			}
		/>
	);
}

export default memo(ToogleTaskState);
