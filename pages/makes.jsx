var React = require('react');
var request = require('superagent');
var moment = require('moment');
var urlTemplate = require('url-template');
var FormattedRelative = require('react-intl').FormattedRelative;
var FormattedMessage = require('react-intl').FormattedMessage;

var withTeachAPI = require('../hoc/with-teach-api.jsx');

var config = require('../config/config');

var makesMetadataURL = urlTemplate.parse(config.MAKE_METADATA_URL);

var Make = React.createClass({
  render: function() {
    var makeTypeClass = "make " + this.props.type;
    var thumbnailStyle = (this.props.thumbnail) ? {"backgroundImage": "url(" + this.props.thumbnail + ")"}
                                                 : {"backgroundImage": "url(/img/pages/me/svg/icon-placeholder.svg)",
                                                    "backgroundSize": "11rem auto"};
    return (
      <li className={makeTypeClass}>
        <a target="_blank" href={this.props.url}>
          <div className="meta">
            <p className="details"><FormattedMessage id="updated_relative_time" values={{relativeTime: (<FormattedRelative value={this.props.updatedAt} />)}}/></p>
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


var MakesPage = React.createClass({
  statics: {
    pageTitle: 'Me',
    pageClassName: 'me-page',
    teachAPIEvents: {
      'username:change': 'forceUpdate',
      "login:success": "handleApiLoginSuccess",
      "logout": "handleApiLogout"
    }
  },
  contextTypes: {
    intl: React.PropTypes.object
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
      username: this.props.teachAPI.getUsername()
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
  formMakeJSX: function(make) {
    return (
      <Make thumbnail={make.thumbnail}
            type={make.contentType.replace(/application\/x\-/g, '')}
            url={make.url}
            title={make.title}
            updatedAt={make.updatedAt}
            key={make.title} />
    );
  },
  render: function() {
    var formatMessage = this.context.intl.formatMessage;
    var pageContent;
    if (!this.state.username) {
      pageContent = <span>{formatMessage({id: 'please_sign_in'})}</span>;
    } else if (this.state.loadingMakes) {
      pageContent = <div className="loading-message">{formatMessage({id: 'loading_projects'})}</div>;
    } else {
      var makes = this.state.makes.reverse().map(this.formMakeJSX);
      pageContent = (
        <div>
          <p className="context">{formatMessage({id: 'makes_projects_context'})}</p>
          <h1><FormattedMessage id="these_are_your_projects" values={{ username: this.state.username }} /></h1>
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


module.exports = withTeachAPI(MakesPage);
