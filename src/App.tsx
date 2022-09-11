import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useImmer } from "use-immer";
import { TasksContext } from "./context";
import DashboardLayout from "./layouts/dashboard";
import Home from "./pages/Home";
import CreateTask from "./pages/Tasks/Create";

const queryClient = new QueryClient();

function App() {
	const [tasks, setTasks] = useImmer([]);
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<TasksContext.Provider value={{ tasks, setTasks }}>
				<BrowserRouter>
					<ChakraProvider>
						<Routes>
							<Route
								element={
									<Suspense fallback={<Spinner />}>
										<DashboardLayout />
									</Suspense>
								}
							>
								<Route
									path="/"
									element={
										<Suspense fallback={<Spinner />}>
											<Home />
										</Suspense>
									}
								/>
								<Route
									path="/add"
									element={
										<Suspense fallback={<Spinner />}>
											<CreateTask />
										</Suspense>
									}
								/>
							</Route>
						</Routes>
					</ChakraProvider>
				</BrowserRouter>
			</TasksContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
