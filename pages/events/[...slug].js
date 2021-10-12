import {useRouter} from "next/router";
import generateRoutes from "../../tools/generateRoutes";
import {getFilteredEvents} from "../../dummy-data";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventContent from "../../components/events/EventDetail/EventContent";
import {DUMMY_MONTHS_DATA} from "../../dummy-data";

const FilteredEventsPage = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;
    if (!query.slug) {
        console.log('loading');
        return <p className={'center'}>Loading...</p>;
    }

    const slug = query.slug || [];
    const [yearStr, monthStr, isFeaturedStr] = slug;
    const filteredEvents = getFilteredEvents({year: yearStr, month: monthStr});

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

    let titleLabel = `List of `;
    if (yearStr === 'All' && monthStr === 'All' && isFeaturedStr === 'false') {
        titleLabel += `all the Events`;
    } else if (yearStr === 'All' && monthStr === 'All' && isFeaturedStr === 'true') {
        titleLabel += `all the Featured Events`;
    } else {
        titleLabel = (isFeaturedStr.toLowerCase() === 'true') ? `Featured Events` : `Events`;
        const monthLabel = (monthStr !== 'All') ? DUMMY_MONTHS_DATA.find(monthData => monthData.value === parseInt(monthStr)).label : '';

        if (yearStr === 'All' && monthStr !== 'All') {
            titleLabel += ` of ${monthLabel}`;
        } else if (yearStr !== 'All' && monthStr === 'All') {
            titleLabel += ` of the year ${yearStr}`;
        } else if (yearStr !== 'All' && monthStr !== 'All') {
            titleLabel += ` of ${monthLabel}, ${yearStr}`;
        }
    }

    return (
        <div>
            <h1>{titleLabel}</h1>
            <EventsSearch initialYear={yearStr} initialMonth={monthStr} initialIsFeatured={isFeaturedStr}/>
            {filteredEventsContent}
        </div>
    );
};

export default FilteredEventsPage;