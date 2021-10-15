import {Fragment, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {getAllEvents} from "../../dummy-data";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";

const firebaseUrl = `https://events-app-92d92-default-rtdb.firebaseio.com/events.json`;


const EventsIndexPage = (props) => {
    // const allEvents = getAllEvents();
    // Method # 3: Using the getStaticProps function with client side fetching (useEffect)
    const initialEventsState = props.events;
    const [events, setEvents] = useState(initialEventsState);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(firebaseUrl)
            .then((response) => response.json())
            .then((data) => {
                const transformedEvents = [];
                for (const key in data) {
                    transformedEvents.push({
                        id: key,
                        ...data[key],
                    });
                }
                setEvents(transformedEvents);
                setIsLoading(false);
            }).catch(error => {
            setErrorState(error.message);
            setIsLoading(false);
        });
    }, []);

    if (errorState) {
        return <p>Failed to load.</p>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!events) {
        return <p>No data yet.</p>;
    }

    return (
        <Fragment>
            <h1>Full List of Events</h1>
            <EventsSearch events={events}/>
            <EventItemsList events={events}/>
        </Fragment>
    );
};

export async function getStaticProps(context) {
    console.log('EventsIndexPage -> (Re-Generating...');
    const response = await fetch(
        firebaseUrl
    );
    const data = await response.json();

    const transformedEvents = [];

    for (const key in data) {
        transformedEvents.push({
            id: key,
            ...data[key],
        });
    }

    return {
        props: {events: transformedEvents},
        revalidate: 10
    };
}

export default EventsIndexPage;