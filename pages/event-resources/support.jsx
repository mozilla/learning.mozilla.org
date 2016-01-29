var React = require('react');
var ImageTag= require('../../components/imagetag.jsx');
var config = require('../../config/config');

module.exports = (
  <div className="event-support-container">
    <div className="event-support-panel">
      <ImageTag
        width={399} height={254}
        src1x="/img/pages/event-resources/ask-the-community-image.png"
        src2x="/img/pages/event-resources/ask-the-community-image@2x.png"
        alt="ask the community image"/>
      <h3 className="event-support-header">Ask The Community</h3>
      <p>
        We have a large, global community of people like you who have hosted events and have lots of advice to share. Visit our <a href="https://discourse.webmaker.org/c/events">discussion forum</a> to ask questions or share your own advice and experience with others.
      </p>
    </div>
    <div className="event-support-panel">
      <ImageTag
        width={399} height={254}
        src1x="/img/pages/event-resources/request-support-image.png"
        src2x="/img/pages/event-resources/request-support-image@2x.png"
        alt="request support image"/>
      <h3 className="event-support-header">Request Support</h3>
      <p>
        Still can't find an answer to your question? Our team is here to help you with all things Maker Party. <a href={"mailto:"+config.TEACH_THE_WEB_EMAIL}>Contact us</a> and we will get back to you as soon as possible.
      </p>
    </div>
  </div>
);
