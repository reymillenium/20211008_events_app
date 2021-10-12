import styles from './FooterClassic.module.css';


const FooterClassic = () => {

    const addAnimationClassHandler = (event) => {
        // setTimeout(function () {
        //     event.target.classList.add("animated-hover");
        // }, 2500);
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
        <div className={styles.Container}>
            <div className={styles.Wrapper}>
                <div className={styles.Row}>
                    <div className={styles.Column}>
                        <p className={styles.Title}>About Us</p>
                        <a className={styles.Link} href="#">Story</a>
                        <a className={styles.Link} href="#">Clients</a>
                        <a className={styles.Link} href="#">Testimonials</a>
                    </div>
                    <div className={styles.Column}>
                        <p className={styles.Title}>Services</p>
                        <a className={styles.Link} href="#">Marketing</a>
                        <a className={styles.Link} href="#">Consulting</a>
                        <a className={styles.Link} href="#">Development</a>
                        <a className={styles.Link} href="#">Design</a>
                    </div>
                    <div className={styles.Column}>
                        <p className={styles.Title}>Contact Us</p>
                        <a className={styles.Link} href="#">United States</a>
                        <a className={styles.Link} href="#">United Kingdom</a>
                        <a className={styles.Link} href="#">Australia</a>
                        <a className={styles.Link} href="#">Support</a>
                    </div>

                    <div className={styles.Column}>
                        <p className={styles.Title}>Social</p>

                        <a className={styles.Link + ' faa-parent animated-hover'} href="#" onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                            <i className={styles.Icon + " fab fa-facebook-f faa-ring faa-slow"}/>Facebook
                        </a>

                        <a className={styles.Link + ' faa-parent animated-hover'} href="#" onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                            <i className={styles.Icon + " fab fa-instagram faa-pulse faa-fast"}/>Instagram
                        </a>

                        <a className={styles.Link + ' faa-parent animated-hover'} href="#" onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                            <i className={styles.Icon + " fab fa-youtube faa-tada faa-fast"}/>Youtube
                        </a>

                        <a className={styles.Link + ' faa-parent animated-hover'} href="#" onMouseEnter={removeAnimationClassHandler} onMouseLeave={addAnimationClassHandler}>
                            <i className={styles.Icon + " fab fa-twitter faa-wrench faa-fast"}/>Twitter
                        </a>
                    </div>
                </div>
            </div>
            {/*<div className={styles.box}>*/}
            {/*    <h2>Demo: Button Link with Rubber Band Animation on Hover</h2>*/}
            {/*    <a href="#" className={styles.buttonD}>Button</a>*/}
            {/*</div>*/}
        </div>
    );
};

export default FooterClassic;
