'use strict';

willItRainApp.controller('LocationDetailsController',
    function LocationDetailsController($scope, $routeParams, $location, WeatherResource, metricSystemService) {
        $scope.item = WeatherResource.getCityById($routeParams.id);

        $scope.metric = {
            degrees: metricSystemService.getDegrees()
        };
    });