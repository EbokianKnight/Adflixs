var React = require('react');
var PropTypes = React.PropTypes;
var GenreStore = require('../../stores/genre_store');
var MyListStore = require('../../stores/my_list_store');
var ApiUtil = require('../../util/api_util');
var AdvertRow = require('./ad_index_row');
var DetailMain = require('./feature_panes/detail_main');
var FeatureHeader = require('./feature_header');

var MainIndex = React.createClass({

	getInitialState: function() {
		return {
			genres: GenreStore.all(),
			myList: []
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
			return <AdvertRow key={row.id} genre={row} />;
		});
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
			<AdvertRow genre={myListPackage}/>
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
