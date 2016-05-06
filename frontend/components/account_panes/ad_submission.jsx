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
      imageFile: null,
      title: "",
      product: "",
      company: "",
      date: "",
      youtube: "",
      description: "",
      show: false,
      submission: "none",
    };
  },

  componentDidMount: function() {
    this.adToken = AdStore.addListener(this.successCallback);
    this.genreToken = GenreStore.addListener(this.updateGenres);
    ApiUtil.fetchGenreList();
  },

  componentWillUnmount: function() {
    this.genreToken.remove();
    this.adToken.remove();
  },

  successCallback: function () {
    this.setState({ submission: "success" });
  },

  toggleClose: function (e) {
    $(e.target).blur();
    document.getElementById("fileInput").value = "";
    if (this.state.show) {
      this.setState({
        show: false,
        imageUrl: "",
        imageFile: null,
        title: "",
        product: "",
        company: "",
        date: "",
        youtube: "",
        description: "",
      });
    } else {
      this.setState({ submission: "none", show: true });
    }
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
          <div key={idx}>
            <input type="checkbox"
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

  updateTitle: function (e) {
    this.setState({ title: e.target.value });
  },

  updateProduct: function (e) {
    this.setState({ product: e.target.value });
  },

  updateCompany: function (e) {
    this.setState({ company: e.target.value });
  },

  updateDate: function (e) {
    this.setState({ date: e.target.value });
  },

  updateYouTube: function (e) {
    this.setState({ youtube: e.target.value });
  },

  updateDescription: function (e) {
    this.setState({ description: e.target.value });
  },

  sendNewAdvertRequest: function (e) {
    e.preventDefault();
    this.setState({submission: "loading", show: false});
    var data = $(this.refs.AdvertRequest).serializeArray();
    var formData = new FormData();

    data.forEach(function(datum){
      formData.append(datum.name, datum.value);
    });
    formData.append("ad[image]", this.state.imageFile);
    ApiUtil.createAdvert(formData);
  },

  submissionActivity: function() {
    if (this.state.show) return;
    var message = <div></div>;
    if (this.state.submission === "success") {
      message =
        <div className="acc-message-box acc-success">
          <div className="acc-check"/> <p>SUCCESS!</p>
        </div>;
    } else if (this.state.submission === "loading") {
      message = <div className="acc-loader"/>;
      if (this.state.imageUrl !== "") {
        message.backgroundImage = "url("+this.state.imageUrl+")";
        message.backgroundSize = "cover";
        message.repeat = "no-repeat";
      }
    }
    return (
      <section className="account-section-row">
        { message }
      </section>
    );
  },

  createAdForm: function () {
    var klass, btnToggle;
    if (this.state.show) {
      klass = "";
      btnToggle = "Cancel";
    } else {
      klass = " acc-hide";
      btnToggle = "Upload";
    }
    return (
      <div className="account-pane">
        <aside className="account-sidebar">
          <h2>Add new advert</h2>
          <button className="acc-btn"
            onClick={this.toggleClose}>
            {btnToggle}</button>
          <label htmlFor="submit-form"
            className={"acc-btn" + klass}>
            Upload Advert
          </label>
        </aside>
        <div className="account-section">
          <section className={"account-section " + klass}>
          <form ref="AdvertRequest"
            className="account-section"
            onSubmit={this.sendNewAdvertRequest}>

            <div className="account-section-row">
              <label>
                <strong>Title</strong>
                <input type="text" name="ad[title]"
                  onChange={this.updateTitle}
                  value={this.state.title}/>
              </label>
            </div>

            <div className="account-section-row">
              <label>
                <strong>Company</strong>
                <input type="text" name="ad[company]"
                  onChange={this.updateCompany}
                  value={this.state.company}/>
              </label>
              <label>
                <strong>Product</strong>
                <input type="text" name="ad[product]"
                  onChange={this.updateProduct}
                  value={this.state.product}/>
              </label>
            </div>

            <div className="account-section-row">
              <label>
                <strong>Youtube Link</strong>
                <input type="text" name="ad[youtube]"
                  onChange={this.updateYouTube}
                  value={this.state.youtube}/>
              </label>

              <label>
                <strong>Year</strong>
                <input type="date" name="ad[year]"
                    onChange={this.updateDate}
                    value={this.state.date}/>
              </label>
            </div>
            <div className="account-section-row">
              <label>
                <strong>Genres</strong>
                <div className="account-section-row acc-checkboxes">
                  { this.createCheckBoxes() }
                </div>
              </label>
            </div>

            <div className="account-section-row">
              <label>
                <strong>Description</strong>
                <textarea type="textarea"
                  name="ad[description]"
                  onChange={this.updateDescription}
                  value={this.state.description}/>
              </label>
            </div>

            <input type="submit" id="submit-form" style={{display: "none"}} />
          </form>
            <div className="account-section-row">
              <label>
                <strong>Image Upload</strong>
                <input id="fileInput" type="file"
                  style={{background: "transparent"}}
                  onChange={this.handleFileChange}/>
              </label>
          </div>
          { this.renderPreview() }
          </section>
          { this.submissionActivity() }
        </div>
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
