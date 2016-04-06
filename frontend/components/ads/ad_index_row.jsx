var React = require('react');
var PropTypes = React.PropTypes;
var Advert = require('./ad_index_item');
var Slider = require('react-slick');
var DetailMain = require('./feature_panes/detail_main');
var AdStore = require('../../stores/ad_store');
var ReactCSS = require('react-addons-css-transition-group');
var ApiUtil = require('../../util/api_util');

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
			this.setState({
				showDetail: true
			});
		} else if (this.state.showDetail) {
			this.setState({ showDetail: false });
		}
	},

	refreshState: function (adID) {
		if (adID) {
			ApiUtil.fetchAdvert(adID, this.props.genre.id);
		}
	},

	fetchRowName: function () {
		return <div className="row-caption">{ this.props.genre.name }</div>;
	},

	fetchAdverts: function () {
		return this.props.genre.ads.map(function(ad){
			return <Advert ad={ad} key={ad.id} rowID={ this.props.genre.id }
				show={ this.state.showDetail }/>;
		}.bind(this));
	},

	renderDetail: function () {
		if (this.state.showDetail) {
			return (
				<div className="ad-detail-pane">
					<DetailMain show={this.state.showDetail} ad={AdStore.getAd()}
						refresh={this.refreshState}/>
				</div>
			);
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
			responsive: [
				{ breakpoint: 410, settings: { slidesToShow: 1, slidesToScroll: 1 } },
				{ breakpoint: 620, settings: { slidesToShow: 2, slidesToScroll: 2 } },
				{ breakpoint: 830, settings: { slidesToShow: 3, slidesToScroll: 3 } },
				{ breakpoint: 1040, settings: { slidesToShow: 4, slidesToScroll: 4 } },
				{ breakpoint: 1250, settings: { slidesToShow: 5, slidesToScroll: 5 } },
				{ breakpoint: 1460, settings: { slidesToShow: 6, slidesToScroll: 6 } },
				{ breakpoint: 1870, settings: { slidesToShow: 7, slidesToScroll: 7 } },
				{ breakpoint: 1980, settings: { slidesToShow: 8, slidesToScroll: 8 } },
				{ breakpoint: 2190, settings: { slidesToShow: 9, slidesToScroll: 9 } }
			]
    };

		if(!this.props.genre) { return <div></div>; }
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
