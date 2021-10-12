const generateHeadInfo = (componentName, pageProps) => {
    let title;
    let description;

    switch (componentName) {
        case 'EventsFeaturedIndexPage':
            title = 'Featured Miami Events';
            description = 'Browse a list of highly active events';
            break;

        case 'EventsIndexPage':
            title = 'Miami Events';
            description = 'Browse a list of highly active events';
            break;

        case 'EventNewPage':
            title = 'Add a New Event';
            description = 'Add your own event and create amazing opportunities';
            break;

        case 'EventShowPage':
            title = `${pageProps.event.title}`;
            description = `${pageProps.event.description}`;
            break;

        case 'Error404':
            title = 'Miami Events';
            description = 'The resource you are looking for, does not exists';
            break;

        default:
            title = 'Miami Events';
            description = 'A sample Next.js Web App to manage some events';
            break;
    }

    return {
        title: title,
        description: description,
    };

};

export default generateHeadInfo;