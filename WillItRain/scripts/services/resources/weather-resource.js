'use strict';

willItRainApp.factory('WeatherResource', function ($http, baseUrl, $resource, metricSystemService, languageService) {
    var baseServiceUrl = baseUrl + '/data/2.5';
    var locationsServiceUrl = baseServiceUrl + '/find?lat=:lat&lon=:lon&units=:units&lang=:lang';
    var locationServiceUrl = baseServiceUrl + '/weather?lat=:lat&lon=:lon&units=:units&lang=:lang';
    var cityServiceEndPoint = baseServiceUrl + '/weather?id=:id&units=:units&lang=:lang';
    var citySearchEndPoint = baseServiceUrl + '/weather?q=:cityName&lang=:lang';

    var CityService = $resource(cityServiceEndPoint, null, {
        'byId': { method: 'GET', params: { id: '@id', units: '@units', lang: '@lang' }, isArray: false }
    });

    var CitySearch = $resource(citySearchEndPoint, null, {
        'byCityName': { method: 'GET', params: { cityName: '@cityName', units: '@units',  lang: '@lang' }, isArray: false }
    });

    var LocationsService = $resource(locationsServiceUrl, null, {
        'byLocation': { method: 'GET', params: { lat: '@lat', lon: '@lon', units: '@units',  lang: '@lang' }, isArray: false }
    });

    var LocationService = $resource(locationServiceUrl, null, {
        'byLocation': { method: 'GET', params: { lat: '@lat', lon: '@lon', units: '@units',  lang: '@lang' }, isArray: false }
    });


    function getCityById(id) {
        return CityService.byId({id: id, units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode});
    }

    function getWeatherByCoordinates(query) {
        return LocationsService.byLocation({lat: query.lat, lon: query.lon,
            units: metricSystemService.getMetrics(), lang: languageService.getCurrentLanguage().languageCode})
    }

    function getWeatherByCityName(cityName) {
        return CitySearch.byCityName({cityName: cityName, units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode})
    }

    return{
        getWeatherByCityName: getWeatherByCityName,
        getWeatherByCoordinates: getWeatherByCoordinates,
        getCityById: getCityById
    }
});