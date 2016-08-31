var React = require('react');
var MakerPartyExample = require('./MakerPartyExample.jsx');

var partiesList = [
  {
    title: "Net Neutrality Maker Party",
    host: {
      name: "David",
      link: "https://twitter.com/DGuarch",
      description: "a community member"
    },
    location: "A private home in Barcelona, Spain",
    participants: "David and his family",
    descriptionHTML: "Participants learned about the importance of Net Neutrality, and considered how to take action. They used Thimble to create Net Neutrality-themed memes.",
    src1x: "/img/pages/events/nn-maker-party.png",
    src2x: "/img/pages/events/nn-maker-party@2x.png",
  },
  {
    title: "Make and Remake Hackathon",
    host: {
      name: "Digital Harbor",
      description: "local community organization",
      link: "http://www.digitalharbor.org/"
    },
    location: "Makerspace in Baltimore, MD",
    participants: "Twenty teens",
    descriptionHTML: "At the Make and Remake Hackathon Day attendees spent the first half of the day using Webmaker tools to <em>make</em> something awesome. In the second half of the Hackathon individuals then turned their completed makes over to a friend so they could then <em>remake</em> their make to create something new.",
    src1x: "/img/pages/events/make-remake-hackathon.png",
    src2x: "/img/pages/events/make-remake-hackathon@2x.png"
  },
  {
    title: "Lo-Fi Maker Party",
    host: {
      name: "Mozilla Indonesia",
      link: "https://www.mozilla.org/contact/communities/indonesia/"
    },
    location: "Park in Jakarta, Indonesia",
    descriptionHTML: "At this Lo-Fi Maker Party, participants used paper, Post-it's and tennis balls to learn basic HTML and website structure, simple programming commands and app design.",
    src1x: "/img/pages/events/lofi-maker-party.png",
    src2x: "/img/pages/events/lofi-maker-party@2x.png"
  }
];

var parties = partiesList.map(function(party) {
  return(
    <MakerPartyExample {...party} key={party.title} />
  );
});

module.exports = <div>{parties}</div>;
