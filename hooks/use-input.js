import {useState} from "react";

const useInput = (valueValidator) => {
    const [valueState, setValueState] = useState('');
    const [valueIsTouchedState, setValueIsTouchedState] = useState(false);

    const valueIsValidState = valueValidator(valueState);
    const valueInputIsInvalid = (!valueIsValidState && valueIsTouchedState);

    const valueInputChangeHandler = (event) => {
        setValueIsTouchedState(true);
        setValueState(event.target.value);
    };

    const valueInputBlurHandler = (event) => {
        setValueIsTouchedState(true);
        // setValueState(event.target.value);
    };

    const resetValueInput = () => {
        setValueState('');
        setValueIsTouchedState(false);
    };

    return {
        valueState,
        setValueState,
        setValueIsTouchedState,
        valueIsValidState,
        valueInputIsInvalid,
        valueInputChangeHandler,
        valueInputBlurHandler,
        resetValueInput,
    };
};

export default useInput;