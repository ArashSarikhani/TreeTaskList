import React, { ReactElement, ReactNode } from "react";
import { useImmer } from "use-immer";
import { TasksContext } from "..";

type Props = {
	children?: ReactNode;
};

export default function TaskProvider({ children }: Props): ReactElement {
	const [tasks, setTasks] = useImmer([]);

	return (
		<TasksContext.Provider value={{ tasks, setTasks }}>
			{children}
		</TasksContext.Provider>
	);
}
