'use strict';
willItRainApp.factory('languageService', function () {
    var currentMetric = '°C Metric';
    var units = "metric";

    var setMetrics = function (currentUnits) {
        if (currentUnits === 'metric') {
            units = currentUnits;
            currentMetric = '°C Metric';
        } else {
            units = currentUnits;
            currentMetric = '°F Imperial';
        }
    };

    var getMetricsTitle = function () {
        return currentMetric;
    };

    var getMetrics = function () {
        return units;
    };

    var getDegrees = function () {
        return units === 'metric' ? '°C' : '°F';
    };

    return{
        setMetrics: setMetrics,
        getMetricsTitle: getMetricsTitle,
        getMetrics: getMetrics,
        getDegrees: getDegrees
    }
});