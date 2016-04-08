var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AdConstants = require('../constants/ad_constants');

var AdStore = new Store(AppDispatcher);

var _adverts = {}; //not used?
var _shownAd = null;
var _recievedAd = false;

var resetAdverts = function (ads) {
	_adverts = {};
	ads.forEach( function (ad) { _advert[ad.id] = ad; });
};

var updateAdvert = function (ad) {
	_shownAd = ad;
};

var updateView = function (newView) {
	if (_recievedAd) {
		_shownAd.views = _shownAd.views.map(function(view){
			if (view.user_id === newView.user_id) {
				return newView;
			} else {
				return view;
			}
		});
	}
};

var clearShownAd = function () {
	_shownAd = null;
};

AdStore.successMessage = function () {
	var flash = _recievedAd;
	_recievedAd = false;
	return flash;
};

AdStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case AdConstants.ADS_RECEIVED:
			resetAdverts(payload.adverts);
			_recievedAd = true;
			AdStore.__emitChange();
			break;
		case AdConstants.AD_RECEIVED:
			updateAdvert(payload.advert);
			_recievedAd = true;
			AdStore.__emitChange();
			break;
		case AdConstants.CLOSE_DETAILS:
			_recievedAd = true;
			clearShownAd();
			AdStore.__emitChange();
			break;
		case AdConstants.UPDATE_VIEW:
			updateView(payload.view);
			AdStore.__emitChange();
			break;
	}
};

AdStore.all = function () {
	var ads = [];
	Object.keys(_adverts).forEach(function(id){
		ads.push(_adverts[id]);
	});
	return ads;
};

AdStore.getAd = function () {
	if (_shownAd) {
		return Object.assign({}, _shownAd);
	} else {
		return null;
	}
};

module.exports = AdStore;
