import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventContent from "../../components/events/EventDetail/EventContent/EventContent";
import ResultsTitle from "../../components/ResultsTitle/ResultsTitle";
import ErrorAlert from "../../components/ui/ErrorAlert/ErrorAlert";

const FilteredEventsPage = () => {
    const router = useRouter();
    const query = router.query;
    if (!query.slug) {
        console.log('loading');
        return <p className={'center'}>Loading...</p>;
    }

    const slug = query.slug || [];
    const [yearStr, monthStr, isFeaturedStr] = slug;

    let filteredEventsContent;
    const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));
    if (!isValidYear || !isValidMonth) { // Errors
        filteredEventsContent = (
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values</p>
            </ErrorAlert>
        );
    } else { // No errors
        const filteredEvents = getFilteredEvents({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')});
        if (filteredEvents.length === 0) { // No results
            filteredEventsContent = (
                <EventContent>
                    <h1>No events were found</h1>
                </EventContent>
            );
        } else { // All good!
            filteredEventsContent = <EventItemsList events={filteredEvents}/>;
        }
    }

    return (
        <div>
            <ResultsTitle yearStr={yearStr} monthStr={monthStr} isFeaturedStr={isFeaturedStr}/>
            <EventsSearch initialYear={yearStr} initialMonth={monthStr} initialIsFeatured={isFeaturedStr}/>
            {filteredEventsContent}
        </div>
    );
};

export default FilteredEventsPage;