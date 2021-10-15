import styles from './MainNavigationEvents.module.css';
import Link from "next/link";
import generateRoutes from "../../../tools/generateRoutes";

const MainNavigationEvents = () => {
    const routes = generateRoutes();
    const eventsRoutes = routes.events;
    // console.log('MainNavigationEvents -> ', eventsRoutes);

    const eventsLinks = (
        <>
            <li>
                <Link href={eventsRoutes.indexPath} passHref>
                    <div>
                        <i className={" far fa-calendar-alt faa-wrench faa-fast"}/>&nbsp;Events
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            <li>
                <Link href={eventsRoutes.featuredIndexPath} passHref>
                    <div>
                        <i className={" far fa-calendar-check faa-wrench faa-fast"}/>&nbsp;Featured
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            <li>
                <Link href={eventsRoutes.newPath} passHref>
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
                <Link href={eventsRoutes.indexPath}>
                    <>
                        {/*<Image src="/event_started_checked_logo_290_x_290.png" alt="Vercel Logo" width={72} height={16} />*/}

                        {/*<Image src="/event_started_checked_logo_290_x_290.png" alt="Vercel Logo" width={32} height={32}/>*/}
                        {/*<i style={{verticalAlign: 'baseline'}} className={" far fa-calendar-plus faa-wrench faa-fast"}/>*/}
                        <i style={{verticalAlign: 'middle', color: 'white', fontWeight: 'inherit', marginBottom: 6}} className={" far fa-calendar-alt faa-wrench faa-fast"}/>
                        &nbsp;Miami Events
                    </>
                </Link>
            </div>

            <nav className={styles.navigation}>
                <ul>
                    {/*{eventsLinks}*/}
                    <li>
                        <Link href={eventsRoutes.indexPath}>Next Event</Link>
                    </li>
                    <li>
                        <Link href={eventsRoutes.indexPath}>Next Event</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigationEvents;