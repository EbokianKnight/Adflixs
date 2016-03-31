var React = require('react');
var PropTypes = React.PropTypes;

var Advert = React.createClass({

	render: function() {
		return (
			<div className="fliximg">
				{ this.props.ad.description }
				<button className="ad-detail-button" />
			</div>
		);
	}

});

module.exports = Advert;
