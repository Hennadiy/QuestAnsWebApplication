export class StringHelper{
    public static startsWith(str: string, search: string): boolean {
        return str.substr(0, search.length) === search;
    }
}