import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Flex,
	Text,
} from "@chakra-ui/react";
import moment from "moment";
import { memo, useState } from "react";
import { TaskInterface } from "../interfaces/Task";
import { AddTask } from "./AddTask";
import DeleteTask from "./DeleteTask";
import TaskStatus from "./TaskStatus";
import TaskView from "./TaskView";
import ToogleTaskState from "./ToogleTaskState";

const RenderTaskTree = memo(function RenderTaskTreeInsideMemo({
	task,
}: {
	task: TaskInterface;
}) {
	const [taskIsShowing, viewTask] = useState<number>();

	return (
		<>
			{!!taskIsShowing && (
				<TaskView isOpen={true} taskId={task.id} onClose={() => viewTask(0)} />
			)}
			<AccordionItem>
				<Flex flexGrow={1} alignItems="center">
					<AccordionButton gridGap="2" flex={0}>
						<AccordionIcon />
					</AccordionButton>

					<Flex flex={1} alignItems="center" gridGap="1" p="1">
						<Flex flexGrow={1}>
							<Button variant="ghost" onClick={() => viewTask(task.id)}>
								<Text fontWeight="bold">{task.name}</Text>
							</Button>
						</Flex>
						<Flex direction="column">
							<TaskStatus task={task} />
							<Text fontSize="small">
								{task.due_date && moment(task.due_date).fromNow()}
							</Text>
						</Flex>
						<AddTask id={task.id} />
						<DeleteTask id={task.id} />
						<ToogleTaskState task={task} />
					</Flex>
				</Flex>
				<AccordionPanel pb={4}>
					<Text color="gray">{task.description}</Text>
					{task.children?.map((t: TaskInterface) => (
						<RenderTaskTree key={t.id} task={t} />
					))}
				</AccordionPanel>
			</AccordionItem>
		</>
	);
});

export default RenderTaskTree;
