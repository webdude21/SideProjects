module.exports = function (req, res, next){
    var request = require('request');
    var resultUsers = [];
    var graphUrls = [];
    var TIME_TO_WAIT_FOR_RESULT = 10;
    var finished = false;

    var makeGetRequest = function makeGetRequest(url, cookie, success) {
        request.get({
            url: url,
            headers: {
                'Cookie': 'datr=' + cookie + ';'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                resultUsers.push(result);
                console.log("Finished: " + resultUsers.length + " out of " + graphUrls.length);
            }
            if (error) {
                console.log(error);
            }

            if (resultUsers.length === graphUrls.length){
                success();
            }
        });
    };

    var getAccountIds = function getAccountIds(input, cookie, renderResult) {

        var graphURL;

        for (var index = 0; index < input.length; index++) {
            if (input[index].indexOf('facebook.com') > -1) {
                try {
                    graphURL = convertToGraphURL(input[index]);
                    if (graphUrls.indexOf(graphURL) === -1) {
                        graphUrls.push(graphURL);
                    }
                } catch (err) {
                    errors = true;
                    console.warn(err.message);
                    console.warn('The following url was not processed: ' + input[index]);
                }
            }
        }

        graphUrls.forEach(function (url) {
            if (!finished){
                makeGetRequest(url, cookie, renderResult);
            }
        });
    };


    function convertToGraphURL(url) {
        var regexParser = /(https?|ftp):\/\/([^\/]+)\/(.*)/i;
        var match = url.match(regexParser);
        var resource = match[3];

        if (resource.indexOf('id=') > -1) {
            resource = resource.split('id=');
            resource = resource[resource.length - 1];
        }
        return 'https://graph.facebook.com/' + resource.split('?')[0].split('&')[0];
    }

    var fbUrls = req.body.fbUrls.split('\n');
    var fbCookie = req.body.fbCookie;
    var timeToWait = req.body.timeToWait || TIME_TO_WAIT_FOR_RESULT;
    var renderResult = function () {
        res.render('result', {data: resultUsers});
        finished = true;
    };
    getAccountIds(fbUrls, fbCookie, renderResult);

    setTimeout(function () {
        if (!finished) {
            renderResult();
        }
    }, timeToWait * 1000);
};

