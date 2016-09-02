class Checker {
    static getProperValueObj(obj, fieldName) {
        if (obj) {
            return obj[fieldName];
        }
        return "";
    }

    static getProperValue(value) {
        if (value) {
            return value;
        }
        return '';
    }
}

module.exports = Checker;