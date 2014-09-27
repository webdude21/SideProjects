'use strict';
willItRainApp.factory('metricSystemService', function (appName, $cookieStore) {
    var defaultMetricSystem = {
        currentMetric: '°C Metric',
        units: 'metric'
    };

    var savedMetricSystem;

    var cookieStorageMetricSystemSettings = appName + '_metricSettings';

    var setMetrics = function (currentUnits) {
        if (currentUnits === 'metric') {
            savedMetricSystem = {
                currentMetric: '°C Metric',
                units: currentUnits
            };
        } else {
            savedMetricSystem = {
                currentMetric: '°F Imperial',
                units: currentUnits
            };
        }
        $cookieStore.put(cookieStorageMetricSystemSettings, savedMetricSystem);
    };

    function getSettingsFromCookies(){
        savedMetricSystem = $cookieStore.get(cookieStorageMetricSystemSettings);
    }

    var getMetricsTitle = function () {
        getSettingsFromCookies();
        if (savedMetricSystem) {
            return savedMetricSystem.currentMetric;
        }
        return defaultMetricSystem.currentMetric;
    };

    var getMetrics = function () {
        getSettingsFromCookies();
        if (savedMetricSystem) {
            return savedMetricSystem.units;
        }
        return defaultMetricSystem.units;
    };

    var getDegrees = function () {
        getSettingsFromCookies();
        if (savedMetricSystem) {
            return savedMetricSystem.units === 'metric' ? '°C' : '°F';
        }
        return defaultMetricSystem.units === 'metric' ? '°C' : '°F';
    };

    return{
        setMetrics: setMetrics,
        getMetricsTitle: getMetricsTitle,
        getMetrics: getMetrics,
        getDegrees: getDegrees
    }
});