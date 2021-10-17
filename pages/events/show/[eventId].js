import styles from '../../../styles/EventsShowPage.module.css';
import EventDetail from "../../../components/events/EventDetail/EventDetail";
import {getSingleEvent, getAllEvents} from "../../../lib/EventsAPI";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";

const EventsShowPage = (props) => {
    const {event} = props;

    // if (!event) {
    //     return (
    //         <div className={styles.centered}>
    //             <LoadingSpinner/>
    //         </div>
    //     );
    // }

    return <EventDetail event={event}/>;
};

export default EventsShowPage;

export async function getStaticPaths() {
    let paths = [];
    try {
        const events = await getAllEvents();
        paths = events.map(event => ({params: {eventId: event.id.toString()},}));
    } catch (error) {
        console.log('error.message = ', error.message);
    }

    return {
        paths: paths,
        // If it fails pre-generating the dynamic age: With false (this is all the supported parameters) then it shows a 404 error -> 404 page
        //... and with true it then tries to generate a page for that meetupId, dynamically on the server for the incoming request,... How? by executing again the getStaticProps function?
        // Basically if he have hundred or thousands of dynamic pages, then we don't want to pre-generate all of them, but maybe just our most popular pages and then generate some of them and the rest gets generated dynamically on the server for the incoming request (whatever that means!)
        // False -> these are all the meetupIds, so NO fallback. Just show a 404 error page if the request has parameters not included in 'paths'
        // True -> there might be other meetupIds, so YES,... perform a fallback. Next.js will pre-generate the page just in time, but Next.js won't wait until is pre-generated, so it needs a fallback block in the page component function
        // blocking -> Similar to true, but the user won't see anything until the page was pre-generated in the server and then... the finished page will be served. Next.js will wait until is pre-generated just in time. No need to add a fallback block in the page component function (if (!product) {...)
        // However, in a production server it always shows a 404 error?:
        // fallback: true, // With true or with 'blocking': It will generate that page on demand and thereafter cache it. It will pre-generate it when needed
        fallback: 'blocking', // It won't render the function component directly. It will until executing getStaticProps and until the data is ready. If there is an error, it won't show the function component directly, as it will allow to execute the redirection. This avoids the necessity of a LoadingSpinner
        // true vs blocking: With true it will immediately return an empty page and then pull down the generated content once that's done, so we need to handle that case that the page doesn't have the data yet
        // with blocking the user won't see anything until the page was pre-generated and the finished page will be served
    };
}

// With this function a page is pre-generated during the building process: This means that Next.Js needs to prepare all the version of this dynamic page in advance, for all the supported IDs.
// As this page is dynamic, Next.Js needs to know for which ID values it should pre-generate the page. It's the only wat to know. Normally it would have access to all the static content top be pre-generated...
// but in this case is dynamic. There is no way to know which item will be clicked by the user in order to render it's details page, so Next.Js needs to pre-generate ALL OF THEM (all the possible URLs) in advance, during the build process.
export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    let event;

    try {
        event = await getSingleEvent(eventId);
    } catch (error) {
        // return {notFound: true};
        return {
            redirect: {
                destination: '/404',
            },
        };
    }

    return {
        props: {
            event: event,
        }, // will be passed to the page component as props
        revalidate: 10,
    };
}
