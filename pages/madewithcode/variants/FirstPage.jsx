var React = require('react');
var createVariant = require('./Variant.jsx');
var config = require('../../../config/config');

var MadeWithCodeFirstWebPage = createVariant({
  statics: {
    pageTitle: 'Made with Code - First Web Page',
    pageClassName: 'madewithcode-firstwebpage'
  },
  title: "Make your first web page",
  introText: (
   <div>
      <p>
        <strong>You’ve probably seen hundreds (if not thousands) of web pages.</strong> All
        of them are written in a language called <em>HTML</em>.
      </p>
      <p>
        <strong>It’s easy to start messing around with HTML.</strong> In this activity, you’ll
        make a basic web page in about 60 seconds or less, using <a href={config.THIMBLE}>Thimble</a>, Mozilla’s free HTML power tool.
      </p>
    </div>
  ),
  sampleMake: {
    title: "Make Your First Web Page",
    detailsUrl: "https://mozilla.makes.org/thimble/MTU1OTAzNTkwNA==/make-your-first-web-page",
    description: "Write your very first bit of HTML! It's easy.",
    imgSrc1x: "/img/pages/madewithcode/fireworks.jpg",
    imgSrc2x: "/img/pages/madewithcode/fireworks@2x.jpg"
  },
  remixUrl: "https://thimble.mozilla.org/projects/17084/remix",
  steps: [
    <div>
      <p><strong>Click the “REMIX” button.</strong> This will open Thimble. You’ll see a simple web page we created to get you started. The code is on one side, the page preview is on the other.</p>
    </div>
    ,
    <div>
      <p><strong>Follow the steps.</strong> The tutorial will walk you through how to make changes to the code.</p>
    </div>
  ],
  // FIXME: these next two values should come from some master "activities" list, where
  //        this component can ask for what the "next" values are, without knowing anything else.
  nextTitle: "make a meme",
  linkPath: "../madewithcode-meme"
});

module.exports = MadeWithCodeFirstWebPage;
