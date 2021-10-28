import {createContext, useState, useEffect} from "react";

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

    useEffect(() => {

        if ((activeNotificationState) && (activeNotificationState.status === 'success' || activeNotificationState.status === 'error')) {
            const timer = setTimeout(() => {
                hideNotification();
            }, 2500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotificationState]);

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