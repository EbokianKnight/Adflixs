var React = require('react');
var PropTypes = React.PropTypes;
var RateStars = require('./stars');
var MyListButton = require('../my_list/my_button');

var OverviewDetail = React.createClass({

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

  render: function () {
    if (!this.props.ad) { return <div></div>; }
		return (
			<div className={"ad-display-container" + this.props.klass}>
        <p className="feature-description">
          {this.props.ad.description}
        </p>
        { this.createProductInfo() }
        { this.createGenreInfo() }
        <RateStars ad={this.props.ad}/>
        <MyListButton ad={this.props.ad}/>
			</div>
		);
	}

});

module.exports = OverviewDetail;
