import styled from 'styled-components';

const StyledButton = styled.button`
	height: 20px;
	align-items: center;
	padding: 0 8px;
	font-size: 12px;
	line-height: 0;
	background-color: #4c4c4c;
	border: none;
	color: white;
	border-radius: 4px;
	cursor: pointer;
`;

function Button({ onClick = () => {}, children }) {
	return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;