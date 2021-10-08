import {useRouter} from "next/router";
import {getFeaturedEvents} from "../../dummy-data";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";

const EventsFeaturedIndexPage = () => {
    const router = useRouter();
    console.log('router.pathname = ', router.pathname);
    console.log('router.query = ', router.query);
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>Events Featured Index Page</h1>
            <ul>
                <EventItemsList events={featuredEvents}/>
            </ul>
        </div>
    );
};

export default EventsFeaturedIndexPage;