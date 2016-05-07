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
      state = true;
    } else {
      state = false;
    }
    return {
      show: state,
      hover: false
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
      state = true;
    } else {
      state = false;
    }
    this.setState({ show: state });
  },

  toggleList: function () {
    if (this.state.show) {
      ApiUtil.addToMyList(this.props.ad);
    } else {
      ApiUtil.removeFromMyList(this.props.ad);
      if (this.props.ad.rowID === "My List") {
        AdActions.closeDetails();
      }
    }
  },

  onHover: function () {
    this.setState({ hover: true });
  },

  offHover: function () {
    this.setState({ hover: false });
  },

  render: function() {
    var value = "", klass = this.state.show ? "plus" : "check";
    if (this.state.hover && this.props.words) {
      value = this.state.show ? "Add To My List" : "Remove From My List";
    }
    var small = this.props.small ? " sm-btn" : "";
    return (
      <button className={"detail-my-list-btn " + klass + small}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}
        onClick={this.toggleList}>{value}</button>
    );
  }

});

module.exports = MyListButton;
