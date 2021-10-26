// import {addComment} from "../../../lib/firebaseRealtimeDBAPI";
import {addComment} from "../../../lib/mongoDBApi";
import {emailValidator, nameValidator} from "../../../tools/validators";

export default async function handler(request, response) {
    const {method: requestMethod, body: incomingRequestData} = request;
    const {email, name, text} = incomingRequestData;

    if (!emailValidator(email) || !nameValidator(name) || !nameValidator(text)) {
        response.status(422).json({message: 'Invalid data input'});
        return;
    }

    if (requestMethod === 'POST') {
        try {
            await addComment(incomingRequestData);
            response.status(201).json({message: 'Comment inserted!'});
        } catch (error) {
            console.log('error = ', error);
        }
    }
}
