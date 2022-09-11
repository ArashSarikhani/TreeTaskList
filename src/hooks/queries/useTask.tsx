import { useQuery } from "@tanstack/react-query";
import axios from "../useApi";

const fetchSingleTask = (id: number) =>
	axios.get(`/tasks/${id}`).then((response) => response.data);

export function useSingleTask(id: number) {
	return useQuery(["tasks", id], () => fetchSingleTask(id), {
		refetchOnWindowFocus: false,
	});
}
