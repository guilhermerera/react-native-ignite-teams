import { TouchableOpacityProps } from "react-native";
import { Container, Icon, ButtonIconTypeStyleProps } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
	icon: keyof typeof MaterialIcons.glyphMap;
	type?: ButtonIconTypeStyleProps;
};
export default function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
	return (
		<Container activeOpacity={0.7} {...rest}>
			<Icon name={icon} type={type} />
		</Container>
	);
}
