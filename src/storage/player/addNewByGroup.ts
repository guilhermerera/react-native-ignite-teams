import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

import { getPlayersByGroup } from "./getByGroup";

export async function addNewPlayerByGroup(
	newPlayer: PlayerStorageDTO,
	group: string
) {
	try {
		const storedPlayers = await getPlayersByGroup(group);

		const playerAlreadyExists = storedPlayers.filter(
			(player) =>
				player.name === newPlayer.name && player.squad === newPlayer.squad
		)[0];

		if (playerAlreadyExists) {
			throw new AppError(
				`Player ${newPlayer.name} already exists on ${group}'s ${newPlayer.squad}. Players must have a unique name.`
			);
		}

		//DEVELOPER TRICK TO CLEAR STORAGE WITHIN THE APP DONT USE IT
		if (newPlayer.name === "Clear App Storage") {
			return await AsyncStorage.clear();
		}

		const storage = JSON.stringify([...storedPlayers, newPlayer]);

		await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
	} catch (error) {
		throw error;
	}
}
