import { Container, Message } from "./styles";

type Props = {
	message: string;
};

export default function EmptyList({ message }: Props) {
	return (
		<Container>
			<Message>{message}</Message>
		</Container>
	);
}
