import { screen } from "@testing-library/react";
import { TaskInterface } from "../interfaces/Task";
import { renderWithProviders } from "../__tests__/test-utils";
import TaskStatus from "./TaskStatus";

describe("task status", () => {
	var task: TaskInterface = {
		id: 1,
		name: "Task 1",
		description: "no desc",
		version: 1,
		state: -1,
		due_date: "1984-02-17 00:00:00",
		parent: null,
		children: [],
	};

	it("Should render the status Badge.", async () => {
		renderWithProviders(<TaskStatus task={task} />);
		const badge = await screen.findByTestId("status-badge");
		expect(badge).toBeInTheDocument();
	});

	it("not completed badge.", () => {
		renderWithProviders(<TaskStatus task={task} />);
		const badgeElement = screen.getByText(/Not Completed/i);
		expect(badgeElement).toBeInTheDocument();
	});

	it("completed badge.", () => {
		task.state = 1;
		renderWithProviders(<TaskStatus task={task} />);
		const badgeElement = screen.getByText(/Completed/i);
		expect(badgeElement).toBeInTheDocument();
	});

	it("partially completed badge", () => {
		// Arange
		const t: TaskInterface = {
			id: 1,
			name: "Task 1",
			description: "no desc",
			version: 1,
			state: -1,
			due_date: "1984-02-17 00:00:00",
			parent: null,
			children: [
				{
					parent: 1,
					id: 2,
					name: "Task2",
					version: 1,
					state: 1,
					due_date: "1984-02-17 00:00:00",
					description: "",
					children: [],
				},
			],
		};
		// Act
		renderWithProviders(<TaskStatus task={t} />);
		const badgeElement = screen.getByText(/Partialy completed/i);

		// Assert
		expect(badgeElement).toBeInTheDocument();
	});
});
