var React = require('react');
var PropTypes = React.PropTypes;
var GenreStore = require('../../stores/genre_store');
var ApiUtil = require('../../util/api_util');
var AdvertRow = require('./ad_index_row');
var MainHeader = require('./main_header');
var NavBar = require('./nav_bar');
var Footer = require('./main_footer');

var MainIndex = React.createClass({

	getInitialState: function() {
		return { genres: GenreStore.all()};
	},

	componentDidMount: function() {
		genreStoreToken = GenreStore.addListener(this.getStateFromStore);
		if (this.state.genres.length === 0){
			ApiUtil.fetchGenres();
		}
	},

	componentWillUnmount: function() {
		genreStoreToken.remove();
	},

	getStateFromStore: function() {
		this.setState({ genres: GenreStore.all() });
	},

	fetchRows: function () {
		return this.state.genres.map(function(row){
			return <AdvertRow key={row.id} genre={row}/>;
		});
	},

	fetchRandomAd: function () {
		var ads = this.state.genres[Math.floor(Math.random() * this.state.genres.length)].ads;
		return ads[Math.floor(Math.random() * ads.length)];
	},

	render: function() {
		if (this.state.genres.length === 0) return <div></div>;
		return (
			<div className="main-index-body">
				<NavBar />
				<MainHeader ad={ this.fetchRandomAd() }/>
				{ this.fetchRows() }
				<Footer />
			</div>
		);
	}

});

module.exports = MainIndex;
