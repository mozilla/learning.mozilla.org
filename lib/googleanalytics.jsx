var React = require('react');
var config = require('./config');

var GoogleAnalyticsBasicTag = React.createClass({
  render: function() {
    if (config.GA_ACCOUNT) {
      return (
        <script dangerouslySetInnerHTML={{
          __html: "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ \
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), \
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) \
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); \
                  \
                  ga('create', '" + config.GA_ACCOUNT + "', 'auto');"
        }}></script>
      );
    } else {
      return (
        <script dangerouslySetInnerHTML={{
          __html: "// GA_ACCOUNT not set in config.js"
        }}></script>
      );
    }
  }
});

module.exports = GoogleAnalyticsBasicTag;
