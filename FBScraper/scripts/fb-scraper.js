document.getElementById('btn-getids').addEventListener('click', convertFBurlsToIDs);

function convertFBurlsToIDs() {
    var progressBar = document.getElementById('progress-bar');
    var input = getInputFrom('ta-input', '\n');
    var graphUrls = [];
    var output = [];
    var index;
    var requestTimeout = 2000;
    var errors = false;

    var convertToGraphID = function convertToGraphID(currentGraphRequest) {
        $.ajax({
            url: currentGraphRequest,
            type: "GET",
            timeout: requestTimeout,
            contentType: "text/plain",
            success: function (result) {
                output.push(result.id);
                progressBar.value = graphUrls.length - remaining;
                if (graphURL.length >= index) {
                    return;
                }
                remaining--;

                if (remaining <= 0) {
                    exportOutputTo('ta-output', '\n', output);
                    report();
                } else {
                    convertToGraphID(graphUrls[index += 1]);
                }
            },
            error: function () {
                if (graphURL.length >= index) {
                    return;
                }
                remaining--;
                errors = true;
                console.log("Cannot process " + currentGraphRequest + "! \n Error:" + status);
                convertToGraphID(graphUrls[index += 1]);
            }
        });
    };

    var graphURL;
    for (index = 0; index < input.length; index++) {
        if (input[index].indexOf('facebook.com') > -1) {
            try {
                graphURL = convertToGraphURL(input[index]);
                if (graphUrls.indexOf(graphURL) === -1) {
                    graphUrls.push(graphURL);
                }
            } catch (err) {
                errors = true;
                console.log(err.message);
                console.log('The following url was not processed: ' + input[index]);
            }
        }
    }

    if (graphUrls.length) {
        progressBar.max = graphUrls.length;
        var remaining = graphUrls.length;
        index = 0;
        convertToGraphID(graphUrls[index]);
    } else {
        alert('There ware no valid facebook urls to process!');
    }

    function report() {
        if (errors) {
            alert('There ware errors during the processing of the urls, please check the console!');
        }
    }

    function getInputFrom(inputID, delimiter) {
        return document.getElementById(inputID).value.split(delimiter);
    }

    function exportOutputTo(inputID, delimiter, array) {
        document.getElementById(inputID).value = array.join(delimiter);
    }

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
}