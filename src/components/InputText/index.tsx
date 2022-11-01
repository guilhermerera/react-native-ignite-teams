import { Container } from "./styles";
import { TextInputProps, TextInput } from "react-native";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
	inputRef?: React.RefObject<TextInput>;
};

export default function InputText({ inputRef, ...rest }: Props) {
	const { COLORS } = useTheme();
	return (
		<Container
			ref={inputRef}
			placeholderTextColor={COLORS.GRAY_100}
			{...rest}
		/>
	);
}
