import { useState, useCallback, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import Header from "@components/Header";
import Filter from "@components/Filter";
import Button from "@components/Button";
import Highlight from "@components/Highlight";
import InputText from "@components/InputText";
import EmptyList from "@components/EmptyList";
import ButtonIcon from "@components/ButtonIcon";
import PlayerCard from "@components/PlayerCard";
import { AddNewSquad } from "@components/AddNewSquad";

import { AppError } from "@utils/AppError";
import { Container, Form, HeaderList } from "./styles";

import { getPlayersByGroup } from "@storage/player/getByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addNewPlayerByGroup } from "@storage/player/addNewByGroup";
import { getSquadsByTeamName } from "@storage/squad/getSquadByTeam";
import { addSquadToTeam } from "@storage/squad/addSquadToTeam";
import { updateSquadListOnStorage } from "@storage/squad/updateSquadListOnStorage";

type RouteParams = {
	group: string;
};

export default function Players() {
	const [squad, setSquad] = useState("Squad 1");
	const [squadCount, setSquadCount] = useState(1);
	const [newPlayerName, setNewPlayerName] = useState("");
	const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
	const [squadList, setSquadList] = useState<string[]>(["Squad 1"]);

	const route = useRoute();
	const { group } = route.params as RouteParams;

	const trimmedNewPlayerName = newPlayerName.trim();

	async function handleAddNewPlayer() {
		if (trimmedNewPlayerName === "") {
			return Alert.alert("Add new player", "Player name is required.");
		}

		try {
			const newPlayer: PlayerStorageDTO = {
				name: newPlayerName,
				squad: squad
			};
			await addNewPlayerByGroup(newPlayer, group);
			setNewPlayerName("");
			fetchPlayers();
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

	function filterPlayersBySquad(players: PlayerStorageDTO[]) {
		const filteredPlayers = players.filter((player) => player.squad === squad);
		return filteredPlayers;
	}

	async function fetchPlayers() {
		try {
			const data: PlayerStorageDTO[] = await getPlayersByGroup(group);
			const filteredPlayers = filterPlayersBySquad(data);
			setPlayers(filteredPlayers);
		} catch (error) {
			console.log(error);
		}
	}

	async function removeSquad(squadToBeDeleted: string) {
		const squadListWithtoutDeletedOne = squadList.filter(
			(squad) => squad !== squadToBeDeleted
		);

		await updateSquadListOnStorage(squadListWithtoutDeletedOne, group);
		setSquad(`Squad 1`);
		setSquadList(squadListWithtoutDeletedOne);
	}

	async function addSquad() {
		setSquadCount((prev) => prev + 1);
		setSquadList((prev) => [...prev, `Squad ${squadCount + 1}`]);
		await addSquadToTeam(`Squad ${squadCount + 1}`, group);
		setSquad(`Squad ${squadCount + 1}`);
	}

	function getLastSquadNumber(storageSquads: string[]) {
		const lastIndex = storageSquads.length - 1;
		const lastItem = storageSquads[lastIndex];

		const lastValue = lastItem ? parseInt(lastItem.split(" ")[1]) : 1;

		return lastValue;
	}

	async function fetchSquads() {
		const storageSquads = await getSquadsByTeamName(group);
		const lastSquadCountValue = getLastSquadNumber(storageSquads);
		setSquadCount(lastSquadCountValue);
		await setSquadList((prev) => ["Squad 1", ...storageSquads]);
	}

	useFocusEffect(
		useCallback(() => {
			fetchPlayers();
			fetchSquads();
		}, [squad])
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
					data={squadList}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<Filter
							title={item}
							isActive={item === squad}
							removeSquad={() => removeSquad(item)}
							onPress={() => setSquad(item)}
						/>
					)}
					horizontal
				/>
				<AddNewSquad onPress={addSquad} />
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
