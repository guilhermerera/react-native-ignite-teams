import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAll";

export async function removeGroup(groupToBeDeleted: string) {
	try {
		const storedGroups = await getAllGroups();

		const groupListWithoutDeletedOne = storedGroups.filter(
			(group) => group.name !== groupToBeDeleted
		);

		const storage = JSON.stringify(groupListWithoutDeletedOne);

		await AsyncStorage.setItem(GROUP_COLLECTION, storage);
	} catch (error) {
		throw error;
	}
}
