const generateRoutes = () => {
    // // *** <Meetups> ***
    // const meetupsIndexPath = `/meetups`;
    // const meetupsNewPath = `/meetups/new`;
    // const meetupsShowPath = meetupId => `/meetups/show/${meetupId}`;
    // const meetupsEditPath = meetupId => `/meetups/edit/${meetupId}`;
    // // API Routes:
    // const meetupsIndexApiPath = `/api/meetups`;
    // const meetupsApiCreatePath = `/api/meetups/create`;
    // const meetupsApiShowPath = meetupId => `/api/meetups/show/${meetupId}`;
    // const meetupsApiUpdatePath = `/api/meetups/update`;
    // const meetupsApiDestroyPath = `/api/meetups/destroy`;
    // // *** </Meetups> ***

    // // *** <Posts> ***
    // const postsSlugLevel1Path = slugIdLevel1 => `/posts/${slugIdLevel1}`;
    // const postsSlugLevel2Path = (slugIdLevel1, slugIdLevel2) => `/posts/${slugIdLevel1}/${slugIdLevel2}`;
    // const postsSlugLevel3Path = (slugIdLevel1, slugIdLevel2, slugIdLevel3) => `/posts/${slugIdLevel1}/${slugIdLevel2}/${slugIdLevel3}`;
    // // *** </Posts> ***


    // *** <Events> ***
    // Basic CRUD Get Routes:
    const eventsIndexPath = `/events`;
    const eventsNewPath = `/events/new`;
    const eventsShowPath = eventId => `/events/show/${eventId}`;
    const eventsEditPath = eventId => `/events/edit/${eventId}`;
    // Basic CRUD API Routes:
    // const eventsApiCreatePath = `/api/events/create`;
    // const eventsApiUpdatePath = `/api/events/update`;
    // const eventsApiDestroyPath = `/api/events/destroy`;
    // Other Routes:
    const eventsFeaturedIndexPath = `/events/featured`;
    const eventsSlugPath = (...slug) => `/events` + slug.map(slugItem => `/${slugItem}`).join('');
    // *** </Events> ***

    return {
        // meetups: {
        //     indexPath: meetupsIndexPath,
        //     newPath: meetupsNewPath,
        //     showPath: meetupsShowPath,
        //     editPath: meetupsEditPath,
        //     api: {
        //         indexPath: meetupsIndexApiPath,
        //         createPath: meetupsApiCreatePath,
        //         showPath: meetupsApiShowPath,
        //         updatePath: meetupsApiUpdatePath,
        //         destroyPath: meetupsApiDestroyPath,
        //     },
        // },

        events: {
            indexPath: eventsIndexPath,
            newPath: eventsNewPath,
            showPath: eventsShowPath,
            editPath: eventsEditPath,
            // api: {
            //     createPath: eventsApiCreatePath,
            //     updatePath: eventsApiUpdatePath,
            //     destroyPath: eventsApiDestroyPath,
            // },
            featuredIndexPath: eventsFeaturedIndexPath,
            filteredPath: eventsSlugPath,
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