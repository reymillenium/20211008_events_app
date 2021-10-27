import {createContext, useState} from "react";

const initialContext = {
    notification: null, // {title, message, status}
    showModification: (notificationData) => {
    },
    hideModification: () => {
    },
};

export const NotificationContext = createContext(initialContext);

const NotificationContextProvider = (props) => {
    const [activeNotificationState, setActiveNotificationState] = useState();

    const showModification = (notificationData) => {
        setActiveNotificationState(notificationData);
    };

    const hideModification = () => {
        setActiveNotificationState(null);
    };

    const notificationContextValue = {
        notification: activeNotificationState,
        showModification,
        hideModification,
    };

    return (
        <NotificationContext.Provider value={notificationContextValue}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;