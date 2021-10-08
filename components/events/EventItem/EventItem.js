import {Fragment} from "react";
import {useRouter} from "next/router";
import generateRoutes from "../../../tools/generateRoutes";

const EventItem = (props) => {
    const router = useRouter();
    // const eventsRoutes = generateRoutes().events;
    const {showPath} = generateRoutes().events;

    return (
        <Fragment>
            <li>
                <h3>{props.event.title}</h3>
            </li>
        </Fragment>
    );
};

export default EventItem;