var React = require('react');
var PropTypes = React.PropTypes;

var Advert = React.createClass({

	clicky: function () {
		console.log("clicky");
		console.log(this.props);
	},

	render: function() {
		return (
			<div className="fliximg">
				{ this.props.ad.description }
				<button className="ad-detail-button" onClick={this.clicky}/>
			</div>
		);
	}

});

module.exports = Advert;
