import { Container, Logo, BackButton } from "./styles";
import { CaretLeft } from "phosphor-react-native";
import logoImg from "@assets/logo.png";

type Props = {
	showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: Props) {
	return (
		<Container>
			{showBackButton && (
				<BackButton>
					<CaretLeft size={32} color='#fff' />
				</BackButton>
			)}

			<Logo source={logoImg} />
		</Container>
	);
}
