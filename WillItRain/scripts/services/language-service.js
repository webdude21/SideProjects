'use strict';
willItRainApp.factory('languageService', function () {
    var languages = [
        {
            languageFull: 'English',
            languageCode: 'en'
        },
        {
            languageFull: 'Russian',
            languageCode: 'ru'
        },
        {
            languageFull: 'Italian',
            languageCode: 'it'
        },
        {
            languageFull: 'Spanish',
            languageCode: 'es'
        },
        {
            languageFull: 'Ukrainian',
            languageCode: 'uk'
        },
        {
            languageFull: 'German',
            languageCode: 'de'
        },
        {
            languageFull: 'Portuguese',
            languageCode: 'pt'
        },
        {
            languageFull: 'Romanian',
            languageCode: 'rm'
        },
        {
            languageFull: 'Polish',
            languageCode: 'pl'
        },
        {
            languageFull: 'Finnish',
            languageCode: 'fi'
        },
        {
            languageFull: 'Dutch',
            languageCode: 'nl'
        },
        {
            languageFull: 'French',
            languageCode: 'fr'
        },
        {
            languageFull: 'Bulgarian',
            languageCode: 'bg'
        },
        {
            languageFull: 'Swedish',
            languageCode: 'sv'
        },
        {
            languageFull: 'Chinese Traditional',
            languageCode: 'zh_tw'
        },
        {
            languageFull: 'Chinese Simplified',
            languageCode: 'zh_cn'
        },
        {
            languageFull: 'Turkish',
            languageCode: 'tr'
        },
        {
            languageFull: 'Croatian',
            languageCode: 'hr'
        },
        {
            languageFull: 'Catalan',
            languageCode: 'ca'
        }
    ];

    var currentLanguage = languages[0]; // aka english

    function setCurrentLanguage(languageFull) {
        languages.forEach(function (lang) {
            if (lang.languageFull === languageFull) {
                currentLanguage = lang;
            }
        })
    }

    function getCurrentLanguage() {
        return currentLanguage;
    }


    return {
        languagesList: languages,
        setCurrentLanguage: setCurrentLanguage,
        getCurrentLanguage: getCurrentLanguage
    }

});