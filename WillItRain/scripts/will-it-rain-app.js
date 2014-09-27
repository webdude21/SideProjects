'use strict';

var willItRainApp = angular
    .module('willItRainApp', ['ngResource', 'ngRoute', 'ngCookies', 'ngSanitize'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templates/home.html'
            })
            .when('/location-detail/:id', {
                templateUrl: 'templates/location-detail.html',
                controller: 'LocationDetailsController'
            })
            .otherwise({redirectTo: '/home'});
    })
    .value('toastr', toastr)
    .constant('baseUrl', 'http://api.openweathermap.org')
    .constant('apiKey', 'fa4627a3aaca41ff61307225bd25c419')
    .constant('author', 'Webdude')
    .constant('appName', 'TicTacToe')
    .constant('authorLink', 'http://webdude.eu')
    .constant('appTitle', 'Will it Rain?');