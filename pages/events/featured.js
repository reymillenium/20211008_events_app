import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import EventItemsList from "../../components/events/EventItemsList/EventItemsList";
import EventsSearch from "../../components/events/EventsSearch/EventsSearch";
import {getFeaturedEvents} from "../../lib/EventsAPI";
import styles from "../../styles/FeaturedEventsIndex.module.css";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const EventsFeaturedIndexPage = (props) => {
    const initialEventsState = props.events;
    const [featuredEvents, setFeaturedEvents] = useState(initialEventsState);
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);

    useDidMountEffect(async () => {
        setIsLoading(true);
        try {
            const events = await getFeaturedEvents();
            setFeaturedEvents(events);
            setIsLoading(false);
        } catch (error) {
            setErrorState(error.message);
            setIsLoading(false);
        }
    }, [featuredEvents]);
    // const featuredEvents = props.events;

    let content;
    if (isLoading) {
        content = (
            <div className={styles.centered}>
                <LoadingSpinner/>
            </div>
        );
    } else if (errorState) {
        content = <p className={'centered focused'}>{errorState}</p>;
    } else if (!isLoading && (!featuredEvents || featuredEvents.length === 0)) {
        content = <p>No data yet.</p>;
    } else {
        content = <EventItemsList events={featuredEvents}/>;
    }

    return (
        <div>
            <h1>List of Featured Events</h1>
            <EventsSearch events={featuredEvents}/>
            {/*<EventItemsList events={featuredEvents}/>*/}
            {content}
        </div>
    );
};

export async function getStaticProps(context) {
    console.log('EventsFeaturedIndexPage -> (Re-Generating...');
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {events: featuredEvents},
        revalidate: 10
    };
}

export default EventsFeaturedIndexPage;