'use strict';

willItRainApp.controller('PageController',
    function PageController($scope, metricSystemService, author, appTitle, authorLink, languageService) {
        $scope.author = author;
        $scope.authorLink = authorLink;
        $scope.appTitle = appTitle;
        $scope.languagesList = languageService.languagesList;
        $scope.setCurrentLanguage = languageService.setCurrentLanguage;
        $scope.getCurrentLanguage = languageService.getCurrentLanguage;
        $scope.getCurrentMetric = metricSystemService.getMetricsTitle;
        $scope.setMetrics = metricSystemService.setMetrics;
    }
);