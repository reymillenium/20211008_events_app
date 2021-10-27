// The MongoClient object allows us to connect
import {MongoClient, ObjectId} from 'mongodb';

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const DbName = process.env.DB_NAME;
const uri = `mongodb+srv://${user}:${password}@${host}/${DbName}?retryWrites=true&w=majority`;
const eventsCollectionName = process.env.DB_EVENTS_COLLECTION;
const subscribersCollectionName = process.env.DB_SUBSCRIBERS_COLLECTION;
const commentsCollectionName = process.env.DB_COMMENTS_COLLECTION;

const getClientAndCollection = async (collectionName) => {
    const client = await MongoClient.connect(uri);
    const db = client.db(`${DbName}`);
    return [client, db.collection(`${collectionName}`)];
};

// **********************************************************************************
// *                                  EVENTS                                        *
// **********************************************************************************
//
// Route: '/events'
export const getAllEvents = async (sorting = {_id: 1}) => {
    try {
        const [client, eventsCollection] = await getClientAndCollection(eventsCollectionName);
        const result = await eventsCollection.find({});
        const eventsData = await result.sort(sorting).toArray(); // Sorts the comments in ascending order (the last event is the last one to be shown)
        await client.close();
        let responseDataWithIds = [];
        responseDataWithIds = await eventsData.map(({_id, ...rest}) => ({id: _id.toString(), ...rest}));
        return responseDataWithIds;
    } catch (error) {
        throw new Error(error.message || 'Unable to fetch the events.');
    }
}

// Route: '/events/featured'
export const getFeaturedEvents = async (sorting = {_id: 1}) => {
    try {
        const [client, eventsCollection] = await getClientAndCollection(eventsCollectionName);
        const result = await eventsCollection.find({isFeatured: {$eq: true}});
        const eventsData = await result.sort(sorting).toArray(); // Sorts the comments in ascending order (the last event is the last one to be shown)
        await client.close();
        let responseDataWithIds = [];
        responseDataWithIds = await eventsData.map(({_id, ...rest}) => ({id: _id.toString(), ...rest}));
        return responseDataWithIds;
    } catch (error) {
        throw new Error(error.message || 'Unable to fetch the featured events.');
    }
}

// Route: '/events/[...slug]'
export const getFilteredEvents = async (dateFilter) => {
    const {year: yearString, month: monthString, isFeatured} = dateFilter;
    const year = yearString !== 'All' ? parseInt(yearString) : yearString;
    const month = monthString !== 'All' ? parseInt(monthString) : monthString;
    const allEvents = await getAllEvents();

    const filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        const yearCondition = yearString !== 'All' ? (eventDate.getFullYear() === year) : eventDate;
        const monthCondition = monthString !== 'All' ? (eventDate.getMonth() === month - 1) : eventDate;
        const isFeaturedCondition = isFeatured ? event.isFeatured : event;
        return (yearCondition && monthCondition && isFeaturedCondition);
    });

    return filteredEvents;
}

export async function getSingleEvent(eventId) {
    try {
        const [client, eventsCollection] = await getClientAndCollection(eventsCollectionName);
        const result = await eventsCollection.findOne({_id: {$eq: new ObjectId(eventId)}});
        await client.close();
        let eventWithId;
        eventWithId = [result].map(({_id, ...rest}) => ({id: _id.toString(), ...rest}));
        return eventWithId;
    } catch (error) {
        throw new Error(error.message || 'Unable to fetch the event.');
    }
}

// **********************************************************************************
// *                               SUBSCRIBERS                                      *
// **********************************************************************************
//

// **********************************************************************************
// *                                 COMMENTS                                       *
// **********************************************************************************
//
// Route: 'api/comments/create'
export async function addComment(commentData) {
    try {
        // const client = await MongoClient.connect(uri);
        // const db = client.db(`${DbName}`);
        // const commentsCollection = db.collection(`${commentsCollectionName}`);
        const [client, commentsCollection] = await getClientAndCollection(commentsCollectionName);
        const newCommentData = {...commentData}; // Makes a real copy, as it was previously modifying the original object
        const result = await commentsCollection.insertOne(newCommentData);
        await client.close();
        return {id: result.insertedId.toString(), ...commentData};
    } catch (error) {
        throw new Error(error.message || 'Unable to create the comment.');
    }
}

// Route: 'api/comments/[eventId]'
export const getCommentsPerEvent = async (eventId) => {
    try {
        const [client, commentsCollection] = await getClientAndCollection(commentsCollectionName);
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