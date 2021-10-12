import styles from './EventsSearch.module.css';
import {useRouter} from "next/router";
import generateRoutes from "../../../tools/generateRoutes";
import {getAllEvents} from "../../../dummy-data";
import {useEffect, useRef, useState} from "react";
import {DUMMY_MONTHS_DATA} from "../../../dummy-data";
import CheckBox from "../../ui/CheckBox/CheckBox";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

Array.prototype.unique = function () {
    return this.filter(function (value, index, array) {
        return array.indexOf(value, index + 1) < 0;
    });
};

const EventsSearch = (props) => {
    const initialStateValue = 'All';
    const [yearState, setYearState] = useState(initialStateValue);
    const [monthState, setMonthState] = useState(initialStateValue);
    const initialIsFeaturedStateValue = false;
    const [isFeaturedState, setIsFeaturedState] = useState(initialIsFeaturedStateValue);
    const {initialYear, initialMonth, initialIsFeatured} = props;

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

    const router = useRouter();
    const {filteredPath} = generateRoutes().events;
    const isFeaturedSelectRef = useRef();

    useEffect(() => {
        setYearState(initialYear || initialStateValue);
        setMonthState(initialMonth || initialStateValue);
        if (initialIsFeatured) {
            setIsFeaturedState(initialIsFeatured.toLowerCase() === 'true');
        } else {
            setIsFeaturedState(initialIsFeaturedStateValue);
        }
    }, [initialYear, initialMonth, initialIsFeatured]);


    useDidMountEffect(async () => {
        console.log('selectIsFeaturedToggleHandler -> isFeaturedSelectRef.current.checked: ', isFeaturedSelectRef.current.checked);
        console.log('selectIsFeaturedToggleHandler -> isFeaturedState: ', isFeaturedState);
        await router.replace(filteredPath(yearState, monthState, isFeaturedState));
    }, [yearState, monthState, isFeaturedState]);

    const submitFormHandler = async (event) => {
        event.preventDefault();
        await router.replace(filteredPath(yearState, monthState, isFeaturedState));
    };

    const selectYearChangeHandler = async (event) => {
        const year = event.target.value;
        setYearState(year);
    };

    const selectMonthChangeHandler = async (event) => {
        const month = event.target.value;
        setMonthState(month);
    };

    const selectIsFeaturedHandler = async (event) => {
        const isFeatured = event.target.checked;
        console.log('selectIsFeaturedHandler -> event.target.checked: ', event.target.checked);
        console.log('selectIsFeaturedHandler -> isFeaturedSelectRef.current.checked: ', isFeaturedSelectRef.current.checked);
        setIsFeaturedState(isFeatured);
    };

    const selectIsFeaturedToggleHandler = async (event) => {
        // const isFeatured = isFeaturedSelectRef.current.checked; // It is the opposite, as the UI has not re-rendered yet
        setIsFeaturedState(prevState => !prevState);
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
                        onChange={selectMonthChangeHandler}
                    >
                        {monthsSelectOptions}
                    </select>
                </div>

                <div className={styles.control}>
                    <label htmlFor="isFeatured">Featured</label>
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    id="isFeatured"*/}
                    {/*    name="isFeatured"*/}
                    {/*    // value={isFeaturedState}*/}
                    {/*    checked={isFeaturedState}*/}
                    {/*    onChange={selectIsFeaturedHandler}*/}
                    {/*    // onChange={selectIsFeaturedToggleHandler}*/}
                    {/*/>*/}
                    <CheckBox
                        id="isFeatured"
                        name="isFeatured"
                        checked={isFeaturedState}
                        onClick={selectIsFeaturedToggleHandler}
                        ref={isFeaturedSelectRef}
                    />
                </div>

                {/*<button type={'submit'}>Search</button>*/}
            </div>
        </form>
    );
};

export default EventsSearch;