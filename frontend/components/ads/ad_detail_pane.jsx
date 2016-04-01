var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../actions/ad_actions');
var OverviewDetail = require('./feature_panes/overview');
var MoreDetails = require('./feature_panes/detail');
var MoreLikeThisDetail = require('./feature_panes/more_like_this');

var AdDetailPane = React.createClass({

	getInitialState: function() {
		return { display: 0 };
	},

	showDetailPane: function () {
		if (this.state.display === 2) return ;
		this.setState({ display: 2 });
	},

	showSimilarPane: function () {
		if (this.state.display === 1) return ;
		this.setState({ display: 1 });
	},

	showOverviewPane: function () {
		if (this.state.display === 0) return ;
		this.setState({ display: 0 });
	},

	createMenuButtons: function () {
		return (
			<nav className="ad-display-nav group">
				<button onClick={this.showOverviewPane}>Overview</button>
				<button onClick={this.showSimilarPane}>More Like this</button>
				<button onClick={this.showDetailPane}>Details</button>
			</nav>
		);
	},

	displayPane: function () {
		if (this.state.display === 0) {
			return <OverviewDetail />;
		} else if (this.state.display === 1) {
			return <MoreLikeThisDetail />;
		} else {
			return <MoreDetails />;
		}
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
						{ this.displayPane() }
						{ this.createMenuButtons() }
						<div className="header-spacer header-right-arrow"/>
						<button className="top-right-x" onClick={this.close_details}>X</button>
					</div>
				</div>
				<div className="bottom-grade"></div>
			</div>
		);
	}
});

module.exports = AdDetailPane;
