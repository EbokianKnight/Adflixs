var React = require('react');
var PropTypes = React.PropTypes;
var MyListStore = require('../../../stores/my_list_store.js');
var AdStore = require('../../../stores/ad_store.js');
var ApiUtil = require('../../../util/api_util');
var AdActions = require('../../../actions/ad_actions');
// this is the button that toggles ads listed on my list
// it requires an ad id to function

var MyListButton = React.createClass({
  getInitialState: function() {
    var state;
    if (MyListStore.find(this.props.ad.id)) {
      state = "removeFrom";
    } else {
      state = "addTo";
    }
    return {
      show: state,
      hover: "off"
    };
  },

  componentDidMount: function() {
    this.token = MyListStore.addListener(this.getStateFromStore);
    this.adToken = AdStore.addListener(this.getStateFromStore);
  },

  componentWillUnmount: function() {
    this.token.remove();
    this.adToken.remove();
  },

  getStateFromStore: function () {
    var state;
    if (MyListStore.find(this.props.ad.id)) {
      state = "removeFrom";
    } else {
      state = "addTo";
    }
    this.setState({ show: state });
  },

  toggleList: function () {
    console.log(this.props.ad);
    if (this.state.show === "addTo") {
      ApiUtil.addToMyList(this.props.ad);
    } else {
      ApiUtil.removeFromMyList(this.props.ad);
      if (this.props.ad.rowID === "My List") {
        AdActions.closeDetails();
      }
    }
  },

  onHover: function () {
    this.setState({ hover: "on" });
  },

  offHover: function () {
    this.setState({ hover: "off" });
  },

  render: function() {
    var value, klass ;
    if (this.state.hover === "off") {
      value = this.state.show === "addTo" ? " +" : " ✓";
      klass = " my-list-bubble";
    } else {
      value = this.state.show === "addTo" ? "Add To My List" : "Remove From My List";
      klass = "";
    }
    return (
      <button className={"feature-my-list" + klass}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}
        onClick={this.toggleList}>{value}</button>
    );
  }

});

module.exports = MyListButton;
