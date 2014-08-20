'use strict';

photoChallengeApp.controller('ParticipantsController',
    function ParticipantsController($scope, $route, dataProvider, localStore, $log) {

        $scope.participants = [];
        var appName = 'DivaStorePhotoChallenge';

        $scope.loggedInAdmin = dataProvider.checkIfUserAlreadyLoggedIn();

        if (localStore.loadSessionData(appName).userHasVoted) {
            $scope.isDisabled = true;
        }

        var alignGallery = function () {
            var $galleryContainer = $('#participants');
            $galleryContainer.masonry({
                itemSelector: '.item'
            });

            $galleryContainer.imagesLoaded(function () {
                $galleryContainer.masonry();
            })
        };

        $scope.toggleApproval = function (participant) {
            dataProvider.toggleApproval(participant, function () {
                $route.reload();
            });
        };

        $scope.voteUp = function (participant) {
            $scope.isDisabled = true;

            if (participant.votes) {
                participant.votes += 1;
            } else {
                participant.votes = 1;
            }

            dataProvider.incrementVotes(participant);
            localStore.saveSession({
                userHasVoted: true
            }, appName)
        };

        dataProvider.getAllParticipants(function (participantsCollection) {
            $scope.participants = participantsCollection;
            $scope.$apply();
            alignGallery();
        }, function (data) {
            $log.error(data);
        });
    });