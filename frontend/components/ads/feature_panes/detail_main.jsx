var React = require('react');
var PropTypes = React.PropTypes;
var AdAction = require('../../../actions/ad_actions');
var OverviewDetail = require('./overview');
var ReviewIndex = require('./review_index');
var MoreLikeThisDetail = require('./more_like_this');

var AdDetailPane = React.createClass({

	getInitialState: function() {
		return { display: "overview" };
	},

	componentDidUpdate: function(prevProps, prevState) {
		if (!this.props.header) return;
		if (this.slides && this.state.display !== "overview") {
			clearInterval(this.slides);
			this.slides = null;
		} else if (!this.slides && this.state.display === "overview") {
			this.slides = window.setInterval(this.props.header, 15000);
		}
	},

	componentDidMount: function() {
    if (!this.props.header) return;
	  this.slides = window.setInterval(this.props.header, 15000);
  },

  componentWillUnmount: function () {
    if (!this.props.header) return;
    window.clearInterval(this.slides);
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
		return (
			<nav className="ad-display-nav group">
				<button onClick={this.showOverviewPane}
					genre={this.props.genre}>Overview</button>
				<button onClick={this.showDetailPane}>Details</button>
			</nav>
		);
	},

	renderDisplayPanes: function () {
		if (this.state.display === "overview") {
			return <OverviewDetail ad={this.props.ad}/>;
		} else {
			return (
				<ReviewIndex ad={this.props.ad}
					refresh={this.props.refresh}/>
			);
		}
	},

	closeDetails: function () {
		AdAction.closeDetails();
	},

  closeButton: function () {
    if (this.props.header) return "";
    return (
      <button className="top-right-x"
				onClick={this.closeDetails}>
				X
			</button>
    );
  },

	render: function() {
		if (!this.props.ad) { return <div/>; }
		var klass = this.state.display === "overview" ? "" : " blur";
		var url = "url(" + this.props.ad.largeUrl + ")";
		return (
			<div className="review-details">
				<div className={ "feature-background-image" + klass }
					style={{backgroundImage:url}}/>
					<div className="back-grade"/>
	        <div className="bottom-grade"/>
					<h2 className="feature-title">{this.props.ad.title}</h2>
					{ this.renderDisplayPanes() }
					{ this.createMenuButtons() }
					{ this.closeButton() }
			</div>
		);
	}
});

module.exports = AdDetailPane;
