var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var HeroUnit = require('../../components/hero-unit.jsx');

var HiveLink = require('./HiveLink.jsx');
var ActivityKit = require('./ActivityKit.jsx');

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
              src1x="/img/pages/2nextprez/government-building.jpg"
              caption={<a href="https://c2.staticflickr.com/8/7071/7099628023_fbe58682da_k.jpg">CC-BY 2.0 angela n</a>}
              title="Using the Web to Write Letters to the Next President"
              level="Beginner"
              link="/activities/next-prez/"
              developedBy={<div><a href="https://learning.mozilla.org">Mozilla</a>, the <a href="https://nwp.org">National Writing Project</a>, and <a href="https://hypothes.is">Hypothesi.is</a>.</div>}
              description="Use Thimble to tell the next President of the United States what issues matter to you most. Create and then submit your own online letters, memes, quotes, and campaign posters as part of the National Writing Project’s Letters to the Next President 2.0 campaign."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-curriculum.png"
              src2x="/img/pages/activities/img-activity-curriculum@2x.png"
              title="Web Literacy Basics"
              level="Beginner"
              link="/activities/web-lit-basics/"
              developedBy="Our seasoned educator community"
              description="This six-part series helps learners become familiar with reading, writing and participating on the web. They'll discover the foundations of the web through production and collaboration. This is an ideal kit for Mozilla Clubs."/>
            <ActivityKit
              src1x="/img/pages/activities/web-lit-basics-two.jpg"
              caption={<a href="https://c2.staticflickr.com/6/5760/22431506387_43e85e71bd.jpg">cc-by-2.0 Mozilla Festival</a>}
              title="Web Literacy Basics II"
              level="Beginner"
              link="/activities/web-lit-basics-two/"
              developedBy="Mozilla Learning"
              description="Explore making, media production, reverse-image search, and design on the web."/>
            <ActivityKit
              src1x="/img/pages/intermediate-web-lit/blocks.png"
              caption={<a href="https://pixabay.com/en/building-blocks-colorful-build-456616/">CC0 by Counseling</a>}
              title="Intermediate Web Literacy I: Intro to CSS"
              level="Intermediate"
              link="/activities/intermediate-web-lit/"
              developedBy="Mozilla Learning"
              description="Learn to style HTML elements on a webpage using CSS selectors, attributes, and values."/>
            <ActivityKit
              src1x="/img/pages/intermediate-web-lit-two/buttons.jpg"
              caption={<a href="https://pixabay.com/static/uploads/photo/2015/01/30/09/44/buttons-617323_960_720.jpg ">CC0 Public Domain</a>}
              title="Intermediate Web Literacy II: Storytelling with Scripts"
              level="Intermediate"
              link="/activities/intermediate-web-lit-two/"
              developedBy="Mozilla Learning"
              description="Learn to use buttons, forms, and inputs alongside JavaScript functions to tell stories on the web."/>
            <ActivityKit
              src1x="/img/pages/offline-icebreakers/html-puzzleboxes.jpg"
              caption={<a href="https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes/activity-data/images/html-puzzleboxes.jpg">by MOUSE</a>}
              title="Offline Icebreakers"
              level="Beginner"
              link="/activities/offline-icebreakers/"
              developedBy={<div><a href="https://learning.mozilla.org">Mozilla</a>, <a href="https://thedigitalcorps.wordpress.com"> Digital Corps</a>, <a href="https://twitter.com/ossington">ginger coons</a>, <a href="https://twitter.com/malesser">Marc Lesser</a>, <a href="https://twitter.com/thomashpark">Thomas Park</a>, <a href="https://twitter.com/yofiesetiawan">Yofie Setiawan</a>, and <a href="https://twitter.com/smithisgeneric">Karen Smith</a>.</div>}
              description="Solve puzzles and play games to get to know your fellow learners and the web."/>
            <ActivityKit
              src1x="/img/pages/webmaker/designing-webmaker.jpg"
              src2x="/img/pages/webmaker/designing-webmaker@2x.jpg"
              title="Read, Write, and Participate with Webmaker"
              level="Beginner mobile users"
              link="/activities/webmaker/"
              developedBy={<div><a href="https://twitter.com/secretrobotron">Bobby Richter</a> and <a href="https://twitter.com/lau_nk">Laura de Reynal</a> for Mozilla Learning</div>}
              description="Learn how to set up your mobile device to write, publish, and share stories with the Webmaker App from Mozilla Learning."/>
            <ActivityKit
              src1x="/img/pages/protect-your-data/protect-your-data.png"
              src2x="/img/pages/protect-your-data/protect-your-data@2x.png"
              title="Privacy Basics: Protect Your Data"
              level="Beginner"
              link="/activities/protect-your-data/"
              developedBy={<div><a href="http://hivetoronto.org">Hive Toronto</a> in partnership with <a href="https://www.priv.gc.ca/index_e.asp">the Office of the Privacy Commissioner of Canada</a>, and <a href="https://www.mozilla.org/privacy/">Mozilla Privacy</a></div>}
              description="These six hands-on activities engage learners in thinking critically about online privacy by creating secure passwords, understanding how and where their data is being collected, and more. This is an ideal kit for Mozilla Clubs."/>
            <ActivityKit
              src1x="/img/pages/activities/online-tracking.png"
              caption={ <a href="https://mozorg.cdn.mozilla.net/media/img/teach/smarton/tracking/topic-think-deeper.2d1fbc329611.png">view original</a> }
              title="Privacy Basics: Online Tracking"
              level="Beginner"
              link="https://d157rqmxrxj6ey.cloudfront.net/mozstacy/21938/"
              developedBy={<div><a href="https://mozillians.org/en-US/u/stacy">Stacy Martin</a> - Senior Data Privacy Manager at Mozilla and Mozilla Learning</div>}
              description="Learners will complete a set of hands-on activities to better understand types of online tracking through the use of cookies and other technologies."/>
            <ActivityKit
              src1x="https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg"
              caption={ <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">EFF-Graphics, CC3.0-SA-AT, view original</a> }
              title="Privacy Basics: Passwords, Tracking, and Data Retention"
              level="Intermediate"
              link="/activities/privacy-basics/"
              developedBy={<div><a href="https://mozillians.org/en-US/u/stacy">Stacy Martin</a> - Senior Data Privacy Manager at Mozilla and Mozilla Learning</div>}
              description="Learn how to safeguard your privacy online and develop an awareness of how companies and governments track and collect your data online."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-11.jpg"
              src2x="/img/pages/activities/img-activity-11@2x.jpg"
              title="Back to School Write the Web Activities"
              level="13+"
              link="/activities/back-to-school-write-the-web/"
              developedBy="Mozilla Learning"
              description="Learn how to remix and write basic HTML, CSS, and JavaScript with these Back-to-School Thimble activities and lesson plans."/>
            <ActivityKit
              src1x="/img/pages/activities/parapara.jpg"
              caption={ <a href="http://fabble.cc/uploads/figure/content/5625b974676974668fc60d00/small_DSC_4310_.jpg">view original</a> }
              title="Animation on the Open Web with Fabble, Para Para, and 3D Projection Mapping"
              level="Beginner"
              link="/activities/parapara/"
              developedBy={<div><a href="http://en.mozillafactory.org/tagged/COMOZILLA">Mozilla Factory</a> and <a href="http://twitter.com/smithisgeneric">Karen Smith</a> and remixed by Mozilla Learning.</div>}
              description="Learn to use Mozilla Factory’s Parapara and Fabble, open web tools for animation and sharing work online. Create 2D animations, 3D projection-mapped animations, and ‘recipes’ that others can fork for remix on Fabble."/>
            <ActivityKit
              src1x="/img/pages/activities/mouse.png"
              title="Code/Explore/Connect with Mouse"
              level="Beginner"
              link="https://thimbleprojects.org/mouseorg/49745/"
              developedBy={<div><a href="http://www.mouse.org">MOUSE (Hive NYC member)</a>.</div>}
              description="Mouse's online and offline activities like Kraken the Code, Tag Tag Revolution and CSS Story Cards explore topics ranging from HTML/CSS to search engine optimization and online identities."/>  
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
              link="https://thimbleprojects.org/cogdog/89380/"
              developedBy={<div><a href="http://cogdog.info">Alan Levine</a></div>}
              description="In this activity, learners search for photos that communicate ideas and concepts, while also exploring best practices around attribution and openly-licensed content on the web."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-QuackingJavascript.jpg"
              src2x="/img/pages/activities/img-activity-QuackingJavascript@2x.jpg"
              title="Quacking JavaScript"
              level="JavaScript beginners"
              link="http://mozilla.github.io/webmaker-curriculum/QuackingJavascript/"
              developedBy={<div><a href="http://hivemanchester.net/">Hive Manchester</a></div>}
              description="Learners get familiar with writing Javascript in this fun, five-part module. Together we discover the foundations of the text coding by being creative and making our own web pages."/>
            <ActivityKit
              src1x="/img/pages/activities/minecraft.png"
              title="Minecraft: Redesign A Public Space"
              level="Beginner"
              link="https://thimbleprojects.org/ginagrant/95757/#overview"
              developedBy={<div><a href="https://twitter.com/GinaGrant20">Gina Grant</a> and <a href="https://twitter.com/edgeq_">Edge Quintanilla</a></div>}  
              description="Teach students how they might use design thinking to foster civic engagement, self-efficacy and agency using the wildly popular video game, Minecraft. You’ll need to create Discover Design and Minecraft Education Edition accounts for your learners."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-09.jpg"
              src2x="/img/pages/activities/img-activity-09@2x.jpg"
              title="Minecraft a Flavor of Java"
              level="Intermediate"
              link="https://thimbleprojects.org/epikhub/48607/"
              developedBy={<div><a href="http://epik.org.uk/about/">EPIK</a></div>}
              description="In this series of activities, learners develop computational thinking skills by using Java to create their own Minecraft mod."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-10.jpg"
              src2x="/img/pages/activities/img-activity-10@2x.jpg"
              title="Girls in Tech: Hacking My Media"
              level="Intermediate"
              link="https://thimbleprojects.org/stephguthrie/48361/"
              developedBy={<div><a href="http://twitter.com/amirightfolks">Steph Guthrie</a>, <a href="http://twitter.com/kimxtom">Kim Wilkens</a>, and 2013 MozGirls</div>}
              description="In this activity, learners create a remix of a Wikimedia page as they think critically about the intersection of gender, culture, technology and identity."/>
            <ActivityKit
              src1x="/img/pages/activities/web-lit-training.jpg"
              caption={ <a href="https://www.flickr.com/photos/newyouthcity/16304513515/in/album-72157650350884885/">Hive Learning NYC</a> }
              title="Mozilla Web Literacy Leaders 1-Day Training Module"
              level="Beginner"
              link="https://d157rqmxrxj6ey.cloudfront.net/anmechung/40860/"
              developedBy={<div>Mozilla</div>}
              description="An interactive, learner-centered 1-day training module designed to learn and teach others how to read, write, and participate on the Web."/>
            <ActivityKit
              src1x="/img/pages/activities/img-activity-madewithcode.png"
              title="Made with Code"
              level="Beginner"
              link="/activities/madewithcode"
              developedBy={<div>Mozilla for Google's Made with Code initiative</div>}
              description="Mozilla is happy to partner with Google's Made with Code initiative to inspire girls to get creative with code. There are three fun activities to help you create your own webpages by writing and remixing HTML."/>
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
                link="/clubs"
                imgSrc="/img/pages/activities/svg/icon-connect.svg"
                head="Build"
                subhead="Start a Club in your community."
                highlightedText="Start a Club"
              />
              <IconLink
                link="/web-literacy"
                imgSrc="/img/pages/activities/svg/icon-learn.svg"
                head="Explore"
                subhead="See our Web Literacy Map."
                highlightedText="Web Literacy Map"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});


module.exports = ActivitiesPage;
