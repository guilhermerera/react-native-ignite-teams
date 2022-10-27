import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAll";
import generateID from "@utils/generateID";

export async function createNewGroup(newGroupName: string) {
	try {
		const storedGroups = await getAllGroups();

		const groupAlreadyExists = storedGroups.filter(
			(group) => group.name.toLowerCase() === newGroupName.toLowerCase()
		)[0];

		if (groupAlreadyExists) {
			throw new AppError(
				`A team called ${newGroupName} already exists. Visit team's page?`
			);
		}

		const newGroup = {
			id: generateID(),
			name: newGroupName
		};

		const storage = JSON.stringify([...storedGroups, newGroup]);

		await AsyncStorage.setItem(GROUP_COLLECTION, storage);
	} catch (error) {
		throw error;
	}
}
