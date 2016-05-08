var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AdConstants = require('../constants/ad_constants');

var AdStore = new Store(AppDispatcher);

var _shownAd = null;
var _receivedAd = false;

var resetAdverts = function (ads) {
	_adverts = {};
	ads.forEach( function (ad) { _advert[ad.id] = ad; });
};

var updateAdvert = function (ad) {
	_shownAd = ad;
};

var updateView = function (newView) {
	if (_shownAd) {
		_shownAd.views = _shownAd.views.map( function (view) {
			if (view.user_id === newView.user_id) {
				return newView;
			} else {
				return view;
			}
		});
		AdStore.__emitChange();
	}
};

var clearShownAd = function () {
	_shownAd = null;
};

AdStore.successMessage = function () {
	var flash = _receivedAd;
	_receivedAd = false;
	return flash;
};

AdStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case AdConstants.AD_RECEIVED:
			updateAdvert(payload.advert);
			AdStore.__emitChange();
			break;
		case AdConstants.CLOSE_DETAILS:
			clearShownAd();
			AdStore.__emitChange();
			break;
		case AdConstants.UPDATE_VIEW:
			updateView(payload.view);
			break;
	}
};

AdStore.getAd = function () {
	if (_shownAd) {
		return Object.assign({}, _shownAd);
	} else {
		return null;
	}
};

module.exports = AdStore;
