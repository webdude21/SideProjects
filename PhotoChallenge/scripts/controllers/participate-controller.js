'use strict';

photoChallengeApp.controller('ParticipateController',
    function ParticipateController($scope, dataProvider, messageBox, imageResize) {

        $scope.participant = {};
        var exportImage = {};
        $scope.participant.currentlyUploading = false;
        var MESSAGE_BOX_SELECTOR = '#message-box';
        var validImage = false;
        var PARTICIPANT_SAVE_SUCCESS = 'Участника е записан успешно!';
        var PARTICIPANT_SAVE_ERROR = 'Възникна грешка при записването! ';
        var INVALID_IMAGE_ERROR = 'Моля уверете се, че сте избрали валидно ' +
            'изображение от следните формати (gif, jpg, jpeg, tiff, png)!';

        $scope.saveParticipant = function (participant, newParticipant) {
            if (newParticipant.$valid && validImage === true) {
                dataProvider.saveParticipant(participant, exportImage, function () {
                    messageBox.success(PARTICIPANT_SAVE_SUCCESS, MESSAGE_BOX_SELECTOR);
                    $scope.reset();
                }, function () {
                    messageBox.error(PARTICIPANT_SAVE_ERROR, MESSAGE_BOX_SELECTOR)
                });
            } else {
                messageBox.error(PARTICIPANT_SAVE_ERROR + INVALID_IMAGE_ERROR,
                    MESSAGE_BOX_SELECTOR)
            }
        };

        $scope.reset = function () {
            $scope.participant = {};
            $scope.newParticipantForm.$setPristine();
            $scope.$apply();
        };

        $scope.uploadFile = function (file) {
            exportImage.file = file;
            exportImage.name = file.name;
            var reader = new FileReader();
            var currentImage = new Image();
            reader.readAsDataURL(file);
            reader.addEventListener('load', function (_file) {
                currentImage.src = _file.target.result;
                currentImage.addEventListener('load', function () {
                    validImage = true;
                    currentImage.src = imageResize(this);
                    $scope.participant.image = currentImage.src;
                    exportImage.file = currentImage.src;
                    $scope.$apply();
                });
                currentImage.addEventListener('error', function () {
                    messageBox.error(INVALID_IMAGE_ERROR, MESSAGE_BOX_SELECTOR);
                    validImage = false
                });
            });
        };
    });