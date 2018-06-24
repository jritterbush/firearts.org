/* TODO create js utilities for this stuff */
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
/* end move to utilities */

const vimeoUrl = '//www.vimeo.com/';
const endpoint = `${vimeoUrl}api/oembed.json`;
const callback = 'embedVideo';

function embedVideo(video) {
    const videoContainer = document.getElementById(`embed_${video.video_id}`);
    if ( videoContainer ) {
        videoContainer.innerHTML = unescape(video.html);
    }
}
function initializeVideo(videoId, videoWidth) {
    const width = videoWidth || '550';
    const videoUrl = vimeoUrl + videoId;
    const url = `${endpoint}?url=${encodeURIComponent(videoUrl)}&callback=${callback}&width=${width}`;
    const js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(js);
}
ready(() => {
    const videos = document.querySelectorAll('.js-video-player');
    Array.prototype.forEach.call(videos, video => {
        if (video.dataset.videoId) {
            initializeVideo(video.dataset.videoId, video.dataset.videoWidth);
        }
    });
});
