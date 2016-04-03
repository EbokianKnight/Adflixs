var React = require('react');
var PropTypes = React.PropTypes;
var OverviewDetail = require('./feature_panes/overview');
var MoreDetails = require('./feature_panes/detail');
var MoreLikeThisDetail = require('./feature_panes/more_like_this');
var ReactCSS = require('react-addons-css-transition-group');

var MainHeader = React.createClass({

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
			return <OverviewDetail key={1} ad={this.props.ad}/>;
		} else if (this.state.display === 1) {
			return <MoreLikeThisDetail key={2} ad={this.props.ad}/>;
		} else {
			return <MoreDetails key={3} ad={this.props.ad}/>;
		}
	},

	render: function() {
		if (!this.props.ad) { return <div></div> }
		return (
			<div>
			<spacer className="main-nav-background"></spacer>
			<div className="main-index-header">
				<div className="bottom-grade"></div>
				<div className="back-grade">
					<div className="header-spacer header-left-arrow"/>
					<h2 className="feature-title">{this.props.ad.title}</h2>
					<ReactCSS
		        transitionName="fader"
		        transitionEnterTimeout={500}
		        transitionLeaveTimeout={300}>
						{ this.displayPane() }
					</ReactCSS>
					{ this.createMenuButtons() }
					<button className="header-right-arrow header-spacer"></button>
				</div>
			</div>
			</div>
		);
	}
});

module.exports = MainHeader;
