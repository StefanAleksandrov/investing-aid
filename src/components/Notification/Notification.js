import { useContext } from 'react';

import './Notification.scss';
import NotifictaionContext from '../../contexts/NotificationContext';

export default function Notification() {
    const [notification, dispatch] = useContext(NotifictaionContext);

    function hideNotificationHandler() {
        dispatch({ action: 'REMOVE' });
    }

    return (
        <div className={'notification ' + notification.type} onClick={hideNotificationHandler} >{notification.message}</div>
    )
}