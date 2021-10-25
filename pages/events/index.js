import {Fragment, useState, useEffect} from "react";
import {getAllEvents} from "../../lib/EventsAPI";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import styles from '../../styles/EventsIndex.module.css';
import useDidMountEffect from "../../hooks/useDidMountEffect";
import NewsletterRegistration from "../../components/Comments/NewsletterRegistration/NewsletterRegistration";

const firebaseUrl = `https://events-app-92d92-default-rtdb.firebaseio.com/events.json`;

const EventsIndexPage = (props) => {
    // const allEvents = getAllEvents();
    // Method # 3: Using the getStaticProps function with client side fetching (useEffect)
    const initialEventsState = props.events;
    const [events, setEvents] = useState(initialEventsState);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);

    // useEffect(()  =>  {
    //     setIsLoading(true);
    //     fetch(firebaseUrl)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const transformedEvents = [];
    //             for (const key in data) {
    //                 transformedEvents.push({
    //                     id: key,
    //                     ...data[key],
    //                 });
    //             }
    //             setEvents(transformedEvents);
    //             setIsLoading(false);
    //         }).catch(error => {
    //         setErrorState(error.message);
    //         setIsLoading(false);
    //     });
    // }, []);
    // if (errorState) {
    //     return <p>Failed to load.</p>;
    // }
    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }
    // if (!events) {
    //     return <p>No data yet.</p>;
    // }

    // Method # 4: Using the getStaticProps function with client side fetching (useEffect)
    useDidMountEffect(async () => {
        setIsLoading(true);
        try {
            const allEvents = await getAllEvents();
            setEvents(allEvents);
            setIsLoading(false);
        } catch (error) {
            setErrorState(error.message);
            setIsLoading(false);
        }
    }, [events]);

    let content;
    if (isLoading) {
        content = (
            <div className={styles.centered}>
                <LoadingSpinner/>
            </div>
        );
    } else if (errorState) {
        content = <p className={'centered focused'}>{errorState}</p>;
    } else if (!isLoading && (!events || events.length === 0)) {
        content = <p>No data yet.</p>;
    } else {
        content = <EventItemsList events={events}/>;
    }


    // Variant # 5: Using the getStaticProps function with client side fetching using a custom hook and useEffect
    // const initialEventsState = props.events;
    // const {sendRequest: getAllEventsRequest, status: getAllEventsStatus, data: loadedEvents, error: getAllEventsError} = useHttp(getAllEvents, true, initialEventsState);
    //
    // useEffect(() => {
    //     getAllEventsRequest().then(r => {
    //     });
    // }, [getAllEventsRequest]);
    //
    // let content;
    // if (getAllEventsStatus === 'pending') {
    //     content = (
    //         <div className={styles.centered}>
    //             <LoadingSpinner/>
    //         </div>
    //     );
    // } else if (getAllEventsError) {
    //     content = <p className={'centered focused'}>{getAllEventsError}</p>;
    // } else if (getAllEventsStatus === 'completed' && (!loadedEvents || loadedEvents.length === 0)) {
    //     content = <p>No data yet.</p>;
    // } else {
    //     content = <EventItemsList events={loadedEvents}/>;
    // }

    return (
        <Fragment>
            <h1>Full List of Events</h1>
            <NewsletterRegistration/>
            <EventsSearch events={events}/>
            {content}
            {/*<EventItemsList events={events}/>*/}
        </Fragment>
    );
};

export async function getStaticProps(context) {
    console.log('EventsIndexPage -> (Re-Generating...');
    const allEvents = await getAllEvents();

    return {
        props: {events: allEvents},
        revalidate: 10
    };
}

export default EventsIndexPage;