import MainNavigation from './MainNavigation/MainNavigation';
import MainNavigationEvents from "./MainNavigationEvents/MainNavigationEvents";
import styles from './Layout.module.css';
import FooterClassic from "../ui/FooterClassic/FooterClassic";
import PageHead from "../ui/PageHead";
import Notification from "../ui/Notification/Notification";
import {NotificationContext} from "../../store/notificationContext";
import {useContext} from "react";

function Layout(props) {
    const hideNavigation = props.hideNavigation || false;
    const navigation = (hideNavigation ? null : <MainNavigation/>);
    // const navigation = (hideNavigation ? null : <MainNavigationEvents/>);
    const {notification} = useContext(NotificationContext);
    const {title, message, status} = notification;

    return (
        <>
            <PageHead headInfo={props.headInfo}/>
            <div>
                {navigation}
                <main className={styles.main}>{props.children}</main>
                {title && <Notification title={title || ''} message={message || ''} status={status || ''}/>}
                <FooterClassic/>
            </div>
        </>
    );
}

export default Layout;
