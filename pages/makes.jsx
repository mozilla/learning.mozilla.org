var React = require("react");
var request = require("superagent");
var ReactPaginate = require('react-paginate');

var TeachAPIClientMixin = require("../mixins/teach-api-client");
var config = require("../lib/config");

var makeapiURL = config.MAKEAPI_ORIGIN + "/api/20130724/make/search?limit=20&user="

var Make = React.createClass({
  render: function() {
    var thumbnailStyle = {
      "background-image": "url(" + this.props.thumbnail + ")"
    };
    var makeTypeClass = "make make-type-" + this.props.type;
    return (
      <div className={makeTypeClass}>
        <a className="make-link" target="_blank" href={this.props.url}>
          <div className="make-thumbnail thumbnail" style={thumbnailStyle}>
          </div>
          <div className="type-label">
            <span className="make-type">
              {this.props.type}
            </span>
          </div>
          <div className="make-info">
            <p className="title">{this.props.title}</p>
          </div>
        </a>
        <div className="btn-container">
          <a className="make-link" target="_blank" href={this.props.url}>
          </a>
        </div>
      </div>
    );
  }
});

var MakePage = React.createClass({
  mixins: [TeachAPIClientMixin],
  statics: {
    teachAPIEvents: {
      "login:success": "handleApiLoginSuccess",
      "logout": "handleApiLogout"
    }
  },
  getInitialState: function() {
    return {
      page: 0,
      makes: []
    };
  },
  handleApiLoginSuccess: function(info) {
    this.setState({
      username: this.getTeachAPI().getUsername(),
      makesLoaded: false
    });
    this.loadMakes();
  },
  handleApiLogout: function() {
    this.setState({
      username: null
    });
  },
  loadMakes: function() {
    var url = makeapiURL + this.state.username + '&page=' + this.state.page;
    this.setState({
      loadingMakes: true
    });

    request('get', url)
      .accept('json')
      .end(function(err, res) {
        if (err) {
          return this.setState({
            loadError: true,
            loadingMakes: false
          });
        }

        try {
          var data = JSON.parse(res.text);
        } catch(e) {
          return this.setState({
            loadError: true,
            loadingMakes: false
          });
        }
        this.setState({
          makes: data.makes,
          total: data.total,
          loadingMakes: false
        });
      }.bind(this));
  },
  handlePageClick: function(data) {
    this.setState({
      page: data.selected
    });
  },
  render: function() {
    if (!this.state.username) {
      return (
        <div>Please log in</div>
      );
    }

    var makes = this.state.makes.map(function(make) {
      // need a fallback thumbnail url
      var thumbnail = make.thumbnail || '';
      var type = make.contentType.replace(/application\/x\-/g, '');
      return (
        <Make thumbnail={thumbnail}
          type={type}
          url={make.url}
          title={make.title} />
      );
    });

    return (
      <div>
        <div>
          {this.state.username}, these are your makes:
        </div>
        { makes }
      </div>
    );
  }
});

module.exports = MakePage;
