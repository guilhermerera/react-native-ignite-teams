import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

import { getPlayersByGroup } from "./getByGroup";

export async function removePlayerFromSquad(
	playerToBeRemoved: PlayerStorageDTO,

	group: string
) {
	try {
		const storedPlayers = await getPlayersByGroup(group);

		const playerListWithoutTheOneToBeDeleted = storedPlayers.filter(
			(player) => player.name !== playerToBeRemoved.name
		);

		const storage = JSON.stringify(playerListWithoutTheOneToBeDeleted);

		await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
	} catch (error) {
		console.log(error);
		throw new AppError(
			`There was an error trying to remove the player ${playerToBeRemoved.name}. Try again later, please.`
		);
	}
}
