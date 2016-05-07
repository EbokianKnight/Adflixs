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
			currentFocus: 0,
			index: false,
			pages: false,
		};
	},

	componentDidMount: function() {
		this.adStoreToken = AdStore.addListener(this.checkDetails);
		this.slider = document.getElementById(this.props.genre.name);
		this.getPages();
		$(window).bind('resize', function(){
		   this.timer && clearTimeout(this.timer);
		   this.timer = setTimeout(this.handleResize, 100);
		}.bind(this));
	},

	componentWillUnmount: function() {
		this.adStoreToken.remove();
		this.timer && clearTimeout(this.timer);
	},

	// Used to reset the state if the DOM has been resized
	componentDidUpdate: function(prevProps, prevState) {
		if (!this.state.index) { this.getPages(); }
	},

	// See if any Advert has been opened yet, if not, nothings open.
	// See if the Advert that is open is in this row, if so open it.
	// See if this was open, if so close it.
	checkDetails: function() {
		if (AdStore.getAd() === null) {
			this.setState({ showDetail: false });
		} else if (AdStore.getAd().rowID === this.props.genre.id){
			this.setState({ showDetail: true });
		} else if (this.state.showDetail) {
			this.setState({ showDetail: false });
		}
	},

	// nulling index triggers my componentDidUpdate conditional.
	// this is designed to recalculate the slider based on the new DOM sizes.
	handleResize: function () {
		this.setState({ index: null });
	},

	getLastPage: function () {
		var pages = this.state.pages;
		for (var i = pages.length - 1; i >= 0; i--) {
			if (pages[i] < this.state.currentFocus) {
				return pages[i];
			}
		}
		return 0;
	},

	getNextPage: function () {
		var pages = this.state.pages;
		for (var i = 0; i < pages.length; i++) {
			if (pages[i] > this.state.currentFocus) {
				return pages[i];
			}
		}
		return pages[pages.length - 1]
	},

	// dynamically determines the size of the slider and number of ads
	// calculates the index[keys] in an array to cycle over with the carousel
	// indexes the pages with the distance the sliders need to slide.
	getPages: function () {
		var numAds = this.props.genre.ads.length;
		var width, visible, perPageAds, widthPerAd, totalScrollWidth;

		width = $(window).width();
		visible = width * 0.9;

		if (width < 800) {
			perPageAds = 3;
		} else if (width < 1300) {
			perPageAds = 4;
		} else if (width < 1800) {
			perPageAds = 5;
		} else if (width < 2300) {
			perPageAds = 6;
		} else if (width < 2800) {
			perPageAds = 7;
		} else {
			perPageAds = 8;
		}

		widthPerAd = visible / perPageAds;
		totalScrollWidth = widthPerAd * numAds;
		numPages = Math.ceil(totalScrollWidth/visible);

		var pages = [], index = {};

		for (var i = 0; i < numPages; i++) {
			pages.push(perPageAds * i);
		}

		for (var i = 0; i < numAds; i++) {
			index[i] = widthPerAd * i
		}

		this.setState({ index: index, pages: pages });
	},

	moveLeft: function () {
		if (this.state.currentFocus === 0) return;
		var priorPage = this.getLastPage();
		this.setState({ currentFocus: priorPage });
	},

	moveRight: function () {
		var nextPage;
		var pages = this.state.pages;
		var lookup = pages.indexOf(this.state.currentFocus);

		if (lookup !== 0 && lookup >= pages.length - 1) return;
		nextPage = this.getNextPage();
		this.setState({ currentFocus: nextPage });
	},

	refreshState: function (adID) {
		if (adID) { ApiUtil.fetchAdvert(adID, this.props.genre.id); }
	},

	// renders the Ads in the Row
	renderAdverts: function () {
		return this.props.genre.ads.map(function(ad){
			return <Advert ref="row" ad={ad} key={ad.id} rowID={ this.props.genre.id }
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

	renderIndicies: function () {
		if (!this.state.pages) return;
		var pages = this.state.pages;
		return pages.map(function(p, idx){
			return <li className={ p === this.state.currentFocus ? "idx-focus" : "" }
				key={idx} value={p} onClick={this.seekPage}></li>;
		}.bind(this));
	},

	// renders the row heading
	renderRowHeader: function () {
		return (
			<div>
				<div className="index-row-caption">
					{ this.props.genre.name }
				</div>
				<div className="scroll-to-index-bar">
					{ this.renderIndicies() }
				</div>
			</div>
		);
	},

	seekPage: function (e) {
		this.setState({ currentFocus: e.target.value });
	},

	render: function() {
		if (!this.props.genre) { return <div></div>; }

		if (this.slider && this.state.index) {
			var dist = -this.state.index[this.state.currentFocus] || 0;
			var slideToPage = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
			this.slider.style.webkitTransform = slideToPage;
			this.slider.style.msTransform = slideToPage;
			this.slider.style.MozTransform = slideToPage;
		}

		var left = right = "";
		var lastPage = this.state.pages[this.state.pages.length -1];

		if (this.state.currentFocus === 0) {
			left = " acc-hide";
			right = "";
		} else if (this.state.currentFocus === lastPage) {
			right = " acc-hide";
			left = "";
		}

		return (
			<container className="index-row">
				<button className={"index-row-arrows index-arrows-left" + left}
					onClick={this.moveLeft}><div className="a-left"/></button>
				{ this.renderRowHeader() }
				<div id={this.props.genre.name}
					className="index-row-inner">
					{ this.renderAdverts() }
				</div>
				{ this.renderDetail() }
				<button className={"index-row-arrows index-arrows-right" + right}
					onClick={this.moveRight}><div className="a-right"/></button>
			</container>
		);
	}

});

module.exports = AdvertRow;
