// The MongoClient object allows us to connect
import {MongoClient} from 'mongodb';

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const DbName = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${password}@${host}/${DbName}?retryWrites=true&w=majority`;
const commentsCollectionName = process.env.DB_COMMEMNTS_COLLECTION;

// Route: 'api/comments/create'
export async function addComment(commentData) {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(`${DbName}`);
        const commentsCollection = db.collection(`${commentsCollectionName}`);
        const newCommentData = {...commentData}; // Makes a real copy, as it was previously modifying the original object
        const result = await commentsCollection.insertOne(newCommentData);
        await client.close();
        return {id: result.insertedId.toString(), ...commentData};
    } catch (error) {
        throw new Error(error.message || 'Unable to create the comment.');
    }
    // return null;
}

// Route: 'api/comments/[eventId]'
export const getCommentsPerEvent = async (eventId) => {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(`${DbName}`);
        const commentsCollection = db.collection(`${commentsCollectionName}`);
        const result = await commentsCollection.find({eventId: {$eq: eventId}});
        const commentsData = await result.sort({_id: -1}).toArray(); // Sorts the comments in descending order (the last comment is the first one to be shown)
        await client.close();
        let responseDataWithIds = [];
        responseDataWithIds = await commentsData.map(({_id, ...rest}) => ({id: _id.toString(), ...rest}));
        return responseDataWithIds;
    } catch (error) {
        throw new Error(error.message || 'Unable to fetch the comments per event.');
    }
}