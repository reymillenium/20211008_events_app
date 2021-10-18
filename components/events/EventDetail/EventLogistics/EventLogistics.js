import AddressIcon from "../../../icons/address-icon";
import DateIcon from "../../../icons/date-icon";
import LogisticsItem from '../LogisticsItem/LogisticsItem';
import classes from './EventLogistics.module.css';
import Image from "next/image";

function EventLogistics(props) {
    const {date, location: address, image, imageAlt} = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
    const addressText = address.replace(', ', '\n');

    return (
        <section className={classes.logistics}>
            <div className={classes.image}>
                {/*<img src={`/${image}`} alt={imageAlt}/>*/}
                <Image
                    src={`/${image}`}
                    alt={imageAlt}
                    width={'10rem'}
                    height={'10rem'}
                    layout='responsive'
                    // priority={true}
                    loading="eager"
                />
            </div>
            <ul className={classes.list}>
                <LogisticsItem icon={DateIcon}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={AddressIcon}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ul>
        </section>
    );
}

export default EventLogistics;
