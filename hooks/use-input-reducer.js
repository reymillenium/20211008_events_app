import {useReducer} from "react";

const initialInputState = {
    valueState: '',
    valueIsTouchedState: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'SET_VALUE_IS_TOUCHED_STATE') {
        return {
            valueState: state.valueState,
            valueIsTouchedState: action.payload.valueIsTouchedState
        };
    }

    if (action.type === 'SET_VALUE_STATE') {
        return {
            valueState: action.payload.valueState,
            valueIsTouchedState: state.valueIsTouchedState
        };
    }

    return initialInputState;
};

const useInputReducer = (valueValidator) => {
    const [inputState, dispatchFunction] = useReducer(inputStateReducer, initialInputState);

    const valueIsValidState = valueValidator(inputState.valueState);
    const valueInputIsInvalid = (!valueIsValidState && inputState.valueIsTouchedState);

    const valueInputChangeHandler = (event) => {
        dispatchFunction({type: 'SET_VALUE_IS_TOUCHED_STATE', payload: {valueIsTouchedState: true}});
        dispatchFunction({type: 'SET_VALUE_STATE', payload: {valueState: event.target.value}});
    };

    const valueInputBlurHandler = (event) => {
        dispatchFunction({type: 'SET_VALUE_IS_TOUCHED_STATE', payload: {valueIsTouchedState: true}});
        // setValueState(event.target.value);
    };

    const setValueIsTouchedState = (value) => {
        dispatchFunction({type: 'SET_VALUE_IS_TOUCHED_STATE', payload: {valueIsTouchedState: value}});
    };

    const resetValueInput = () => {
        dispatchFunction({type: 'SET_VALUE_STATE', payload: {valueState: ''}});
        dispatchFunction({type: 'SET_VALUE_IS_TOUCHED_STATE', payload: {valueIsTouchedState: false}});
    };

    return {
        valueState: inputState.valueState,
        setValueIsTouchedState,
        valueIsValidState,
        valueInputIsInvalid,
        valueInputChangeHandler,
        valueInputBlurHandler,
        resetValueInput,
    };
};

export default useInputReducer;