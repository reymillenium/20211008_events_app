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
    if (!query.slug) {
        console.log('loading');
        return <p className={'center'}>Loading...</p>;
    }

    const slug = query.slug || [];
    const [year, month, isFeatured] = slug;
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
            <EventsSearch initialYear={year} initialMonth={month} initialIsFeatured={isFeatured}/>
            {filteredEventsContent}
        </div>
    );
};

export default FilteredEventsPage;