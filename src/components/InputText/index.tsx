import { Container } from "./styles";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

export default function InputText({ ...rest }: TextInputProps) {
	const { COLORS } = useTheme();
	return <Container placeholderTextColor={COLORS.GRAY_100} {...rest} />;
}
