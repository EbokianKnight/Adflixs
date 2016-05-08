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
    if (this.props.header) {
      this.slides = window.setInterval(this.props.header, 15000);
    }
  },

  componentWillUnmount: function () {
    if (this.props.header) {
      window.clearInterval(this.slides);
    }
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
		var detail = " acc-hide", review = " acc-hide";
		if (this.state.display === "overview") {
			detail = "";
		} else if (this.state.display === "detail") {
			review = "";
		}
		return (
			<div>
				<OverviewDetail klass={" acc-show"+ detail}
					key={1} ad={this.props.ad}/>
				<ReviewIndex klass={" acc-show"+ review}
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
      <button className="top-right-x"
				onClick={this.closeDetails}>
				X
			</button>
    );
  },

	render: function() {
		if (!this.props.ad) { return <div/>; }
		var klass = this.state.display === "overview" ? "" : " blur";
		return (
			<div className="review-details">
				<div className={ "feature-background-image" + klass }
					style={{backgroundImage:"url(" + this.props.ad.largeUrl + ")"}}/>
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
