var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var Illustration = require('../components/illustration.jsx');
var Router = require('react-router');
var Link = Router.Link;

/* Displays an activity kit, with:
   image, title, difficulty, list of authors, and description
*/
var ActivityKit = React.createClass({
  authorLinks: {
    "Kat Braybrooke": "http://twitter.com/codekat",
    "Karen Smith": "http://twitter.com/smithisgeneric",
    "Julia Vallera": "http://twitter.com/colorwheelz",
    "Jess Klein": "http://twitter.com/iamjessklein",
    "Chan Sansing": "http://twitter.com/chadsansing",
    "Hive Toronto": "http://hivetoronto.org",
    "MOUSE": "http://mouse.org",
    "Hive NYC": "http://hivenyc.org",
    "Drum Roll": "http://drumrollhq.com/",
    "Joe Dytrych": "",
    "Dee Salgal": "",
    "Leonie Van Der Linde": "",
    "Alan Levine": "http://twitter.com/cogdog",
    "Stacy Martin": "https://www.linkedin.com/in/stacycmartin",
    "Mozilla": "https://webmaker.org",
    "Educator Inovator": "http://educatorinnovator.org/",
    "Jen Dick": "https://twitter.com/jennifer_dick",
    "Jie Qi": "http://technolojie.com/sample-page/",
    "David Cole": "https://www.linkedin.com/in/dcole1",
    "Chad Sansing": "http://twitter.com/chadsansing",
    "EPIK": "http://epik.org.uk/about/",
    "Stephanie Guthrie": "http://twitter.com/amirightfolks",
    "Kim Wilkens": "http://twitter.com/kimxtom",
    "2013 MozGirls": ""
  },
  render: function() {
    // Generates a nice list of autors with links to their sites.
    // The list is comma or dash seperated (dash can only be the first seperator).
    // Displays the last author with an "and" and an oxford comma.
    var _this = this;
    var hasDash = this.props.developedBy.indexOf("-") > -1;
    var developedByArray = this.props.developedBy.replace("-", ",").split(",");
    var developedByElements = developedByArray.map(function (author, key) {
      author = author.trim();
      var separator = ", ";
      if (key === 0 && hasDash) {
        separator = " - "
      } else if (key === developedByArray.length-1) {
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
          src1x={this.props.src1x}
          src2x={this.props.src2x}
          alt={this.props.title}
          link={this.props.link}
        >
          <div className="activity-kit-content">
            <h3><a href={this.props.link}>{this.props.title}</a></h3>
            <div>
              <span className="span-content blue-box">level</span><span className="span-content">{this.props.level}</span>
            </div>
            <div>
              <span className="span-content blue-box">developed by</span><span className="span-content">
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
            alt={this.props.name}
          />
          <span>{this.props.name}</span>
        </a>
      </div>
    );
  }
});

var ActivitiesPage = React.createClass({
  statics: {
    pageClassName: 'teaching-materials'
  },
  render: function() {
    return (
      <div className="inner-container activities">
        <section>
          <h1>Teaching Activities</h1>
          <span>
            Start teaching others how to read, write and participate on the web with these free activities created by teachers, educators and technologists like you. Each featured activity includes step-by-step instructions and has been tested in schools, afterschool programs, libraries and community centers around the globe. Whether learning how to code, understanding why privacy matters, or creating openly-licensed web content, we believe teaching the web should be fun and engaging!
          </span>
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-01.png"
            src2x="/img/activities-page/2x/img-activity-01.png"
            title="Lo-Fi, No-Fi (Teaching Kit)"
            level="Beginner"
            link="https://keyboardkat.makes.org/thimble/LTIxMDA3NTY0ODA=/lofi-nofi-teaching-kit"
            developedBy="Kat Braybrooke, Karen Smith, Julia Vallera, Jess Klein, Chan Sansing"
            description="This series of activities help teach web literacy concepts offline, or where access to technology is limited. Includes printable templated and games to teach coding, game design and app development."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-02.jpg"
            src2x="/img/activities-page/2x/img-activity-02.jpg"
            title="Parapara Animation"
            level="Beginner"
            link="https://karenlouisesmith.makes.org/thimble/para-para-animation-teaching-kit"
            developedBy="Karen Smith, Hive Toronto"
            description="This activity helps young learners create simple animations and learn about online collaboration using Parapara."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-03.png"
            src2x="/img/activities-page/2x/img-activity-03.png"
            title="Creative Commons GIF Exchange"
            level="Beginner"
            link="https://katermouse.makes.org/thimble/LTIwNjQwNTYzMjA=/creative-commons-gif-exchange-activity"
            developedBy="MOUSE, Hive NYC"
            description="This activity teachers students about Creative Commons licensing while creating their own animated GIFs or memes."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-04.jpg"
            src2x="/img/activities-page/2x/img-activity-04.jpg"
            title="Erase All Kittens"
            level="Beginner"
            link="https://laura.makes.org/thimble/LTEzNDYxMDY4OA==/eak-activity-guide"
            developedBy="Drum Roll - Joe Dytrych, Dee Salgal, Leonie Van Der Linde"
            description="This activity features Erase All Kittens (E.A.K.), a fun game where learners code and create on the web by changing the source code on each level."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-05.jpg"
            src2x="/img/activities-page/2x/img-activity-05.jpg"
            title="Image Seeking for Fantastic Visual Metaphors"
            level="Beginner"
            link="https://cogdog.makes.org/thimble/OTM3NDI2OTQ0/imageseeking-for-fantastic-visual-metaphors"
            developedBy="Alan Levine"
            description="In this activity, learners search for photos that communicate ideas and concepts, while also exploring best practices around attribution and openly-licensed content on the web."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-06.jpg"
            src2x="/img/activities-page/2x/img-activity-06.jpg"
            title="Become a Password Pro (Teaching Kit)"
            level="Beginner-Intermediate"
            link="https://stacy.makes.org/thimble/MjAxMjIxNzYwMA==/whats-wrong-with-your-password"
            developedBy="Stacy Martin, Mozilla"
            description="This teaching kit includes a series of activities to help leaners understand passwords-including why thery're important, best practices, and tools to help you manage multiple passwords."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-07.jpg"
            src2x="/img/activities-page/2x/img-activity-07.jpg"
            title="Hack Your Notebook (Teaching Kit)"
            level="Beginner-Intermediate"
            link="https://laura.makes.org/thimble/LTU1NDA0MTA4OA==/hack-your-notebook-teaching-kit"
            developedBy="Educator Inovator - Jen Dick, Jie Qi, David Cole, Chad Sansing"
            description="In this series of activities, learners will explore the connections between art, circuitry and systems thinking by hacking their notbooks/journals with power and LEDs."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-08.jpg"
            src2x="/img/activities-page/2x/img-activity-08.jpg"
            title="CSS Story Cards"
            level="Intermediate"
            link="https://mousemeredith.makes.org/thimble/MTQwOTAyNDAwMA==/css-story-card-game-activity"
            developedBy="MOUSE, Hive NYC"
            description="In this card game, learners work collaboratively to create a complete story using HTML and CSS."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-09.jpg"
            src2x="/img/activities-page/2x/img-activity-09.jpg"
            title="Minecraft a Flavor of Java (Teaching Kit)"
            level="Intermediate"
            link="https://laura.makes.org/thimble/LTE4NDk0MjMzNg==/minecraft-a-flavor-of-java-epik"
            developedBy="EPIK"
            description="In this series of activities, learners develop computational thinking skills by using Java to create their own Minecraft mod."
          />
          <ActivityKit
            src1x="/img/activities-page/1x/img-activity-10.jpg"
            src2x="/img/activities-page/2x/img-activity-10.jpg"
            title="Girls in Tech: Hacking My Media"
            level="Intermediate"
            link="https://laura.makes.org/thimble/MjE3Nzc2Mzg0/hacking-my-media-with-x-ray-goggles"
            developedBy="Stephanie Guthrie, Kim Wilkens, 2013 MozGirls"
            description="In this activity, learners create a remix of a Wikimedia page as they think critically about the intersection of gender, culture, technology and identity."
          />
          <h2>More resources</h2>
          <span>
            Hive Learning Networks are city-based communities of educatios who champion digital skills and web literacy through connected learning. Visit each city's portfolio to find more inspiration, resources and projects for teaching and learning.
          </span>
          <div className="hive-links row">
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive.svg"
              name="hive new york"
              link="http://hivenyc.org/portfolio/"
            />
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive.svg"
              name="hive toronto"
              link="http://hivetoronto.org/portfolio"
            />
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive-community.svg"
              name="hive kansas city"
              link="http://hivekc.org/portfolio/"
            />
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive.svg"
              name="hive chicago"
              link="http://hivechicago.org/portfolio"
            />
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive-community.svg"
              name="hive chattanooga"
              link=" http://hivecha.org/portfolio"
            />
            <HiveLink
              src1x="/img/activities-page/svg/logo-hive.svg"
              name="hive pittsbergh"
              link="http://hivepgh.sproutfund.org/projects/"
            />
          </div>

          <div className="row arrow-image-container">
            <ImageTag className="arrow-image"
              src1x="/img/activities-page/svg/img-globe-line.svg"
              alt="arrow"/>
          </div>
          <div className="global-image">
            <Illustration
              src1x="/img/activities-page/svg/img-global-movement.svg"
              alt="join the global movement"
            >
              <h2>Join the global web literacy movement</h2>
              <span>
                We invite you to adopt the web literacy curriculum to meet the needs of yout group of learners. Add your local group to our global network, share any remixes you create, and help grow this movement.
              </span>
              <div>
                <Link to="mozilla-web-clubs" className="btn btn-awsm">explore clubs</Link>
              </div>
            </Illustration>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = ActivitiesPage;
