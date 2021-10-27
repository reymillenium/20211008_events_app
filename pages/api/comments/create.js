// import {addComment} from "../../../lib/firebaseRealtimeDBAPI";
import {addComment} from "../../../lib/mongoDBApi";
import {emailValidator, nameValidator} from "../../../tools/validators";
import {isNotEmpty} from "../../../tools/utils";

export default async function handler(request, response) {
    const {method: requestMethod, body: incomingRequestData} = request;
    const {email, name, text} = incomingRequestData;

    if (!emailValidator(email) || !nameValidator(name) || !isNotEmpty(text)) {
        response.status(422).json({message: 'Invalid data input'});
        return;
    }

    if (requestMethod === 'POST') {
        let result;
        try {
            result = await addComment(incomingRequestData);
        } catch (error) {
            console.log('error = ', error);
            response.status(500).json({message: 'Inserting the comment failed'});
            return;
        }
        response.status(201).json({comment: result, message: 'Successfully added your comment'});
    } else {
        response.status(400).json({message: 'Bad request!'});
    }
}
