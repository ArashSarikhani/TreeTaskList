import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { insertInTree } from "../../helper";
import { CreateFormInputFields } from "../../interfaces/Task";
import axios from "../useApi";
import { useTaskStore } from "./../../context/index";
import { TaskInterface } from "./../../interfaces/Task";

export default function useCreateTask() {
	const navigate = useNavigate();
	const { setTasks } = useTaskStore();

	return useMutation(
		(values: CreateFormInputFields) => axios.post("/tasks", values),
		{
			onSuccess: ({ data }) => {
				if (data.parent) {
					setTasks((prev: TaskInterface[]) => insertInTree(prev, data));
				} else {
					setTasks((prev: TaskInterface[]) => {
						prev.push(data);
						return prev;
					});
				}
				navigate("/");
			},
			onError: (e) => console.error(e),
		},
	);
}
