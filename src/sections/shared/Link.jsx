import { Link as ExternalLink } from 'react-router-dom';

function Link({ children, href, ...rest }) {
	return (
		<ExternalLink to={href} {...rest}>
			{children}
		</ExternalLink>
	);
}

export default Link;
