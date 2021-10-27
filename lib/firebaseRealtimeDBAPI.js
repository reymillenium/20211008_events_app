// const firebaseDomain = process.env.FIREBASE_DOMAIN
const firebaseDomain = 'https://events-app-92d92-default-rtdb.firebaseio.com';
const eventsCollectionName = process.env.DB_EVENTS_COLLECTION;
const subscribersCollectionName = process.env.DB_SUBSCRIBERS_COLLECTION;
const commentsCollectionName = process.env.DB_COMMENTS_COLLECTION;

// **********************************************************************************
// *                                  EVENTS                                        *
// **********************************************************************************
//
// Route: '/events'
export async function getAllEvents() {
    const response = await fetch(`${firebaseDomain}/${eventsCollectionName}.json`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to fetch the events.');

    const transformedEvents = [];
    for (const key in data) {
        const eventObj = {
            id: key,
            ...data[key],
        };
        transformedEvents.push(eventObj);
    }

    return transformedEvents;
}

// Route: '/events/featured'
export async function getFeaturedEvents() {
    const query = `?orderBy="isFeatured"&equalTo=true`;
    const response = await fetch(`${firebaseDomain}/${eventsCollectionName}.json${query}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to fetch the featured events.');

    const transformedEvents = [];
    for (const key in data) {
        const eventObj = {
            id: key,
            ...data[key],
        };
        transformedEvents.push(eventObj);
    }

    return transformedEvents;
}

// Route: '/events/[...slug]'
export async function getFilteredEvents(dateFilter) {
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
    const response = await fetch(`${firebaseDomain}/${eventsCollectionName}/${eventId}.json`);
    const data = await response.json();

    if (!response.ok || data === null) {
        throw new Error(data?.message || 'Unable to fetch the event.');
    }

    return {
        id: eventId,
        ...data,
    };
}

export async function addEvent(eventData) {
    const response = await fetch(`${firebaseDomain}/${eventsCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to create the event.');

    return {id: data.name, ...eventData};
}

export async function deleteEvent(eventId) {
    const response = await fetch(`${firebaseDomain}/${eventsCollectionName}/${eventId}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to delete the event.');

    return null;
}

// **********************************************************************************
// *                               SUBSCRIBERS                                      *
// **********************************************************************************
//
export async function addSubscriber(subscriberData) {
    const response = await fetch(`${firebaseDomain}/${subscribersCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(subscriberData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to create the newsletter subscription.');

    return {id: data.name, ...subscriberData};
}

// **********************************************************************************
// *                                 COMMENTS                                       *
// **********************************************************************************
//
// Route: 'api/comments/create'
export async function addComment(commentData) {
    const response = await fetch(`${firebaseDomain}/${commentsCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to create the comment.');

    return {id: data.name, ...commentData};
}

// Route: 'api/comments/[eventId]'
export async function getCommentsPerEvent(eventId) {
    const query = `?orderBy="eventId"&equalTo="${eventId}"`;
    const response = await fetch(`${firebaseDomain}/${commentsCollectionName}.json${query}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to fetch the comments per event.');

    const transformedComments = [];
    for (const key in data) {
        const commentObj = {
            id: key,
            ...data[key],
        };
        transformedComments.push(commentObj);
    }

    return transformedComments;
}