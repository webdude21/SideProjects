var fbLikeBox = 'fbProfileBrowserListItem';
var fbComments = 'UFIComment';
var expandedList = 'ul.expandedList li div a';
var urls = [];
var links = document.querySelectorAll(expandedList);

for (var i = 0, len = links.length; i < len; i++) {
    urls.push(links[i].href);
}

var result = urls.join('\n');

console.log(result);
