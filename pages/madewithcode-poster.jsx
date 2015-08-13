var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var MadeWithCodeIntro = require('../components/madewithcode-intro.jsx');
var SampleMake = require('../components/madewithcode-sample-make.jsx');
var Instructions = require('../components/madewithcode-instructions.jsx');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/config');

var InstructionSection = React.createClass({
  render: function() {
    var remixUrl = "https://thimble.webmaker.org/project/60767/remix";
    var step1 = (
      <div>
        <p><strong>Click the “remix” button.</strong> This will open Thimble. You’ll see a placeholder movie poster to help you get started.</p>
      </div>
    );
    var step2 = (
      <div>
        <p><strong>Follow the steps.</strong> The tutorial will walk you through how to swap in your own text, images and style.</p>
      </div>
    );
    return (
      <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <SampleMake title="Make a Movie Poster"
                      remixUrl={remixUrl}
                      detailsUrl="https://mozilla.makes.org/thimble/MTYwOTM2NzU1Mg==/make-a-movie-poster"
                      description="Create a movie poster. Learn a little HTML. Level: Intermediate."
                      imgSrc1x="/img/pages/madewithcode/sunset.jpg"
                      imgSrc2x="/img/pages/madewithcode/sunset@2x.jpg"


          />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <Instructions remixUrl={remixUrl}
                        step1={step1}
                        step2={step2}
                        nextActivityTitle="make your first web page"
                        nextActivityLinkName="madewithcode-firstwebpage"
          />
        </div>
      </div>
    );
  }
});

var MadeWithCodePoster = React.createClass({
  statics: {
    pageTitle: 'Made with Code - Poster',
    pageClassName: 'madewithcode-poster'
  },
  render: function() {
    var introText = (
      <div>
        <p>
          <strong>Seen a movie or read any good books lately?</strong> Make a web page with your glowing (or vicious) review. Learn a little code along the way.
        </p>
      </div>
    );
    return (
      <div>
        <div className="inner-container">
          <section>
            <MadeWithCodeIntro  title="Make a movie poster"
                                introText={introText}
            />
          </section>
          <section>
            <InstructionSection />
          </section>
        </div>
      </div>
    );
  }
});


module.exports = MadeWithCodePoster;
