var React = require('react');
var PropTypes = React.PropTypes;

var Advert = React.createClass({

	render: function() {
		return (
			<div className="fliximg">
				{ this.props.ad.description }
			</div>
		);
	}

});

module.exports = Advert;
