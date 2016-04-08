var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var FeatureConstants = require('../constants/feature_constants');

var FeatureStore = new Store(AppDispatcher);

var _features = [];

var resetFeatures = function (ads) {
	_features = ads;
};

FeatureStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case FeatureConstants.FEATURES_RECEIVED:
			resetFeatures(payload.ads);
			FeatureStore.__emitChange();
		break;
	}
};

FeatureStore.all = function () {
	return _features.slice();
};

module.exports = FeatureStore;
