import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Link from '@/sections/shared/Link';

import { IconList } from '@/sections/shared/Icons';
import { PATHS } from '@/router/paths';

const StyledHeader = styled.header`
	display: flex;
	gap: 32px;
	align-items: center;
	justify-content: center;
	position: relative;
`;

const StyledContent = styled.div`
	padding: 16px 40px;
`;

const StyledBackLink = styled(Link)`
	position: absolute;
	left: 40px;
	color: #a4a9ae;
	font-size: 14px;
	font-weight: 700;
	&:hover {
		color: #4c4c4c;
	}
	> svg {
		width: 24px;
		height: 24px;
	}
`;

const Text = styled.h1`
	font-weight: 500;
	font-size: 32px;
`;

function Layout() {
	const location = useLocation();
	const isDetailPage = location.pathname !== PATHS.dashboard;

	return (
		<div>
			<StyledHeader>
				{isDetailPage && (
					<StyledBackLink aria-label='back-link' to={PATHS.dashboard}>
						<IconList />
					</StyledBackLink>
				)}
				<Text>Weather app</Text>
			</StyledHeader>
			<StyledContent>
				<Outlet />
			</StyledContent>
		</div>
	);
}

export default Layout;
