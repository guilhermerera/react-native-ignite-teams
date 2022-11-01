import { useState, useCallback, useRef } from "react";
import { FlatList, Alert, TextInput } from "react-native";
import {
	useFocusEffect,
	useNavigation,
	useRoute
} from "@react-navigation/native";

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

import { removeGroup } from "@storage/group/removeGroup";
import { addSquadToTeam } from "@storage/squad/addSquadToTeam";
import { getPlayersByGroup } from "@storage/player/getByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { addNewPlayerByGroup } from "@storage/player/addNewByGroup";
import { getSquadsByTeamName } from "@storage/squad/getSquadByTeam";
import { removePlayerFromSquad } from "@storage/player/removePlayer";
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

	const navigation = useNavigation();

	const route = useRoute();
	const { group } = route.params as RouteParams;

	const playerNameTextInputRef = useRef<TextInput>(null);

	const trimmedNewPlayerName = newPlayerName.trim();

	async function handleRemovePlayer(
		playerNameToBeRemoved: PlayerStorageDTO,
		group: string
	) {
		try {
			await removePlayerFromSquad(playerNameToBeRemoved, group);
			fetchPlayers();
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert("Remove Player", error.message);
			} else {
				Alert.alert("Remove Player", "Error, please try again later.");
				console.log(error);
			}
		}
	}

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

			playerNameTextInputRef.current?.blur();
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
		setSquadList((prev) => ["Squad 1", ...storageSquads]);
	}

	async function deleteGroup(groupToBeDelete: string) {
		try {
			await removeGroup(groupToBeDelete);
			navigation.navigate("groups");
		} catch (error) {
			console.log(error);
		}
	}

	function handleGroupDelete() {
		Alert.alert(
			"Delete team",
			"Are you sure you want to delete this group? You can still access all squads and players by creating a new team with the same name as this one.",
			[
				{
					text: "Yes, delete",
					onPress: () => deleteGroup(group)
				},
				{
					text: "No",
					style: "cancel"
				}
			]
		);
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
					inputRef={playerNameTextInputRef}
					placeholder='Player name'
					autoCorrect={false}
					value={newPlayerName}
					onChangeText={(text) => setNewPlayerName(text)}
					onSubmitEditing={handleAddNewPlayer}
					returnKeyType='done'
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
					<PlayerCard
						name={item.name}
						onRemove={() => {
							handleRemovePlayer(item, group);
						}}
					/>
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
			<Button
				title='Delete team'
				type='SECONDARY'
				onPress={handleGroupDelete}
			/>
		</Container>
	);
}
