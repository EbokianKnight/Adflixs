var React = require('react');
var PropTypes = React.PropTypes;
var Advert = require('./ad_index_item.jsx');
var Slider = require('react-slick');

var AdvertRow = React.createClass({

	fetchRowName: function () {
		return <div className="row-caption">{ this.props.genre.name }</div>;
	},

	fetchAdverts: function () {
		return this.props.genre.ads.map(function(ad){
			return <Advert ad={ad} key={ad.id} />;
		});
	},

	render: function() {
		if(!this.props.genre) { return ""; }
		return (
			<div className="row-bar">
				{ this.fetchRowName() }
				{ this.fetchAdverts() }
			</div>
		);
	}

});

module.exports = AdvertRow;
