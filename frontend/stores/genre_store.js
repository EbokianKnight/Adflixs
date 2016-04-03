var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var GenresConstants = require('../constants/genre_constants');

var GenreStore = new Store(AppDispatcher);

var _genres = {};
var _list = {};

var resetGenres = function (genres) {
	_genres = {};
	genres.forEach( function (el) { _genres[el.id] = el; });
};

var resetGenreList = function (list) {
	_list = {};
	list.forEach( function (el) { _list[el.id] = el; });
};

GenreStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case GenresConstants.GENRES_RECEIVED:
			resetGenres(payload.genres);
			GenreStore.__emitChange();
		break;
		case GenresConstants.GENRE_LIST:
			resetGenreList(payload.list);
			GenreStore.__emitChange();
			break;
	}
};

GenreStore.all = function () {
	var genres = [];
	Object.keys(_genres).forEach(function(id){
		genres.push(_genres[id]);
	});
	return genres;
};

GenreStore.fetchGenreList = function () {
	var genres = [];
	Object.keys(_list).forEach(function(id){
		genres.push(_list[id]);
	});
	return genres;
};

GenreStore.find = function (id) {
	return _genres[id];
};

module.exports = GenreStore;
