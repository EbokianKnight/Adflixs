var React = require('react');
var PropTypes = React.PropTypes;
var GenreStore = require('../../stores/genre_store');
var MyListStore = require('../../stores/my_list_store');
var ApiUtil = require('../../util/api_util');
var AdvertRow = require('./ad_index_row');
var FeatureHeader = require('./feature_header');
var testForAdBlock = require('fuckadblock');

var MainIndex = React.createClass({

	getInitialState: function() {
		return {
			genres: GenreStore.all(),
			myList: [],
			adblock: false,
		};
	},

	handleScroll: function (e) {
		if (this.waiting) return;
		if ((window.innerHeight + window.scrollY + 10) >= document.body.offsetHeight) {
			this.getMoreRows();
			this.waiting = true;
		}
  },

	//throttles Scroll Event
	timeoutCallback: function () {
		setTimeout(function(){ this.waiting = false; }.bind(this), 500);
	},

	componentDidMount: function() {
		this.waiting = false;
		$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', this.handleScroll);

		this.genreStoreToken = GenreStore.addListener(this.getGenresFromStore);
		this.myListStoreToken = MyListStore.addListener(this.getMyListFromStore);

		if (this.state.genres.length === 0){ this.getMoreRows(); }
		ApiUtil.fetchMyList();

		// if loading the file is blocked, adblock is present
		// else test for adblock, if adblock is detected run adBlockDetected
		if (typeof fuckAdBlock === 'undefined') {
			this.adBlockDetected();
		} else {
			fuckAdBlock.check(5);
			fuckAdBlock.on(true, this.adBlockDetected);
		}
	},

	adBlockDetected: function () {
	  this.setState({ adblock: true });
		console.log("I never used AdBlock before this site, and was taken by surprise at it's veracity. Altering the naming structure to get around it requires specific changes throughout the backend and frontend. Until that is finished this message will appear.");
	},

	getMoreRows: function () {
		var page = GenreStore.getCurrentPage();
		if ( page > GenreStore.getLastPage() ) {
			$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
		} else {
			ApiUtil.fetchGenres(page++, this.timeoutCallback);
		}
	},

	componentWillUnmount: function() {
		$(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
		this.genreStoreToken.remove();
		this.myListStoreToken.remove();
		if (fuckAdBlock) { fuckAdBlock.clearEvent(); }
	},

	getGenresFromStore: function() {
		this.setState({ genres: GenreStore.all() });
	},

	getMyListFromStore: function () {
		this.setState({ myList: MyListStore.all() });
	},

	// Renders the Individual Rows
	renderRows: function () {
		return this.state.genres.map(function(row){
			return (
				<AdvertRow
					key={row.id}
					genre={row}
					block={this.state.adblock} />
			);
		}.bind(this));
	},

	// Renders MyList
	renderMyList: function () {
		if (this.state.myList.length === 0) return;
		myListPackage = {
			name: "MyList",
			id: "MyList",
			ads: this.state.myList
		};
		return (
			<AdvertRow
				genre={myListPackage}
				block={this.state.adblock} />
		);
	},

	// Feature Faker placeholder
	fetchRandomAd: function () {
		var ads = this.state.genres[Math.floor(Math.random() * this.state.genres.length)].ads;
		return ads[Math.floor(Math.random() * ads.length)];
	},

	render: function() {
		if (this.state.genres.length === 0) return <div></div>;
		return (
			<div ref="GenreRows" className="main-index-body">
				<FeatureHeader header={true} />
				{ this.renderMyList() }
				{ this.renderRows() }
			</div>
		);
	}

});

module.exports = MainIndex;
