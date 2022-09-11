import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import TaskProvider from "../context/providers/TaskProvider";

export const renderWithProviders = (ui: ReactElement): RenderResult => {
	const wrapper: React.ComponentType = ({
		children,
	}: {
		children?: ReactNode;
	}) => {
		const queryClient = new QueryClient();

		return (
			<ChakraProvider>
				<ColorModeProvider>
					<TaskProvider>
						<QueryClientProvider client={queryClient}>
							{children}
						</QueryClientProvider>
					</TaskProvider>
				</ColorModeProvider>
			</ChakraProvider>
		);
	};

	return render(ui, { wrapper });
};
