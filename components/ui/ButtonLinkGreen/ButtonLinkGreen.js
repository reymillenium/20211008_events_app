import Link from "next/link";
import styles from "./ButtonLinkGreen.module.css";
import ArrowRightIcon from "../../icons/arrow-right-icon";

const ButtonLinkGreen = (props) => {
    return (
        <Link href={props.path}>
            <a className={styles.btn}>
                {/*<span>&nbsp;&nbsp;{props.children}</span>*/}
                {/*<span className={styles.icon}><ArrowRightIcon/></span>*/}
                <span className={styles.icon}>{props.children}&nbsp;&nbsp;<ArrowRightIcon/></span>
            </a>
        </Link>
    );
};

export default ButtonLinkGreen;