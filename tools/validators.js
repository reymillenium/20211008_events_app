import {isNotEmpty, isValidEmail, isValidPhoneNumber, isValidUSAZipCode} from './utils';

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