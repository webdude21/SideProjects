'use strict';

willItRainApp.factory('WeatherResource', function ($http, baseUrl, $resource, metricSystemService) {
    var baseServiceUrl = baseUrl + '/data/2.5';
    var locationsServiceUrl = baseServiceUrl + '/find?lat=:lat&lon=:lon&units=:units';
    var locationServiceUrl = baseServiceUrl + '/weather?lat=:lat&lon=:lon&units=:units';
    var cityServiceEndPoint = baseServiceUrl + '/weather?id=:id&units=:units';
    var citySearchEndPoint = baseServiceUrl + '/weather?q=:cityName';

    var CityService = $resource(cityServiceEndPoint, null, {
        'byId': { method: 'GET', params: { id: '@id', units: '@units' }, isArray: false }
    });

    var CitySearch = $resource(citySearchEndPoint, null, {
        'byCityName': { method: 'GET', params: { cityName: '@cityName', units: '@units' }, isArray: false }
    });

    var LocationsService = $resource(locationsServiceUrl, null, {
        'byLocation': { method: 'GET', params: { lat: '@lat', lon: '@lon', units: '@units' }, isArray: false }
    });

    var LocationService = $resource(locationServiceUrl, null, {
        'byLocation': { method: 'GET', params: { lat: '@lat', lon: '@lon', units: '@units' }, isArray: false }
    });


    function getCityById(id) {
        return CityService.byId({id: id, units: metricSystemService.getMetrics()});
    }

    function getWeatherByCoordinates(query) {
        return LocationsService.byLocation({lat: query.lat, lon: query.lon, units: metricSystemService.getMetrics()})
    }

    function getWeatherByCityName(cityName) {
        return CitySearch.byCityName({cityName: cityName, units: metricSystemService.getMetrics()})
    }

    return{
        getWeatherByCityName: getWeatherByCityName,
        getWeatherByCoordinates: getWeatherByCoordinates,
        getCityById: getCityById
    }
});