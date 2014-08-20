'use strict';

photoChallengeApp.controller('PageController',
    function PageController($scope, dataProvider, $log) {
    dataProvider.getAppInfo(function (data) {
        $scope.appInfo = data;
        $scope.$apply();
    }, handleError);

    function handleError(err) {
        $log.warn(err);
    }
});