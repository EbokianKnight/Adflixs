var YoutubeUtil = {
  loadApiScript: function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  loadPlayer: function (youtubeId, onVideoStateChange, togglePlay) {
    if (typeof YT === "undefined") {
      return false;
    } else {
      var player = new YT.Player('video-player', {
        videoId: youtubeId,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        wmode: "transparent",
        playerVars: {
          'autoplay': 0,
          'controls': 0,
          modestBranding: 1,
          showinfo: 0,
          fs: 0,
          disablekb: 0,
          rel:0,
          iv_load_policy: 3
        },
        events: {
          'onEnd': onVideoStateChange,
          'onReady': togglePlay
        }
      });
      return player;
    }
  }
};

module.exports = YoutubeUtil;
