var React = require('react');
var PropTypes = React.PropTypes;
var RateStars = require('./stars');

var OverviewDetail = React.createClass({

  createProductInfo: function () {
    return (
      <ul className="feature-info-bar group">
        <li className="feature-info-item group">
          <strong>Company:</strong>
          <p>{this.props.ad.company}</p>
        </li>
        <li className="feature-info-item group">
          <strong>Product:</strong>
          <p>{this.props.ad.product}</p>
        </li>
        <li className="feature-info-item group">
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
      <ul className="feature-info-bar group">
        <li className="feature-info-item group">
          <strong>genres</strong><p>{ genres.join(", ")}</p>
        </li>
      </ul>
    );
  },

  render: function () {
    if (!this.props.ad) { return <div></div>; }
		return (
			<div className="ad-display-container">
        <p className="feature-description">{this.props.ad.description}</p>
        { this.createProductInfo() }
        { this.createGenreInfo() }
        { <RateStars /> }
        <button className="feature-my-list">+</button>
			</div>
		);
	}

});

module.exports = OverviewDetail;
