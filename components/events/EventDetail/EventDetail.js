import {Fragment} from "react";
import EventSummary from "./EventSummary/EventSummary";
import EventLogistics from "./EventLogistics/EventLogistics";
import EventContent from "./EventContent/EventContent";
import Comments from "../../input/Comments/Comments";

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
            <Comments eventId={event.id}/>
        </Fragment>
    );
}

export default EventDetail;
