var Dispatcher = require('../dispatcher/dispatcher.js');
var FeatureConstants = require('../constants/feature_constants.js');

module.exports = {
  receiveFeatures: function (ads) {
    Dispatcher.dispatch({
      actionType: FeatureConstants.FEATURES_RECEIVED,
      ads: ads
    });
  }
};
