import styles from './EventsSearch.module.css';
import {useRouter} from "next/router";
import generateRoutes from "../../../tools/generateRoutes";
import {getAllEvents} from "../../../dummy-data";
import {useEffect, useState} from "react";
import {DUMMY_MONTHS_DATA} from "../../../dummy-data";

Array.prototype.unique = function () {
    return this.filter(function (value, index, array) {
        return array.indexOf(value, index + 1) < 0;
    });
};


const EventsSearch = (props) => {
    const [yearState, setYearState] = useState();
    const [monthState, setMonthState] = useState();
    const {initialYear, initialMonth} = props;

    console.log('Rendering EventsSearch');
    // console.log('initialYear = ' + initialYear + ' and initialMonth = ' + initialMonth);

    const events = props.events || getAllEvents();
    const years = events.map(event => new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', timeZone: 'UTC'})).unique();
    const eventsYearsSelectOptions = years.map(eventYear => <option key={eventYear} value={eventYear}>{eventYear}</option>);
    const monthsSelectOptions = DUMMY_MONTHS_DATA.map(monthData => <option key={monthData.value} value={monthData.value}>{monthData.label}</option>);

    const router = useRouter();
    const {filteredPath} = generateRoutes().events;

    useEffect(() => {
        setYearState(initialYear || years[0]);
        setMonthState(initialMonth || DUMMY_MONTHS_DATA[0].value);
    }, [initialYear, initialMonth]);


    const submitFormHandler = async (event) => {
        event.preventDefault();
        await router.replace(filteredPath(yearState, monthState));
    };

    const selectYearChangeHandler = async (event) => {
        const year = event.target.value;
        // console.log('EventsSearch -> The selected year is: ', year);
        setYearState(year);
        if (year !== yearState) {
            // console.log('EventsSearch -> selectYearChangeHandler');
            await router.replace(filteredPath(year, monthState));
        }
    };

    const selectMonthChangeHandler = async (event) => {
        const month = event.target.value;
        // console.log('EventsSearch -> The selected month is: ', month);
        setMonthState(month);
        if (month !== monthState) {
            // console.log('EventsSearch -> selectMonthChangeHandler');
            await router.replace(filteredPath(yearState, month));
        }
    };

    return (
        <form onSubmit={submitFormHandler} className={styles.form}>
            <div className={styles.controls}>
                <div className={styles.control}>
                    <label htmlFor="year">Year</label>
                    <select name="year" id="year" value={yearState} onChange={selectYearChangeHandler}>
                        {eventsYearsSelectOptions}
                    </select>
                </div>

                <div className={styles.control}>
                    <label htmlFor="month">Month</label>
                    <select name="month" id="month" value={monthState} onChange={selectMonthChangeHandler}>
                        {monthsSelectOptions}
                    </select>
                </div>

                <button type={'submit'}>Search</button>
            </div>
        </form>
    );
};

export default EventsSearch;