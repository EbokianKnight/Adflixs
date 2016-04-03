var React = require('react');
var PropTypes = React.PropTypes;
var ReactCSS = require('react-addons-css-transition-group');

var OverviewDetail = React.createClass({

  render: function () {
    if (!this.props.ad) { return <div></div>; }
		return (
			<div className="ad-display-container">
				<ul className="feature-info-bar group">
					<li>Company: {this.props.ad.company}</li>
					<li>Product: {this.props.ad.product}</li>
					<li>Year: {this.props.ad.year}</li>
				</ul>
				<p className="feature-description">{this.props.ad.description}</p>
				<button className="more-features">Add To MyList</button>
        <ul className="more-features group">
        <li>&#x2605;</li><li>&#x2605;</li><li>&#x2605;</li><li>&#x2605;</li><li>&#x2605;</li>
        </ul>
			</div>
		);
	}

});

module.exports = OverviewDetail;
