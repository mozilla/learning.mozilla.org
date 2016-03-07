var React = require('react');
var WpContentLoader = require('react-wp-content-loader');

// [TODO] 404 needs to be handled properly. Now we just make all the 
//        non-component pages as wp-pages
var WpContent = React.createClass({
  render: function() {
    return (
      <WpContentLoader wpUrl="teachmozillaorg.wordpress.com" wpPostSlug={this.props.params.wpSlug} />
    );
  }
});

module.exports = WpContent;
