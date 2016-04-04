var React = require('react');
var PropTypes = React.PropTypes;

var HomePage = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	goToSignUp: function () {
		this.context.router.push("/users/new");
	},

	goToSignIn: function () {
		this.context.router.push("/signin");
	},

	generateHomeHeader: function () {
		return (
			<div>
				<header className="homepage-header" >
					<src className="logo"/>
					<div className="home-wrapper">
						<content className="home-text">
							<h1 className="home-pitch">See what's next.</h1>
							<p className="home-pricing">WATCH ANYWHERE. CANCEL ANYTIME.</p>
						</content>
						<button className="home-sign-up home-button"
							onClick={this.goToSignUp}>JOIN FREE FOR ONE MONTH
						</button>
					</div>
					<button className="home-sign-in home-button"
						onClick={this.goToSignIn}>Sign In
					</button>
				</header>
			</div>
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
