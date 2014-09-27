'use strict';

willItRainApp.controller('PageController',
    function PageController($scope, metricSystemService, author, appTitle, authorLink) {
        $scope.author = author;
        $scope.authorLink = authorLink;
        $scope.appTitle = appTitle;

        $scope.getCurrentMetric = metricSystemService.getMetricsTitle;
        $scope.setMetrics = metricSystemService.setMetrics;
    }
);