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
					<div className="cta-wrapper">
						<content className="cta-text">
							<h1 className="cta-pitch">See what's next.</h1>
							<p className="cta-pricing">WATCH ANYWHERE. CANCEL ANYTIME.</p>
						</content>
						<button className="cta-sign-up"
							onClick={this.goToSignUp}>JOIN FREE FOR ONE MONTH
						</button>
					</div>
					<button className="cta-sign-in"
						onClick={this.goToSignUp}>Sign In
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
