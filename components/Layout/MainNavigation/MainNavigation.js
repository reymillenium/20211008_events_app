import styles from './MainNavigation.module.css';
import Link from "next/link";
import generateRoutes from '../../../tools/generateRoutes';

function MainNavigation() {
    const routes = generateRoutes();
    const eventsRoutes = routes.events;

    const eventsLinks = (
        <>
            <li>
                <Link href={eventsRoutes.featuredIndexPath}>Featured Events</Link>
            </li>
            <li>
                <Link href={eventsRoutes.indexPath}>All the Events</Link>
            </li>
            <li>
                <Link href={eventsRoutes.newPath}>New Event</Link>
            </li>
        </>
    );

    return (
        <header className={styles.header}>
            <div className={styles.logo}>Events 2021</div>
            <nav>
                <ul>
                    {eventsLinks}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
