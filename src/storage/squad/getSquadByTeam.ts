import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSquadsByTeamName(teamName: string) {
	try {
		const storage = await AsyncStorage.getItem(`${teamName}-squads`);

		const squads: string[] = storage ? JSON.parse(storage) : [];

		return squads;
	} catch (error) {
		throw error;
	}
}
