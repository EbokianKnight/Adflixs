var React = require('react');
var PropTypes = React.PropTypes;
var Advert = require('./ad_index_item2');
var Slider = require('react-slick');
var DetailMain = require('./feature_panes/detail_main');
var AdStore = require('../../stores/ad_store');
var ReactCSS = require('react-addons-css-transition-group');
var ApiUtil = require('../../util/api_util');

var AdvertRow = React.createClass({

	getInitialState: function() {
		return {
			showDetail: false,
			numPage: 0,
			adFocus: false
		};
	},

	componentDidMount: function() {
		this.adStoreToken = AdStore.addListener(this.checkDetails);
		this.slider = document.getElementById(this.props.genre.name);
	},

	componentWillUnmount: function() {
		this.adStoreToken.remove();
		$(window).off('mouseup', this.handlePageReset);
		this.slider = null;
		this.sliderPages = null;
	},

	// after page resize, helps redetermine new scroll positions
	calcPages: function (visible, focus) {
		if (visible < 800) {
			return (visible / 3) * focus
		} else if (visible < 1300) {
			return (visible / 4) * focus
		} else if (visible < 1800) {
			return (visible / 5) * focus
		} else if (visible < 2300) {
			return (visible / 6) * focus
		} else {
			return (visible / 7) * focus
		}
	},

	checkDetails: function() {
		if (AdStore.getAd() === null) {
			this.setState({ showDetail: false });
		} else if (AdStore.getAd().rowID === this.props.genre.id){
			this.setState({
				showDetail: true
			});
		} else if (this.state.showDetail) {
			this.setState({ showDetail: false });
		}
	},

	fetchRowName: function () {
		return (
			<div className="index-row-caption">
				{ this.props.genre.name }
			</div>
		);
	},

	fetchAdverts: function () {
		return this.props.genre.ads.map(function(ad){
			return <Advert ref="row" ad={ad} key={ad.id} rowID={ this.props.genre.id }
				show={ this.state.showDetail }/>;
		}.bind(this));
	},

	getPages: function (thisFocus) {
		var numAds = this.props.genre.ads.length;
		var visible = $(window).width() * 0.9;
		var totalScrollWidth = $(this.slider).width();
		var pages = Math.ceil(totalScrollWidth/visible);
		var perPageAds = Math.ceil(numAds/pages);
		var book = { last: pages };
		for (var i = 0; i < pages; i++) {
			book[i] = {
				dist: visible * i,
				focus: (perPageAds * i)
			};
			if (thisFocus && thisFocus >= (perPageAds * i)
										&& thisFocus < (perPageAds * i++)) {
				 book.findNewNumPage = (perPageAds * i);
				 book.focusDist = this.calcFocusDist(visible, thisFocus);
			}
		}
		this.sliderPages = book;
	},

	// when start resizing throw switch and wait for release
	handleResize: function () {
		if (!this.stopHandling) return;
		this.stopHandling = true;
		$(window).on('mouseup', this.handlePageReset);
	},

	// when released, reset switch, record the ad in focus,
	// recalculate pages, and change state to update changes
	handlePageReset: function () {
		this.stopHandling = false;
		$(window).off('mouseup', this.handlePageReset);
		var focus = this.sliderPages[this.state.numPage].focus;
		this.setState({ numPage: newNumPage });
	},

	moveLeft: function () {
		if (this.state.numPage === 0) return;
		this.setState({ numPage: this.state.numPage - 1 });
	},

	moveRight: function () {
		if (this.state.numPage.dist === this.sliderPages.last) return;
		this.setState({ numPage: this.state.numPage + 1 });
	},

	refreshState: function (adID) {
		if (adID) { ApiUtil.fetchAdvert(adID, this.props.genre.id); }
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
		if (!this.props.genre) { return <div></div>; }
		if (this.slider) this.getPages();
		if (this.sliderPages) {
			var dist




			if (this.state.getFocus) {
				dist = this.state.getFocus;
			} else {
				dist = this.sliderPages[this.state.numPage].dist;
			}




			var slideToPage = 'translate(' + -dist + 'px,0)' + 'translateZ(0)';
			this.slider.style.webkitTransform = slideToPage;
			this.slider.style.msTransform = slideToPage;
			this.slider.style.MozTransform = slideToPage;
		}
		return (
			<container className="index-row">
				<button className="index-row-arrows index-arrows-left"
					onClick={this.moveLeft}/>
				{ this.fetchRowName() }
				<div id={this.props.genre.name}
					className="index-row-inner">
					{ this.fetchAdverts() }
				</div>
				{ this.renderDetail() }
				<button className="index-row-arrows index-arrows-right"
					onClick={this.moveRight}/>
			</container>
		);
	}

});

module.exports = AdvertRow;
