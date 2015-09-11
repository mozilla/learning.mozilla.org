var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var Illustration = require('../components/illustration.jsx');
var CCLicenseNote = require('../components/cc-license-note.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Router = require('react-router');
var Link = Router.Link;

var HeroUnit = require('../components/hero-unit.jsx');

var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;

/* Displays an activity kit, with:
   image, title, difficulty, list of authors, and description
*/
var ActivityKit = React.createClass({
  authorLinks: {
    "Kat Braybrooke": "http://twitter.com/codekat",
    "Laura Hilliger": "https://twitter.com/epilepticrabbit",
    "Karen Smith": "http://twitter.com/smithisgeneric",
    "Julia Vallera": "http://twitter.com/colorwheelz",
    "Jess Klein": "http://twitter.com/iamjessklein",
    "Chan Sansing": "http://twitter.com/chadsansing",
    "Hive Toronto": "http://hivetoronto.org",
    "MOUSE (Hive NYC member)": "http://mouse.org",
    "Drum Roll": "http://drumrollhq.com/",
    "Joe Dytrych": "",
    "Dee Salgal": "",
    "Leonie Van Der Linde": "",
    "Alan Levine": "http://cogdog.info",
    "Stacy Martin": "https://www.linkedin.com/in/stacycmartin",
    "Mozilla": "https://webmaker.org",
    "Educator Inovator": "http://educatorinnovator.org/",
    "Jen Dick": "https://twitter.com/jennifer_dick",
    "Jie Qi": "http://technolojie.com/sample-page/",
    "David Cole": "https://www.linkedin.com/in/dcole1",
    "Chad Sansing": "http://twitter.com/chadsansing",
    "EPIK": "http://epik.org.uk/about/",
    "Steph Guthrie": "http://twitter.com/amirightfolks",
    "Kim Wilkens": "http://twitter.com/kimxtom",
    "2013 MozGirls": "",
    "Our seasoned educator community": "",
    "the Office of the Privacy Commissioner of Canada": "https://www.priv.gc.ca/index_e.asp",
    "Mozilla Privacy": "https://www.mozilla.org/privacy/"

  },
  render: function() {
    // Generates a nice list of autors with links to their sites.
    // The list is comma or dash seperated (dash can only be the first seperator).
    // Displays the last author with an "and" and an oxford comma.
    var _this = this;
    var hasDash = this.props.developedBy.indexOf("-") > -1;
    var hasInPartnershipWith = this.props.developedBy.indexOf("in partnership with") > -1;
    var developedByArray = this.props.developedBy.replace("-", ",").replace("in partnership with", ",").split(",");
    var developedByElements = developedByArray.map(function (author, key) {
      author = author.trim();
      var separator = ", ";
      if (key === 0 && hasDash) {
        separator = " - ";
      } else if (key === 0 && hasInPartnershipWith) {
        separator = " in partnership with ";
      }
      else if (key === developedByArray.length-1) {
        separator = "";
      } else if (key === developedByArray.length-2) {
        separator = ", and ";
      }

      // Ensure authors with no links are displayed as not anchors.
      var authorLink = _this.authorLinks[author];
      var authorElement = (<a href={_this.authorLinks[author] || ""}>{author}</a>);
      if (!authorLink) {
        authorElement = author;
      }
      return (
        <span key={key}>
          {authorElement}{separator}
        </span>
      );
    });
    return (
      <div className="activity-kit">
        <Illustration
        height={165} width={225}
        src1x={this.props.src1x}
        src2x={this.props.src2x}
        alt={this.props.title}
        link={this.props.link}
        externalLink>
          <div className="activity-kit-content">
            <h3><OutboundLink to={this.props.link} eventLabel={this.props.link}>{this.props.title}</OutboundLink></h3>
            <div>
              <span className="span-content label-tag">level</span><span className="span-content">{this.props.level}</span>
            </div>
            <div>
              <span className="span-content label-tag">developed by</span><span className="span-content">
                {developedByElements}
              </span>
            </div>
            <div className="description">{this.props.description}</div>
          </div>
        </Illustration>
      </div>
    );
  }
});

var HiveLink = React.createClass({
  render: function() {
    return (
      <div className="hive-link col-sm-4 col-md-4 col-lg-4">
        <a href={this.props.link}>
          <ImageTag className="image-tag"
            src1x={this.props.src1x}
            src2x={this.props.src2x}
            alt=""
          />
          <span>{this.props.name}</span>
        </a>
      </div>
    );
  }
});

var ActivitiesPage = React.createClass({
  statics: {
    pageTitle: 'Teaching Activities',
    pageClassName: 'teaching-materials'
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>Teaching Activities</h1>
        </HeroUnit>
        <div className="inner-container activities">
          <section>
            <p>
              Start teaching others how to read, write and participate on the web with these free activities created by teachers, educators and technologists like you. Each featured activity includes step-by-step instructions and has been tested in schools, afterschool programs, libraries and community centers around the globe. Whether learning how to code, understanding why privacy matters, or creating openly-licensed web content, we believe teaching the web should be fun and engaging!
            </p>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-curriculum.png"
              src2x="/img/pages/activities/img-activity-curriculum@2x.png"
              title="Web Literacy Basics (Teaching Kit) "
              level="Beginner"
              link="/activities/web-lit-basics/"
              developedBy="Our seasoned educator community"
              description="This six-part series helps learners become familiar with reading, writing and participating on the web. They'll discover the foundations of the web through production and collaboration. This is an ideal kit for Mozilla Clubs."
            />
            <ActivityKit
              src1x="/img/pages/protect-your-data/protect-your-data.png"
              src2x="/img/pages/protect-your-data/protect-your-data@2x.png"
              title="Protect Your Data"
              level="Beginner"
              link="/activities/protect-your-data/"
              developedBy="Hive Toronto in partnership with the Office of the Privacy Commissioner of Canada, Mozilla Privacy"
              description="These six hands-on activities engage learners in thinking critically about online privacy by creating secure passwords, understanding how and where their data is being collected, and more. This is an ideal kit for Mozilla Clubs."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-01.png"
              src2x="/img/pages/activities/img-activity-01@2x.png"
              title="Lo-Fi, No-Fi (Teaching Kit)"
              level="Beginner"
              link="https://laura.makes.org/thimble/MTUyODMwNDY0/lofi-nofi-teaching-kit"
              developedBy="Kat Braybrooke, Laura Hilliger, Karen Smith, Julia Vallera, Jess Klein, Chad Sansing"
              description="This series of activities help teach web literacy concepts offline, or where access to technology is limited. Includes printable templates and games to teach coding, game design and app development."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-02.jpg"
              src2x="/img/pages/activities/img-activity-02@2x.jpg"
              title="Parapara Animation"
              level="Beginner"
              link="https://karenlouisesmith.makes.org/thimble/para-para-animation-teaching-kit"
              developedBy="Karen Smith, Hive Toronto"
              description="This activity helps young learners create simple animations and learn about online collaboration using Parapara."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-03.png"
              src2x="/img/pages/activities/img-activity-03@2x.png"
              title="Creative Commons GIF Exchange"
              level="Beginner"
              link="https://katermouse.makes.org/thimble/LTIwNjQwNTYzMjA=/creative-commons-gif-exchange-activity"
              developedBy="MOUSE (Hive NYC member)"
              description="This activity teachers students about Creative Commons licensing while creating their own animated GIFs or memes."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-04.jpg"
              src2x="/img/pages/activities/img-activity-04@2x.jpg"
              title="Erase All Kittens"
              level="Beginner"
              link="https://laura.makes.org/thimble/LTEzNDYxMDY4OA==/eak-activity-guide"
              developedBy="Drum Roll - Joe Dytrych, Dee Salgal, Leonie Van Der Linde"
              description="This activity features Erase All Kittens (E.A.K.), a fun game where learners code and create on the web by changing the source code on each level."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-05.jpg"
              src2x="/img/pages/activities/img-activity-05@2x.jpg"
              title="Image Seeking for Fantastic Visual Metaphors"
              level="Beginner"
              link="https://cogdog.makes.org/thimble/LTEyMjQ4NjUyOA==/imageseeking-for-fantastic-visual-metaphors"
              developedBy="Alan Levine"
              description="In this activity, learners search for photos that communicate ideas and concepts, while also exploring best practices around attribution and openly-licensed content on the web."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-06.jpg"
              src2x="/img/pages/activities/img-activity-06@2x.jpg"
              title="Become a Password Pro (Teaching Kit)"
              level="Beginner-Intermediate"
              link="https://stacy.makes.org/thimble/MjAxMjIxNzYwMA==/whats-wrong-with-your-password"
              developedBy="Stacy Martin, Mozilla"
              description="This teaching kit includes a series of activities to help leaners understand passwords &mdash; including why they're important, best practices, and tools to help you manage multiple passwords."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-07.jpg"
              src2x="/img/pages/activities/img-activity-07@2x.jpg"
              title="Hack Your Notebook (Teaching Kit)"
              level="Beginner-Intermediate"
              link="https://laura.makes.org/thimble/LTU1NDA0MTA4OA==/hack-your-notebook-teaching-kit"
              developedBy="Educator Inovator - Jen Dick, Jie Qi, David Cole, Chad Sansing"
              description="In this series of activities, learners will explore the connections between art, circuitry and systems thinking by hacking their notbooks/journals with power and LEDs."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-08.jpg"
              src2x="/img/pages/activities/img-activity-08@2x.jpg"
              title="CSS Story Cards"
              level="Intermediate"
              link="https://mousemeredith.makes.org/thimble/MTQwOTAyNDAwMA==/css-story-card-game-activity"
              developedBy="MOUSE (Hive NYC member)"
              description="In this card game, learners work collaboratively to create a complete story using HTML and CSS."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-09.jpg"
              src2x="/img/pages/activities/img-activity-09@2x.jpg"
              title="Minecraft a Flavor of Java (Teaching Kit)"
              level="Intermediate"
              link="https://epik.makes.org/thimble/NjU2MTQ2OTQ0/minecraft-a-flavor-of-java-epik"
              developedBy="EPIK"
              description="In this series of activities, learners develop computational thinking skills by using Java to create their own Minecraft mod."
            />
            <ActivityKit
              src1x="/img/pages/activities/img-activity-10.jpg"
              src2x="/img/pages/activities/img-activity-10@2x.jpg"
              title="Girls in Tech: Hacking My Media"
              level="Intermediate"
              link="https://stephguthrie.makes.org/thimble/ODU3ODAxMjE2/hacking-my-media-with-x-ray-goggles"
              developedBy="Steph Guthrie, Kim Wilkens, 2013 MozGirls"
              description="In this activity, learners create a remix of a Wikimedia page as they think critically about the intersection of gender, culture, technology and identity."
            />
            <CCLicenseNote/>
            <h2>More resources</h2>
            <p>
              Hive Learning Networks are city-based communities of educators who champion digital skills and web literacy through connected learning. Visit each city's portfolio to find more inspiration, resources and projects for teaching and learning.
            </p>
            <div className="hive-links row">
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive.svg"
                name="hive new york"
                link="http://hivenyc.org/portfolio/"
              />
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive.svg"
                name="hive toronto"
                link="http://hivetoronto.org/portfolio"
              />
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive-community.svg"
                name="hive kansas city"
                link="http://hivekc.org/portfolio/"
              />
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive.svg"
                name="hive chicago"
                link="http://hivechicago.org/portfolio"
              />
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive-community.svg"
                name="hive chattanooga"
                link="http://hivecha.org/portfolio"
              />
              <HiveLink
                src1x="/img/pages/activities/svg/logo-hive.svg"
                name="hive pittsburgh"
                link="http://hivepgh.sproutfund.org/projects/"
              />
            </div>
          </section>
          <section>
            <IconLinks>
              <IconLink
                linkTo="mozilla-clubs"
                imgSrc="/img/pages/activities/svg/icon-connect.svg"
                head="Build"
                subhead="Start a Club in your community"
              />
              <IconLink
                linkTo="teach-like-mozilla"
                imgSrc="/img/pages/activities/svg/icon-curriculum.svg"
                head="Grow"
                subhead="Learn about our approach to teaching"
              />
              <IconLink
                linkTo="web-literacy"
                imgSrc="/img/pages/activities/svg/icon-learn.svg"
                head="Explore"
                subhead="See our Web Literacy Map"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = ActivitiesPage;
