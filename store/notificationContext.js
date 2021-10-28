import {createContext, useState} from "react";

const initialContext = {
    notification: null, // {title, message, status}
    showNotification: (notificationData) => {
    },
    hideNotification: () => {
    },
};

export const NotificationContext = createContext(initialContext);

const NotificationContextProvider = (props) => {
    const [activeNotificationState, setActiveNotificationState] = useState();

    const showNotification = (notificationData) => {
        setActiveNotificationState(notificationData);
    };

    const hideNotification = () => {
        setActiveNotificationState(null);
    };

    const notificationContextValue = {
        notification: activeNotificationState,
        showNotification: showNotification,
        hideNotification: hideNotification,
    };

    return (
        <NotificationContext.Provider value={notificationContextValue}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;