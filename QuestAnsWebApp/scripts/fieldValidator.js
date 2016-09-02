class FieldValidator {

    static validateText(text, minLength, maxLength) {
        var errors = [];

        if (text.length < minLength) {
            errors.push("Required at least " + minLength + " symbols");
        }

        if (text.length > maxLength) {
            errors.push("Required no more than " + minLength + " symbols.");
        }

        return errors;
    }

    static validatePassword(text, minLength, maxLength) {
        var errors = this.validateText(text, minLength, maxLength);

        if (!this.hasLowerCase(text)) {
            errors.push("At least one character must be lower case.");
        }

        if (!this.hasUpperCase(text)) {
            errors.push("At least one character must be upper case.");
        }

        return errors;
    }

    static isEqualPasswords(objA, objB) {
        if (objA === objB) {
            return [];
        }

        return ["Passwords are not equal."];
    }

    static validateEmail(email) {

        if (this.regExp.test(email)) {
            return [];
        }

        return ["Not valid email address"];
    }

    static hasErrors(errors) {
        for (var f in errors) {
            if (errors[f].length > 0) {
                return true;
            }
        }

        return false;
    }

    static hasLowerCase(str) {
        return (/[a-z]/.test(str));
    }

    static hasUpperCase(str) {
        return (/[A-Z]/.test(str));
    }
}

FieldValidator.regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = FieldValidator;