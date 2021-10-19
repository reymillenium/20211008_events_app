const generateHeadInfo = (componentName, pageProps) => {
    let title = 'Miami Events';
    let description = 'A new way to manage our events';

    switch (componentName) {
        case 'EventsIndexPage':
            title = 'Miami Events';
            description = 'Browse a list of highly active events';
            break;

        case 'EventsFeaturedIndexPage':
            title = 'Featured Miami Events';
            description = 'Browse a list of highly active featured events';
            break;

        case 'EventsNewPage':
            title = 'Add a New Event';
            description = 'Add your own event and create amazing opportunities';
            break;

        case 'EventsShowPage':
            title = `${pageProps.event.title}`;
            description = `${pageProps.event.description}`;
            break;

        case 'FilteredEventsPage':
            title = `Events - Special search`;
            description = ``;
            break;

        case 'Error404':
            title = 'Miami Events';
            description = 'The resource you are looking for, does not exists';
            break;

        default:
            title = 'Miami Events';
            description = 'A new way to manage our events';
            break;
    }

    return {
        title: title,
        description: description,
    };

};

export default generateHeadInfo;