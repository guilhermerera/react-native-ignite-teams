import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSquadsByTeamName } from "./getSquadByTeam";

export async function addSquadToTeam(squadName: string, teamName: string) {
	try {
		const storedSquads = await getSquadsByTeamName(teamName);

		const squadAlreadyExists = storedSquads.includes(squadName);
		if (squadAlreadyExists) {
			return;
		}

		const storage = JSON.stringify([...storedSquads, squadName]);

		await AsyncStorage.setItem(`${teamName}-squads`, storage);
	} catch (error) {
		throw error;
	}
}
