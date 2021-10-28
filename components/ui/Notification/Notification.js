import styles from './notification.module.css';

function Notification(props) {
    const {title, message, status, hideNotification} = props;
    const notificationClasses = `${styles.notification} ${styles[status]}`;
    
    return (
        <div className={notificationClasses} onClick={hideNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Notification;