'use strict';

willItRainApp.controller('HomeController',
    function HomeController($scope, WeatherResource, notifier, metricSystemService) {

        $scope.metric = { degrees: metricSystemService.getDegrees() };

        // returns just one location
        $scope.findLocationByCityName = function (searchQuery) {
            $scope.searchResults = {
                list: [WeatherResource.getWeatherByCityName(searchQuery)]
            };
        };

        function validCoordinates(searchQuery) {
            if (!searchQuery.lat || !searchQuery.lon) {
                return false;
            }

            if (isNaN(searchQuery.lat) || isNaN(searchQuery.lon)) {
                return false;
            }

            if (searchQuery.lat >= 90 || searchQuery.lat <= -90) {
                return false;
            }

            if (searchQuery.lon >= 180 || searchQuery.lon <= -180) {
                return false;
            }
            return true
        }

        // returns a collection of locations
        $scope.findLocationByCoordinates = function (searchQuery) {
            if (!validCoordinates(searchQuery)) {
                notifier.error("Please enter valid coordinates! Latitude between -90 " +
                    "and 90 degrees and longitude between -180 and 180 degrees");
                return;
            }
            $scope.searchResults = WeatherResource.getWeatherByCoordinates(searchQuery);
        }

    });
