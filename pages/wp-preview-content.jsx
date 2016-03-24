var React = require('react');
var WpContentLoader = require('../lib/wp-preview.jsx');
var NotFoundMessage = require('../components/not-found.jsx');

var config = require('../config/config');

var WpContent = function(props) {
  return (
    <div className="wp-content">
      <div className="inner-container">
        <WpContentLoader wpUrl={config.WORDPRESS_SITE_URL} wpPostSlug={props.params.preview_id}>
          <NotFoundMessage/>
        </WpContentLoader>
      </div>
    </div>
  );
};

module.exports = WpContent;
