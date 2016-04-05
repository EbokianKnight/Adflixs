var React = require('react');
var PropTypes = React.PropTypes;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var RateStars = require('./stars');
var SessionStore = require('../../../stores/session_store');
var ApiUtil = require('../../../util/api_util');
var ReviewIndexItem = require ('./review_index_item');

var ReviewIndex = React.createClass({

  getInitialState: function() {
    return {
      show: "none"
    };
  },

  showForm: function () {
    this.setState({ show: "form" });
  },

  closeForm: function (e) {
    if (e) { e.preventDefault(); }
    this.props.refresh(this.props.ad.id);
    this.setState({ show: "none" });
  },

  sendReview: function (e) {
    e.preventDefault();
    var fetch = SessionStore.fetchView(this.props.ad.id);

    if (fetch) {
      ApiUtil.updateView(fetch.id, {
        title: e.target[0].value,
        review: e.target[1].value,
        ad_id: this.props.ad.id
      }, this.closeForm);
    } else {
      ApiUtil.createView({
        title: e.target[0].value,
        review: e.target[1].value,
        ad_id: this.props.ad.id
      }, this.closeForm);
    }
  },

  checkCurrentUser: function () {
    var view = SessionStore.fetchView(this.props.ad.id);
    return (
      { title: view && view.title ? view.title : "",
        review: view && view.review ? view.review : ""
      }
    );
  },

  loadReviews: function () {
    if (!this.props.ad.views) return "";
    return this.props.ad.views.map(function(view, i){
      if (!view.review) { return ""; }
      return <ReviewIndexItem key={i} view={view} />;
    });
  },

  reviewForm: function () {
    var view = this.checkCurrentUser();
    if (this.state.show === "none") {
      return (
        <section className="ad-review-flex-button ad-review-right-panel">
          <RateStars ad={this.props.ad}/>
          <button className="ad-review-button" onClick={this.showForm}>
            Review</button>
        </section>
      );
    } else if (this.state.show === "form") {
      return (
        <section className="ad-review-flex-form ad-review-right-panel">
          <form onSubmit={this.sendReview} ref="UpdateForm"
            className="review-form-flex-container">
            <label>Title
              <input type="text" name="title" defaultValue={view.title}
                className="form-review-input"/>
            </label>
            <label>Review
              <textarea name="review" defaultValue={view.review}
                className="form-review-input form-review-area" />
            </label>
            <div className="button-flex-form-container">
              <input className="ad-review-button" type="submit" value="Submit"/>
              <RateStars ad={this.props.ad}/>
              <button className="ad-review-cancel" onClick={this.closeForm}>
                Cancel</button>
            </div>
          </form>
        </section>
      );
    }
  },

  render: function() {
    return (
      <section className="ad-review-main group">
        <h2 className="ad-review-title">Member Reviews</h2>
        <section className="ad-review-flex-container">
          { this.loadReviews() }
        </section>
        { this.reviewForm() }
        <a className="ad-review-title ad-link">Read More...</a>
      </section>
    );
  }

});

module.exports = ReviewIndex;
