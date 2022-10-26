import { useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import ButtonIcon from "@components/ButtonIcon";
import InputText from "@components/InputText";
import Filter from "@components/Filter";
import PlayerCard from "@components/PlayerCard";
import EmptyList from "@components/EmptyList";
import Button from "@components/Button";

import { Container, Form, HeaderList, PlayerCount } from "./styles";
import { getPlayersByGroup } from "@storage/player/getByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addNewPlayerByGroup } from "@storage/player/addNewByGroup";
import { AppError } from "@utils/AppError";

type RouteParams = {
	group: string;
};

export default function Players() {
	const [newPlayerName, setNewPlayerName] = useState("");
	const [squad, setSquad] = useState("Squad A");
	const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
	const route = useRoute();
	const { group } = route.params as RouteParams;

	const trimmedNewPlayerName = newPlayerName.trim();

	async function handleAddNewPlayer() {
		if (trimmedNewPlayerName === "") {
			return Alert.alert("Add new player", "Please insert player name.");
		}

		try {
			const newPlayer: PlayerStorageDTO = {
				name: newPlayerName,
				squad: squad
			};
			await addNewPlayerByGroup(newPlayer, group);
			setNewPlayerName("");
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert("Add new player", error.message);
			} else {
				Alert.alert(
					"Add new player",
					"There was an error adding the player. Please try again."
				);
				console.log(error);
			}
		}
	}

	async function fetchPlayers() {
		try {
			const data: PlayerStorageDTO[] = await getPlayersByGroup(group);
			setPlayers(data);
		} catch (error) {
			console.log(error);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchPlayers();
		}, [players])
	);

	return (
		<Container>
			<Header showBackButton />
			<Highlight title={group} subtitle='Add your teammates' />
			<Form>
				<InputText
					placeholder='Player name'
					autoCorrect={false}
					value={newPlayerName}
					onChangeText={(text) => setNewPlayerName(text)}
				/>
				<ButtonIcon icon='add' onPress={handleAddNewPlayer} />
			</Form>

			<HeaderList>
				<FlatList
					data={["Squad A", "Squad B"]}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === squad}
							onPress={() => setSquad(item)}
						/>
					)}
					horizontal
				/>
				<PlayerCount>{players.length}</PlayerCount>
			</HeaderList>
			<FlatList
				data={players}
				keyExtractor={(item) => `${item.name}-${item.squad}`}
				renderItem={({ item }) => (
					<PlayerCard name={item.name} onRemove={() => {}} />
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
