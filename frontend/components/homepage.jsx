var React = require('react');
var PropTypes = React.PropTypes;
var Slider = require('react-slick');

var HomePage = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	componentDidMount: function() {
    document.body.style.backgroundColor = "#141414";
  },

	componentWillUnmount: function() {
		var interval_id = window.setInterval("", 9999);
		for (var i = 1; i < interval_id; i++) {
			window.clearInterval(i);
		}
	},

	goToSignUp: function () {
		this.context.router.push("/users/new");
	},

	goToSignIn: function () {
		this.context.router.push("/signin");
	},

	generateHomeHeader: function () {
		var slide = ["pepsi-header", "nuka-header", "liquor-header", "rabbit-header"];
		return slide.map(function(klass, idx){
			return (
				<header key={idx}className={"homepage-header " + klass} >
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
			)
		}.bind(this));
	},

	render: function() {
		var settings = {
      dots: false,
			arrows: false,
      speed: 1000,
			fade: true,
			useCSS: true
    };
		return (
			<div id="basicLayout">
				<Slider {...settings}>
					{ this.generateHomeHeader() }
				</Slider>
			</div>
		);
	}

});

module.exports = HomePage;
