import { Link as ExternalLink } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledLink = styled(ExternalLink)`
	color: #a4a9ae;
`;

function Link({ children, href, ...rest }) {
	return (
		<StyledLink to={href} {...rest}>
			{children}
		</StyledLink>
	);
}

export default Link;
