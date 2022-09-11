import { Grid, GridItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";

export default function DashboardLayout(): ReactElement {
	return (
		<Grid h="100vh" gridTemplateRows={"min-content auto"}>
			<AppBar />
			<GridItem p="2">
				<Outlet />
			</GridItem>
		</Grid>
	);
}
