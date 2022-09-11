import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../../../__tests__/test-utils";
import ColorSwitcher from "./ColorSwitcher";

describe("Color Mode Switcher. (Light/Dark)", () => {
	it("Toogle color mode (to dark).", async () => {
		// Arrange
		renderWithProviders(<ColorSwitcher />);
		const btn = await screen.findByRole("button");
		const currentColorMode = btn.getAttribute("aria-label");
		const nextColorMode = currentColorMode === "light" ? "dark" : "light";
		// Act
		fireEvent.click(btn);
		// Assert
		expect(btn.getAttribute("aria-label")).toBe(nextColorMode);
	});
});
