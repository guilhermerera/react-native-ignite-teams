import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import InputText from "@components/InputText";
import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
	return (
		<Container>
			<Header showBackButton />
			<Content>
				<Icon />
				<Highlight
					title='New Team'
					subtitle='Create your team to add teammates'
				/>
				<InputText placeholder='Team Name' />
				<Button title='Create' style={{ marginTop: 16 }} />
			</Content>
		</Container>
	);
}
