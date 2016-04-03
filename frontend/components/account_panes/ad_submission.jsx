var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var GenreStore = require('../../stores/genre_store');
var AdStore = require('../../stores/ad_store');

var AddSubmission = React.createClass({

  getInitialState: function() {
    return {
      genres: GenreStore.all(),
      success: false,
      title: "",
      product: "",
      company: "",
      year: 0,
      description: "",
      youtube: ""
    };
  },

  updateTitle: function (e) {
    if (this.state.success) {
      this.setState({ title: e.target.value, success: false });
    } else {
      this.setState({ title: e.target.value });
    }
  },

  updateProduct: function (e) {
    this.setState({ product: e.target.value });
  },
  updateCompany: function (e) {
    this.setState({ company: e.target.value });
  },
  updateYear: function (e) {
    this.setState({ year: e.target.value });
  },
  updateDescription: function (e) {
    this.setState({ description: e.target.value });
  },
  updateYouTube: function (e) {
    this.setState({ youtube: e.target.value });
  },

  componentDidMount: function() {
    this.adToken = AdStore.addListener(this.adRecieved);
    this.genreToken = GenreStore.addListener(this.updateGenres);
    if (this.state.genres.length === 0) {
      ApiUtil.fetchGenres()
    }
  },

  componentWillUnmount: function() {
    this.genreToken.remove();
    this.adToken.remove();
  },

  adRecieved: function () {
    var success = AdStore.successMessage()
    if (success) {
      this.setState({
        success: success,
        title: "",
        product: "",
        company: "",
        year: 0,
        description: "",
        youtube: ""
      });
    }
  },

  extractCheckedBoxes: function (nodeList) {
    var checked = [];
    for (var i = 0; i < nodeList.length; i++) {
      if (nodeList[i].checked) {
        checked.push( parseInt(nodeList[i].id) )
      }
    }
    return checked;
  },

  createCheckBoxes: function () {
    return (
      this.state.genres.map(function(genre, idx){
        return (
          <div className="account-checkbox" key={idx}>
            <input className="account-checkbox-item" type="checkbox"
              name="genres" key={genre.id} id={genre.id}/>
            <strong>{genre.name}</strong>
          </div>
        );
      })
    );
  },

  updateGenres: function() {
    this.setState({ genres: GenreStore.all() })
  },

  sayMessage: function () {
    if (this.state.success) {
      return <div className="flash-message">SUCCESS!!</div>
    }
  },

  sendNewAdvertRequest: function (e) {
    e.preventDefault()
    var form = e.currentTarget
    ApiUtil.createAdvert({
      description: form.description.value,
      title: form.title.value,
      year: form.year.value,
      product: form.product.value,
      company: form.company.value,
      youtube: form.youtube.value,
      genre_ids: this.extractCheckedBoxes(form.genres)
    });
  },

  createAdForm: function () {
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>ADD NEW ADVERT</strong>
          <button onClick={this.props.close} className="account-aside-button">
            Cancel</button>
        </section>
        <form onSubmit={this.sendNewAdvertRequest}>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Title</div>
              <input className="account-section-input" type="text"
                name="title" value={this.state.title}
                onChange={this.updateTitle}/>
            </label>
            <input type="submit" value="Submit Advert"
              className="account-aside-button account-item-right"/>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Company</div>
              <input className="account-section-input" type="text"
                name="company" value={this.state.company}
                onChange={this.updateCompany}/>
            </label>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Year</div>
              <input className="account-section-input" type="date"
                name="year" value={this.state.year}
                onChange={this.updateYear}/>
            </label>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Product</div>
              <input className="account-section-input" type="text"
                name="product" value={this.state.Product}
                onChange={this.updateProduct}/>
            </label>
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Youtube Link</div>
              <input className="account-section-input" type="text"
                name="youtube" value={this.state.youtube}
                onChange={this.updateYouTube}/>
            </label>
          </row>
          <row className="account-section-row account-checkbox-container group">
            { this.createCheckBoxes() }
          </row>
          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Description</div>
              <textarea className="account-section-input as-area" type="textarea"
                name="description" value={this.state.description}
                onChange={this.updateDescription}/>
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
