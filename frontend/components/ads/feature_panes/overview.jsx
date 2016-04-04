var React = require('react');
var PropTypes = React.PropTypes;
var RateStars = require('./stars');

var OverviewDetail = React.createClass({

  render: function () {
    if (!this.props.ad) { return <div></div>; }
		return (
			<div className="ad-display-container">
        <p className="feature-description">{this.props.ad.description}</p>
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
        { <RateStars /> }
        <button className="feature-my-list">+</button>
			</div>
		);
	}

});

module.exports = OverviewDetail;
