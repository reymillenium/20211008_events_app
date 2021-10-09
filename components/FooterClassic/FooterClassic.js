import styles from './FooterClassic.module.css';

const FooterClassic = () => {
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
                        <a className={styles.Link + ' faa-parent animated-hover'} href="#">
                            <i className={styles.Icon + " fab fa-facebook-f faa-wrench faa-slow"}/>Facebook
                        </a>
                        <a className={styles.Link} href="#"><i className={styles.Icon + " fab fa-instagram"}/>Instagram</a>
                        <a className={styles.Link} href="#"><i className={styles.Icon + " fab fa-youtube"}/>Youtube</a>
                        <a className={styles.Link} href="#"><i className={styles.Icon + " fab fa-twitter"}/>Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterClassic;
