var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../actions/ad_actions');


var AdDetailPane = React.createClass({

	createOverview: function () {
		return (
			<div className="ad-display-container">
				<h2 className="feature-title">The Title</h2>
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
	},

	close_details: function () {
		AdAction.closeDetails();
	},

	render: function() {
		return (
			<div className="ad-detail-pane-box">
				<div className="ad-detail-pane">
					<div className="back-grade">
						<div className="header-spacer header-left-arrow"/>
						{ this.createOverview() }
					</div>
					<nav className="ad-display-nav group">
						<button>Overview</button>
						<button>More Like this</button>
						<button>Details</button>
					</nav>
					<div className="header-spacer header-right-arrow"/>
					<button className="top-right-x" onClick={this.close_details}>X</button>
				</div>
				<div className="bottom-grade"></div>
			</div>
		);
	}
});

module.exports = AdDetailPane;
