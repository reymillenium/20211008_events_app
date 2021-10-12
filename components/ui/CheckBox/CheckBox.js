import React, {Fragment} from "react";
import styles from './CheckBox.module.css';

const CheckBox = React.forwardRef((props, ref) => {
    const {onClick, ...restProps} = props;

    return (
        <Fragment>
            <span className={styles.checkbox}>
                <input type="checkbox" ref={ref} {...restProps} onChange={() => {
                }}/>
                <span className={styles.wrapper} onClick={onClick}>
                    <span className={styles.knob}/>
                </span>
            </span>
        </Fragment>
    );
});

CheckBox.displayName = "CheckBox";
export default CheckBox;