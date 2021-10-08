import {useRouter} from "next/router";

const EventsIndexPage = () => {
    const router = useRouter();

    console.log('router.pathname = ', router.pathname);
    console.log('router.query = ', router.query);

    return (
        <div>
            <h1>Events Index Page</h1>

        </div>
    );
};

export default EventsIndexPage;