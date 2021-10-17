import {Fragment, useEffect} from "react";
// import {NavLink} from "react-router-dom";
import {useRouter} from "next/router";

import styles from './../styles/404.module.css';


const Error404 = () => {
    const router = useRouter();

    const goToHome = () => {
        router.push('/events').then(r => {
        });
    };

    function drawVisor() {
        const canvas = document.getElementById('visor');
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(5, 45);
        ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

        ctx.lineTo(55, 20);
        ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

        ctx.lineTo(15, 10);

        ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
        ctx.lineTo(5, 45);

        ctx.fillStyle = '#2f3640';
        ctx.strokeStyle = '#f5f6fa';
        ctx.fill();
        ctx.stroke();
    }

    useEffect(() => {
        const cordCanvas = document.getElementById('cord');
        const ctx = cordCanvas.getContext('2d');

        let y1 = 160;
        let y2 = 100;
        let y3 = 100;

        let y1Forward = true;
        let y2Forward = false;
        let y3Forward = true;

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            ctx.beginPath();
            ctx.moveTo(130, 170);
            ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

            ctx.strokeStyle = 'white';
            ctx.lineWidth = 8;
            ctx.stroke();


            if (y1 === 100) {
                y1Forward = true;
            }

            if (y1 === 300) {
                y1Forward = false;
            }

            if (y2 === 100) {
                y2Forward = true;
            }

            if (y2 === 310) {
                y2Forward = false;
            }

            if (y3 === 100) {
                y3Forward = true;
            }

            if (y3 === 317) {
                y3Forward = false;
            }

            y1Forward ? y1 += 1 : y1 -= 1;
            y2Forward ? y2 += 1 : y2 -= 1;
            y3Forward ? y3 += 1 : y3 -= 1;
        }

        animate();
        drawVisor();
        // React only?
        document.body.classList.add(styles.BodyClass);
        // document.body.classList.add('BodyClass');

        // Next.js way: Not working
        // document.querySelector("body").classList.add(styles.BodyClass);
        // document.querySelector("body").classList.add('BodyClass');


        return () => {
            document.body.classList.remove(styles.BodyClass);
            // document.querySelector("body").classList.remove(styles.BodyClass);
        };
    }, []);

    return (
        <Fragment>
            <div className={styles.Moon}/>
            <div className={`${styles.MoonCrater} ${styles.MoonCrater1}`}/>
            <div className={`${styles.MoonCrater} ${styles.MoonCrater2}`}/>
            <div className={`${styles.MoonCrater} ${styles.MoonCrater3}`}/>

            <div className={`${styles.Star} ${styles.Star1}`}/>
            <div className={`${styles.Star} ${styles.Star2}`}/>
            <div className={`${styles.Star} ${styles.Star3}`}/>
            <div className={`${styles.Star} ${styles.Star4}`}/>
            <div className={`${styles.Star} ${styles.Star5}`}/>

            <div className={`${styles.Error}`}>
                <div className={`${styles.ErrorTitle}`}>404</div>
                <div className={`${styles.ErrorSubtitle}`}>Hmmm...</div>
                <div className={`${styles.ErrorDescription}`}>It looks like one of the developers fell asleep</div>
                {/*<button className={`${styles.ErrorButton} ${styles.ErrorButtonActive}`}>LOGIN</button>*/}
                {/*<NavLink className={`${styles.ErrorButton} ${styles.ErrorButtonActive}`} to="/auth">LOGIN</NavLink>*/}
                <button className={`${styles.ErrorButton} ${styles.ErrorButtonActive}`} onClick={goToHome}>LOGIN</button>

                {/*<button className={`${styles.ErrorButton}`} onClick={()=>{}}>HOME</button>*/}
                {/*<NavLink className={`${styles.ErrorButton}`} to="/">HOME</NavLink>*/}
                <button className={`${styles.ErrorButton}`} onClick={goToHome}>HOME</button>
                <button style={{opacity: 0, cursor: 'default'}} className={`${styles.ErrorButton} ${styles.ErrorButtonActive}`}>REFILL BUTTON</button>
            </div>

            <div className={`${styles.Astronaut}`}>
                <div className={`${styles.AstronautBackpack}`}/>
                <div className={`${styles.AstronautBody} `}/>
                <div className={`${styles.AstronautBodyChest}`}/>
                <div className={`${styles.AstronautArmLeft1}`}/>
                <div className={`${styles.AstronautArmLeft2}`}/>
                <div className={`${styles.AstronautArmRight1}`}/>
                <div className={`${styles.AstronautArmRight2}`}/>
                <div className={`${styles.AstronautArmThumbLeft}`}/>
                <div className={`${styles.AstronautArmThumbRight}`}/>
                <div className={`${styles.AstronautLegLeft}`}/>
                <div className={`${styles.AstronautLegRight}`}/>
                <div className={`${styles.AstronautFootLeft}`}/>
                <div className={`${styles.AstronautFootRight}`}/>
                <div className={`${styles.AstronautWristLeft}`}/>
                <div className={`${styles.AstronautWristRight}`}/>

                <div className="astronaut__cord">
                    <canvas id="cord" height="500px" width="500px"/>
                </div>

                <div className={`${styles.AstronautHead}`}>
                    <canvas id="visor" width="60px" height="60px"/>
                    <div className={`${styles.AstronautHeadVisorFlare1}`}/>
                    <div className={`${styles.AstronautHeadVisorFlare2}`}/>
                </div>
            </div>
        </Fragment>
    );
};

export default Error404;