var React = require('react');
var PropTypes = React.PropTypes;
var RateStars = require('./stars');
var MyListButton = require('../my_list/my_button');

var OverviewDetail = React.createClass({
  contextTypes: { router: PropTypes.object.isRequired },

  getInitialState: function() {
    return {
      hover: false,
    };
  },

  createProductInfo: function () {
    return (
      <ul className="feature-info-bar">
        <li className="feature-info-item">
          <strong>Company:</strong>
          <p>{this.props.ad.company}</p>
        </li>
        <li className="feature-info-item">
          <strong>Product:</strong>
          <p>{this.props.ad.product}</p>
        </li>
        <li className="feature-info-item">
          <strong>Year:</strong>
          <p>{this.props.ad.year}</p>
        </li>
      </ul>
    );
  },

  createGenreInfo: function () {
    if (!this.props.ad.genres) { return ""; }
    var genres = [];
    for (var i = 0; i < this.props.ad.genres.length; i++) {
      genres.push(this.props.ad.genres[i].name);
    }
    return (
      <ul className="feature-info-bar">
        <li className="feature-info-item">
          <strong>Genres:</strong>
          <p>{ genres.join(", ")}</p>
        </li>
      </ul>
    );
  },

  onHover: function () {
    this.setState({ hover: true });
  },

  offHover: function () {
    this.setState({ hover: false });
  },

  playAd: function (e) {
		e.preventDefault();
		e.stopPropagation();
		this.context.router.push({
			pathname: "/streaming",
			query: {
        title: this.props.ad.title,
			 	youtube: this.props.ad.youtube
      }
		});
	},

  render: function () {
    if (!this.props.ad) { return <div></div>; }
    var hover = this.state.hover ? "-hover" : "";
		return (
			<div className={"ad-display-container" + this.props.klass}>
        <p className="feature-description">
          {this.props.ad.description}
        </p>
        { this.createProductInfo() }
        { this.createGenreInfo() }
        <RateStars ad={this.props.ad}/>
        <div className="ad-overview-btns">
          <button className="my-word-box red-box"
            onMouseEnter={this.onHover}
            onMouseLeave={this.offHover}
            onClick={this.playAd}>
            <div className={"detail-my-list-btn play-btn"+hover}/>
            <p>Play</p>
          </button>
          <MyListButton ad={this.props.ad} showFull={true}/>
        </div>
			</div>
		);
	}

});

module.exports = OverviewDetail;
