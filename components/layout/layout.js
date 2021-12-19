import { Fragment, useContext } from 'react';

import MainNavigation from './main-navigation';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

const Layout = (props) => {
	const { notification } = useContext(NotificationContext);

	return (
		<Fragment>
			<MainNavigation />
			<main>{props.children}</main>
			{notification && (
				<Notification
					title={notification.title}
					message={notification.message}
					status={notification.status}
				/>
			)}
		</Fragment>
	);
};

export default Layout;
