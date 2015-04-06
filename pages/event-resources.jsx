var React = require('react');
var ImageTag = require('../components/imagetag.jsx');

var LinksContainer = React.createClass({
  render: function() {
    return (
      <div className="row">{this.props.children}</div>
    );
  }
});
var PageLinker = React.createClass({
  render: function() {
    return (
      <div className="page-linker col-sm-3 col-md-3 col-lg-3">
        <a href={this.props.href}>{this.props.head}</a>
        {this.props.children}
      </div>
    );
  }
});
var EventItem = React.createClass({
  render: function() {
    return (
      <div className="event-item">
        <div className="event-icon">
          <div className="participants-number">{this.props.participants}</div>
          <div className="participants-label">PARTICIPANTS</div>
        </div>
        <div className="event-content">
          <div className="event-item-header">{this.props.head}</div>
          <div className="event-item-subheader">{this.props.subHead}</div>
          <p className="event-item-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
});
var LogoAsset = React.createClass({
  render: function() {
    return (
      <div className="logo-asset-container col-sm-4 col-md-4 col-lg-3">
        <div className="logo-asset-header">{this.props.head}</div>
        <ImageTag className="logo-asset-img"
        width={200} height={200}
        src1x={this.props.src1x} src2x={this.props.src2x}
        alt={this.props.alt}/>
        <div className="logo-asset-hover">
          <div className="logo-asset-center">{this.props.children}</div>
        </div>
      </div>
    );
  }
});
var LogoAssetLink = React.createClass({
  render: function() {
    return (
      <a className="logo-asset-link" href={this.props.href}><span className="ion ion-ios-copy"></span>{this.props.children}</a>
    );
  }
});
var RemixLink = React.createClass({
  render: function() {
    return (
      <a className="remix-link" href={this.props.href}>Remix</a>
    );
  }
});
var Tabulator = React.createClass({
  getInitialState: function() {
    return {
      activeClass: "tab-0"
    };
  },
  propTypes: {
    tabs: React.PropTypes.array
  },
  showTab: function(activeTab) {
    this.setState({
      activeClass: activeTab
    });
  },
  render: function() {
    var tabulator = this;
    var className = "tabulator";
    if (this.state.activeClass) {
      className += " " + this.state.activeClass;
    }
    return (
      <div className={className}>
        <div>
          {this.props.tabs.map(function (section, key) {
            function onClick(e) {
              tabulator.showTab("tab-" + key);
            }
            var className = "tabulator-head col-sm-3 col-md-3 col-lg-3";
            className += " tab-" + key;
            return (
              <div onClick={onClick} className={className} key={key}>{section.head}</div>
            );
          })}
        </div>
        {this.props.tabs.map(function (section, key) {
          var className = "tabulator-content-container";
          className += " tab-" + key;
          return (
            <div key={key}>
              <div className="tabulator-head-no-js">{section.head}</div>
              <div className={className}>
                <div className="tabulator-content">
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});
var EventDetail = React.createClass({
  render: function() {
    return (
      <div>
        <div className="event-detail-head col-sm-3 col-md-3 col-lg-3">{this.props.head}</div>
        <div className="event-detail-content col-sm-9 col-md-9 col-lg-9">{this.props.children}</div>
      </div>
    );
  }
});

var EventsResources = React.createClass({
  statics: {
    pageClassName: 'event-resources'
  },
  render: function() {
    return (
      <div className="inner-container">
        <h1>Event Resources</h1>
        <p>That you for helping us celebrate webmaking around the world! These resources will help you plan a unique event tailored especially for your audience.</p>

        <LinksContainer>
          <PageLinker head="event guides" href="#event-guides">
            <p></p>
          </PageLinker>
          <PageLinker head="logos & assets" href="#logo-assets">
            <p></p>
          </PageLinker>
          <PageLinker head="event details" href="#event-details">
            <p></p>
          </PageLinker>
          <PageLinker head="event support" href="#event-support">
            <p></p>
          </PageLinker>
        </LinksContainer>

        <h2 id="event-guides">Event Guides</h2>
        <p>No matter the size of your event, we have a guide for you.</p>

        <EventItem participants="2-5"
          head="small event"
          subHead="Perfect for 2 to 5 participants"
          content="A fun way to spend an hour on a rainy day, hang out as a family, learn to hack with a friend, and make cool things on the web."
        />
        <EventItem participants="5-50"
          head="medium event"
          subHead="Great for 5 to 50 participants"
          content="A fantastic way to team up people with different skill-sets to collaboratively build something new or improve something existing on the web, all while learning and teaching new skills."
        />
        <EventItem participants="50+"
          head="large event"
          subHead="For those ready for the adventure of 50+ participants"
          content="A rewarding way to bring together local organizations in a science fair setting to demonstrate cool web ideas, provice fun hands-on activities, and introduce your community to making and hacking."
        />

        <h2 id="logo-assets">Logos & Assets</h2>
        <p>Feel free to use these Maker Party graphics in any of you promotional materials:</p>

        <div className="row">
          <LogoAsset head="Maker Party Logo"
          alt="Maker Party Logo Image"
          src1x="/img/event-resources-page/resource-thumbnails-01.png"
          src2x="/img/event-resources-page/resource-thumbnails-01@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyLogo.eps">Download EPS</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyLogo.png">Download PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Brand Palette"
          alt="Brand Palette Image"
          src1x="/img/event-resources-page/resource-thumbnails-03.png"
          src2x="/img/event-resources-page/resource-thumbnails-03@2x.png">
            <LogoAssetLink href="">Download EPS</LogoAssetLink>
            <LogoAssetLink href="">Download PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Poster"
          alt="Poster Image"
          src1x="/img/event-resources-page/resource-thumbnails-07.png"
          src2x="/img/event-resources-page/resource-thumbnails-07@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyBanner.eps">Download EPS</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyBanner.png">Download PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Desktop Wallpaper"
          alt="Desktop Wallpaper Image"
          src1x="/img/event-resources-page/resource-thumbnails-10.png"
          src2x="/img/event-resources-page/resource-thumbnails-10@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyWallpaper-1-320x480.jpg">320px x 480px</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyWallpaper-1-640x1136.jpg">640px x 1136px</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyWallpaper-1-768x1280.jpg">768px x 1280px</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyWallpaper-1-1920x1200.jpg">1920px x 1200px</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyWallpaper-1-2560x1440.jpg">2560px x 1440px</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Certificate"
          alt="Certificate Image"
          src1x="/img/event-resources-page/resource-thumbnails-08.png"
          src2x="/img/event-resources-page/resource-thumbnails-08@2x.png">
            <RemixLink href="https://makerparty2014.makes.org/thimble/LTEzNDM3NTAxNDQ=/maker-party-love-bomb">Download EPS</RemixLink>
          </LogoAsset>
          <LogoAsset head="Table Cloth Design"
          alt="Table Cloth Design Image"
          src1x="/img/event-resources-page/resource-thumbnails-04.png"
          src2x="/img/event-resources-page/resource-thumbnails-04@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyTableClothDesign.eps">Download EPS</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyTableClothDesign.png">Download PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="Buttons"
          alt="Buttons Image"
          src1x="/img/event-resources-page/resource-thumbnails-06.png"
          src2x="/img/event-resources-page/resource-thumbnails-06@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyButtons.eps">Download EPS</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/MakerPartyButtons.png">Download PNG</LogoAssetLink>
          </LogoAsset>
          <LogoAsset head="KUMI Papertoy"
          alt="KUMI Papertoy Image"
          src1x="/img/event-resources-page/resource-thumbnails-09.png"
          src2x="/img/event-resources-page/resource-thumbnails-09@2x.png">
            <LogoAssetLink href="https://party.webmaker.org/party-resources/KUMI-Papertoy-yellow.pdf">Yellow T-sirt</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/KUMI-Papertoy-blue.pdf">Teal T-shirt</LogoAssetLink>
            <LogoAssetLink href="https://party.webmaker.org/party-resources/KUMI-Papertoy-blank-tees.pdf">Design Your Own T-shirt</LogoAssetLink>
          </LogoAsset>
        </div>

        <h2 id="event-details">Event Details</h2>
        <p>There are many details to consider when planning your event. Here's a list of what you need to know:</p>

        <Tabulator tabs={[
          {
            "head": "the basics",
            "content": (
              <div>
                <EventDetail head="Find a Venue">
                  <div>
                    Look for a comfortable, flexible space that's appropriate for the number of participants you expect. Contact local community spaces, museums, hackerspaces, coworking spaces, organizations, libraries, schools, or coffee shops to see if that have space available for events. Send them information on your event, the missions and what you hope to achieve and offer opportunities for their community to attend. Ensure there is reliable internet, enough power outlests and good lighting.
                  </div>
                </EventDetail>
                <EventDetail head="Prepare Equipment">
                  <div>
                    Create a list of what equipment you need for your event. Check out the event space ahead of time to learn what additional items you might need to buy or bring. If learners need to supply their own equipment, like laptops, make sure this is communicated clearly ahead of time. Also reach out to your venue, mentors or other local organizations to see if they can lend equipment.
                  </div>
                </EventDetail>
                <EventDetail head="Gather Materials">
                  <div>
                    Since we know there will be not-taking, brainstorming and making, you are going to need some materials. have a sign-up sheet, name tags, post-it notes, pens and paper easily accessible. Prepare any other materials you will need ahead of time and set a table aside at the event where learners can grab materials as needed.
                  </div>
                </EventDetail>
                <EventDetail head="Make Some Gear">
                  <div>
                    Use this logo to create Maker Party t-shirts at your local print shop. Here's an example of what your shirts could look like. Don't have all the budget for printing? Ask participants to bring their own shirts and create Maker Party t-shirts with this activity. You can also pring these certificates to give to the participants at the event that successfully complete the activities.
                  </div>
                </EventDetail>
                <EventDetail head="All About The Wi-Fi">
                  <div>
                    Have you ever heard of an event with perfect Wi-Fi? Neither have we. Prepare for the worst and have a back-up plan in case you lose connection. There are also a lot of activities that require no Internet access. Print out a few activities and keep them with you just in case.
                  </div>
                </EventDetail>
              </div>
            )
          },
          {
            "head": "before event",
            "content": (
              <div>
                <EventDetail head="Add Your Event to the Map">
                  <div>
                    Once you have your location, date and time set, add your event to our global map so you can show it off to the world and get regular updates.
                  </div>
                </EventDetail>
                <EventDetail head="Recruit Mentors">
                  <div>
                    Whether they’re colleagues, students or a group of talented friends, you can find volunteer mentors by tapping into your own networks. Provide them a Sample Volunteer Package with information on the event, activities, social media and any other necessary information in advance. Depending on how many volunteers you have, you might consider holding a meet-up in person or online prior to the event to answer any questions. Don't forget to gather and distribute contact information so that you can stay in touch with them in the days and weeks leading up to the event.
                  </div>
                </EventDetail>
                <EventDetail head="Promote Your Event">
                  <div>
                    Start spreading the word - share the link to your event so people can plan to  attend or share it with others. Local coffee shops, community places, listservs, mailing lists, social networks and forums are all great places to post details. Consider making a poster with event information.
                  </div>
                </EventDetail>
                <EventDetail head="Sign Up Learners">
                  <div>
                    Your event can be drop-in or require registration but make sure there is an effective way for individuals to indicate they are attending and can get access to event information. Having a rough idea of how many learners will attend will give you a better idea of how to prepare stations, materials and mentors.
                  </div>
                </EventDetail>
                <EventDetail head="Schedule">
                  <div>
                    Plan your schedule ahead of time but be flexible; your participants might surprise you with interesting questions or challenges to explore. A checklist of things you will need for set-up/during/after is very useful. Don't forget to leave yourself adequate prep and clean-up time.
                  </div>
                </EventDetail>
                <EventDetail head="Press">
                  <div>
                    Media coverage is an essential part of promoting an event and showing off what you accomplish. Use the Maker Party Press Kit for guidelines on how to reach out to local media (newspapers, blogs, local news shows). Our social media toolkit will also help you get more out of your posts online. Be sure to use hashtag #MakerParty. If your event is open to the public you may also want to invite community leaders and officials to attend.
                  </div>
                </EventDetail>
              </div>
            )
          },
          {
            "head": "during event",
            "content": (
              <div>
                <EventDetail head="Design a fun experience">
                  <div>
                    Your event should feel like a party! Create a welcoming, creative atmosphere that might include music, decorations and providing name tags. Starting your event with an offline activity or icebreaker such as a spectrogram is a great way to get everyone socializing. Raffles and challenges are good ways to keep the crowd engaged throughout the day.
                  </div>
                </EventDetail>
                <EventDetail head="Set-up">
                  <div>
                    When preparing for event, be sure to arrive early to set-up the space using this sample event checklist. This will allow you plenty of time in case unexpected issues arise. Use posters or other clear signage to indicate different activity stations. Make sure washrooms and exits are clearly marked. Remind facilitators to welcome newcomers, and make sure the volunteers know what their responsibilities are and who to ask if they have questions.
                  </div>
                </EventDetail>
                <EventDetail head="Activities">
                  <div>
                    Find activity kits and tools online that encourage hands-on making, collaborating and participation from your attendees. Here are some of ours to get you started.
                  </div>
                </EventDetail>
                <EventDetail head="Documentation">
                  <div>
                    Time flies when you’re having fun! It's often impossible to capture or get links of all the awesome things being made. Appoint a volunteer to be the photographer and make sure that activities are well-documented and that photos/video can be shared online. Use the #MakerParty hashtag so we can see them too.
                  </div>
                </EventDetail>
                <EventDetail head="Share-outs">
                  <div>
                    Set aside time for attendees to see each others' activities and exchange ideas. At the end of the event, bring everyone back together in a circle. Celebrate what participants made and invite a few people to share their work with the entire group.
                  </div>
                </EventDetail>
                <EventDetail head="Wrap-up">
                  <div>
                    You’re done! Make sure to check the event take down checklist to make sure you’ve covered your bases. Do your best to make sure the space is in the same condition (if not better) than when you arrived.
                  </div>
                </EventDetail>
              </div>
            )
          },
          {
            "head": "after event",
            "content": (
              <div>
                <EventDetail head="Feedback">
                  <div>
                    Ask participants for feedback. What did they learn? What did they enjoy? If they have suggestions for improvement, be sure to take notes or invite them to blog about it.  Provide links to websites where they can continue learning new skills. Later, conduct a debrief with participating organizations and volunteers, so your next event can be even better. 
                  </div>
                </EventDetail>
                <EventDetail head="Share what you learned">
                  <div>
                    Post pictures of your event on Twitter and Flickr using the hashtag #MakerParty or write a blog post using our sample guidelines to share a deeper reflection.
                  </div>
                </EventDetail>
                <EventDetail head="Thank you’s">
                  <div>
                    Send a heartfelt "Thank you!" to participating organizations, volunteers, facilitators, participants, partners, the venue and anyone else who helped make your event a success. Include photos, videos and links to the work that was created. Ask for feedback on the event and discuss next steps to getting involved, learning more or hosting a future event.
                  </div>
                </EventDetail>
              </div>
            )
          }
        ]}/>

        <h2 id="event-support">Event Support</h2>
        <p>Get help from the community and our staff.</p>

        <div className="event-support-container">
          <div className="event-support-panel">
            <ImageTag
            width={399} height={254}
            src1x="/img/event-resources-page/ask-the-community-image.png"
            src2x="/img/event-resources-page/ask-the-community-image@2x.png"
            alt="ask the community image"/>
            <h3 className="event-support-header">Ask The Community</h3>
            <p>
              We have a large, global community of people like you who have hosted events and have lots of advice to share. Visit our <a href="">discussion forum</a> to ask questions or share your own advice and experience with others.
            </p>
          </div>
          <div className="event-support-panel">
            <ImageTag
            width={399} height={254}
            src1x="/img/event-resources-page/request-support-image.png"
            src2x="/img/event-resources-page/request-support-image@2x.png"
            alt="request support image"/>
            <h3 className="event-support-header">Request Support</h3>
            <p>
              Still can't find an answer to your question? Our team is here to help you with all things Maker Party. <a href="">Contact us</a> and we will get back to you as soon as possible.
            </p>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = EventsResources;
