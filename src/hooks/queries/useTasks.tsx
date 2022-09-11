import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useTaskStore } from "../../context";
import { makeTree } from "../../helper";
import axios from "../useApi";

const fetchTasks = ({ pageParam = 1 }) => {
	return axios
		.get(`/tasks?page=${pageParam}`)
		.then((response) => response.data);
};

export function useTasks(page: number = 1) {
	const { setTasks } = useTaskStore();
	const queryClient = useQueryClient();
	return useInfiniteQuery(["tasks"], fetchTasks, {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.next) return pages.length + 1;
			return false;
		},
		onSuccess: () => {
			const tasks: any = queryClient.getQueryData(["tasks"]);
			setTasks(
				makeTree(
					tasks.pages.reduce(
						(r: any, item: any) => [...r, ...item.results],
						[],
					),
				),
			);
		},
	});
}
