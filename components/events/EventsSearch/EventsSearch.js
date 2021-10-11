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
    const initialStateValue = 'All';
    const [yearState, setYearState] = useState(initialStateValue);
    const [monthState, setMonthState] = useState(initialStateValue);
    const {initialYear, initialMonth} = props;

    console.log('Rendering EventsSearch');
    // console.log('initialYear = ' + initialYear + ' and initialMonth = ' + initialMonth);

    const events = props.events || getAllEvents();
    const years = events.map(event => new Date(event.date).toLocaleDateString('en-US', {year: 'numeric', timeZone: 'UTC'})).unique();
    let yearsArrayValues = [...years];
    yearsArrayValues.unshift('All');
    const eventsYearsSelectOptions = yearsArrayValues.map(eventYear => <option key={eventYear} value={eventYear}>{eventYear}</option>);

    const initialSelectOption = <option key={'All'} value={'All'}>{'All'}</option>;
    const monthsSelectOptions = DUMMY_MONTHS_DATA.map(monthData => <option key={monthData.value} value={monthData.value}>{monthData.label}</option>);
    monthsSelectOptions.unshift(initialSelectOption);

    console.log('eventsYearsSelectOptions = ', eventsYearsSelectOptions);
    console.log('eventsYearsSelectOptions[0] = ', eventsYearsSelectOptions);

    const router = useRouter();
    const {filteredPath} = generateRoutes().events;

    useEffect(() => {
        // setYearState(initialYear || years[0]);
        // setYearState(initialYear || yearsArrayValues[0]);
        setYearState(initialYear || initialStateValue);

        // setMonthState(initialMonth || DUMMY_MONTHS_DATA[0].value);
        setMonthState(initialMonth || initialStateValue);
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
                    <select
                        id="year"
                        name="year"
                        value={yearState}
                        onChange={selectYearChangeHandler}
                    >
                        {eventsYearsSelectOptions}
                    </select>
                </div>

                <div className={styles.control}>
                    <label htmlFor="month">Month</label>
                    <select
                        id="month"
                        name="month"
                        value={monthState}
                        onChange={selectMonthChangeHandler}>
                        {monthsSelectOptions}
                    </select>
                </div>

                <button type={'submit'}>Search</button>
            </div>
        </form>
    );
};

export default EventsSearch;