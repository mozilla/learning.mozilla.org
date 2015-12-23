var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

/* Displays an activity kit, with:
   image, title, difficulty, list of authors, and description
*/
var ActivityKit = React.createClass({
  render: function() {
    return (
      <div className="activity-kit">
        <Illustration
          height={165} width={225}
          src1x={this.props.src1x}
          src2x={this.props.src2x}
          caption={this.props.caption}
          alt={this.props.title}
          link={this.props.link}
          externalLink={true}>

          <div className="activity-kit-content">
            <h3><OutboundLink to={this.props.link} eventLabel={this.props.link}>{this.props.title}</OutboundLink></h3>
            <div>
              <span className="span-content label-tag">level</span><span className="span-content">{this.props.level}</span>
            </div>
            <div>
              <span className="span-content label-tag">developed by</span><div className="span-content developed-by">
                {this.props.developedBy}
              </div>
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
    var linkCurriculumQueue = "http://mozilla.github.io/webmaker-curriculum/index.html";
    return (
      <div>
        <HeroUnit>
          <h1>Teaching Activities</h1>
          <h2>Activities and lesson plans to get you started</h2>
        </HeroUnit>
        <div className="inner-container activities">
          <section>
            <p>
              Start teaching others how to read, write and participate on the web with these free activities created by teachers, educators and technologists like you. Each featured activity includes step-by-step instructions and has been tested in schools, afterschool programs, libraries and community centers around the globe. Whether learning how to code, understanding why privacy matters, or creating openly-licensed web content, we believe teaching the web should be fun and engaging!
            </p>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-curriculum.png"
              src2x="/img/pages/activities/img-activity-curriculum@2x.png"
              title="Web Literacy Basics (Teaching Kit)"
              level="Beginner"
              link="/activities/web-lit-basics/"
              developedBy="Our seasoned educator community"
              description="This six-part series helps learners become familiar with reading, writing and participating on the web. They'll discover the foundations of the web through production and collaboration. This is an ideal kit for Mozilla Clubs."/>
            <ActivityKit
              src1x="/img/pages/activities/web-lit-basics-two.jpg"
              caption={<a href="https://c2.staticflickr.com/6/5760/22431506387_43e85e71bd.jpg">cc-by-2.0 Mozilla Festival</a>}
              title="Web Literacy Basics II (Teaching Kit)"
              level="Beginner"
              link="/activities/web-lit-basics-two/"
              developedBy="Mozilla Learning Networks"
              description="Explore making, media production, reverse-image search, and design on the web."/>
            <ActivityKit
              src1x="/img/pages/protect-your-data/protect-your-data.png"
              src2x="/img/pages/protect-your-data/protect-your-data@2x.png"
              title="Protect Your Data"
              level="Beginner"
              link="/activities/protect-your-data/"
              developedBy={<div><a href="http://hivetoronto.org">Hive Toronto</a> in partnership with <a href="https://www.priv.gc.ca/index_e.asp">the Office of the Privacy Commissioner of Canada</a>, and <a href="https://www.mozilla.org/privacy/">Mozilla Privacy</a></div>}
              description="These six hands-on activities engage learners in thinking critically about online privacy by creating secure passwords, understanding how and where their data is being collected, and more. This is an ideal kit for Mozilla Clubs."/>
            <ActivityKit
              src1x="/img/pages/webmaker/designing-webmaker.jpg"
              src2x="/img/pages/webmaker/designing-webmaker@2x.jpg"
              title="Read, Write, and Participate with Webmaker"
              level="Beginner mobile users"
              link="/activities/webmaker/"
              developedBy={<div><a href="https://twitter.com/secretrobotron">Bobby Richter</a> and <a href="https://twitter.com/lau_nk">Laura de Reynal</a> for Mozilla Learning Networks</div>}
              description="Learn how to set up your mobile device to write, publish, and share stories with the Webmaker App from Mozilla Learning Networks."/>
            <ActivityKit
              src1x="https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg"
              caption={ <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">EFF-Graphics, CC3.0-SA-AT, view original</a> }
              title="Privacy Basics: Passwords, Tracking, and Data Retention"
              level="Intermediate"
              link="/activities/privacy-basics/"
              developedBy={<div><a href="https://mozillians.org/en-US/u/stacy">Stacy Martin</a> - Senior Data Privacy Manager at Mozilla and the Mozilla Learning Network team</div>}
              description="Learn how to safeguard your privacy online and develop an awareness of how companies and governments track and collect your data online."/>
            <ActivityKit
	          src1x="/img/pages/activities/img-activity-11.jpg"
	          src2x="/img/pages/activities/img-activity-11@2x.jpg"
	          title="Back to School Write the Web Kit"
	          level="13+"
	          link="/activities/back-to-school-write-the-web/"
	          developedBy={<div><a href="https://webmaker.org">Mozilla</a></div>}
	          description="Learn how to remix and write basic HTML, CSS, and JavaScript with these Back-to-School Thimble activities and lesson plans."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-01.png"
              src2x="/img/pages/activities/img-activity-01@2x.png"
              title="Lo-Fi, No-Fi (Teaching Kit)"
              level="Beginner"
              link="https://laura.makes.org/thimble/MTUyODMwNDY0/lofi-nofi-teaching-kit"
              developedBy={<div><a href="http://twitter.com/codekat">Kat Braybrooke</a>, <a href="https://twitter.com/epilepticrabbit">Laura Hilliger</a>, <a href="http://twitter.com/smithisgeneric">Karen Smith</a>, <a href="http://twitter.com/colorwheelz">Julia Vallera</a>, <a href="http://twitter.com/iamjessklein">Jess Klein</a>, and <a href="http://twitter.com/chadsansing">Chad Sansing</a></div>}
              description="This series of activities help teach web literacy concepts offline, or where access to technology is limited. Includes printable templates and games to teach coding, game design and app development."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-02.jpg"
              src2x="/img/pages/activities/img-activity-02@2x.jpg"
              title="Parapara Animation"
              level="Beginner"
              link="https://karenlouisesmith.makes.org/thimble/para-para-animation-teaching-kit"
              developedBy={<div><a href="http://twitter.com/smithisgeneric">Karen Smith</a> and <a href="http://hivetoronto.org">Hive Toronto</a></div>}
              description="This activity helps young learners create simple animations and learn about online collaboration using Parapara."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-03.png"
              src2x="/img/pages/activities/img-activity-03@2x.png"
              title="Creative Commons GIF Exchange"
              level="Beginner"
              link="https://katermouse.makes.org/thimble/LTIwNjQwNTYzMjA=/creative-commons-gif-exchange-activity"
              developedBy={<div><a href="http://mouse.org">MOUSE (Hive NYC member)</a></div>}
              description="This activity teachers students about Creative Commons licensing while creating their own animated GIFs or memes."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-04.jpg"
              src2x="/img/pages/activities/img-activity-04@2x.jpg"
              title="Erase All Kittens"
              level="Beginner"
              link="https://laura.makes.org/thimble/LTEzNDYxMDY4OA==/eak-activity-guide"
              developedBy={<div><a href="http://drumrollhq.com/">Drum Roll</a> - Joe Dytrych, Dee Salgal, Leonie Van Der Linde</div>}
              description="This activity features Erase All Kittens (E.A.K.), a fun game where learners code and create on the web by changing the source code on each level."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-05.jpg"
              src2x="/img/pages/activities/img-activity-05@2x.jpg"
              title="Image Seeking for Fantastic Visual Metaphors"
              level="Beginner"
              link="https://cogdog.makes.org/thimble/LTEyMjQ4NjUyOA==/imageseeking-for-fantastic-visual-metaphors"
              developedBy={<div><a href="http://cogdog.info">Alan Levine</a></div>}
              description="In this activity, learners search for photos that communicate ideas and concepts, while also exploring best practices around attribution and openly-licensed content on the web."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-06.jpg"
              src2x="/img/pages/activities/img-activity-06@2x.jpg"
              title="Become a Password Pro (Teaching Kit)"
              level="Beginner-Intermediate"
              link="https://stacy.makes.org/thimble/MjAxMjIxNzYwMA==/whats-wrong-with-your-password"
              developedBy={<div><a href="https://mozillians.org/en-US/u/stacy">Stacy Martin</a> and <a href="https://webmaker.org">Mozilla</a></div>}
              description="This teaching kit includes a series of activities to help leaners understand passwords &mdash; including why they're important, best practices, and tools to help you manage multiple passwords."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-07.jpg"
              src2x="/img/pages/activities/img-activity-07@2x.jpg"
              title="Hack Your Notebook (Teaching Kit)"
              level="Beginner-Intermediate"
              link="https://laura.makes.org/thimble/LTU1NDA0MTA4OA==/hack-your-notebook-teaching-kit"
              developedBy={<div><a href="http://educatorinnovator.org/">Educator Inovator</a> - <a href="https://twitter.com/jennifer_dick">Jen Dick</a>, <a href="http://technolojie.com/sample-page/">Jie Qi</a>, <a href="https://www.linkedin.com/in/dcole1">David Cole</a>, and <a href="http://twitter.com/chadsansing">Chad Sansing</a></div>}
              description="In this series of activities, learners will explore the connections between art, circuitry and systems thinking by hacking their notbooks/journals with power and LEDs."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-08.jpg"
              src2x="/img/pages/activities/img-activity-08@2x.jpg"
              title="CSS Story Cards"
              level="Intermediate"
              link="https://mousemeredith.makes.org/thimble/MTQwOTAyNDAwMA==/css-story-card-game-activity"
              developedBy={<div><a href="http://mouse.org">MOUSE (Hive NYC member)</a></div>}
              description="In this card game, learners work collaboratively to create a complete story using HTML and CSS."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-QuackingJavascript.jpg"
              src2x="/img/pages/activities/img-activity-QuackingJavascript@2x.jpg"
              title="Quacking JavaScript"
              level="JavaScript beginners"
              link="http://mozilla.github.io/webmaker-curriculum/QuackingJavascript/"
              developedBy={<div><a href="http://hivemanchester.net/">Hive Manchester</a></div>}
              description="Learners get familiar with writing Javascript in this fun, five-part module. Together we discover the foundations of the text coding by being creative and making our own web pages."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-09.jpg"
              src2x="/img/pages/activities/img-activity-09@2x.jpg"
              title="Minecraft a Flavor of Java (Teaching Kit)"
              level="Intermediate"
              link="https://epik.makes.org/thimble/NjU2MTQ2OTQ0/minecraft-a-flavor-of-java-epik"
              developedBy={<div><a href="http://epik.org.uk/about/">EPIK</a></div>}
              description="In this series of activities, learners develop computational thinking skills by using Java to create their own Minecraft mod."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-10.jpg"
              src2x="/img/pages/activities/img-activity-10@2x.jpg"
              title="Girls in Tech: Hacking My Media"
              level="Intermediate"
              link="https://stephguthrie.makes.org/thimble/ODU3ODAxMjE2/hacking-my-media-with-x-ray-goggles"
              developedBy={<div><a href="http://twitter.com/amirightfolks">Steph Guthrie</a>, <a href="http://twitter.com/kimxtom">Kim Wilkens</a>, and 2013 MozGirls</div>}
              description="In this activity, learners create a remix of a Wikimedia page as they think critically about the intersection of gender, culture, technology and identity."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-madewithcode.png"
              title="Made with Code"
              level="Beginner"
              link="/activities/madewithcode"
              developedBy={<div>Mozilla for Google's Made with Code initiative</div>}
              description="Mozilla is happy to partner with Google's Made with Code initiative to inspire girls to get creative with code. There are three fun activities to help you create your own webpages by writing and remixing HTML."/>
          </section>
          <section>
            <h2>Coming soon</h2>
            <p>Want to see what new activities and teaching kits we have in the works? Check out our <OutboundLink to={linkCurriculumQueue} eventLabel={linkCurriculumQueue}>Curriculum Queue</OutboundLink>.</p>
          </section>
          <section>
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
