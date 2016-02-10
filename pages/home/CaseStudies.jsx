var React = require('react');
var Blockquote = require('../../components/blockquote.jsx');

module.exports = (
  <div className="row">
    <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
      <div>
        <Blockquote author="Maurya C. New York, United States"
            imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png">
          <p>"Web literacy is about more than coding - it's about how you can be a better web citizen."</p>
        </Blockquote>
      </div>
    </div>
  </div>
);