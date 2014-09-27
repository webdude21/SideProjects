'use strict';

willItRainApp.controller('PageController',
    function PageController($scope, metricSystemService, author, appTitle, authorLink, languageService) {
        $scope.author = author;
        $scope.authorLink = authorLink;
        $scope.appTitle = appTitle;
        $scope.languagesList = languageService.languagesList;
        $scope.getCurrentLanguage = languageService.getCurrentLanguage;
        $scope.getCurrentMetric = metricSystemService.getMetricsTitle;

        $scope.setCurrentLanguage = function (lang){
            languageService.setCurrentLanguage(lang);
            location.reload();
        };

        $scope.setMetrics = function(metric){
            metricSystemService.setMetrics(metric);
            location.reload();
        };
    }
);