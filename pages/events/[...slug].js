import {useRouter} from "next/router";
import generateRoutes from "../../tools/generateRoutes";

const FilteredEventsPage = () => {
    const router = useRouter();
    const pathname = router.pathname;
    const query = router.query;
    const slug = query.slug || [];
    const eventsRoutes = generateRoutes().events;

    console.log('router.pathname = ', pathname);
    console.log('router.query = ', query);
    console.log('router.query.slug = ', slug);

    // console.log(eventsRoutes.filteredPath(2, 4, 6, 7)); // Ok. It works.
    // console.log(eventsRoutes.filteredPath(...slug)); // Ok. It works.

    return (
        <div>
            <h1>Events Slug Page</h1>

        </div>
    );
};

export default FilteredEventsPage;