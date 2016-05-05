var React = require('react'),
    PropTypes = React.PropTypes,
    ApiUtil = require('../util/api_util'),
    YouTubePlayer = require('youtube-player'),
    YoutubeUtil = require('../util/youtube_util'),
    ReactCSS = require('react-addons-css-transition-group'),
    AdStore = require('../stores/ad_store');

var VideoModel = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      playing: false,
      controls: false,
      progress: 0,
      seconds: 0
    };
  },

  componentDidMount: function() {
    YoutubeUtil.loadApiScript();
    window.addEventListener("keydown", this.mapKeyHandlers);
    this.renderPlayer();
  },

  componentWillUnmount: function () {
    window.removeEventListener("keydown", this.mapKeyHandlers);
    this.cancelHide();
  },

  mapKeyHandlers: function (e) {
    e.stopPropagation();
    if (e.keyCode === 32) this.togglePlay();
  },

  returnToIndex: function () {
    this.context.router.push("/main");
  },

  togglePlay: function () {
    if (!this.state.playing) {
      this.player.playVideo();
      this.setState({ playing: true });
    } else {
      this.player.pauseVideo();
      this.setState({ playing: false });
    }
  },

  showControls: function () {
    this.setState({ controls: true });
    this.cancelHide();
  },

  hideControls: function () {
    this.hideTimer = window.setTimeout(this.hideControlsNow, 100000);
  },

  cancelHide: function () {
    clearInterval(this.hideTimer);
  },

  hideControlsNow: function () {
    this.setState({ controls: false });
  },

  renderPlayer: function() {
    var url = this.props.location.query.youtube;;
    this.player = YoutubeUtil.loadPlayer(url, this.videoStateChange, this.togglePlay);
  },

  videoStateChange: function () {
    if (!this.player) return;
    if (this.player.D.playerState === 0) {
      this.returnToIndex();
    }
  },

  renderBackButton: function() {
    if (this.state.controls) {
      return <div
        className="movie-back"
        onClick={this.returnToIndex}/>;
    }
  },

  renderControls: function () {
    // if (this.state.controls) {
    //   var play = this.state.playing ? " video-pause" : " video-play"
    //   return (
    //     <container>
    //       <div className="video-flex-row">
    //         <span className="progress-bar"></span>
    //         <p>{this.state.seconds}</p>
    //       </div>
    //       <menu className="video-controller">
    //         <div className="video-flex-row">
    //           <div>
    //             <button className={"video-icon" + play} onClick={this.togglePlay}/>
    //             <button className="video-icon video-volumn"/>
    //             <p className="video-title">
    //               {this.props.location.query.title}</p>
    //           </div>
    //           <div>
    //             <button className="video-icon video-full-screen"/>
    //           </div>
    //         </div>
    //       </menu>
    //     </container>
    //   )
    // }
  },

  render: function() {
    return (
      <div className="modal-layer">
        <container id="video-player">{this.renderPlayer()}</container>
        <div className={"movie-leftside"}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <ReactCSS transitionName="fader"
  					transitionEnterTimeout={500}
  					transitionLeaveTimeout={500}>
            { this.renderBackButton() }
          </ReactCSS>
        </div>
        <div className={"movie-bottom"}
          onMouseEnter={this.showControls}
          onMouseLeave={this.hideControls}>
          <ReactCSS transitionName="fader"
  					transitionEnterTimeout={500}
  					transitionLeaveTimeout={500}>
            { this.renderControls() }
          </ReactCSS>
        </div>
      </div>
    );
  }

});

module.exports = VideoModel;
