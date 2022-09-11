import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { Link as ReactRouterLink } from "react-router-dom";
import ColorSwitcher from "./ColorSwitcher";

export default function AppBar() {
	return (
		<Flex p="2.5" flexGrow={1} gridGap="2" justifyContent="space-between">
			<Flex direction="column">
				<Heading>Taski</Heading>
				<Heading fontSize={12}>Mobal.io task front-end challenge</Heading>
			</Flex>
			<ButtonGroup>
				<Button
					as={ReactRouterLink}
					to="/add"
					variant="outline"
					leftIcon={<VscAdd />}
				>
					Add root Task
				</Button>
				<ColorSwitcher />
			</ButtonGroup>
		</Flex>
	);
}
