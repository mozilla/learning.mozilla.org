var React = require('react');
var GoogleBlogFeedLoader = require('../../lib/google-blog-feed-loader');

var jsonToDataURL = function(obj) {
  var base64 = new Buffer(JSON.stringify(obj, null, 2)).toString('base64');
  return 'data:application/json;charset=utf-8;base64,' + base64;
};

var GoogleBlogFeedLoaderTest = React.createClass({
  getInitialState: function() {
    return {
      results: [],
      scriptTagCount: 0
    };
  },
  checkStatus: function() {
    var scriptTagCount = 0;

    for (var i = 0; i < document.scripts.length; i++) {
      if (document.scripts[i].src === GoogleBlogFeedLoader.SCRIPT_SRC) {
        scriptTagCount++;
      }
    }

    this.setState({
      scriptTagCount: scriptTagCount
    });
  },
  componentDidMount: function() {
    this.interval = window.setInterval(this.checkStatus, 1000);
    this.checkStatus();
  },
  componentWillUnmount: function() {
    window.clearInterval(this.interval);
  },
  handleLoadClick: function() {
    GoogleBlogFeedLoader(function(results) {
      this.checkStatus();
      this.setState({
        results: this.state.results.concat([{
          dataURL: jsonToDataURL(results),
          timestamp: new Date()
        }])
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <h3>Google Blog Feed Loader</h3>
        <p><small>
          Google script tags loaded: <code>{this.state.scriptTagCount}</code> (should never be &gt; 1)
        </small></p>
        <button className="btn btn-default btn-xs" onClick={this.handleLoadClick}>
          Load Blog Posts
        </button>
        <ul>
          {this.state.results.map(function(result, i) {
            return (
              <li key={i}>
                <a href={result.dataURL} target="_blank">
                  JSON data received @ {result.timestamp.toString()}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = GoogleBlogFeedLoaderTest;
