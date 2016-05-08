var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var GenresConstants = require('../constants/genre_constants');

var GenreStore = new Store(AppDispatcher);

var _genres = {};
var _order = [];
var _list = {};
var page = 1;
var last_page;

var loadGenrePage = function (genres) {
	genres.forEach( function (el) {
		 _genres[el.id] = el;
		 _order.push(el.id);
	 });

	page++;
	last_page = genres[0].pages;
};
var resetGenreList = function (list) {
	_list = list;
};

//asyncCallback for MainIndex Scroller
var startTimeout = function (fn) {
	if (fn) { fn(); }
};

GenreStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case GenresConstants.GENRES_RECEIVED:
			loadGenrePage(payload.genres);
			startTimeout(payload.callback);
			GenreStore.__emitChange();
		break;
		case GenresConstants.GENRE_LIST:
			resetGenreList(payload.list);
			GenreStore.__emitChange();
			break;
	}
};

GenreStore.getCurrentPage = function () {
	return page;
};

GenreStore.getLastPage = function () {
	return last_page;
};


GenreStore.all = function () {
	var genres = [];
	_order.forEach(function(id){
		genres.push(_genres[id]);
	});
	return genres;
};

GenreStore.fetchGenreList = function () {
	return _list.slice();
};

GenreStore.find = function (id) {
	return _genres[id];
};

module.exports = GenreStore;
