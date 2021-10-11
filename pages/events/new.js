import {useRouter} from "next/router";

const EventsNewPage = () => {
    const router = useRouter();

    console.log('router.pathname = ', router.pathname);
    console.log('router.query = ', router.query);

    return (
        <div>
            <h1>New Event</h1>

        </div>
    );
};

export default EventsNewPage;