var React = require('react'),
    PropTypes = React.PropTypes,
    ApiUtil = require('../util/api_util'),
    YoutubeUtil = require('../util/youtube_util'),
    AdStore = require('../stores/ad_store');

var VideoModel = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      playing: false,
      controls: false,
      progress: 0,
      volume: 0,
      mute: 0,
      duration: 0,
    };
  },

  componentDidMount: function() {
    this.player = null;
    this.meter = null;
    this.forceUp = null;
    this.hide = null;
    this.loading = null;
    YoutubeUtil.loadApiScript();
    this.renderPlayer();
    this.forceLoadVideo();
  },

  componentWillUnmount: function () {
    this.forceUp = clearInterval(this.loading);
    this.cancelHide();
    this.stopProgressCounter();
  },

  animateProgressBar: function () {
    if (!this.player) return
    if (!this.meter) {
      this.meter = $("#progress")
    }
    this.meter.width(Math.floor(this.state.progress*100)+"%");
  },

  cancelHide: function () {
    window.clearTimeout(this.hide);
  },

  hideControls: function () {
    this.hide = window.setTimeout(this.hideControlsNow, 1200);
  },

  hideControlsNow: function () {
    this.setState({ controls: false });
  },

  forceLoadVideo: function () {
    if (this.loading) return;
    this.loading = window.setInterval(this.forceVideoUpdate, 200);
  },

  forceVideoUpdate: function () {
    this.forceUpdate();
  },

  jumpPlayback: function (e) {
    var percent = e.target.value;
    var seconds = Math.floor((this.player.getDuration() * percent) / 100);
    this.player.seekTo(seconds, true);
  },

  makeFlexButtons: function () {
    if (this.buttons) return this.buttons;
    this.buttons = []
    for (var i = 0; i < 100; i++) {
      this.buttons.push(
        <li key={i} value={i} onClick={this.jumpPlayback}/>
      );
    }
    return this.buttons;
  },

  onPlayerLoad: function () {
    this.togglePlay();
    var time = this.player.getDuration();
    this.setState({
      volume: this.player.getVolume(),
      duration: Math.floor(time/60)+"m "+ Math.floor(time%60)+"s",
      mute: this.player.isMuted(),
    })
    this.startProgressCounter();
  },

  requestFullScreen: function () {
    var iframe = this.player.c
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
    }
  },

  renderBackButton: function(seen) {
    return <div className={"movie-back " + seen}
      onClick={this.returnToIndex}/>;
  },

  renderControls: function (seen) {
    var play = this.state.playing ? " video-pause" : " video-play"
    var volume;
    if (this.state.volume === 0 || this.state.mute) {
      volume = "mute"
    } else if (this.state.volume <= 30) {
      volume = "low"
    } else if (this.state.volume <= 60) {
      volume = "med"
    } else {
      volume = "high"
    }
    return (
      <div className={"video-control-container " + seen}>
        <div className="video-flex-row">
          <div className="meter">
            <span id="progress"></span>
            <div className="video-flex-progress">
              { this.makeFlexButtons() }
            </div>
          </div>
          <p>{this.state.duration}</p>
        </div>
        <menu className="video-controller video-flex-row">
          <div className="video-flex-row">
            <button className={"video-icon" + play} onClick={this.togglePlay}/>
            <div className="video-spacer"/>
            <button className={"video-icon video-volume-"+volume} onClick={this.toggleSound}/>
            <div className="video-spacer"/>
            <p className="video-title">
              {this.props.location.query.title}</p>
          </div>
          <div className="video-flex-row">
            <div className="video-spacer"/>
            <button className="video-icon video-full-screen"
              onClick={this.requestFullScreen}/>
          </div>
        </menu>
      </div>
    );
  },

  renderPlayer: function() {
    if (!this.player) {
      var url = this.props.location.query.youtube;
      this.player = YoutubeUtil.loadPlayer(url, this.videoStateChange, this.onPlayerLoad);
      if (this.player) {
        clearInterval(this.loading);
      }
    }
  },

  returnToIndex: function () {
    this.context.router.push("/main");
  },

  showControls: function () {
    if (!this.state.controls) {
      this.setState({ controls: true });
    }
    this.cancelHide();
  },

  startProgressCounter: function () {
    if (this.progress) return;
    this.progress = window.setInterval(this.evalProgress,500);
  },

  evalProgress: function () {
    this.setState({
      progress: this.player.getCurrentTime() / this.player.getDuration()
    });
  },

  stopProgressCounter: function () {
    clearInterval(this.progress);
  },

  togglePlay: function () {
    if (!this.state.playing) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  },

  toggleSound: function () {
    if (this.state.mute) {
      this.player.unMute();
      this.setState({ mute: false });
    } else {
      this.player.mute();
      this.setState({ mute: true });
    }
  },

  videoStateChange: function (e) {
    if (!e) return;
    if (e.data === 0) {
      this.returnToIndex();
    } else if (e.data === 1) {
      this.setState({ playing: true, controls: true});
      this.hideControls();
    } else if (e.data === 2) {
      this.setState({ playing: false, controls: true});
      this.hideControls();
    } else if (e.data === -1) {
      this.setState({});
    }
  },

  render: function() {
    var seen = this.state.controls ? "video-show" : "video-hide"
    var loading = this.state.duration > 0 ? "loader" : "";
    return (
      <div className="modal-layer">
        <container id="video-player">
          {this.renderPlayer()}
          <div className={loading}/>
        </container>
        <div className={"movie-leftside"}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          { this.renderBackButton(seen) }
        </div>
        <div className={"movie-bottom"}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          { this.renderControls(seen) }
          { this.animateProgressBar() }
        </div>
      </div>
    );
  }

});



module.exports = VideoModel;
