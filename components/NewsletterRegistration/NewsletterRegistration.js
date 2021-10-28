import styles from './NewsletterRegistration.module.css';
import {useContext, useRef} from "react";
import generateRoutes from "../../tools/generateRoutes";
import useInputReducer from "../../hooks/use-input-reducer";
import * as validators from '../../tools/validators';
import {NotificationContext} from "../../store/notificationContext";


function NewsletterRegistration() {
    const routes = generateRoutes();
    const newsletterSignupRoute = routes.subscribers.api.createPath;
    const notificationContext = useContext(NotificationContext);
    const {showNotification, hideNotification} = notificationContext;

    const {
        valueState: emailState,
        setValueIsTouchedState: setEmailIsTouchedState,
        valueIsValidState: emailIsValidState, valueInputIsInvalid: emailInputIsInvalid,
        valueInputChangeHandler: emailInputChangeHandler,
        // valueInputBlurHandler: emailInputBlurHandler,
        resetValueInput: resetEmailInput,
    } = useInputReducer(validators.emailValidator);

    const formIsValid = (emailIsValidState);
    const emailRef = useRef();

    const onAddNewsletterSubscriberHandler = async (newsletterSubscriberData) => {
        showNotification({title: 'PENDING!', message: 'Adding the subscriber', status: 'pending'});
        const response = await fetch(`${newsletterSignupRoute}`, {
            method: 'POST',
            body: JSON.stringify(newsletterSubscriberData), // stringify converts to Json string
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        // console.log(responseData);
        const {message} = responseData;

        if (!response.ok) {
            setTimeout(function () {
                showNotification({title: 'OOPS!', message: message, status: 'error'});
                setTimeout(function () {
                    hideNotification();
                }, 1500);
            }, 500);
            return;
        }

        const {name} = responseData;
        setTimeout(function () {
            showNotification({title: `SUCCESS ${name}!`, message: message, status: 'success'});
            setTimeout(function () {
                hideNotification();
            }, 1500);
        }, 500);
    };

    async function submitFormHandler(event) {
        event.preventDefault();
        setEmailIsTouchedState(true);
        emailRef.current.focus();

        if (!formIsValid) {
            setProperFocus();
            return;
        }
        // console.log('Submitted!. I did something!!');
        const newsletterSubscriberData = {
            email: emailState,
        };
        await onAddNewsletterSubscriberHandler(newsletterSubscriberData);

        resetEmailInput();
    }

    const setProperFocus = () => {
        if (emailInputIsInvalid) {
            emailRef.current.focus();
        }
    }

    const emailValidityClasses = `${styles.control} ${emailInputIsInvalid ? styles.invalid : ''}`;

    return (
        <section className={styles.newsletter}>
            <h2>Sign up to stay updated!</h2>

            <form onSubmit={submitFormHandler}>
                <div className={emailValidityClasses}>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        autoFocus={true}
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailRef}
                        value={emailState}
                        onChange={emailInputChangeHandler}
                        // onBlur={emailInputBlurHandler}
                    />
                    <button disabled={!formIsValid}>Register</button>
                </div>
                {emailInputIsInvalid ? <p className={styles.ErrorText}>The Email must be valid.</p> : <p>&nbsp;</p>}
            </form>
        </section>
    );
}

export default NewsletterRegistration;
