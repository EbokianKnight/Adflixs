var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../../actions/ad_actions');
var OverviewDetail = require('./overview');
var MoreDetails = require('./detail');
var MoreLikeThisDetail = require('./more_like_this');
var ReactCSS = require('react-addons-css-transition-group');

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
				<button onClick={this.showSimilarPane}>More Like This</button>
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

	close_details: function () {
		AdAction.closeDetails();
	},

  closeButton: function () {
    if (this.props.header) return "";
    return (
      <button className="top-right-x" onClick={this.close_details}>X</button>
    );
  },

	render: function() {
		if (!this.props.ad) { return <div></div>; }
		return (
			<div className="back-grade">
        <div className="bottom-grade"></div>
				<div className="header-spacer header-left-arrow"/>
				<h2 className="feature-title">{this.props.ad.title}</h2>
				<ReactCSS
					transitionName="fader"
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={300}>
					{ this.displayPane() }
				</ReactCSS>
				{ this.createMenuButtons() }
				<div className="header-spacer header-right-arrow"/>
				{ this.closeButton() }
			</div>
		);
	}
});

module.exports = AdDetailPane;
