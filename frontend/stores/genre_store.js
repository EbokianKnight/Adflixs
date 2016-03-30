var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var GenresConstants = require('../constants/genre_constants');

var GenreStore = new Store(AppDispatcher);

var _genres = {};

var resetGenres = function (genres) {
	_genres = {};
	genres.forEach( function (el) { _genres[el.id] = el; });
};

GenreStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case GenresConstants.GENRES_RECEIVED:
			resetGenres(payload.genres);
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

GenreStore.find = function (id) {
	return _genres[id];
};
