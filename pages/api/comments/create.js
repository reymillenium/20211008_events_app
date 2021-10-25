import {addComment} from "../../../lib/EventsAPI";

export default async function handler(request, response) {
    // response.status(200).json({name: 'John Doe'})
    const {method: requestMethod, body: incomingRequestData} = request;

    if (requestMethod === 'POST') {
        try {
            await addComment(incomingRequestData);
            response.status(201).json({message: 'Comment inserted!'});
        } catch (error) {
            console.log('error = ', error);
        }
    }
}
