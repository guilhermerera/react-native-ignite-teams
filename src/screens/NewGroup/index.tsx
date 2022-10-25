import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import InputText from "@components/InputText";

import { Container, Content, Icon } from "./styles";

export default function NewGroup() {
	const [teamName, setTeamName] = useState("");
	const navigation = useNavigation();

	function handleCreateNewGroup() {
		if (teamName === "") {
			return Alert.alert(
				"Create Team",
				"Please, insert a team name to continue."
			);
		}
		navigation.navigate("players", { group: teamName });
	}
	return (
		<Container>
			<Header showBackButton />
			<Content>
				<Icon />
				<Highlight
					title='New Team'
					subtitle='Create your team to add teammates'
				/>
				<InputText
					placeholder='Team Name'
					value={teamName}
					onChangeText={(text) => setTeamName(text)}
				/>
				<Button
					title='Create'
					style={{ marginTop: 16 }}
					onPress={handleCreateNewGroup}
				/>
			</Content>
		</Container>
	);
}
