import {useRouter} from "next/router";
import generateRoutes from "../../tools/generateRoutes";
import {getFilteredEvents} from "../../dummy-data";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";

const FilteredEventsPage = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;
    const slug = query.slug || [];
    const eventsRoutes = generateRoutes().events;

    console.log('router.pathname = ', pathname);
    console.log('router.query = ', query);
    console.log('router.query.slug = ', slug);

    // console.log(eventsRoutes.filteredPath(2, 4, 6, 7)); // Ok. It works.
    // console.log(eventsRoutes.filteredPath(...slug)); // Ok. It works.
    const [year, month] = slug;
    // console.log('year = ' + year + ' and month = ' + month);

    const filteredEvents = getFilteredEvents({year: year, month: month});

    if (!filteredEvents) {
        return <p>No events were found</p>;
    }

    return (
        <div>
            <h1>Events Slug Page</h1>
            <EventsSearch/>
            <EventItemsList events={filteredEvents}/>
        </div>
    );
};

export default FilteredEventsPage;