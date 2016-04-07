var React = require('react');
var PropTypes = React.PropTypes;

var MainVideo = React.createClass({

  getInitialState: function() {
    return {
      windowWidth: window.innerWidth
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleResize: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  render: function() {
    var youtubeLink = this.props.location.query.youtube;
    var width = this.state.windowWidth * 0.8;
    var height = width * 0.64;
    return (
      <div className="video-main-container">
        <iframe
          width={ width }
          height={ height }
          src={"https://www.youtube.com/embed/" + youtubeLink}
          frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }

});

module.exports = MainVideo;
