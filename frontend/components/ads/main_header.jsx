var React = require('react');
var PropTypes = React.PropTypes;

var MainHeader = React.createClass({

	render: function() {
		return (
			<div className="main-index-header">
				<div className="back-grade">
					<button className="header-left-arrow"></button>
					<div className="header-info-container">
						<h1 className="feature-title">The Title</h1>
						<ul className="feature-info-bar group">
							<li>Company</li>
							<li>Product</li>
							<li>Year</li>
						</ul>
						<p className="feature-description"> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<div className="more-features">
							<button>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</button>
							<button>Add To MyList</button>
						</div>
					</div>
					<button className="header-right-arrow"></button>
				</div>
			</div>
		);
	}
});

module.exports = MainHeader;
