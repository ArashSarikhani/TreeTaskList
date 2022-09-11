import {
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useCreateTask from "../../../hooks/mutations/createTask";
import { CreateFormInputFields } from "../../../interfaces/Task";

export default function CreateTask() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const submitMutation = useCreateTask();
	const [searchparams] = useSearchParams();

	const onSubmit: SubmitHandler<CreateFormInputFields> = (data) => {
		const parent = searchparams.get("parent");
		parent && (data.parent = +parent);
		return submitMutation.mutate(data);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column" shadow="md" gridGap="2" p="2.5" rounded="md">
					<Heading fontSize="2xl">Create New Task</Heading>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input
							id="name"
							placeholder="name"
							{...register("name", {
								required: "Name is required.",
								maxLength: 50,
							})}
						/>
						<FormErrorMessage fontSize="xs">
							{String(errors.name?.message)}{" "}
							{String(errors?.name?.type) === "maxLength" &&
								"Max length exceeded"}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!errors.description}>
						<FormLabel htmlFor="description">Description</FormLabel>
						<Textarea
							id="description"
							placeholder="description"
							{...register("description", { maxLength: 255 })}
						/>
						<FormErrorMessage>
							{String(errors.description?.message)}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={!!errors.due_date}>
						<FormLabel htmlFor="due_date">Due date</FormLabel>
						<Input
							id="due_date"
							placeholder="description"
							type="datetime-local"
							{...register("due_date")}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="state">State</FormLabel>
						<Select
							placeholder="Select state"
							id="state"
							{...register("state")}
						>
							<option value="-1">Not completed</option>
							<option value="0">Partialy completed</option>
							<option value="1">completed</option>
						</Select>
					</FormControl>
					<Button
						disabled={submitMutation.isLoading}
						mt={4}
						colorScheme="teal"
						isLoading={submitMutation.isLoading}
						type="submit"
					>
						Submit Task
					</Button>
				</Flex>
			</form>
		</Container>
	);
}
