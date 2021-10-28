import MainNavigation from './MainNavigation/MainNavigation';
import styles from './Layout.module.css';
import FooterClassic from "../ui/FooterClassic/FooterClassic";
import PageHead from "../ui/PageHead";
import Notification from "../ui/Notification/Notification";
import {NotificationContext} from "../../store/notificationContext";
import {useContext} from "react";

function Layout(props) {
    const hideNavigation = props.hideNavigation || false;
    const navigation = (hideNavigation ? null : <MainNavigation/>);
    const {notification, hideNotification} = useContext(NotificationContext);

    return (
        <>
            <PageHead headInfo={props.headInfo}/>
            <div>
                {navigation}
                <main className={styles.main}>{props.children}</main>
                {notification && <Notification {...notification} hideNotification={hideNotification}/>}
                <FooterClassic/>
            </div>
        </>
    );
}

export default Layout;
