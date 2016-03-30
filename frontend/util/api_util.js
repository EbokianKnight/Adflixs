var AdActions = require('../actions/ad_actions.js');
var GenreActions = require('../actions/genre_actions.js');

module.exports = {
  fetchAdverts: function () {
    $.ajax({
			method: "GET",
      url: "api/ads",
      success: function (adverts) {
        AdActions.recieveAllAdverts(adverts);
      }
    });
  },
	fetchGenres: function () {
    $.ajax({
			method: "GET",
      url: "api/genres",
      success: function (genres) {
        GenreActions.recieveAllGenres(genres);
      },
			error: function (e) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
  },
	logout: function () {
		$.ajax({
			method: "DELETE",
      url: "session",
      success: function () {
        console.log("User Logged Out");
      },
			error: function (e) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
	}
};
