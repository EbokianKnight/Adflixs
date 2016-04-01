var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../actions/ad_actions');
var OverviewDetail = require('./feature_panes/overview');

var AdDetailPane = React.createClass({

	createMenuButtons: function () {
		return (
			<nav className="ad-display-nav group">
				<button>Overview</button>
				<button>More Like this</button>
				<button>Details</button>
			</nav>
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
						{ <OverviewDetail /> }
					</div>
					{ this.createMenuButtons() }
					<div className="header-spacer header-right-arrow"/>
					<button className="top-right-x" onClick={this.close_details}>X</button>
				</div>
				<div className="bottom-grade"></div>
			</div>
		);
	}
});

module.exports = AdDetailPane;
