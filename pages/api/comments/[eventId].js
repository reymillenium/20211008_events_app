// import {getCommentsPerEvent} from "../../../lib/firebaseRealtimeDBAPI";
import {getCommentsPerEvent} from "../../../lib/mongoDBApi";

export default async function handler(request, response) {
    const {method: requestMethod} = request;
    const { eventId } = request.query

    if (requestMethod === 'GET') {
        try {
            const commentsPerEvent = await getCommentsPerEvent(eventId);
            response.status(200).json({comments: commentsPerEvent});
        } catch (error) {
            console.log('error = ', error);
        }
    }
}
