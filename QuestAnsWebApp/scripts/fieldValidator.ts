export class FieldValidator {
    private static readonly regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public static validateText(text: string, minLength: number, maxLength: number): Array<string> {
        let errors = new Array<string>();

        if (text.length < minLength) {
            errors.push("Required at least " + minLength + " symbols");
        }

        if (text.length > maxLength) {
            errors.push("Required no more than " + minLength + " symbols.");
        }

        return errors;
    }

    public static validatePassword(text, minLength, maxLength): Array<string> {
        var errors = this.validateText(text, minLength, maxLength);

        if (!this.hasLowerCase(text)) {
            errors.push("At least one character must be lower case.");
        }

        if (!this.hasUpperCase(text)) {
            errors.push("At least one character must be upper case.");
        }

        return errors;
    }

    public static isEqualPasswords(objA: any, objB: any): Array<string> {
        if (objA === objB) {
            return [];
        }

        return ["Passwords are not equal."];
    }

    public static validateEmail(email: string): Array<string> {

        if (this.regExp.test(email)) {
            return [];
        }

        return ["Not valid email address"];
    }

    public static hasErrors(errors: Array<string>): boolean {
        for (var f in errors) {
            if (errors[f].length > 0) {
                return true;
            }
        }

        return false;
    }

    public static hasLowerCase(str: string): boolean {
        return (/[a-z]/.test(str));
    }

    public static hasUpperCase(str: string): boolean {
        return (/[A-Z]/.test(str));
    }
}