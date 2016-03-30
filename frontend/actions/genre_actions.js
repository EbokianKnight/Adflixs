var Dispatcher = require('../dispatcher/dispatcher.js');
var GenreConstants = require('../constants/genre_constants.js');

module.exports = {
  receiveAllGenres: function (genres) {
    Dispatcher.dispatch({
      actionType: GenreConstants.GENRES_RECEIVED,
      genres: genres
    });
  }
};
