export const isNotEmpty = (value) => {
    return value.trim() !== '';
};

export function isValidEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
}

export function isValidUSAZipCode(zipcode) {
    const regexp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return regexp.test(zipcode);
}

export function isValidPhoneNumber(phoneNumber) {
    // const regexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const regexp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return regexp.test(phoneNumber);
}

export function isOnlyNumbers(value) {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(value);
}

export function isBoolean(value) {
    return (value.toLowerCase() === 'true' || value.toLowerCase() === 'false');
}
