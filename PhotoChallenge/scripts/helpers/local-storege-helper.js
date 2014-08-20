'use strict';
photoChallengeApp.factory('localStore', function () {
    var sessionData = {};

    function saveSession(data, appName) {
        sessionData = data;
        localStorage.setItem(appName, JSON.stringify(sessionData));
    }

    function clearSessionData(appName) {
        localStorage.removeItem(appName);
        sessionData = {};
    }

    function loadSessionData(appName) {
        var storage = localStorage.getItem(appName);
        if (storage) {
            sessionData = JSON.parse(storage);
        }

        return sessionData;
    }

    return {
        saveSession: saveSession,
        clearSessdionData: clearSessionData,
        loadSessionData: loadSessionData
    }
});