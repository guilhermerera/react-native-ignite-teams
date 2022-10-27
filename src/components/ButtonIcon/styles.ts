import styled, { css } from "styled-components/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type ButtonIconTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
	type: ButtonIconTypeStyleProps;
};

type ContainerProps = TouchableOpacityProps & {
	size?: number;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
	${({ size }) => css`
		width: ${size ? size : 56}px;
		height: ${size ? size : 56}px;
	`}

	margin-left: 2px;

	justify-content: center;
	align-items: center;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(
	({ theme, type, size }) => ({
		size: size,
		color: type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED
	})
)``;
