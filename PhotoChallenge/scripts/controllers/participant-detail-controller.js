'use strict';

photoChallengeApp.controller('ParticipantDetailsController',
    function ParticipantDetailsController($scope, $routeParams, $location, dataProvider, messageBox) {
        var INVALID_PARTICIPANT_ID_MESSAGE = 'Не съществува такъв участник!';
        $scope.participant = {};
        dataProvider.getParticipantById($routeParams.id, function (participant) {
            $scope.participant = participant;
            $scope.participant.sharerLocation = $location.absUrl();
            $scope.$apply();
        }, messageBox.error(INVALID_PARTICIPANT_ID_MESSAGE));
    });