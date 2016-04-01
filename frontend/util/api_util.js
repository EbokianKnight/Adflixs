var AdActions = require('../actions/ad_actions');
var GenreActions = require('../actions/genre_actions');
var UserActions = require('../actions/user_actions');

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
  },
  makeUser: function (user, callback) {
    $.ajax({
			method: "POST",
      url: "api/users",
      success: function (userJson) {
        UserActions.registerNewUser(userJson);
        //callback to redirect
      },
			error: function (err) {
				console.log("ApiUtil#makeUser Error");
			}
    });
  },
  removeUser: function (callback) {
    $.ajax({
      method: "POST",
      url: "api/users",
      success: function () {
        callback();
      },
      error: function (err) {
        console.log("ApiUtil#makeUser Error");
      }
    });
  },
  logIn: function (callback) {
    $.ajax({
			method: "POST",
      url: "api/session",
      success: function (userJson) {
        //callback to redirect
      },
			error: function (err) {
				console.log("ApiUtil#logIn Error");
			}
    });
  },
	logout: function (callback) {
		$.ajax({
			method: "DELETE",
      url: "session",
      success: function () {
        callback();
      },
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
	}
};
