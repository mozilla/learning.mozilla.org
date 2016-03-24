var React = require('react');
var WpContentLoader = require('react-wp-content-loader');
var NotFoundMessage = require('../components/not-found.jsx');

var config = require('../config/config');

var WpContent = function(props) { 
  return (
    <div className="wp-content-wrapper">
      <div className="inner-container">
        <WpContentLoader wpUrl={config.WORDPRESS_SITE_URL} wpPostSlug={props.params.wpSlug}>
          <NotFoundMessage/>
        </WpContentLoader>
      </div>
    </div>
  );
};

module.exports = WpContent;
