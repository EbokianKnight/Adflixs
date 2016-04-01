var React = require('react');
var PropTypes = React.PropTypes;
var Advert = require('./ad_index_item');
var Slider = require('react-slick');
var AdDetailPane = require('./ad_detail_pane');
var AdStore = require('../../stores/ad_store');
var ReactCSS = require('react-addons-css-transition-group');
var AdvertRow = React.createClass({

	getInitialState: function() {
		return { showDetail: false };
	},

	componentDidMount: function() {
		this.adStoreToken = AdStore.addListener(this.checkDetails);
	},

	componentWillUnmount: function() {
		this.adStoreToken.remove();
	},

	checkDetails: function() {
		if (AdStore.getAd().rowID === this.props.genre.id){
			this.setState({ showDetail: true });
		} else if (this.state.showDetail) {
			this.setState({ showDetail: false });
		}
	},

	fetchRowName: function () {
		return <div className="row-caption">{ this.props.genre.name }</div>;
	},

	fetchAdverts: function () {
		return this.props.genre.ads.map(function(ad){
			return <Advert ad={ad} key={ad.id} rowID={ this.props.genre.id } show={ this.state.showDetail }/>;
		}.bind(this));
	},

	renderDetail: function () {
		if (this.state.showDetail) {
			return <AdDetailPane show={this.state.showDetail}/>;
		} else {
			return "";
		}
	},

	render: function() {
		var settings = {
      dots: true,
      infinite: false,
      speed: 500,
			arrows: true,
			useCSS: true,
			variableWidth: false,
			responsive: [
				{ breakpoint: 210, settings: { slidesToShow: 1, slidesToScroll: 1 } },
				{ breakpoint: 420, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 630, settings: { slidesToShow: 3, slidesToScroll: 3 } },
				{ breakpoint: 840, settings: { slidesToShow: 4, slidesToScroll: 4 } },
				{ breakpoint: 1050, settings: { slidesToShow: 5, slidesToScroll: 5 } },
				{ breakpoint: 1260, settings: { slidesToShow: 6, slidesToScroll: 6 } },
				{ breakpoint: 1470, settings: { slidesToShow: 7, slidesToScroll: 7 } },
				{ breakpoint: 1680, settings: { slidesToShow: 8, slidesToScroll: 8 } },
				{ breakpoint: 1890, settings: { slidesToShow: 9, slidesToScroll: 9 } },
				{ breakpoint: 100000, settings: 'unslick' }
			]
    };

		if(!this.props.genre) { return ""; }
		var klass = this.state.showDetail ? " row-extend" : "";

		return (
			<div className={ "row-bar" + klass }>
				{ this.fetchRowName() }
				<Slider {...settings}>
					{ this.fetchAdverts() }
				</Slider>

				{ this.renderDetail() }
			</div>
		);
	}

});

module.exports = AdvertRow;
