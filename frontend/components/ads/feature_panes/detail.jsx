var React = require('react');
var PropTypes = React.PropTypes;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var RateStars = require('./stars');
var SessionStore = require('../../../stores/session_store');
var ApiUtil = require('../../../util/api_util');

var Detail = React.createClass({

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
    var reviews = [];
    for (var i = 0; i < 8; i++) {
      reviews.push(
        <article key={i} className="ad-review-flex-article ad-link">
          <div className="review-flex-header">
            <h3 className="review-h3">Good Ad!</h3>
            <div className="review-star">&#x2605;</div>
            <div className="review-star">&#x2605;</div>
            <div className="review-star">&#x2605;</div>
            <div className="review-star">&#x2605;</div>
            <div className="review-star">&#x2605;</div></div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt...</p>
          <p>author: thisReview@guy.com</p>
        </article>
      );
    }
    return reviews;
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
        <a className="ad-review-title ad-link" href="#">Read More...</a>
      </section>
    );
  }

});

module.exports = Detail;
