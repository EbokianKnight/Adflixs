var React = require('react');
var PropTypes = React.PropTypes;

var HomePage = React.createClass({
	generateHomeHeader: function () {
		return (
			<div className="homepage-header" >
				<h1 className="logo">AdFlixs</h1>
				<div className="cta-wrapper">
					<div className="cta-text">
						<h1 className="cta-pitch">See what's next.</h1>
						<p className="cta-pricing">WATCH ANYWHERE. CANCEL ANYTIME.</p>
					</div>
					<a href="/users/new">JOIN FREE FOR ONE MONTH</a>
				</div>
				<a href="/session/new" className="sign-in">Sign In</a>
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
