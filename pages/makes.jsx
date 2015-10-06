var React = require("react");
var request = require("superagent");
var moment = require('moment');

var TeachAPIClientMixin = require("../mixins/teach-api-client");
var config = require("../lib/config");

var makeapiURL = config.MAKEAPI_ORIGIN + "/api/20130724/make/search?limit=20&user="

var Make = React.createClass({
  render: function() {
    var makeTypeClass = "make " + this.props.type;
    var lastUpdatedFromNow = moment(new Date(this.props.updatedAt)).fromNow();
    return (
      <li className={makeTypeClass}>
        <a target="_blank" href={this.props.url}>
          <div className="meta">
            <p className="details">Updated {lastUpdatedFromNow}, {this.props.numLikes} likes</p>
            <p className="title">{this.props.title}</p>
          </div>
          <div className="thumbnail" style={{backgroundImage: "url(" + this.props.thumbnail + ")"}}>
            <div className="type">{this.props.type}</div>
          </div>
        </a>
      </li>
    );
  }
});

var MePage = React.createClass({
  mixins: [TeachAPIClientMixin],
  statics: {
    pageTitle: 'Me',
    pageClassName: 'me-page',
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
    this.loadMakes(this.state.page);
  },
  handleApiLogout: function() {
    this.setState({
      username: null
    });
  },
  loadMakes: function(page) {
    var url = makeapiURL + this.state.username + '&page=' + page;
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
    this.loadMakes(data.selected);
  },
  render: function() {
    if (!this.state.username) {
      return (
        <div className="inner-container">Please log in</div>
      );
    }

    var makes = this.state.makes.map(function(make,i) {
      // need a fallback thumbnail url
      var thumbnail = make.thumbnail || '';
      var type = make.contentType.replace(/application\/x\-/g, '');
      return (
        <Make thumbnail={thumbnail}
              type={type}
              url={make.url}
              title={make.title}
              updatedAt={make.updatedAt}
              numLikes={make.likes.length}
              key={i} />
      );
    });

    return (
      <div className="inner-container">
        <h1>{this.state.username}, these are your makes:</h1>
        <ul className="makes-list">
          { makes }
        </ul>
      </div>
    );
  }
});

module.exports = MePage;
