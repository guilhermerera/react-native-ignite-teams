import { TouchableOpacityProps } from "react-native";
import { Container, Icon, ButtonIconTypeStyleProps } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
	icon: keyof typeof MaterialIcons.glyphMap;
	size?: number;
	type?: ButtonIconTypeStyleProps;
};
export default function ButtonIcon({
	icon,
	type = "PRIMARY",
	size,

	...rest
}: Props) {
	return (
		<Container size={size} activeOpacity={0.7} {...rest}>
			<Icon name={icon} size={size ? size - 2 : 24} type={type} />
		</Container>
	);
}
