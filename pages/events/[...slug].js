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

    let filteredEventsContent;
    let titleLabel = ``;
    const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));

    // console.log('isValidYear: ', isValidYear);
    // console.log('isValidMonth: ', isValidMonth);
    if (!isValidYear || !isValidMonth) {
        filteredEventsContent = (
            <EventContent>
                <p>Invalid filter. Please adjust your values</p>
            </EventContent>
        );
    } else {
        const filteredEvents = getFilteredEvents({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')});
        titleLabel = `List of `;
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

        if (filteredEvents.length === 0) {
            filteredEventsContent = (
                <EventContent>
                    <h1>No events were found</h1>
                </EventContent>
            );
        } else {
            filteredEventsContent = <EventItemsList events={filteredEvents}/>;
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