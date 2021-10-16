const FIREBASE_DOMAIN = 'https://events-app-92d92-default-rtdb.firebaseio.com';

export async function getAllEvents() {
    const response = await fetch(`${FIREBASE_DOMAIN}/events.json`);
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
    const response = await fetch(`${FIREBASE_DOMAIN}/events.json${query}`);
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

export async function getSingleEvent(eventId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/events/${eventId}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch the event.');
    }

    return {
        id: eventId,
        ...data,
    };
}

export async function addEvent(eventData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/events.json`, {
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
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${eventId}.json`, {
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
