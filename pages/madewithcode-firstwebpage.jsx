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
    var remixUrl = "https://thimble.mozilla.org/projects/17084/remix";
    var step1 = (
      <div>
        <p><strong>Click the “remix” button.</strong> This will open Thimble. You’ll see a simple web page we created to get you started. The code is on one side, the page preview is on the other.</p>
      </div>
    );
    var step2 = (
      <div>
        <p><strong>Follow the steps.</strong> The tutorial will walk you through how to make changes to the code.</p>
      </div>
    );
    return (
      <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <SampleMake title="Make Your First Web Page"
                      remixUrl={remixUrl}
                      detailsUrl="https://mozilla.makes.org/thimble/MTU1OTAzNTkwNA==/make-your-first-web-page"
                      description="Write your very first bit of HTML! It's easy."
                      imgSrc1x="/img/pages/madewithcode/fireworks.jpg"
                      imgSrc2x="/img/pages/madewithcode/fireworks@2x.jpg"


          />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <Instructions remixUrl={remixUrl}
                        step1={step1}
                        step2={step2}
                        nextActivityTitle="make a meme"
                        nextActivityLinkName="madewithcode-meme"
          />
        </div>
      </div>
    );
  }
});

var MadeWithCodeFirstWebPage = React.createClass({
  statics: {
    pageTitle: 'Made with Code - First Web Page',
    pageClassName: 'madewithcode-firstwebpage'
  },
  render: function() {
    var introText = (
      <div>
        <p>
          <strong>You’ve probably seen hundreds (if not thousands) of web pages.</strong> All of them are written in a language called <em>HTML</em>.
        </p>
        <p>
          <strong>It’s easy to start messing around with HTML.</strong> In this activity, you’ll make a basic web page in about 60 seconds or less, using <a href={config.THIMBLE}>Thimble</a>, Mozilla’s free HTML power tool.
        </p>
      </div>
    );
    return (
      <div>
        <div className="inner-container">
          <section>
            <MadeWithCodeIntro  title="Make your first web page"
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


module.exports = MadeWithCodeFirstWebPage;
