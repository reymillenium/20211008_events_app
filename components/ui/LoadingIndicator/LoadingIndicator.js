import React from 'react';
import ReactLoading from 'react-loading';

const LoadingIndicator = (props) => {
    const {type, color} = props;
    return (
        <ReactLoading type={type} color={color || '#77002e'} height={10} width={40}/>
    );
};

export default LoadingIndicator;