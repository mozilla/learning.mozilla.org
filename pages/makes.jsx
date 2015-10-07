var React = require("react");
var request = require("superagent");
var moment = require('moment');

var TeachAPIClientMixin = require("../mixins/teach-api-client");
var config = require("../lib/config");

var makeapiURL = config.MAKEAPI_ORIGIN + "/api/20130724/make/search?sortByField=updatedAt&limit=20&user=";

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
      'username:change': 'forceUpdate',
      "login:success": "handleApiLoginSuccess",
      "logout": "handleApiLogout"
    }
  },
  getInitialState: function() {
    return {
      username: null,
      page: 0,
      makes: [],
      loadingMakes: false,
      makesLoaded: false
    };
  },
  componentDidMount: function() {
    if (!this.state.username) {
      this.getUsernameAndLoadMakes();
    } 
  },
  handleApiLoginSuccess: function() {
    this.getUsernameAndLoadMakes();
  },
  handleApiLogout: function() {
    this.setState({
      username: null
    });
  },
  getUsernameAndLoadMakes: function() {
    this.setState({
      username: this.getTeachAPI().getUsername()
    }, function() {
      this.loadMakes(this.state.page);
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
          loadingMakes: false,
          loadError: false
        });
      }.bind(this));
  },
  handlePageClick: function(data) {
    this.loadMakes(data.selected);
  },
  render: function() {
    var pageContent;

    if (!this.state.username) {
      pageContent = <span className="hello">Please sign in.</span>;
    } else if (this.state.loadingMakes) {
      pageContent = <span className="world">Loading Makes...</span>;
    } else {
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
      pageContent = (
        <div>
          <h1>{this.state.username}, these are your makes:</h1>
          <ul className="makes-list">
            { makes }
          </ul>
        </div>
      );
    }
    return (
      <div className="inner-container">
        <section>
          {pageContent}
        </section>
      </div>
    );
  }
});

module.exports = MePage;
