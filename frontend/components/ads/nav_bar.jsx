var React = require('react');
var PropTypes = React.PropTypes;
var UserUtil = require('../../util/user_util');
var ProfileDropDown = require('./nav-panes/profile_dropdown');
var SearchComponent = require('./nav-panes/search_bar');

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
			<nav className="nav-bar group">
				<svg className="logo nav-logo"></svg>
				<ProfileDropDown />
				<SearchComponent />
			</nav>
		);
	}

});

module.exports = NavBar;
