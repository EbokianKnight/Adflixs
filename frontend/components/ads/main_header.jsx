var React = require('react');
var PropTypes = React.PropTypes;
var OverviewDetail = require('./feature_panes/overview');

var MainHeader = React.createClass({

	createMenuButtons: function () {
		return (
			<nav className="ad-display-nav group">
				<button>Overview</button>
				<button>More Like this</button>
				<button>Details</button>
			</nav>
		);
	},

	render: function() {
		return (
			<div className="main-index-header">
				<div className="bottom-grade"></div>
				<div className="back-grade">
					<div className="header-spacer header-left-arrow"/>
					{ <OverviewDetail /> }
					{ this.createMenuButtons() }
					<button className="header-right-arrow header-spacer"></button>
				</div>
			</div>
		);
	}
});

module.exports = MainHeader;
