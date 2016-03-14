var React = require('react');
var WpContentLoader = require('react-wp-content-loader');
var ImageTag = require('../components/imagetag.jsx');

var NotFoundMessage = function(props) { 
  return (
    <div classname="not-found">
      <ImageTag width={500}
                height='auto'
                src1x='/img/pages/not-found/book_singlepageflip.gif' />
      <p>some error messages here</p>
    </div>
  );
};


var WpContent = function(props) { 
  return (
    <WpContentLoader wpUrl="teachmozillaorg.wordpress.com" wpPostSlug={props.params.wpSlug}>
      <NotFoundMessage/>
    </WpContentLoader>
  );
};

module.exports = WpContent;
