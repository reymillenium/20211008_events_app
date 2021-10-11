import {useRouter} from "next/router";
import generateRoutes from "../../tools/generateRoutes";
import {getFilteredEvents} from "../../dummy-data";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventContent from "../../components/events/EventDetail/EventContent";

const FilteredEventsPage = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;
    const slug = query.slug || [];
    const [year, month] = slug;
    // const eventsRoutes = generateRoutes().events;
    // console.log('FilteredEventsPage -> router.pathname = ', pathname);
    // console.log('FilteredEventsPage -> router.query = ', query);
    // console.log('FilteredEventsPage -> router.query.slug = ', slug);

    // console.log('FilteredEventsPage -> ' + eventsRoutes.filteredPath(2, 4, 6, 7)); // Ok. It works.
    // console.log(eventsRoutes.filteredPath(...slug)); // Ok. It works.
    // console.log('FilteredEventsPage -> year = ' + year + ' and month = ' + month);

    const filteredEvents = getFilteredEvents({year: year, month: month});

    let filteredEventsContent;
    if (filteredEvents.length === 0) {
        filteredEventsContent = (
            <EventContent>
                <h1>No events were found</h1>
            </EventContent>
        );
    } else {
        filteredEventsContent = <EventItemsList events={filteredEvents}/>;
    }

    return (
        <div>
            <h1>Events Slug Page</h1>
            <EventsSearch initialYear={year} initialMonth={month}/>
            {filteredEventsContent}
        </div>
    );
};

export default FilteredEventsPage;