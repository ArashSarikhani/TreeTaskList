import { IconButton } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { VscNewFile } from "react-icons/vsc";
import { Link as ReactRouterLink } from "react-router-dom";

export function AddTask({ id }: { id: number }): ReactElement {
	return (
		<IconButton
			icon={<VscNewFile />}
			aria-label="create sub task"
			variant="ghost"
			rounded="full"
			as={ReactRouterLink}
			to={`/add?parent=${id}`}
		/>
	);
}
