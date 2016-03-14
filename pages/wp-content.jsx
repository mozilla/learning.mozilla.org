var React = require('react');
var WpContentLoader = require('react-wp-content-loader');
var NotFoundMessage = require('../components/not-found.jsx');

var WpContent = function(props) { 
  return (
    <WpContentLoader wpUrl="teachmozillaorg.wordpress.com" wpPostSlug={props.params.wpSlug}>
      <NotFoundMessage/>
    </WpContentLoader>
  );
};

module.exports = WpContent;
