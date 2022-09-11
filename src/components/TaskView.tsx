import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { ReactElement } from "react";
import { VscCalendar } from "react-icons/vsc";
import { useSingleTask } from "../hooks/queries";

export default React.memo(function TaskView({
	taskId,
	isOpen,
	onClose,
}: {
	taskId: number;
	isOpen: boolean;
	onClose: Function;
}): ReactElement {
	const singleTaskQuery = useSingleTask(taskId);

	return (
		<Modal
			scrollBehavior="inside"
			isCentered
			isOpen={isOpen}
			onClose={() => {}}
		>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px) hue-rotate(90deg)"
			/>
			<ModalContent>
				{singleTaskQuery.isLoading ? (
					<Flex
						p="5"
						justifyContent="center"
						alignItems="center"
						direction="column"
					>
						<Spinner />
						<Text>L O A D I N G</Text>
					</Flex>
				) : singleTaskQuery.isError ? (
					<Text>Error occured</Text>
				) : (
					<>
						<ModalHeader>{singleTaskQuery.data?.name}</ModalHeader>

						<ModalCloseButton />
						<ModalBody>
							<Text>{singleTaskQuery.data.description}</Text>
						</ModalBody>
						<ModalFooter gridGap="2" justifyContent="flex-start">
							<Flex
								gridGap="1"
								alignItems="center"
								flex="1"
								justifyContent="space-between"
							>
								<Flex gridGap="1.5" alignItems="center">
									<VscCalendar size={24} />
									<Text fontSize="sm">
										{moment(singleTaskQuery.data.due_date).format(
											"YYYY-MM-DD HH:mm:ss",
										)}
									</Text>
								</Flex>
								<Button onClick={() => onClose()}>Close</Button>
							</Flex>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
});
