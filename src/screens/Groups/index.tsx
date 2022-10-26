import { useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import GroupCard from "@components/GroupCard";
import EmptyList from "@components/EmptyList";

import { Container } from "./styles";
import Button from "@components/Button";
import { getAllGroups } from "@storage/group/getAll";
import { groupsPropsDTO } from "@storage/group/GroupStorageDTO";

export default function Groups() {
	const [groups, setGroups] = useState<groupsPropsDTO[]>([]);
	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate("new");
	}

	function handleOpenGroup(group: string) {
		navigation.navigate("players", { group });
	}

	async function fetchGroups() {
		try {
			const data: groupsPropsDTO[] = await getAllGroups();
			setGroups(data);
		} catch (error) {
			console.log(error);
		}
	}

	useFocusEffect(
		useCallback(() => {
			fetchGroups();
		}, [])
	);

	return (
		<Container>
			<Header />
			<Highlight title='Teams' subtitle='Play with your teammates' />
			<FlatList
				data={groups}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<GroupCard
						title={item.name}
						activeOpacity={0.7}
						onPress={() => handleOpenGroup(item.name)}
					/>
				)}
				contentContainerStyle={[
					{ paddingBottom: 45 },
					groups.length === 0 && { flex: 1 }
				]}
				ListEmptyComponent={
					<EmptyList message='Register your first team and start playing with your teammates.' />
				}
				showsVerticalScrollIndicator={false}
			/>
			<Button title='Add Team' onPress={handleNewGroup} />
		</Container>
	);
}
