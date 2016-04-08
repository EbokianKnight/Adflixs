var Dispatcher = require('../dispatcher/dispatcher.js');
var GenreConstants = require('../constants/genre_constants.js');

module.exports = {
  receiveAllGenres: function (genres, callback) {
    Dispatcher.dispatch({
      actionType: GenreConstants.GENRES_RECEIVED,
      genres: genres,
      callback: callback
    });
  },
  receiveGenreList: function (list) {
    Dispatcher.dispatch({
      actionType: GenreConstants.GENRE_LIST,
      list: list
    });
  }
};
