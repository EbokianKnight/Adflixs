var Dispatcher = require('../dispatcher/dispatcher.js');
var AdConstants = require('../constants/ad_constants.js');

module.exports = {
  receiveAllAdverts: function (adverts) {
    Dispatcher.dispatch({
      actionType: AdConstants.ADS_RECEIVED,
      adverts: adverts
    });
  },

  receiveSingleAdverts: function (advert) {
    Dispatcher.dispatch({
      actionType: AdConstants.AD_RECEIVED,
      advert: advert
    });
  }
};
