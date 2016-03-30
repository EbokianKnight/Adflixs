var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');

var NavBar = React.createClass({

	// logout: function (e) {
	// 	ApiUtil.logout(this.redirect);
	// },
	//
	// redirect: function () {
	// 	context.history.push("/");
	// },

	render: function() {
		return (
			<nav className="nav-bar">
				<svg className="logo logo-small"></svg>
			</nav>
		);
	}

});

module.exports = NavBar;
