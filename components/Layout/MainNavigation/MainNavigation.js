import styles from './MainNavigation.module.css';
import Link from "next/link";
import generateRoutes from '../../../tools/generateRoutes';
import Image from "next/image";

function MainNavigation() {
    const routes = generateRoutes();
    const eventsRoutes = routes.events;

    const eventsLinks = (
        <>
            {/*<li className={styles.rubberAnimated}>*/}
            {/*    <Link href={eventsRoutes.indexPath}>All the Events</Link>*/}
            {/*</li>*/}
            <li className={styles.rubberAnimated}>
                <Link href={eventsRoutes.indexPath}>
                    <div>
                        <i className={" far fa-calendar-alt faa-wrench faa-fast"}/>&nbsp;Events
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            {/*<li className={styles.rubberAnimated}>*/}
            {/*    <Link href={eventsRoutes.featuredIndexPath}>Featured Events</Link>*/}
            {/*</li>*/}
            <li className={styles.rubberAnimated}>
                <Link href={eventsRoutes.featuredIndexPath}>
                    <div>
                        <i className={" far fa-calendar-check faa-wrench faa-fast"}/>&nbsp;Featured
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            {/*<li className={styles.rubberAnimated}>*/}
            {/*    <Link href={eventsRoutes.newPath}>New Event</Link>*/}
            {/*</li>*/}
            <li className={styles.rubberAnimated}>
                <Link href={eventsRoutes.newPath}>
                    <div>
                        <i className={" far fa-calendar-plus faa-wrench faa-fast"}/>&nbsp;New Event
                        {/*New Event*/}
                    </div>
                </Link>
            </li>
        </>
    );

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                {/*<Image src="/event_started_checked_logo_290_x_290.png" alt="Vercel Logo" width={72} height={16} />*/}

                    {/*<Image src="/event_started_checked_logo_290_x_290.png" alt="Vercel Logo" width={32} height={32}/>*/}
                {/*<i style={{verticalAlign: 'baseline'}} className={" far fa-calendar-plus faa-wrench faa-fast"}/>*/}
                <i style={{verticalAlign: 'middle', color: 'white', fontWeight: 'inherit', marginBottom: 6}} className={" far fa-calendar-alt faa-wrench faa-fast"}/>&nbsp;Events 2021
            </div>

            <nav>
                <ul>
                    {eventsLinks}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
