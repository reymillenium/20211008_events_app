import {useRouter} from "next/router";
import {getAllEvents} from "../../dummy-data";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";

const EventsIndexPage = () => {
    // const router = useRouter();
    // console.log('router.pathname = ', router.pathname);
    // console.log('router.query = ', router.query);
    const allEvents = getAllEvents();

    return (
        <div>
            <h1>Full List of Events</h1>
            <EventsSearch events={allEvents}/>
            <EventItemsList events={allEvents}/>
        </div>
    );
};

export default EventsIndexPage;