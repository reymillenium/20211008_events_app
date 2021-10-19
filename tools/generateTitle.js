import {DUMMY_MONTHS_DATA} from "../dummy-data";

const generateTitle = (yearStr, monthStr, isFeaturedStr) => {
    const isValidYear = (yearStr === 'All' || (!isNaN(+yearStr)));
    const isValidMonth = (monthStr === 'All' || monthStr.match(/^\d+$/));
    const isValidIsFeatured = (isFeaturedStr === 'true' || isFeaturedStr === 'false');

    let titleLabel = ``;
    if (isValidYear && isValidMonth && isValidIsFeatured) { // Valid
        titleLabel = `List of `;
        if (yearStr === 'All' && monthStr === 'All' && isFeaturedStr === 'false') {
            titleLabel += `all the Events`;
        } else if (yearStr === 'All' && monthStr === 'All' && isFeaturedStr === 'true') {
            titleLabel += `all the Featured Events`;
        } else {
            titleLabel = (isFeaturedStr.toLowerCase() === 'true') ? `Featured Events` : `Events`;
            const monthLabel = (monthStr !== 'All') ? DUMMY_MONTHS_DATA.find(monthData => monthData.value === parseInt(monthStr)).label : '';

            if (yearStr === 'All' && monthStr !== 'All') {
                titleLabel += ` of ${monthLabel}`;
            } else if (yearStr !== 'All' && monthStr === 'All') {
                titleLabel += ` of the year ${yearStr}`;
            } else if (yearStr !== 'All' && monthStr !== 'All') {
                titleLabel += ` of ${monthLabel}, ${yearStr}`;
            }
        }
    }

    return titleLabel;
};

export default generateTitle;