// import {addEvent} from "../../../lib/mongoDBApi";
import {addEvent} from "../../../lib/firebaseRealtimeDBAPI";
import {booleanValidator, dateValidator, imageUrlValidator} from "../../../tools/validators";
import {isNotEmpty} from "../../../tools/utils";

export default async function handler(request, response) {
    const {method: requestMethod, body: incomingRequestData} = request;
    const {date, description, image, isFeatured, location, title} = incomingRequestData;

    if (!dateValidator(date) || !isNotEmpty(description) || !imageUrlValidator(image) || !booleanValidator(isFeatured) || !isNotEmpty(location) || !isNotEmpty(title)) {
        response.status(422).json({message: 'Invalid data input'});
        return;
    }

    if (requestMethod === 'POST') {
        let result;
        try {
            result = await addEvent(incomingRequestData);
        } catch (error) {
            console.log('error = ', error);
            response.status(500).json({message: 'Inserting the event failed'});
            return;
        }
        response.status(201).json({event: result, message: 'Event inserted!'});
    } else {
        response.status(400).json({message: 'Bad request!'});
    }
}
