import {createContext, useState} from "react";

const notificationInitialState = {title: '', message: '', status: ''};
const initialContext = {
    // notification: null, // {title, message, status}
    notification: notificationInitialState,
    showModification: (notificationData) => {
    },
    hideModification: () => {
    },
};

export const NotificationContext = createContext(initialContext);

const NotificationContextProvider = (props) => {
    const [activeNotificationState, setActiveNotificationState] = useState(notificationInitialState);

    const showModification = (notificationData) => {
        setActiveNotificationState(notificationData);
    };

    const hideModification = () => {
        setActiveNotificationState(notificationInitialState);
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