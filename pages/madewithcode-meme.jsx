var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var MadeWithCodeIntro = require('../components/madewithcode-intro.jsx');
var SampleMake = require('../components/madewithcode-sample-make.jsx');
var Instructions = require('../components/madewithcode-instructions.jsx');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/build/config');

var InstructionSection = React.createClass({
  render: function() {
    var remixUrl = "https://thimble.mozilla.org/projects/17083/remix";
    var step1 = (
      <div>
        <p><strong>Click the “remix” button.</strong> This will open Thimble. You’ll see a simple meme we created to get you started.</p>
      </div>
    );
    var step2 = (
      <div>
        <p><strong>Follow the steps in the tutorial.</strong> The tutorial will walk you through how to make changes to the code.</p>
      </div>
    );
    return (
      <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <SampleMake title="Meme Maker"
                      remixUrl={remixUrl}
                      detailsUrl="https://mozilla.makes.org/thimble/MTU5MjU5MDMzNg==/meme-maker"
                      description="Use a little HTML to swap in your own image and caption. Easy! Level: Beginner."
                      imgSrc1x="/img/pages/madewithcode/doge.jpg"
                      imgSrc2x="/img/pages/madewithcode/doge@2x.jpg"


          />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <Instructions remixUrl={remixUrl}
                        step1={step1}
                        step2={step2}
                        nextActivityTitle="make a movie poster"
                        nextActivityLinkName="madewithcode-poster"
          />
        </div>
      </div>
    );
  }
});

var MadeWithCodeMeme = React.createClass({
  statics: {
    pageTitle: 'Made with Code - Meme',
    pageClassName: 'madewithcode-meme'
  },
  render: function() {
    var introText = (
      <div>
        <p>
          <strong>A “meme” is something that’s shared on the internet, and it usually has three parts:</strong> A “meme” is something that’s shared on the internet, and it usually has three parts: a picture, a caption, and a dash of humor. In this activity, you’ll make your own meme using a bit of HTML and your own creativity. <a href={config.THIMBLE}>Thimble</a>, Mozilla’s code editor, makes it easy.
        </p>
      </div>
    );
    return (
      <div>
        <div className="inner-container">
          <section>
            <MadeWithCodeIntro  title="Let’s make a meme"
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


module.exports = MadeWithCodeMeme;
