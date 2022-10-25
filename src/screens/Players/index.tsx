import { useState } from "react";
import { FlatList } from "react-native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import InputText from "@components/InputText";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import EmptyList from "@components/EmptyList";
import Button from "@components/Button";

import { Container, Form, HeaderList, PlayerCount } from "./styles";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
	group: string;
};

export default function Players() {
	const [team, setTeam] = useState("Squad A");
	const [players, setPlayers] = useState([]);
	const route = useRoute();
	const { group } = route.params as RouteParams;

	return (
		<Container>
			<Header showBackButton />
			<Highlight title={group} subtitle='Add your teammates' />
			<Form>
				<InputText placeholder='Player name' autoCorrect={false} />
				<ButtonIcon icon='add' />
			</Form>

			<HeaderList>
				<FlatList
					data={["Squad A", "Squad B"]}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === team}
							onPress={() => setTeam(item)}
						/>
					)}
					horizontal
				/>
				<PlayerCount>{players.length}</PlayerCount>
			</HeaderList>
			<FlatList
				data={players}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<PlayerCard name={item} onRemove={() => {}} />
				)}
				ListEmptyComponent={() => (
					<EmptyList message='This squad has no players yet.' />
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					{ paddingBottom: 75 },
					players.length === 0 && { flex: 1 }
				]}
			/>
			<Button title='Delete team' type='SECONDARY' />
		</Container>
	);
}
