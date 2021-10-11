import {useRouter} from "next/router";
import {getFeaturedEvents} from "../../dummy-data";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";

const EventsFeaturedIndexPage = () => {
    const router = useRouter();
    // console.log('router.pathname = ', router.pathname);
    // console.log('router.query = ', router.query);
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>List of Featured Events</h1>
            <EventsSearch events={featuredEvents}/>
            <EventItemsList events={featuredEvents}/>
        </div>
    );
};

export default EventsFeaturedIndexPage;