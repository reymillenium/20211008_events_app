// import {addSubscriber} from "../../../lib/mongoDBApi";
import {addSubscriber} from "../../../lib/firebaseRealtimeDBAPI";
import {emailValidator} from "../../../tools/validators";

export default async function handler(request, response) {
    const {method: requestMethod, body: incomingRequestData} = request;
    const {email} = incomingRequestData;

    if (!emailValidator(email)) {
        response.status(422).json({message: 'Invalid email address input'});
        return;
    }

    if (requestMethod === 'POST') {
        let result;
        try {
            result = await addSubscriber(incomingRequestData);
        } catch (error) {
            console.log('error = ', error);
            response.status(500).json({message: 'Inserting the subscriber failed'});
            return;
        }
        response.status(201).json({subscriber: result, message: 'Newsletter subscriber inserted!'});
    } else {
        response.status(400).json({message: 'Bad request!'});
    }
}
