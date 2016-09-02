var React = require('react');
var createVariant = require('./Variant.jsx');
var config = require('../../../config/config');

var MadeWithCodeMeme = createVariant({
  statics: {
    pageTitle: 'Made with Code - Meme',
    pageClassName: 'madewithcode-meme'
  },
  title: "Let’s make a meme",
  introText: (
    <div>
      <p>
        <strong>A “meme” is something that’s shared on the internet, and it usually has
        three parts:</strong> A “meme” is something that’s shared on the internet, and it
        usually has three parts: a picture, a caption, and a dash of humor. In this activity,
        you’ll make your own meme using a bit of HTML and your own
        creativity. <a href={config.THIMBLE}>Thimble</a>, Mozilla’s code editor, makes it easy.
      </p>
    </div>
  ),
  sampleMake: {
    title: "Meme Maker",
    detailsUrl: "https://mozilla.makes.org/thimble/MTU5MjU5MDMzNg==/meme-maker",
    description: "Use a little HTML to swap in your own image and caption. Easy! Level: Beginner.",
    imgSrc1x: "/img/pages/madewithcode/doge.jpg",
    imgSrc2x: "/img/pages/madewithcode/doge@2x.jpg"
  },
  remixUrl: "https://thimble.mozilla.org/projects/17083/remix",
  steps: [
    <div>
      <p><strong>Click the “REMIX” button.</strong> This will open Thimble. You’ll see a simple meme we created to get you started.</p>
    </div>,
    <div>
      <p><strong>Follow the steps in the tutorial.</strong> The tutorial will walk you through how to make changes to the code.</p>
    </div>
  ],
  // FIXME: these next two values should come from some master "activities" list, where
  //        this component can ask for what the "next" values are, without knowing anything else.
  nextTitle: "make a movie poster",
  linkPath: "/activities/madewithcode-poster"
});

module.exports = MadeWithCodeMeme;
