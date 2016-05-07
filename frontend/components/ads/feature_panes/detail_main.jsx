var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../../actions/ad_actions');
var OverviewDetail = require('./overview');
var ReviewIndex = require('./review_index');
var MoreLikeThisDetail = require('./more_like_this');
var ReactCSS = require('react-addons-css-transition-group');

var AdDetailPane = React.createClass({

	getInitialState: function() {
		return { display: "overview" };
	},

	showDetailPane: function () {
		if (this.state.display === "detail") return ;
		this.setState({ display: "detail" });
	},

	showSimilarPane: function () {
		if (this.state.display === "similar") return ;
		this.setState({ display: "similar" });
	},

	showOverviewPane: function () {
		if (this.state.display === "overview") return ;
		this.setState({ display: "overview" });
	},

	createMenuButtons: function () {
		//<button onClick={this.showSimilarPane}>More Like This</button>
		return (
			<nav className="ad-display-nav group">
				<button onClick={this.showOverviewPane}
					genre={this.props.genre}>Overview</button>
				<button onClick={this.showDetailPane}>Details</button>
			</nav>
		);
	},

	renderDisplayPanes: function () {
		var detail = "acc-hide", review = "acc-hide";
		if (this.state.display === "overview") {
			detail = "";
		} else if (this.state.display === "detail") {
			review = "";
		}
		return (
			<div>
				<OverviewDetail klass={detail}
					key={1} ad={this.props.ad}
					header={this.props.header}/>
				<ReviewIndex klass={review}
					key={2} ad={this.props.ad}
					refresh={this.props.refresh}/>
			</div>

		);
	},

	closeDetails: function () {
		AdAction.closeDetails();
		$(".flix").removeClass("selected");
	},

  closeButton: function () {
    if (this.props.header) return "";
    return (
      <button className="top-right-x" onClick={this.closeDetails}>X</button>
    );
  },

	// In Chrome the reviews get cauched by the browser and they dont successfully transition out. Leaving broken parts over the image.
	// I know... Time to learn better CSS React Tricks.
	// headerGraphicBugfix: function () {
	// 	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	// 	if (isChrome) {
	// 		return this.displayPane();
	// 	} else {
	// 		return (
	// 			<ReactCSS transitionName="fader"
	// 				transitionEnterTimeout={500}
	// 				transitionLeaveTimeout={300}>
	// 				{ this.displayPane() }
	// 			</ReactCSS>
	// 		);
	// 	}
	// },

	render: function() {
		if (!this.props.ad) { return <div></div>; }
		var klass = this.state.display === "overview" ? "" : " blur";
		return (
			<div className="review-details">
				<div className={ "feature-background-image" + klass }
					style={{backgroundImage:"url(" + this.props.ad.largeUrl + ")"}}/>
					<div className="back-grade"/>
	        <div className="bottom-grade"/>
					<div className="header-spacer header-left-arrow"/>
					<h2 className="feature-title">{this.props.ad.title}</h2>
					{ this.renderDisplayPanes() }

					{ this.createMenuButtons() }
					<div className="header-spacer header-right-arrow"/>
					{ this.closeButton() }
			</div>
		);
	}
});

module.exports = AdDetailPane;
