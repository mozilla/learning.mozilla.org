var React = require('react');
var createVariant = require('./Variant.jsx');

var MadeWithCodePoster = createVariant({
  statics: {
    pageTitle: 'Made with Code - Poster',
    pageClassName: 'madewithcode-poster'
  },
  title: "Make a movie poster",
  introText: (
    <div>
      <p>
        <strong>Seen a movie or read any good books lately?</strong> Make a web page
        with your glowing (or vicious) review. Learn a little code along the way.
      </p>
    </div>
  ),
  sampleMake: {
    title: "Make a Movie Poster",
    detailsUrl: "https://mozilla.makes.org/thimble/MTYwOTM2NzU1Mg==/make-a-movie-poster",
    description: "Create a movie poster. Learn a little HTML. Level: Intermediate.",
    imgSrc1x: "/img/pages/madewithcode/sunset.jpg",
    imgSrc2x: "/img/pages/madewithcode/sunset@2x.jpg"
  },
  remixUrl: "https://thimble.mozilla.org/projects/17071/remix",
  steps: [
    <div>
      <p><strong>Click the “REMIX” button.</strong> This will open Thimble. You’ll see a placeholder movie poster to help you get started.</p>
    </div>,
    <div>
      <p><strong>Follow the steps.</strong> The tutorial will walk you through how to swap in your own text, images and style.</p>
    </div>
  ],
  // FIXME: these next two values should come from some master "activities" list, where
  //        this component can ask for what the "next" values are, without knowing anything else.
  nextTitle: "make your first web page",
  linkPath: "/activities/madewithcode-firstwebpage"
});

module.exports = MadeWithCodePoster;
