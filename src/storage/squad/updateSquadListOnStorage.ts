import AsyncStorage from "@react-native-async-storage/async-storage";

export async function updateSquadListOnStorage(
	squadList: string[],
	teamName: string
) {
	try {
		const squadListWithoutSquad1 = squadList.filter(
			(squad) => squad !== "Squad 1"
		);

		const storage = JSON.stringify(squadListWithoutSquad1);

		await AsyncStorage.setItem(`${teamName}-squads`, storage);
	} catch (error) {
		throw error;
	}
}
