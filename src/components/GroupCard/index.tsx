import { TouchableOpacityProps } from "react-native";

import { Container, PeopleIcon, Title, RigthCaret } from "./styles";

type Props = TouchableOpacityProps & {
	title: string;
};

export default function GroupCard({ title, ...rest }: Props) {
	return (
		<Container {...rest}>
			<PeopleIcon />
			<Title>{title}</Title>
			<RigthCaret />
		</Container>
	);
}
