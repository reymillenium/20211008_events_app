import styles from './NewsletterRegistration.module.css';
import {useRef} from "react";
import generateRoutes from "../../../tools/generateRoutes";
import useInputReducer from "../../../hooks/use-input-reducer";
import * as validators from '../../../tools/validators';


function NewsletterRegistration() {
    const routes = generateRoutes();
    const newsletterSignupRoute = routes.api.newsletterSignupPath;

    const {
        valueState: emailState,
        setValueIsTouchedState: setEmailIsTouchedState,
        valueIsValidState: emailIsValidState, valueInputIsInvalid: emailInputIsInvalid,
        valueInputChangeHandler: emailInputChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        resetValueInput: resetEmailInput,
    } = useInputReducer(validators.emailValidator);

    const formIsValid = (emailIsValidState);
    const emailRef = useRef();

    const onAddNewsletterSubscriberHandler = async (newsletterSubscriberData) => {
        const response = await fetch(`${newsletterSignupRoute}`, {
            method: 'POST',
            body: JSON.stringify(newsletterSubscriberData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // const responseData = await response.json();
        // await router.replace(`${meetupsIndexPath}`);
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
