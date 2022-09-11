import { Badge } from "@chakra-ui/react";
import { memo, useMemo } from "react";
import { checkStatusOfNode } from "../helper";
import { TaskInterface } from "../interfaces/Task";

export default memo(function StatusOfTask({ task }: { task: TaskInterface }) {
	const statusArray = useMemo(() => checkStatusOfNode(task), [task]);

	let status =
		statusArray?.includes(1) &&
		!statusArray.includes(0) &&
		!statusArray.includes(-1)
			? "Completed"
			: statusArray?.includes(1) &&
			  (statusArray?.includes(0) || statusArray?.includes(-1))
			? "Partialy completed"
			: "Not Completed";
	return (
		<Badge
			variant="outline"
			data-testid="status-badge"
			colorScheme={
				status === "Completed"
					? "green"
					: status === "Partialy completed"
					? "orange"
					: "red"
			}
		>
			{status}
		</Badge>
	);
});
