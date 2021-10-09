import {Fragment} from "react";
import styles from './EventItem.module.css';
import {useRouter} from "next/router";
import generateRoutes from "../../../tools/generateRoutes";
import Image from "next/image";
import Link from "next/link";

const EventItem = (props) => {
    const router = useRouter();
    const {showPath} = generateRoutes().events;
    const {id: eventId, title, description, location, date, image, isFeatured} = props.event;
    const dateLabel = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
    // const dateLabel = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(new Date(date));

    const locationLabel = location.replace(', ', '\n');

    const addAnimationClassHandler = (event) => {
        // event.target.classList.add("animated-hover");
        event.target.classList.toggle("animated-hover");
    };

    const removeAnimationClassHandler = (event) => {
        setTimeout(function () {
            // event.target.classList.remove("animated-hover");
            event.target.classList.toggle("animated-hover");
        }, 1000);
    };

    return (
        <Fragment>
            <li className={styles.item}>
                {/*<img src={`/${image}`} alt={title}/>*/}
                <Image src={`/${image}`} alt={title} width={300} height={224} objectFit={'cover'} layout={'intrinsic'}/>

                <div className={styles.content}>
                    <div>
                        <h2>{title}</h2>
                    </div>

                    <div className={styles.date}>
                        <time>{dateLabel}</time>
                    </div>

                    <div className={styles.address}>
                        <address>{locationLabel}</address>
                    </div>
                </div>

                <div className={styles.actionsColumn}>
                    <Link href={showPath(eventId)}>
                        <div className={styles.actionsRow + ' faa-parent animated-hover'} onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                            <span className={"faa-ring faa-slow"}><i style={{marginTop: 4}} className={"fas fa-search"}/></span>
                            <span>&nbsp;&nbsp;Details</span>
                        </div>
                    </Link>
                </div>
            </li>
        </Fragment>
    );
};

export default EventItem;