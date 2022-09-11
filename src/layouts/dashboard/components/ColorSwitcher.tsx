import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ColorSwitcher() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<IconButton
			variant="ghost"
			rounded="full"
			icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
			aria-label={colorMode === "light" ? "dark" : "light"}
			onClick={toggleColorMode}
		/>
	);
}
