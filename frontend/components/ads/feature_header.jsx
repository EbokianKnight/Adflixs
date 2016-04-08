var React = require('react');
var PropTypes = React.PropTypes;
var FeatureStore = require('../../stores/feature_store');
var DetailMain = require('./feature_panes/detail_main');
var Slider = require('react-slick');

var FeatureHeader = React.createClass({

  getInitialState: function() {
    return {
      features: []
    };
  },

  componentDidMount: function() {
    this.featureToken = FeatureStore.addListener(this.getFeaturesFromStore());
    ApiUtil.fetchFeatures();
  },

  getFeaturesFromStore: function () {
    this.setState({ features: FeatureStore.all() });
  },

  componentWillUnmount: function() {
    this.featureToken.remove();
  },

  renderFeatures: function () {
    return (
      features.map(function(ad, idx){
        return <DetailMain key={idx} ad={ ad } />;
      })
    );
  },

  render: function() {
    var settings = {
      infinite: true,
      speed: 1000,
      fade: true,
			arrows: true,
			useCSS: true
    };
    return (
      <div className="main-index-header">
        <Slider {...settings}>
          { this.renderFeatures() }
        </Slider>
      </div>
    );
  }

});

module.exports = FeatureHeader;
