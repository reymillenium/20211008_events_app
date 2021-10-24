import styles from './ResultsTitle.module.css';
import {DUMMY_MONTHS_DATA, getFilteredEvents} from "../../dummy-data";
import generateTitle from "../../tools/generateTitle";

function ResultsTitle(props) {
    const {yearStr, monthStr, isFeaturedStr} = props;
    const titleLabel = generateTitle(yearStr, monthStr, isFeaturedStr);

    return (
        <section className={styles.title}>
            <h1>{titleLabel}</h1>
        </section>
    );
}

export default ResultsTitle;
