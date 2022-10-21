import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { Container } from "./styles";

export default function Groups() {
	return (
		<Container>
			<Header />
			<Highlight title='Teams' subtitle='Play with your teammates' />
			<GroupCard title='Galera do Overwatch' activeOpacity={0.7} />
		</Container>
	);
}
