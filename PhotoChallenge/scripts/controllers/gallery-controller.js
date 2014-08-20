'use strict';

photoChallengeApp.controller('GalleryController',
    function GalleryController($scope, dataProvider, localStore, $route, $log) {

        $scope.participants = [];
        var appName = 'DivaStorePhotoChallenge';

        $scope.loggedInAdmin = dataProvider.checkIfUserAlreadyLoggedIn();

        if (localStore.loadSessionData(appName).userHasVoted) {
            $scope.isDisabled = true;
        }

        function manageCollection(participantsCollection) {
            participantsCollection.each(function (item) {
                var participant = item.attributes;
                participant.id = item.id;
                participant.image = item.attributes.image.url();
                $scope.participants.push(participant);
            });
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
            manageCollection(participantsCollection);
            $scope.$apply();
            alignGallery();
        }, function (data) {
            $log.error(data);
        });
    });