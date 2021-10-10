import {Fragment} from "react";
import {useRouter} from "next/router";
import {getEventById, getAllEvents} from "../../../dummy-data";

import EventSummary from "../../../components/events/EventDetail/EventSummary";
import EventLogistics from "../../../components/events/EventDetail/EventLogistics";
import EventContent from "../../../components/events/EventDetail/EventContent";

const EventsShowPage = (props) => {
    const router = useRouter();
    const pathname = router.pathname;
    const {eventId} = router.query;
    const event = getEventById(eventId);
    // const {event} = props;

    // console.log('router.pathname = ', router.pathname);
    // console.log('router.query = ', router.query);
    // console.log('router.query.eventId = ', router.query.eventId);

    if (!event) {
        return <p>No event found!</p>;
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                location={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            {/*<EventItem event={event}/>*/}
        </Fragment>
    );
};

export default EventsShowPage;

export async function getStaticPaths() {
    let paths = [];
    try {
        const events = getAllEvents();
        paths = events.map(event => ({params: {eventId: event.id.toString()},}));
    } catch (error) {
        console.log('error = ', error);
    }

    return {
        paths: paths,
        // If it fails pre-generating the dynamic age: With false (this is all the supported parameters) then it shows a 404 error -> 404 page
        //... and with true it then tries to generate a page for that meetupId, dynamically on the server for the incoming request,... How? by executing again the getStaticProps function?
        // Basically if he have hundred or thousands of dynamic pages, then we don't want to pre-generate all of them, but maybe just our most popular pages and then generate some of them and the rest gets generated dynamically on the server for the incoming request (whatever that means!)
        // False -> these are all the meetupIds, so NO fallback. Just show a 404 error page
        // True -> there might be other meetupIds, so YES,... perform a fallback
        // However, in a production server it always shows a 404 error?:
        fallback: 'blocking', // With true or with 'blocking': It will generate that page on demand and thereafter cache it. It will pre-generate it when needed
        // true vs blocking: With true it will immediately return an empty page and then pull down the generated content once that's done, so we need to handle that case that the page doesn't have the data yet
        // with blocking the user won't see anything until the page was pre-generated and the finished page will be served
    };
}

// With this function a page is pre-generated during the building process: This means that Next.Js needs to prepare all the version of this dynamic page in advance, for all the supported IDs.
// As this page is dynamic, Next.Js needs to know for which ID values it should pre-generate the page. It's the only wat to know. Normally it would have access to all the static content top be pre-generated...
// but in this case is dynamic. There is no way to know which item will be clicked by the user in order to render it's details page, so Next.Js needs to pre-generate ALL OF THEM (all the possible URLs) in advance, during the build process.
export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = getEventById(eventId);

    return {
        props: {
            event: event,
        }, // will be passed to the page component as props
        revalidate: 300,
    };
}
