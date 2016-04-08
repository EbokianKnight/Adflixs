var AdActions = require('../actions/ad_actions');
var GenreActions = require('../actions/genre_actions');
var UserActions = require('../actions/user_actions');
var FeatureActions = require('../actions/feature_actions');
var MyListActions = require('../actions/my_list_actions');

module.exports = {
  createAdvert: function (advertData) {
    $.ajax({
			method: "POST",
      url: "/api/ads",
      processData: false,
      contentType: false,
      data: advertData,
      success: function (advert) {
        AdActions.receiveAdvert(advert);
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
        UserActions.receiveView(view);
        AdActions.updateView(view);
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
        UserActions.receiveView(view);
        AdActions.updateView(view);
        if (callback) { callback(); }
      },
      error: function (err) {
        console.log("ApiUtil#updateView Error");
      }
    });
  },
  fetchFeatures: function () {
    $.ajax({
			method: "GET",
      url: "/api/features",
      success: function (header) {
        FeatureActions.receiveFeatures(header.feature);
      },
			error: function (err) {
				console.log("ApiUtil#fetchFeatures Error");
			}
    });
  },
  fetchAdverts: function () {
    $.ajax({
			method: "GET",
      url: "/api/ads",
      success: function (adverts) {
        AdActions.receiveAllAdverts(adverts);
      }
    });
  },
	fetchAdvert: function (id, rowID) {
    $.ajax({
			method: "GET",
      url: "/api/ads/" + id,
      success: function (advert) {
				advert.rowID = rowID;
        AdActions.receiveAdvert(advert);
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
        GenreActions.receiveGenreList(list);
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
        MyListActions.receiveMyList(list);
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
        if (callback) { callback(); }
        MyListActions.removeFromMyList(ad);
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
        GenreActions.receiveAllGenres(genres, callback);
      },
			error: function (err) {
				console.log("ApiUtil#fetchGenres Error");
			}
    });
  }
};
