var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var GenreStore = require('../../stores/genre_store');

var AddSubmission = React.createClass({

  getInitialState: function() {
    return { genres: GenreStore.all() };
  },

  componentDidMount: function() {
    this.genreToken = GenreStore.addListener(this.updateGenres);
    if (this.state.genres.length === 0) {
      ApiUtil.fetchGenres()
    }
  },

  updateGenres: function() {
    this.setState({ genres: GenreStore.all() })
  },

  componentWillUnmount: function() {
    this.genreToken.remove();
  },

  listAllGenres: function () {
    return (
      this.state.genres.map(function(genre, idx){
        return (
          <div className="account-checkbox" key={idx}>
            <input className="account-checkbox-item" type="checkbox"
              name={genre.name} key={genre.id} /> <strong>{genre.name}</strong>
          </div>
        );
      })
    );
  },

  sendNewAdvertRequest: function () {

  },

  createAdForm: function () {
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>ADD NEW ADVERT</strong>
          <button onClick={this.props.close} className="account-aside-button">
            Cancel</button>
        </section>
        <form onClick={this.sendNewAdvertRequest}>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Title</div>
              <input className="account-section-input" type="text"
                name="title"/>
            </label>
            <input type="submit" value="Submit Advert"
              className="account-aside-button account-item-right"/>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Company</div>
              <input className="account-section-input" type="text"
                name="company"/>
            </label>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Product</div>
              <input className="account-section-input" type="text"
                name="product"/>
            </label>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Youtube Link</div>
              <input className="account-section-input" type="text"
                name="youtube"/>
            </label>
          </row>
          <row className="account-section-row account-checkbox-container group">
            { this.listAllGenres() }
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Description</div>
              <input className="account-section-input as-area" type="textarea"
                name="description"/>
            </label>
          </row>
        </form>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        { this.createAdForm() }
      </div>
    );
  }

});

module.exports = AddSubmission;
