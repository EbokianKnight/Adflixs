var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var GenreStore = require('../../stores/genre_store');
var AdStore = require('../../stores/ad_store');

var AddSubmission = React.createClass({

  getInitialState: function() {
    return {
      genres: [],
      imageUrl: "",
      imageFile: null
    };
  },

  componentDidMount: function() {
    this.adToken = AdStore.addListener(this.adRecieved);
    this.genreToken = GenreStore.addListener(this.updateGenres);
    ApiUtil.fetchGenreList()
  },

  componentWillUnmount: function() {
    this.genreToken.remove();
    this.adToken.remove();
  },

  adRecieved: function () {
    this.props.close("success");
  },

  handleFileChange: function (e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      var result = reader.result;
      this.setState({ imageFile: file, imageUrl: result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  },

  createCheckBoxes: function () {
    return (
      this.state.genres.map(function(genre, idx){
        return (
          <div className="account-checkbox" key={idx}>
            <input className="account-checkbox-item" type="checkbox"
              name="ad[genre_ids][]" key={genre.id} value={genre.id}/>
            <strong>{genre.name}</strong>
          </div>
        );
      })
    );
  },

  renderPreview: function () {
    if (this.state.imageUrl !== "") {
      return <img className="preview-image" src={this.state.imageUrl}/>;
    } else {
      return "";
    }
  },

  updateGenres: function() {
    this.setState({ genres: GenreStore.fetchGenreList() });
  },

  sendNewAdvertRequest: function (e) {
    e.preventDefault()
    var data = $(this.refs.AdvertRequest).serializeArray()
    var formData = new FormData();

    data.forEach(function(datum){
      formData.append(datum.name, datum.value)
    })
    formData.append("ad[image]", this.state.imageFile)
    ApiUtil.createAdvert(formData);
  },

  createAdForm: function () {
    return (
      <div className="account-pane group">
        <section className="account-section-heading">
          <strong>ADD NEW ADVERT</strong>
          <button onClick={this.props.close} className="account-aside-button">
            Cancel</button>
        </section>

        <form ref="AdvertRequest" onSubmit={this.sendNewAdvertRequest}>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Title</div>
              <input className="account-section-input" type="text"
                name="ad[title]"/>
            </label>
            <input type="submit" value="Submit Advert"
              className="account-aside-button account-item-right"/>
          </row>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Company</div>
              <input className="account-section-input" type="text"
                name="ad[company]"/>
            </label>
          </row>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Year</div>
              <input className="account-section-input as-date" type="date"
                name="ad[year]"/>
            </label>
          </row>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Product</div>
              <input className="account-section-input" type="text"
                name="ad[product]"/>
            </label>
          </row>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Youtube Link</div>
              <input className="account-section-input" type="text"
                name="ad[youtube]"/>
            </label>
          </row>
          <row className="account-section-row account-checkbox-container group">
            { this.createCheckBoxes() }
          </row>

          <row className="account-section-row group">
            <label className="account-item-left group">
              <div className="form-row">Description</div>
              <textarea className="account-section-input as-area" type="textarea"
                name="ad[description]"/>
            </label>
          </row>
        </form>
          <row className="account-section-row group">
            <label className="account-item-left group upload">
              <div className="form-row">Image Upload</div>
              <input className="account-section-input" type="file"
                onChange={this.handleFileChange}/>
              { this.renderPreview() }
            </label>
        </row>
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
