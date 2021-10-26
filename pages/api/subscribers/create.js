import {addSubscriber} from "../../../lib/firebaseRealtimeDBAPI";
import {emailValidator} from "../../../tools/validators";

export default async function handler(request, response) {
    const {method: requestMethod} = request;

    if (requestMethod === 'POST') {
        const incomingRequestData = request.body;
        const email = incomingRequestData.email;

        if (!emailValidator(email)) {
            response.status(422).json({message: 'Invalid email address input'});
            return;
        }

        try {
            await addSubscriber(incomingRequestData);
            response.status(201).json({message: 'Newsletter subscriber inserted!'});
        } catch (error) {
            console.log('error = ', error);
        }
    }
}
