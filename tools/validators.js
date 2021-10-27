import {isNotEmpty, isValidEmail, isValidPhoneNumber, isValidUSAZipCode, isBoolean} from './utils';

export const nameValidator = (value) => {
    return isNotEmpty(value);
};

export const emailValidator = (value) => {
    return (isNotEmpty(value) && isValidEmail(value));
};

export const zipcodeValidator = (value) => {
    return isNotEmpty(value) && isValidUSAZipCode(value);
};

export const phoneNumberValidator = (value) => {
    return isNotEmpty(value) && isValidPhoneNumber(value);
};

export const booleanValidator = (value) => {
    return isNotEmpty(value) && isBoolean(value);
};

export const booleanInclusiveValidator = (value) => {
    return isNotEmpty(value) && (isBoolean(value) || value.toLowerCase() === 'all');
};

export const dateValidator = (value) => {
    return isNotEmpty(value);
};

export const imageUrlValidator = (value) => {
    return isNotEmpty(value);
};