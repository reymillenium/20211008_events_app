import {Fragment} from "react";
import EventSummary from "./EventSummary/EventSummary";
import EventLogistics from "./EventLogistics/EventLogistics";
import EventContent from "./EventContent/EventContent";

const EventDetail = (props) => {
    const {event} = props;

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                location={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export default EventDetail;
