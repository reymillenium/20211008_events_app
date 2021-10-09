import {Fragment} from "react";
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

    return (
        <Fragment>
            <li>
                {/* Works in both cases */}
                <img src={`/${image}`} height={200} width={200} alt={title}/>
                {/*<Image src={`/${image}`} alt={title} width={200} height={200}/>*/}

                <div>
                    <div>
                        <h2>{title}</h2>
                    </div>

                    <div>
                        <time>{dateLabel}</time>
                    </div>

                    <div>
                        <address>{location}</address>
                    </div>
                </div>

                <div>
                    <Link href={showPath(eventId)}>DETAILS</Link>
                </div>

            </li>
        </Fragment>
    );
};

export default EventItem;