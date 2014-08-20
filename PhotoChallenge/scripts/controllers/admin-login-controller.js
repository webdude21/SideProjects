'use strict';

photoChallengeApp.controller('AdminLoginController',
    function AdminLoginController($scope, dataProvider, messageBox, $location) {
        $scope.user = {};
        var MESSAGE_BOX_SELECTOR = '#message-box';
        var USER_LOGIN_SUCCESS = 'Успешно влязохте в системата като ';

        $scope.loginUser = function (user) {
            dataProvider.loginUser(user, function (userData) {
                setTimeout(function () {
                    messageBox.success(USER_LOGIN_SUCCESS +
                        userData.attributes.username, MESSAGE_BOX_SELECTOR);
                }, 500);
                $scope.loggedInUser = userData.attributes.username;
                $location.path("/admin");
                $scope.reset();
            }, function (user, error) {
                messageBox.error(error.message, MESSAGE_BOX_SELECTOR)
            });
        };

        $scope.reset = function () {
            $scope.user = {};
            $scope.userLoginForm.$setPristine();
            $scope.$apply();
        };
    });
