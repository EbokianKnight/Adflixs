var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');

var Advert = React.createClass({

	// Update the Store with the last row that was clicked, as movies can exist
	// in multiple rows, Row is listening for changes.
	sendBackID: function (e) {
		e.preventDefault();
		ApiUtil.fetchAdvert(this.props.ad.id, this.props.rowID);
	},

	render: function() {
		var klass = this.props.show ? "" : " fliximg-effect";
		return (
			<div className={ "fliximg" + klass }>
				<button className="ad-detail-button" onClick={this.sendBackID}>
					{ this.props.ad.title }
				</button>
			</div>
		);
	}

});

module.exports = Advert;
