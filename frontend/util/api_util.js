var AdActions = require('../actions/ad_actions');
var GenreActions = require('../actions/genre_actions');
var UserActions = require('./../actions/user_actions');
var MyListActions = require('./../actions/my_list_actions');

module.exports = {
  createAdvert: function (advertData) {
    $.ajax({
			method: "POST",
      url: "/api/ads",
      data: advertData,
      success: function (advert) {
        AdActions.recieveAdvert(advert);
      },
      error: function (err) {
        console.log("ApiUtil#createAdvert Error");
      }
    });
  },
  createView: function (viewData, callback) {
    $.ajax({
			method: "POST",
      url: "/api/views",
      data: { view: viewData },
      success: function (view) {
        UserActions.recieveView(view);
        if (callback) { callback(); }
      },
      error: function (err) {
        console.log("ApiUtil#createView Error");
      }
    });
  },
  updateView: function (viewID, viewData, callback) {
    $.ajax({
			method: "PATCH",
      url: "/api/views/" + viewID,
      data: { view: viewData },
      success: function (view) {
        UserActions.recieveView(view);
        if (callback) { callback(); }
      },
      error: function (err) {
        console.log("ApiUtil#updateView Error");
      }
    });
  },
  fetchAdverts: function () {
    $.ajax({
			method: "GET",
      url: "/api/ads",
      success: function (adverts) {
        AdActions.recieveAllAdverts(adverts);
      }
    });
  },
	fetchAdvert: function (id, rowID) {
    $.ajax({
			method: "GET",
      url: "/api/ads/" + id,
      success: function (advert) {
				advert.rowID = rowID;
        AdActions.recieveAdvert(advert);
      },
			error: function (err) {
				console.log("ApiUtil#fetchAdvert Error");
			}
    });
  },
  fetchGenreList: function () {
    $.ajax({
			method: "GET",
      url: "/api/list",
      success: function (list) {
        GenreActions.recieveGenreList(list);
      },
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
  },
  fetchMyList: function () {
    $.ajax({
			method: "GET",
      url: "/api/favorites",
      success: function (list) {
        MyListActions.recieveMyList(list);
      },
			error: function (err) {
				console.log("ApiUtil#fetchMyList Error");
			}
    });
  },
  addToMyList: function (ad, callback) {
    $.ajax({
			method: "POST",
      url: "/api/favorites",
      data: { favorite: { ad_id: ad.id } },
      success: function () {
        MyListActions.addToMyList(ad);
        if (callback) { callback(); }
      },
			error: function (err) {
				console.log("ApiUtil#addToMyList Error");
			}
    });
  },
  removeFromMyList: function (ad, callback) {
    $.ajax({
			method: "DELETE",
      url: "/api/favorites/" + ad.id,
      success: function () {
        MyListActions.removeFromMyList(ad);
        if (callback) { callback(); }
      },
			error: function (err) {
				console.log("ApiUtil#removeFromMyList Error");
			}
    });
  },
	fetchGenres: function (page, callback) {
    $.ajax({
			method: "GET",
      url: "/api/genres",
      data: { page: page },
      success: function (genres) {
        GenreActions.recieveAllGenres(genres, callback);
      },
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
  }
};
