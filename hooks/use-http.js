import {useReducer, useCallback} from 'react';

function httpReducer(state, action) {
    if (action.type === 'SEND') {
        return {
            ...state,
            // data: null,
            error: null,
            status: 'pending',
        };
    }

    if (action.type === 'SUCCESS') {
        return {
            ...state,
            data: action.responseData,
            error: null,
            status: 'completed',
        };
    }

    if (action.type === 'ERROR') {
        return {
            ...state,
            data: null,
            error: action.errorMessage,
            status: 'completed',
        };
    }

    return state;
}

function useHttp(requestFunction, startWithPending = false, initialDataState = null) {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: startWithPending ? 'pending' : null,
        data: initialDataState,
        error: null,
    });

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({type: 'SEND'});
            try {
                const responseData = await requestFunction(requestData);
                dispatch({type: 'SUCCESS', responseData});
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    errorMessage: error.message || 'Something went wrong!',
                });
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        ...httpState,
    };
}

export default useHttp;
