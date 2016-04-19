var React = require('react');
var PropTypes = React.PropTypes;
var Slider = require('react-slick');

var HomePage = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	getInitialState: function() {
		return {
			slideNum: null
		};
	},

	componentDidMount: function() {
    document.body.style.backgroundColor = "#141414";
		this.tick = window.setInterval(this.updateSlide, 8000);
		this.slides = ["pepsi-header", "nuka-header", "liquor-header", "rabbit-header"]
		this.setState({ slideNum: 0 });
  },

	componentWillUnmount: function() {
		window.clearInterval(this.tick);
	},

	updateSlide: function () {
		var nextup;
		var current = this.state.slideNum;
		if (current + 1 >= this.slides.length) { nextup = 0 }
		else { nextup = current + 1 }
		this.setState({ slideNum: nextup });
	},

	goToSignUp: function () {
		this.context.router.push("/users/new");
	},

	goToSignIn: function () {
		this.context.router.push("/signin");
	},

	generateHomeHeader: function () {
		if (this.state.slideNum === null) return <div/>;
		var klass = this.slides[this.state.slideNum];
		return (
			<header className={"homepage-header " + klass} >
				<src className="logo"/>
				<div className="home-wrapper">
					<content className="home-text">
						<h1 className="home-pitch">See what's next.</h1>
						<p className="home-pricing">WATCH ANYWHERE. CANCEL ANYTIME.</p>
					</content>
					<button className="home-sign-up home-button"
						onClick={this.goToSignUp}>JOIN FREE FOR ALL MONTHS!
					</button>
				</div>
				<button className="home-sign-in home-button"
					onClick={this.goToSignIn}>Sign In
				</button>
			</header>
		);
	},

	render: function() {
		return (
			<div id="basicLayout">
				{ this.generateHomeHeader() }
			</div>
		);
	}

});

module.exports = HomePage;
