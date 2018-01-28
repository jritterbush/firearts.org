function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

const videoUrl = '//www.vimeo.com/21648751';
const endpoint = '//www.vimeo.com/api/oembed.json';
const callback = 'embedVideo';
const url = endpoint + '?url=' + encodeURIComponent(videoUrl) + '&callback=' + callback + '&width=550';
function embedVideo(video) {
    document.getElementById('embed').innerHTML = unescape(video.html);
}
function init() {
    const js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(js);
}
ready(init);
