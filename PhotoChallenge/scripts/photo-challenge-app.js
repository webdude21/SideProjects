'use strict';

var photoChallengeApp = angular
    .module('photoChallengeApp', ['ngRoute', 'ngSocial'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/about', {
                templateUrl: 'templates/about.html'
            })
            .when('/admin-login', {
                templateUrl: 'templates/admin-login.html'
            })
            .when('/admin', {
                templateUrl: 'templates/admin.html'
            })
            .when('/participate', {
                templateUrl: 'templates/participate.html'
            })
            .when('/participants', {
                templateUrl: 'templates/participants.html'
            })
            .when('/participant/:id', {
                templateUrl: 'templates/participant-detail.html'
            })
            .otherwise({redirectTo: '/participants'});
    })
    .run(function ($rootScope, $location, dataProvider) {
        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (!dataProvider.checkIfUserAlreadyLoggedIn() && next.templateUrl === 'templates/admin.html') {
                if (!(next.templateUrl === "templates/admin-login.html")) {
                    $location.path("/admin-login");
                }
            }
        });
    });