import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Button from "@components/Button";
import InputText from "@components/InputText";

import { Container, Content, Icon } from "./styles";
import { createNewGroup } from "@storage/group/createNew";
import { AppError } from "@utils/AppError";

export default function NewGroup() {
	const [teamName, setTeamName] = useState("");
	const navigation = useNavigation();

	const trimmedTeamName = teamName.trim();

	async function handleCreateNewGroup() {
		if (trimmedTeamName === "") {
			return Alert.alert(
				"Create Team",
				"Please, insert a team name to continue."
			);
		}
		try {
			await createNewGroup(trimmedTeamName);
			navigation.navigate("players", { group: trimmedTeamName });
		} catch (error) {
			if (error instanceof AppError) {
				Alert.alert("Create Team", error.message, [
					{
						text: "Yes",
						onPress: () =>
							navigation.navigate("players", { group: trimmedTeamName })
					},
					{
						text: "No",
						style: "cancel"
					}
				]);
			} else {
				console.log(error);
				Alert.alert("Create Team", "Não foi possível criar um novo grupo");
			}
		}
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
					value={trimmedTeamName}
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
