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

    static checkDropDownValue(value) {
        if (value == -1) {
            return null;
        }
        return value;
    }

}

module.exports = Checker;