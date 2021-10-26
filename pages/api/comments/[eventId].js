// import {getCommentsPerEvent} from "../../../lib/firebaseRealtimeDBAPI";
import {getCommentsPerEvent} from "../../../lib/mongoDBApi";
import {isNotEmpty} from "../../../tools/utils";

export default async function handler(request, response) {
    const {method: requestMethod} = request;
    const {eventId} = request.query

    if (!isNotEmpty(eventId)) {
        response.status(422).json({message: 'Invalid data input'});
        return;
    }

    if (requestMethod === 'GET') {
        let commentsPerEvent;
        try {
            commentsPerEvent = await getCommentsPerEvent(eventId);
        } catch (error) {
            console.log('error = ', error);
            response.status(500).json({message: 'Fetching the comments per event failed'});
            return;
        }
        response.status(200).json({comments: commentsPerEvent});
    } else {
        response.status(400).json({message: 'Bad request!'});
    }
}
