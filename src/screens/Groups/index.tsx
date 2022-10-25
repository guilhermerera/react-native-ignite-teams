import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import GroupCard from "@components/GroupCard";
import EmptyList from "@components/EmptyList";

import { Container } from "./styles";
import Button from "@components/Button";

type groupsProps = {
	id: string;
	title: string;
};

export default function Groups() {
	const [groups, setGroups] = useState<groupsProps[]>([]);
	const navigation = useNavigation();

	function handleNewGroup() {
		navigation.navigate("new");
	}

	return (
		<Container>
			<Header />
			<Highlight title='Teams' subtitle='Play with your teammates' />
			<FlatList
				data={groups}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<GroupCard title={item.title} activeOpacity={0.7} />
				)}
				contentContainerStyle={groups.length === 0 && { flex: 1 }}
				ListEmptyComponent={
					<EmptyList message='Register your first team and start playing with your teammates.' />
				}
				showsVerticalScrollIndicator={false}
			/>
			<Button title='Add Team' onPress={handleNewGroup} />
		</Container>
	);
}
