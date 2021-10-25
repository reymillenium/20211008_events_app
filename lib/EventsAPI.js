const FIREBASE_DOMAIN = 'https://events-app-92d92-default-rtdb.firebaseio.com';
// const FIREBASE_DOMAIN = process.env.FIREBASE_DOMAIN
const eventsCollectionName = process.env.DB_EVENTS_COLLECTION;
const subscribersCollectionName = process.env.DB_SUBSCRIBERS_COLLECTION;
const commentsCollectionName = process.env.DB_COMMENTS_COLLECTION;

export async function getAllEvents() {
    const response = await fetch(`${FIREBASE_DOMAIN}/${eventsCollectionName}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch the events.');
    }

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


export async function getFeaturedEvents() {
    const query = `?orderBy="isFeatured"&equalTo=true`;
    const response = await fetch(`${FIREBASE_DOMAIN}/${eventsCollectionName}.json${query}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch the featured events.');
    }

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
    const response = await fetch(`${FIREBASE_DOMAIN}/${eventsCollectionName}/${eventId}.json`);
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
    const response = await fetch(`${FIREBASE_DOMAIN}/${eventsCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to create the event.');
    }

    return null;
}

export async function deleteEvent(eventId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/${eventsCollectionName}/${eventId}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to delete the event.');
    }

    return null;
}

export async function newsletterSignup(newsletterSubscriberData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/${subscribersCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(newsletterSubscriberData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to create the newsletter subscription.');
    }

    return null;
}

export async function addComment(commentData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/${commentsCollectionName}.json`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to create the comment.');
    }

    return null;
}


export async function getCommentsPerEvent(eventId) {
    const query = `?orderBy="eventId"&equalTo="${eventId}"`;
    const response = await fetch(`${FIREBASE_DOMAIN}/${commentsCollectionName}.json${query}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch the comments per event.');
    }

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

// export async function addComment(requestData) {
//     const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
//         method: 'POST',
//         body: JSON.stringify(requestData.commentData),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     const data = await response.json();
//
//     if (!response.ok) {
//         throw new Error(data.message || 'Could not add comment.');
//     }
//
//     return {commentId: data.name};
// }

// export async function getAllComments(quoteId) {
//     const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);
//
//     const data = await response.json();
//
//     if (!response.ok) {
//         throw new Error(data.message || 'Could not get comments.');
//     }
//
//     const transformedComments = [];
//
//     for (const key in data) {
//         const commentObj = {
//             id: key,
//             ...data[key],
//         };
//
//         transformedComments.push(commentObj);
//     }
//
//     return transformedComments;
// }
