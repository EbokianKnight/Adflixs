var AdActions = require('../actions/ad_actions');
var GenreActions = require('../actions/genre_actions');

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
	fetchAdvert: function (id, rowID) {
    $.ajax({
			method: "GET",
      url: "api/ads/" + id,
      success: function (advert) {
				advert.rowID = rowID;
        AdActions.recieveAdvert(advert);
      },
			error: function (err) {
				console.log("ApiUtil#fetchAdvert Error");
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
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
  }
};
