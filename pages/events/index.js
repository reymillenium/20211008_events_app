import {useRouter} from "next/router";
import {getAllEvents} from "../../dummy-data";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";

const EventsIndexPage = () => {
    const router = useRouter();
    // console.log('router.pathname = ', router.pathname);
    // console.log('router.query = ', router.query);
    const allEvents = getAllEvents();

    return (
        <div>
            <h1>Events Index Page</h1>
            <EventItemsList events={allEvents}/>
        </div>
    );
};

export default EventsIndexPage;