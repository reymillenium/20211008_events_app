import {useRouter} from "next/router";

const EventsEditPage = () => {
    const router = useRouter();

    console.log('router.pathname = ', router.pathname);
    console.log('router.query = ', router.query);
    console.log('router.query.eventId = ', router.query.eventId);

    return (
        <div>
            <h1>Events Featured Index Page</h1>

        </div>
    );
};

export default EventsEditPage;