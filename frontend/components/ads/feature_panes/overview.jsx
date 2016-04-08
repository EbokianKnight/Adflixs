var React = require('react');
var PropTypes = React.PropTypes;
var RateStars = require('./stars');
var MyListButton = require('../my_list/my_button');

var OverviewDetail = React.createClass({

  componentDidMount: function() {
    if (this.props.header) {
      this.slides = window.setInterval(this.props.header, 15000);
    }
  },

  componentWillUnmount: function () {
    if (this.props.header) {
      window.clearInterval(this.slides);
    }
  },

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
        { <RateStars ad={this.props.ad}/> }
        <MyListButton ad={this.props.ad}/>
			</div>
		);
	}

});

module.exports = OverviewDetail;
