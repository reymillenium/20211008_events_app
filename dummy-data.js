const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Programming for everyone',
        description:
            'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
        location: 'Somestreet 25, 12345 San Somewhereo',
        date: '2021-03-12',
        image: 'images/events/james-harrison-vpOeXr5wmR4-unsplash.jpg',
        isFeatured: false,
    },
    {
        id: 'e2',
        title: 'Networking for introverts',
        description:
            "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
        location: 'New Wall Street 5, 98765 New Work',
        date: '2021-05-30',
        image: 'images/events/ahmed-nishaath-T0h7UtRNAQ0-unsplash.jpg',
        isFeatured: true,
    },
    {
        id: 'e3',
        title: 'Networking for extroverts',
        description:
            'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
        location: 'My Street 12, 10115 Broke City',
        date: '2022-04-10',
        image: 'images/events/antenna-ZDN-G1xBWHY-unsplash.jpg',
        isFeatured: true,
    },
];

export const DUMMY_MONTHS_DATA = [
    {
        // value: '01',
        value: 1,
        label: 'January'
    },
    {
        // value: '02',
        value: 2,
        label: 'February'
    },
    {
        // value: '03',
        value: 3,
        label: 'March'
    },
    {
        // value: '04',
        value: 4,
        label: 'April'
    },
    {
        // value: '05',
        value: 5,
        label: 'May'
    },
    {
        // value: '06',
        value: 6,
        label: 'June'
    },
    {
        // value: '07',
        value: 7,
        label: 'July'
    },
    {
        // value: '08',
        value: 8,
        label: 'August'
    },
    {
        // value: '09',
        value: 9,
        label: 'September'
    },
    {
        // value: '10',
        value: 10,
        label: 'October'
    },
    {
        // value: '11',
        value: 11,
        label: 'November'
    },
    {
        // value: '12',
        value: 12,
        label: 'December'
    },
];

export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
    return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
    const {year: yearString, month: monthString} = dateFilter;
    // console.log('getFilteredEvents -> The year = ' + yearString + ' and the month = ' + monthString);
    const year = yearString !== 'All' ? parseInt(yearString) : yearString;
    const month = monthString !== 'All' ? parseInt(monthString) : monthString;

    let filteredEvents = DUMMY_EVENTS.filter((event) => {
        const eventDate = new Date(event.date);
        if (yearString === 'All' && monthString === 'All') {
            return DUMMY_EVENTS;
        } else if (yearString === 'All' && monthString !== 'All') {
            return eventDate.getMonth() === month - 1;
        } else if (yearString !== 'All' && monthString === 'All') {
            return eventDate.getFullYear() === year;
        } else {
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
        }

        // return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });

    return filteredEvents;
}

export function getEventById(id) {
    return DUMMY_EVENTS.find((event) => event.id === id);
}