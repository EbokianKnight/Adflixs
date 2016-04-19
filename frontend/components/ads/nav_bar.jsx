var React = require('react');
var PropTypes = React.PropTypes;
var UserUtil = require('../../util/user_util');
var ProfileDropDown = require('./nav-panes/profile_dropdown');
var SearchComponent = require('./nav-panes/search_bar');

var NavBar = React.createClass({
	contextTypes: { router: PropTypes.object.isRequired },

	goToAds: function () {
		this.context.router.push("/main");
	},

	render: function() {
		//<SearchComponent />
		return (
			<nav className="nav-bar group">
				<svg className="logo nav-logo" onClick={this.goToAds}></svg>
				<ProfileDropDown />
			</nav>
		);
	}

});

module.exports = NavBar;
