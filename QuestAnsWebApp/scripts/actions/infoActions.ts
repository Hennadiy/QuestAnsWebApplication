import { ajax } from '../ajax';
import * as $ from 'jquery';

export class InfoActions {
    private readonly  INFO_CONTROLLER_NAME: string = "info";

    public getCountries(): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.get(this.INFO_CONTROLLER_NAME, 'GetCountries', null, true, (countries) => {
            defer.resolve(countries)
        }, null);

        return defer.promise();
    }

    public getCities(countryId: number): JQueryPromise<{}> {
        var defer = $.Deferred();

        ajax.get(this.INFO_CONTROLLER_NAME, 'GetCities', { countryId: countryId }, true, (cities) => {
            defer.resolve(cities)
        }, null);

        return defer.promise();
    }
}

export let infoActions = new InfoActions();