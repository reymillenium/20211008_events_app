import {Fragment} from "react";
import {useRouter} from "next/router";
import generateRoutes from "../../../tools/generateRoutes";
import EventItem from "../EventItem/EventItem";

const EventItemsList = (props) => {
    const router = useRouter();
    const eventsRoutes = generateRoutes().events;
    const eventsList = props.events.map(event => <EventItem key={event.id} event={event}/>);

    return (
        <Fragment>
            <ul>
                {eventsList}
            </ul>
        </Fragment>
    );
};

export default EventItemsList;