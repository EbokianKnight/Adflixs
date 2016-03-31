var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');

var Advert = React.createClass({

	sendBackID: function (e) {
		e.preventDefault();
		ApiUtil.fetchAdvert(this.props.ad.id, this.props.rowID);
	},

	render: function() {
		var klass = this.props.show ? "" : " fliximg-effect";
		return (
			<div className={ "fliximg" + klass }>
				{ this.props.ad.description }
				<button className={ "ad-detail-button" } onClick={this.sendBackID}/>
			</div>
		);
	}

});

module.exports = Advert;
