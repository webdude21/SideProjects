'use strict';
photoChallengeApp.factory('dataProvider', function () {
    var appId = 'CVFCJEo18KfSQfZQLAqORiMmudofkPJBUXs4K2MO';
    var jsKey = 'U0aaCJempusTAu2OovjXONHVByIa062S6T9KdjHI';
    Parse.initialize(appId, jsKey);
    var localSetting = 'bg-BG';

    var photoAppOwner = 'KPGaT826oM';
    var ParticipantClass = Parse.Object.extend("Participant");

    var ParticipantsCollection = Parse.Collection.extend({
        model: ParticipantClass
    });

    function getAllParticipants(success, error) {
        var participantsCollection = new ParticipantsCollection();
        participantsCollection.fetch()
            .then(function (collection) {
                var convertedCollection = [];
                collection.forEach(function (participant){
                    convertedCollection.push(convertParticipant(participant));
                });
                success(convertedCollection);
            }, error);
    }

    function getParticipantById(id, success, error) {
        var participantQuery = new Parse.Query(ParticipantClass);
        participantQuery.get(id, function(participant){
            success(convertParticipant(participant));
        }, error);
    }

    function convertToCloudObject(image, participant) {
        var parseFile = new Parse.File(image.name, { 'base64': image.file.substring(22) });
        parseFile.save().then();
        var newParticipant = new ParticipantClass();
        newParticipant.set('name', participant.name);
        newParticipant.set('birthDate', participant.birthDate);
        newParticipant.set('parentName', participant.parentName);
        newParticipant.set('parentEmail', participant.parentEmail);
        newParticipant.set('comment', participant.comment);
        newParticipant.set('votes', 0);
        newParticipant.set('approved', true);
        newParticipant.set('image', parseFile);
        return newParticipant;
    }

    function convertParticipant(modelParticipant) {
        var convertedParticipant = modelParticipant.attributes;
        convertedParticipant.id = modelParticipant.id;
        convertedParticipant.createdAt = modelParticipant.createdAt.toLocaleString(localSetting);
        convertedParticipant.updatedAt = modelParticipant.updatedAt.toLocaleString(localSetting);
        convertedParticipant.image = modelParticipant.attributes.image.url();
        return convertedParticipant;
    }

    function saveParticipant(participant, image, success, error) {
        var newParticipant = convertToCloudObject(image, participant);
        newParticipant.save(null, {
            success: success,
            error: error
        });
    }

    function getAppInfo(success, error) {
        var appInfo = Parse.Object.extend('AppInfo');
        var query = new Parse.Query(appInfo);
        query.get(photoAppOwner)
            .then(function (result) {
                success(result.attributes);
            }, error);
    }

    function loginUser(user, success, error) {
        Parse.User.logIn(user.name, user.password, {
            success: success,
            error: error
        });
    }

    function incrementVotes(participant) {
        var currentParticipant = new Parse.Query(ParticipantClass);
        currentParticipant.get(participant.id, function (serverParticipant) {
                serverParticipant.increment('votes');
                serverParticipant.save();
            },
            function () {
                console.warn("No such object found!")
            });
    }

    function toggleApproval(participant, success) {
        var currentParticipant = new Parse.Query(ParticipantClass);
        currentParticipant.get(participant.id, function (serverParticipant) {
                var approvalStatus = serverParticipant.get('approved');
                serverParticipant.set('approved', !approvalStatus);
                serverParticipant.save();
                success();
            },
            function () {
                console.warn('No such object found!')
            });
    }

    function checkIfUserAlreadyLoggedIn() {
        return Parse.User.current();
    }

    function logout() {
        Parse.User.logOut();
    }

    return {
        getAppInfo: getAppInfo,
        getAllParticipants: getAllParticipants,
        saveParticipant: saveParticipant,
        loginUser: loginUser,
        checkIfUserAlreadyLoggedIn: checkIfUserAlreadyLoggedIn,
        logout: logout,
        incrementVotes: incrementVotes,
        toggleApproval: toggleApproval,
        getParticipantById: getParticipantById
    }
});