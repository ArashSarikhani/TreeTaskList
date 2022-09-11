import { screen } from "@testing-library/react";
import { renderWithProviders } from "../__tests__/test-utils";
import ToogleTaskState from "./ToogleTaskState";

describe("Toggle Task Status", () => {
	it("Toggle Task State render.", async () => {
		const task = {
			id: 0,
			parent: 0,
			version: 0,
			name: "string",
			description: "string",
			due_date: "2019-08-24T14:15:22Z",
			state: -1,
			children: [],
		};
		const { rerender } = renderWithProviders(<ToogleTaskState task={task} />);
		const btn = await screen.findByRole("button");

		expect(btn.getAttribute("aria-label")).toBe("Click to complete");
		task.state = 1;
		rerender(<ToogleTaskState task={task} />);
		expect(btn.getAttribute("aria-label")).toBe("Click to incomplete");
		task.state = 0;
		rerender(<ToogleTaskState task={task} />);
		expect(btn.getAttribute("aria-label")).toBe("Click to incomplete");
	});
});
