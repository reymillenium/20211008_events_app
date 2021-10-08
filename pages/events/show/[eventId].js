import {useRouter} from "next/router";

const EventsShowPage = () => {
    const router = useRouter();

    console.log('router.pathname = ', router.pathname);
    console.log('router.query = ', router.query);
    console.log('router.query.eventId = ', router.query.eventId);

    return (
        <div>
            <h1>Events Show Page</h1>

        </div>
    );
};

export default EventsShowPage;