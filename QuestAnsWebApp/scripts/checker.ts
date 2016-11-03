export class Checker {
    public static getProperValueObj(obj: any, fieldName: string): any {
        if (obj) {
            return obj[fieldName];
        }
        return "";
    }

    public static getProperValue(value: any): any {
        if (value) {
            return value;
        }
        return '';
    }

    public static checkDropDownValue(value: number): number | null {
        if (value == -1) {
            return null;
        }
        return value;
    }

}