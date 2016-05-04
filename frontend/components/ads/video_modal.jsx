var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    YouTubePlayer = require('youtube-player'),
    YoutubeUtil = require('../../util/youtube_util');

var VideoModel = React.createClass({

  getInitialState: function() {
    return {
      playing: true,
      controls: false,
    };
  },

  componentDidMount: function() {
    YoutubeUtil.loadApiScript();
    window.addEventListener("keydown", this.mapKeyHandlers);
  },

  componentWillUnmount: function () {
    window.removeEventListener("keydown", this.mapKeyHandlers);
    this.cancelHide();
  },

  mapKeyHandlers: function () {
    e.stopPropagation();
    e.preventDefault();
    if (e.keyCode === 32) this.togglePlay();
  },

  returnToIndex: function () {
    console.log("return");
  },

  togglePlay: function () {
    if (this.state.playing) {
      this.player.playVideo();
      this.setState({ playing: false });
    } else {
      this.player.pauseVideo();
      this.setState({ playing: true });
    }
  },

  showControls: function () {
    this.setState({ controls: true });
    this.cancelHide();
  },

  hideControls: function () {
    this.hideTimer = window.setTimeout(this.hideControlsNow, 1000);
  },

  cancelHide: function () {
    clearInterval(this.hideTimer);
  },

  hideControlsNow: function () {
    this.setState({ controls: false });
  },

  renderVideo: function() {
    var url = "TPKgC8KPBMg";
    this.player = YoutubeUtil.loadPlayer(url, this.videoDidEnd);
  },

  videoDidEnd: function () {
    if (this.player.getPlayerState() === 0) {
      this.returnToIndex();
    }
  },

  render: function() {
    var klass = this.state.controls ? "" : " hidden"
    return (
      <div className="modal-layer">
        <container>{this.renderVideo()}</container>
        <div className={"movie-leftside" + klass}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <div className="movie-back" onclick={this.returnToIndex}>Back</div>
        </div>
        <div className={"movie-bottom" + klass}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <div className="movieplayercontrols"></div>
        </div>
      </div>
    );
  }

});

module.exports = VideoModel;
