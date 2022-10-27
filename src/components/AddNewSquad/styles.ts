import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
	border: 1px solid ${({ theme }) => theme.COLORS.GREEN_700};
	border-radius: 4px;

	height: 38px;
	width: auto;
	padding: 8px;

	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	${({ theme }) => css`
		color: ${theme.COLORS.WHITE};
		font-size: ${theme.FONT_SIZE.SM};
		font-family: ${theme.FONT_FAMILY.REGULAR};
	`}
`;
