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
                <Link href={eventsRoutes.indexPath} passHref>
                    <div>
                        <i className={" far fa-calendar-alt faa-wrench faa-fast"}/>&nbsp;Events
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            <li className={styles.rubberAnimated}>
                <Link href={eventsRoutes.featuredIndexPath} passHref>
                    <div>
                        <i className={" far fa-calendar-check faa-wrench faa-fast"}/>&nbsp;Featured
                        {/*New Event*/}
                    </div>
                </Link>
            </li>

            <li className={styles.rubberAnimated}>
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
            <Link href={eventsRoutes.indexPath} passHref>
                <div className={styles.logo}>
                    {/*<i style={{verticalAlign: 'middle', color: 'white', fontWeight: 'inherit', marginBottom: 6}} className={" far fa-calendar-alt faa-wrench faa-fast"}/>*/}
                    <Image src="/miami_city_logo_840_x_880.png" alt="Miami City Logo" width={48} height={48}/>
                    <div>
                        &nbsp;Miami Events
                    </div>
                </div>
            </Link>

            <nav>
                <ul>
                    {eventsLinks}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
