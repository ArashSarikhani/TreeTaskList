import React, { useContext } from "react";
import { TaskInterface } from "../interfaces/Task";

interface TaskCTX {
	tasks: TaskInterface[];
	setTasks: Function;
}

export const TasksContext = React.createContext({} as TaskCTX);

export const useTaskStore = () => useContext(TasksContext);
