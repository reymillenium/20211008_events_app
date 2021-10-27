const generateRoutes = () => {
    // *** <Events> ***
    // Basic CRUD Get Routes:
    const eventsIndexPath = `/events`;
    const eventsNewPath = `/events/new`;
    const eventsShowPath = eventId => `/events/show/${eventId}`;
    const eventsEditPath = eventId => `/events/edit/${eventId}`;
    // Basic CRUD API Routes:
    const eventsApiCreatePath = `/api/events/create`;
    // const eventsApiUpdatePath = `/api/events/update`;
    // const eventsApiDestroyPath = `/api/events/destroy`;
    // Other Routes:
    const eventsFeaturedIndexPath = `/events/featured`;
    const eventsSlugPath = (...slug) => `/events` + slug.map(slugItem => `/${slugItem}`).join('');
    // *** </Events> ***

    // *** <Subscribers> ***
    const subscribersApiCreatePath = `api/subscribers/create`;
    // *** </Subscribers> ***

    // *** <Comments> ***
    // Basic CRUD Get Routes:
    // const commentsIndexPath = `/comments`;
    // const commentsNewPath = `/comments/new`;
    // const commentsShowPath = commentId => `/comments/show/${commentId}`;
    // const commentsEditPath = commentId => `/comments/edit/${commentId}`;
    // Basic CRUD API Routes:
    const commentsApiCreatePath = `/api/comments/create`;
    // const commentsApiUpdatePath = `/api/comments/update`;
    // const commentsApiDestroyPath = `/api/comments/destroy`;
    // Other API Routes:
    const commentsPerEventIndexPath = eventId => `/api/comments/${eventId}`;
    // *** </Comments> ***

    return {
        // Events:
        events: {
            indexPath: eventsIndexPath,
            newPath: eventsNewPath,
            showPath: eventsShowPath,
            editPath: eventsEditPath,
            api: {
                createPath: eventsApiCreatePath,
                // updatePath: eventsApiUpdatePath,
                // destroyPath: eventsApiDestroyPath,
            },
            featuredIndexPath: eventsFeaturedIndexPath,
            filteredPath: eventsSlugPath,
        },

        // Subscribers:
        subscribers: {
            api: {
                createPath: subscribersApiCreatePath,
            },
        },

        // Comments:
        comments: {
            api: {
                createPath: commentsApiCreatePath,
                perEventIndexPath: commentsPerEventIndexPath,
            }
        },
    };
};

export default generateRoutes;

// CRUD's Sequence Best Practices:
// index
// new
// create
// show
// edit
// update
// destroy