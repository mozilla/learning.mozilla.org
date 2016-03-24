var React = require('react');
var request = require('superagent');
var NotFoundMessage = require('../components/not-found.jsx');

var WORDPRESS_COM_API_ENDPOINT_BASE = 'http://calypso.localhost:3000/proxy/';

var ReactWpContentLoader = React.createClass({
  wpApiEndpoint: null,
  propTypes: {
    wpUrl: React.PropTypes.string.isRequired,
    wpPostSlug: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      hasLoaded: false,
      failedToLoad: false,
      fourOhFour: false
    };
  },
  componentDidMount: function() {
    this.wpApiEndpoint = WORDPRESS_COM_API_ENDPOINT_BASE + this.props.wpPostSlug;
    console.log( this.wpApiEndpoint)
    console.log('/// this.wpApiEndpoint = ', this.wpApiEndpoint);
    this.getContent();
  },
  getContent: function() {
    var that = this;
    request
      .get(that.wpApiEndpoint)
      .withCredentials()
      .accept('json')
      .end(function(err, res) {
        console.log(err)
        if( err ) {
          that.setState({fourOhFour: true});
        }
        if ( err || res.statusCode !== 200 ) {
          console.log('error: ', err);
          that.content = 'Oops, unable to load Wordpress post.';
          that.setState({failedToLoad: true});
        } else {
          that.content = JSON.parse(res.text).content;
        }
        that.setState({hasLoaded: true});
      });
  },
  render: function() {
    var classname = this.state.failedToLoad ? 'error' : '';
    var content = (<p>Loading...</p>);
    if (this.state.hasLoaded) {
      content = (<div className={classname} dangerouslySetInnerHTML={{__html: this.content}} />);
    }
    if (this.state.fourOhFour) {
      content = <NotFoundMessage/>
    }
    return (
      <div>
        { content }
      </div>
    );
  }
});

module.exports = ReactWpContentLoader;
