'use strict';
willItRainApp.factory('languageService', function (appName, $cookieStore) {
    var cookieStorageLanguageSettings = appName + '_languageSettings';

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

    var defaultLanguage = languages[0]; // aka english

    function setCurrentLanguage(languageFull) {
        languages.forEach(function (lang) {
            if (lang.languageFull === languageFull) {
                $cookieStore.put(cookieStorageLanguageSettings, lang);
            }
        })
    }

    function getCurrentLanguage() {
        var savedLanguage = $cookieStore.get(cookieStorageLanguageSettings);
        if (savedLanguage) {
            return savedLanguage;
        }
        return defaultLanguage;
    }

    return {
        languagesList: languages,
        setCurrentLanguage: setCurrentLanguage,
        getCurrentLanguage: getCurrentLanguage
    }
});