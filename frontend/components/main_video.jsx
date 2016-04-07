var React = require('react');
var PropTypes = React.PropTypes;

var MainVideo = React.createClass({

  componentDidMount: function() {

  },

  render: function() {
    var youtubeLink = this.props.location.query.youtube;
    return (
      <div className="video-main-container">
        <iframe
          width="1020"
          height="640"
          src={"https://www.youtube.com/embed/" + youtubeLink}
          frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }

});

module.exports = MainVideo;
