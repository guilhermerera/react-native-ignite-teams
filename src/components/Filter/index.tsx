import { SetStateAction } from "react";
import ButtonIcon from "@components/ButtonIcon";
import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";

type Props = TouchableOpacityProps &
	FilterStyleProps & {
		title: string;
		removeSquad: () => void;
	};

export default function Filter({
	title,
	isActive = false,
	removeSquad,
	...rest
}: Props) {
	return (
		<Container activeOpacity={0.7} isActive={isActive} {...rest}>
			<Title>{title}</Title>
			{title !== "Squad 1" && isActive && (
				<ButtonIcon
					size={22}
					icon='close'
					type='SECONDARY'
					onPress={removeSquad}
				/>
			)}
		</Container>
	);
}
