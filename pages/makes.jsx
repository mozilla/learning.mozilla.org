var React = require('react');
var request = require('superagent');
var moment = require('moment');
var urlTemplate = require('url-template');

var TeachAPIClientMixin = require('../mixins/teach-api-client');
var config = require('../config/config');

var makesMetadataURL = urlTemplate.parse(config.MAKE_METADATA_URL);

var Make = React.createClass({
  render: function() {
    var makeTypeClass = "make " + this.props.type;
    var lastUpdatedFromNow = moment(new Date(this.props.updatedAt)).fromNow();
    var thumbnailStyle = (this.props.thumbnail) ? {"backgroundImage": "url(" + this.props.thumbnail + ")"}
                                                 : {"backgroundImage": "url(/img/pages/me/svg/icon-placeholder.svg)",
                                                    "backgroundSize": "11rem auto"};
    return (
      <li className={makeTypeClass}>
        <a target="_blank" href={this.props.url}>
          <div className="meta">
            <p className="details">Updated {lastUpdatedFromNow}</p>
            <p className="title">{this.props.title}</p>
          </div>
          <div className="thumbnail" style={thumbnailStyle}>
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
      this.loadMakes();
    });
  },
  loadMakes: function() {
    var url = makesMetadataURL.expand({username: this.state.username});
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
          var makes = JSON.parse(res.text);
        } catch(e) {
          return this.setState({
            loadError: true,
            loadingMakes: false
          });
        }
        this.setState({
          makes: makes,
          loadingMakes: false,
          loadError: false
        });
      }.bind(this));
  },
  render: function() {
    var pageContent;
    if (!this.state.username) {
      pageContent = <span>Please sign in.</span>;
    } else if (this.state.loadingMakes) {
      pageContent = <div className="loading-message">Loading projects</div>;
    }
    else {
      var makes = this.state.makes.reverse().map(function(make,i) {
        return (
          <Make thumbnail={make.thumbnail}
                type={make.contentType.replace(/application\/x\-/g, '')}
                url={make.url}
                title={make.title}
                updatedAt={make.updatedAt}
                key={i} />
        );
      });
      pageContent = (
        <div>
          <p className="context">In the fall of 2015, we retired Popcorn Maker and Appmaker, as well as older versions of Thimble and X-Ray Goggles. Any projects you created with these tools are still accessible below. Projects created with the new X-Ray Goggles, Thimble, or Webmaker are accessible through those respective platforms.</p>
          <h1>{this.state.username}, these are your projects:</h1>
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
