import { Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

export function AddNewSquad({ onPress, ...rest }: TouchableOpacityProps) {
	return (
		<Container onPress={onPress} activeOpacity={0.7}>
			<Title>+ squad</Title>
		</Container>
	);
}
