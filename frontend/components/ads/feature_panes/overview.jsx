var React = require('react');
var PropTypes = React.PropTypes;
var ReactCSS = require('react-addons-css-transition-group');

var OverviewDetail = React.createClass({

  render: function () {
		return (
			<div className="ad-display-container">
				<ul className="feature-info-bar group">
					<li>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</li>
					<li>Company</li>
					<li>Product</li>
					<li>Year</li>
				</ul>
				<p className="feature-description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<button className="more-features">Add To MyList</button>
			</div>
		);
	}

});

module.exports = OverviewDetail;
