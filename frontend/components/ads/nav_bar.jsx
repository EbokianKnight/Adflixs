var React = require('react');
var PropTypes = React.PropTypes;

var NavBar = React.createClass({

	render: function() {
		return (
			<nav className="nav-bar">
				<a href="/"><svg className="logo logo-small"></svg></a>
			</nav>
		);
	}

});

module.exports = NavBar;
