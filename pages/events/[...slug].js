import {useState, useEffect} from "react";
import styles from "../../styles/FilteredEvents.module.css";
import {useRouter} from "next/router";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventContent from "../../components/events/EventDetail/EventContent/EventContent";
import ResultsTitle from "../../components/ResultsTitle/ResultsTitle";
import ErrorAlert from "../../components/ui/ErrorAlert/ErrorAlert";
import {getFilteredEvents} from "../../lib/EventsAPI";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

const FilteredEventsPage = (props) => {
    const router = useRouter();
    const query = router.query;
    // if (!query.slug) {
    //     console.log('loading');
    //     return <p className={'center'}>Loading...</p>;
    // }
    const slug = query.slug || [];
    const [yearStr, monthStr, isFeaturedStr] = slug;


    // Variant # 1: Using useState + the Custom hook useDidMountEffect
    // const initialFilteredEventsState = props.events;
    // const [filteredEvents, setFilteredEvents] = useState(initialFilteredEventsState);
    // const [isLoading, setIsLoading] = useState(false);
    // const [errorState, setErrorState] = useState(null);
    // useDidMountEffect(async () => {
    //     setIsLoading(true);
    //     try {
    //         const events = await getFilteredEvents({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')});
    //         setFilteredEvents(events);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setErrorState(error.message);
    //         setIsLoading(false);
    //     }
    // }, [yearStr, monthStr, isFeaturedStr]);
    //
    // let filteredEventsContent;
    // const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    // const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));
    // if (!isValidYear || !isValidMonth) { // Errors
    //     filteredEventsContent = (
    //         <ErrorAlert>
    //             <p>Invalid filter. Please adjust your values</p>
    //         </ErrorAlert>
    //     );
    // } else { // No errors
    //     if (filteredEvents.length === 0) { // No results
    //         filteredEventsContent = (
    //             <EventContent>
    //                 <h1>No events were found</h1>
    //             </EventContent>
    //         );
    //     } else { // All good!
    //         filteredEventsContent = <EventItemsList events={filteredEvents}/>;
    //     }
    // }


    // Variant # 2: Using the Custom hooks: useHttp + useDidMountEffect
    const initialFilteredEventsState = props.events;
    // console.log('initialFilteredEventsState.length = ', initialFilteredEventsState.length);
    const {sendRequest: getFilteredEventsRequest, status: getFilteredEventsStatus, data: filteredEvents, error: getFilteredEventsError} = useHttp(() => getFilteredEvents({year: yearStr, month: monthStr, isFeatured: isFeaturedStr.toLowerCase() === 'true'}), false, initialFilteredEventsState);
    useDidMountEffect(async () => {
        getFilteredEventsRequest({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')}).then(r => {
        });
    }, [yearStr, monthStr, isFeaturedStr]);
    const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));
    const isValidIsFeatured = (isFeaturedStr === 'true' || isFeaturedStr === 'false');
    // let filteredEventsContent;
    // if (!isValidYear || !isValidMonth || !isValidIsFeatured) { // Validation failure: Errors in the incoming parameters
    //     filteredEventsContent = (
    //         <ErrorAlert>
    //             <p>Invalid filter. Please adjust your values</p>
    //         </ErrorAlert>
    //     );
    // } else { // No Errors in the parameters
    //     if (getFilteredEventsStatus === 'pending') { // Pending, usually the initial stage but not this time (is null, as startWithPending: false om the custom hook)
    //         filteredEventsContent = (
    //             <div className={styles.centered}>
    //                 <LoadingSpinner/>
    //             </div>
    //         );
    //     } else if (getFilteredEventsError) { // Fetching Errors
    //         filteredEventsContent = <p className={'centered focused'}>{getFilteredEventsError}</p>;
    //     } else if (getFilteredEventsStatus === 'completed' && (!filteredEvents || filteredEvents.length === 0)) { // All seams to be ok,... but no data was found
    //         filteredEventsContent = (
    //             <EventContent>
    //                 <h1>No events were found</h1>
    //             </EventContent>
    //         );
    //     } else { // All good!
    //         filteredEventsContent = <EventItemsList events={initialFilteredEventsState || filteredEvents}/>;
    //     }
    // }

    // Variant # 3: Using only the incoming data from getServerSideProps:
    let filteredEventsContent;
    if (props.hasParamErrors) {
        console.log('props.hasParamErrors');
        filteredEventsContent = (
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values</p>
            </ErrorAlert>
        );
    } else if (props.hasFetchingErrors) {
        console.log('props.hasFetchingErrors');
        filteredEventsContent = <p className={'centered focused'}>{props.getFilteredEventsError.message}</p>;
    } else if (!props.events || props.events.length === 0) {
        console.log('No events');
        filteredEventsContent = (
            <EventContent>
                <h1>No events were found</h1>
            </EventContent>
        );
    } else {
        console.log('All good');
        filteredEventsContent = <EventItemsList events={props.events}/>;
    }

    return (
        <div>
            <ResultsTitle yearStr={yearStr} monthStr={monthStr} isFeaturedStr={isFeaturedStr}/>
            <EventsSearch initialYear={yearStr} initialMonth={monthStr} initialIsFeatured={isFeaturedStr}/>
            {filteredEventsContent}
        </div>
    );
};

export async function getServerSideProps(context) {
    const slug = context.params.slug || [];
    const [yearStr, monthStr, isFeaturedStr] = slug;
    const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));
    const isValidIsFeatured = (isFeaturedStr === 'true' || isFeaturedStr === 'false');
    // const filteredEvents = await getFilteredEvents({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')});

    let filteredEvents;
    if (!isValidYear || !isValidMonth || !isValidIsFeatured) {
        return {
            props: {
                hasParamErrors: true
            }
        };
    } else {
        try {
            filteredEvents = await getFilteredEvents({year: yearStr, month: monthStr, isFeatured: (isFeaturedStr.toLowerCase() === 'true')});
        } catch (Error) {
            return {
                props: {
                    hasFetchingErrors: true,
                    getFilteredEventsError: Error
                }
            };
        }
    }

    return {
        props: {
            events: filteredEvents,
        }, // will be passed to the page component as props
    };
}

export default FilteredEventsPage;