import { Accordion, Button, Flex, Spinner } from "@chakra-ui/react";

import { useTaskStore } from "../context";
import { useTasks } from "../hooks/queries";
import { TaskInterface } from "../interfaces/Task";
import RenderTaskTree from "./RenderTasksTree";

export default function TaskList() {
	const { tasks } = useTaskStore();

	const tasksQuery = useTasks();

	if (tasksQuery.isLoading) return <Spinner />;
	if (tasksQuery.error) return <div>Error</div>;

	return (
		<Flex direction="column" gridGap="1.5" p="3">
			<Accordion allowMultiple>
				{tasks.map((task: TaskInterface) => (
					<RenderTaskTree key={task.id} task={task} />
				))}
			</Accordion>
			<Button
				variant="solid"
				disabled={tasksQuery.isLoading || !tasksQuery.hasNextPage}
				isLoading={tasksQuery.isLoading || tasksQuery.isFetching}
				onClick={async () => await tasksQuery.fetchNextPage()}
			>
				Load more
			</Button>
		</Flex>
	);
}
