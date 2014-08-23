'use strict';

photoChallengeApp.controller('AdminController',
    function AdminController($scope, dataProvider, messageBox, $location, $log) {

        $scope.logout = function () {
            dataProvider.logout();
            $location.path('/admin-login');
        };

        $scope.participants = [];

        dataProvider.getAllParticipants(function (participantsCollection) {
            $scope.participants = participantsCollection;
            $scope.$apply();
        }, function (data) {
            $log.warn('Could not get participants from server!' + data);
        });
    });
