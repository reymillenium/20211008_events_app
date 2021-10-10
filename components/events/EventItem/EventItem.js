import {Fragment} from "react";
import styles from './EventItem.module.css';

import generateRoutes from "../../../tools/generateRoutes";
import Image from "next/image";
import ButtonLink from "../../ui/ButtonLink/ButtonLink";

const EventItem = (props) => {
    const {showPath} = generateRoutes().events;
    const {id: eventId, title, location, date, image, isFeatured} = props.event;
    const dateLabel = new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'});
    // const dateLabel = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(new Date(date));

    const locationLabel = location.replace(', ', '\n');

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
                    <ButtonLink path={showPath(eventId)}/>
                </div>
            </li>
        </Fragment>
    );
};

export default EventItem;