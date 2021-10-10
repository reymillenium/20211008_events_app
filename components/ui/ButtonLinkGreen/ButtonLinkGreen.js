import Link from "next/link";
import styles from "./ButtonLinkGreen.module.css";

const ButtonLinkGreen = (props) => {

    const addAnimationClassHandler = (event) => {
        // event.target.classList.add("animated-hover");
        event.target.classList.toggle("animated-hover");
    };

    const removeAnimationClassHandler = (event) => {
        setTimeout(function () {
            // event.target.classList.remove("animated-hover");
            event.target.classList.toggle("animated-hover");
        }, 1000);
    };

    return (
        <Link href={props.path}>
            {/*<div className={styles.actionsDetailsBtnRow + ' faa-parent animated-hover'} onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>*/}
            {/*    <span className={"faa-ring faa-slow"}><i style={{marginTop: 4}} className={"fas fa-search"}/></span>*/}
            {/*    <span>&nbsp;&nbsp;Details</span>*/}
            {/*</div>*/}

            <a className={styles.btn + ' faa-parent animated-hover'} onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                {/*<span className={"faa-ring faa-slow"}><i style={{marginTop: 4}} className={"fas fa-search"}/></span>*/}
                <span>&nbsp;&nbsp;{props.children}</span>
            </a>
        </Link>
    );
};

export default ButtonLinkGreen;