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
		return (
			<nav className="nav-menu">
				<svg className="logo nav-logo"
					onClick={this.goToAds}>
				</svg>
				<menu className="nav-left-container">
					<ProfileDropDown />

	      </menu>
			</nav>
		);
	}

});

module.exports = NavBar;
