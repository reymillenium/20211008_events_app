import {getCommentsPerEvent} from "../../../lib/firebaseRealtimeDBAPI";

export default async function handler(request, response) {
    // response.status(200).json({name: 'John Doe'})
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
