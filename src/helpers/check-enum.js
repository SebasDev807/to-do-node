export const isValidEnum = (value, array = []) => {

    if (!array.includes(value.toUpperCase())) {
        throw new Error(`Values allowed ${array}`);
    }

    return true;

};