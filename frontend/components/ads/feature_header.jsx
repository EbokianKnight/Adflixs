var React = require('react');
var PropTypes = React.PropTypes;
var FeatureStore = require('../../stores/feature_store');
var DetailMain = require('./feature_panes/detail_main');
var ApiUtil = require('../../util/api_util');
var ReactCSS = require('react-addons-css-transition-group');

var FeatureHeader = React.createClass({

  getInitialState: function() {
    return {
      features: FeatureStore.all(),
      shown: 0
    };
  },

  componentDidMount: function() {
    this.featureToken = FeatureStore.addListener(this.getFeaturesFromStore);
    if (this.state.features.length < 1) {
      ApiUtil.fetchFeatures();
    }
  },

  getFeaturesFromStore: function () {
    this.setState({ features: FeatureStore.all() });
  },

  componentWillUnmount: function() {
    this.featureToken.remove();
  },

  alternateFeatures: function () {
    var slide = this.state.shown;
    var nextup = (slide + 1) >= this.state.features.length ? 0 : slide+1;
    this.setState({ shown: nextup });
  },

  renderFeatures: function () {
    return (
      <DetailMain key={this.state.shown}
        ad={this.state.features[this.state.shown]}
        header={this.alternateFeatures}
        refresh={this.refreshState}/>
    );
  },

  refreshState: function (adID) {
		if (adID) {
			ApiUtil.fetchAdvert(adID, "Feature");
		}
	},

  render: function() {
    if (this.state.features.length === 0) { return <div/>; }
    return (
      <div className="main-index-header">
        { this.renderFeatures() }
      </div>
    );
  }

});

module.exports = FeatureHeader;
