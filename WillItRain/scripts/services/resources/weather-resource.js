'use strict';

willItRainApp.factory('WeatherResource', function ($http, baseUrl, apiKey, $resource, notifier, metricSystemService, languageService) {
    var baseServiceUrl = baseUrl + '/data/2.5';
    var locationsServiceUrl = baseServiceUrl + '/find?lat=:lat&lon=:lon&units=:units&lang=:lang&APPID=:APIKEY';
    var locationServiceUrl = baseServiceUrl + '/weather?lat=:lat&lon=:lon&units=:units&lang=:lang&APPID=:APIKEY';
    var cityServiceEndPoint = baseServiceUrl + '/weather?id=:id&units=:units&lang=:lang&APPID=:APIKEY';
    var citySearchEndPoint = baseServiceUrl + '/weather?q=:cityName&lang=:lang&APPID=:APIKEY';
    var cityForecastEndPoint = baseServiceUrl + '/forecast/weather?id=:id&units=:units&lang=:lang&APPID=:APIKEY';

    var handleSuccess = function (response) {
        notifier.success(response.cod);
    };

    var handleError = function (response) {
        notifier.error(response.error);
    };

    var CityService = $resource(cityServiceEndPoint, null, {
        'byId': {
            method: 'GET',
            params: { id: '@id', units: '@units', lang: '@lang', apiKey: '@APIKEY' },
            isArray: false
        }
    });

    var CitySearch = $resource(citySearchEndPoint, null, {
        'byCityName': {
            method: 'GET',
            params: { cityName: '@cityName', units: '@units', lang: '@lang', apiKey: '@APIKEY' },
            isArray: false
        }
    });

    var LocationsService = $resource(locationsServiceUrl, null, {
        'byLocation': {
            method: 'GET',
            params: { lat: '@lat', lon: '@lon', units: '@units', lang: '@lang', apiKey: '@APIKEY' },
            isArray: false
        }
    });

    var LocationService = $resource(locationServiceUrl, null, {
        'byLocation': {
            method: 'GET',
            params: { lat: '@lat', lon: '@lon', units: '@units', lang: '@lang', apiKey: '@APIKEY' },
            isArray: false
        }
    });

    var CityForecast = $resource(cityForecastEndPoint, null, {
        'byId': {
            method: 'GET',
            params: { id: '@id', units: '@units', lang: '@lang', apiKey: '@APIKEY' },
            isArray: false
        }
    });


    function getCityById(id) {
        return CityService.byId({
            id: id,
            units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode,
            apiKey: apiKey
        }, handleSuccess, handleError);
    }

    function getWeatherByCoordinates(cooridinates) {
        return LocationsService.byLocation({
            lat: cooridinates.lat,
            lon: cooridinates.lon,
            units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode,
            apiKey: apiKey
        }, handleSuccess, handleError)
    }

    function getWeatherByCityName(cityName) {
        return CitySearch.byCityName({
            cityName: cityName,
            units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode,
            apiKey: apiKey
        }, handleSuccess, handleError)
    }

    function getForeCastById(id) {
        return CityForecast.byId({
            id: id,
            units: metricSystemService.getMetrics(),
            lang: languageService.getCurrentLanguage().languageCode,
            apiKey: apiKey
        }, handleSuccess, handleError);
    }

    return{
        getWeatherByCityName: getWeatherByCityName,
        getWeatherByCoordinates: getWeatherByCoordinates,
        getCityById: getCityById,
        getForeCastById: getForeCastById
    }
});