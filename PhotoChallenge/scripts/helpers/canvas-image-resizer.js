'use strict';
photoChallengeApp.factory('imageResize', function () {
    return function (tempImg, maxWidth, maxHeight) {
        var MAX_WIDTH = maxWidth || 800;
        var MAX_HEIGHT = maxHeight || 600;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
                tempH *= MAX_WIDTH / tempW;
                tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
                tempW *= MAX_HEIGHT / tempH;
                tempH = MAX_HEIGHT;
            }
        }

        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(tempImg, 0, 0, tempW, tempH);
        return canvas.toDataURL("image/jpeg");
    }
});

