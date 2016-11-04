import { StringHelper } from './stringHelper';

export class LocationHelper {
    public static checkLocation(checkRoot: boolean): boolean {
        let path = location.pathname.toLowerCase();
        if (path === "/" && checkRoot) {
            return true;
        }

        let locations = ["/login", "/register"];

        for (var i = 0; i < locations.length; i++) {
            if (StringHelper.startsWith(path, locations[i].toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}