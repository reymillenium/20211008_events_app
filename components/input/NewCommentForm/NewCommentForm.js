import styles from './NewCommentForm.module.css';
import {useRef, useState} from 'react';
import useInputReducer from "../../../hooks/use-input-reducer";
import * as validators from '../../../tools/validators';

function NewCommentForm(props) {
    const {
        valueState: emailState,
        setValueIsTouchedState: setEmailIsTouchedState,
        valueIsValidState: emailIsValidState, valueInputIsInvalid: emailInputIsInvalid,
        valueInputChangeHandler: emailInputChangeHandler,
        // valueInputBlurHandler: emailInputBlurHandler,
        resetValueInput: resetEmailInput,
    } = useInputReducer(validators.emailValidator);

    const {
        valueState: nameState,
        setValueIsTouchedState: setNameIsTouchedState,
        valueIsValidState: nameIsValidState, valueInputIsInvalid: nameInputIsInvalid,
        valueInputChangeHandler: nameInputChangeHandler,
        // valueInputBlurHandler: nameInputBlurHandler,
        resetValueInput: resetNameInput,
    } = useInputReducer(validators.nameValidator);

    const {
        valueState: textState,
        setValueIsTouchedState: setTextIsTouchedState,
        valueIsValidState: textIsValidState, valueInputIsInvalid: textInputIsInvalid,
        valueInputChangeHandler: textInputChangeHandler,
        // valueInputBlurHandler: textInputBlurHandler,
        resetValueInput: resetTextInput,
    } = useInputReducer(validators.nameValidator);

    const formIsValid = (emailIsValidState && nameIsValidState && textIsValidState);
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const textInputRef = useRef();

    function formSubmitHandler(event) {
        event.preventDefault();
        setEmailIsTouchedState(true);
        setNameIsTouchedState(true);
        setTextIsTouchedState(true);
        emailInputRef.current.focus();

        if (!formIsValid) {
            setProperFocus();
            return;
        }
        // console.log('Submitted!. I did something!!');
        const commentData = {
            eventId: props.eventId,
            email: emailState,
            name: nameState,
            text: textState,
        };

        props.onAddComment(commentData);

        resetEmailInput();
        resetNameInput();
        resetTextInput();
    }

    const setProperFocus = () => {
        if (emailInputIsInvalid) {
            emailInputRef.current.focus();
        } else if (nameInputIsInvalid) {
            nameInputRef.current.focus();
        } else if (textInputIsInvalid) {
            textInputRef.current.focus();
        }
    }

    const emailValidityClasses = `${styles.control} ${emailInputIsInvalid ? styles.invalid : ''}`;
    const nameValidityClasses = `${styles.control} ${nameInputIsInvalid ? styles.invalid : ''}`;
    const textValidityClasses = `${styles.control} ${textInputIsInvalid ? styles.invalid : ''}`;

    return (
        <form className={styles.form} onSubmit={formSubmitHandler}>
            <div className={styles.row}>
                <div className={emailValidityClasses}>
                    <label htmlFor='email'>Your email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        ref={emailInputRef}
                        value={emailState}
                        onChange={emailInputChangeHandler}
                        // onBlur={emailInputBlurHandler}
                    />
                    {emailInputIsInvalid ? <p className={styles.ErrorText}>The Email must be valid.</p> : <p>&nbsp;</p>}
                </div>


                <div className={nameValidityClasses}>
                    <label htmlFor='name'>Your name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        ref={nameInputRef}
                        value={nameState}
                        onChange={nameInputChangeHandler}
                        // onBlur={nameInputBlurHandler}
                    />
                    {nameInputIsInvalid ? <p className={styles.ErrorText}>The Name must be valid.</p> : <p>&nbsp;</p>}
                </div>
            </div>

            <div className={textValidityClasses}>
                <label htmlFor='comment'>Your comment</label>
                <textarea
                    id='comment'
                    name='comment'
                    rows='5'
                    ref={textInputRef}
                    value={textState}
                    onChange={textInputChangeHandler}
                    // onBlur={textInputBlurHandler}
                />
            </div>

            {/*{isInvalid && <p>Please enter a valid email address and comment!</p>}*/}
            <button>Submit</button>
        </form>
    );
}

export default NewCommentForm;
