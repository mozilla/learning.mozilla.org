var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var curriculumList = [
  {
    title: "Reading the Web",
    activities: [
      {
        title: "Kraken the Code",
        image1x: "/img/pages/web-lit-basics/img-kraken-code.jpg",
        image2x: "/img/pages/web-lit-basics/img-kraken-code@2x.jpg",
        subtitle: "Understanding credibility",
        description: "Learners use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also learning about search terms, keywords, and how to assess the validity and relevance of web sources. This activity was made by <a href='http://mouse.org'>MOUSE</a>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session01-kraken-the-code.html#overview"
      },
      {
        title: "Ping Kong",
        image1x: "/img/pages/web-lit-basics/img-ping-kong.jpg",
        image2x: "/img/pages/web-lit-basics/img-ping-kong@2x.jpg",
        subtitle: "Understanding web mechanics",
        description: "For many, &ldquo;the Internet&rdquo; is an abstract and overwhelming concept. This activity challenges learners to think concretely about how the internet communicates with a computer. This activity was made by <a href='http://mouse.org'>MOUSE</a>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session02-ping-kong.html#overview"
      }
    ]
  },
  {
    title: "Writing the Web",
    activities: [
      {
        title: "Hack the News",
        image1x: "/img/pages/web-lit-basics/img-hack-news.jpg",
        image2x: "/img/pages/web-lit-basics/img-hack-news@2x.jpg",
        subtitle: "Understanding remixing",
        description: "Learners use X-Ray Goggles to remix a news website, learning about openly-licensed resources, different forms of media, and how to create something new on the Web through remixing.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session03-hack-the-news.html#overview"
      },
      {
        title: "HTML Puzzle Boxes",
        image1x: "/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
        image2x: "/img/pages/web-lit-basics/img-puzzle-boxes@2x.jpg",
        subtitle: "Understanding composing for the web",
        description: "Learners race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page. This activity was made by <a href='http://www.mozilla.or.id/'>Yofie Setiawan and Mozilla Indonesia</a>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session04-html-puzzle-boxes.html#overview"
      }
    ]
  },
  {
    title: "Participating on the Web",
    activities: [
      {
        title: "Web Chef",
        image1x: "/img/pages/web-lit-basics/img-web-chef.jpg",
        image2x: "/img/pages/web-lit-basics/img-web-chef@2x.jpg",
        subtitle: "Understanding open practices",
        description: "Learners teach their peers a skill and document the steps by making a web resource that includes properly-attributed open content. This activity was inspired by <a href='https://creativecommons.org/'>Creative Commons</a> and <a href='https://courses.p2pu.org/en/groups/teach-someone-something-with-open-content/'>P2PU School of Open</a>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session05-web-chef.html#overview"
      },
      {
        title: "Final Project: Story of Us",
        image1x: "/img/pages/web-lit-basics/img-story-of-us.jpg",
        image2x: "/img/pages/web-lit-basics/img-story-of-us@2x.jpg",
        subtitle: "Understanding community participation",
        description: "Learners tell their Story of Self, use it to reflect  on what they have learned, and how they want to participate on the web and with their community going forward. This activity is based on a project by <a href='https://radiorookies.makes.org/thimble/diy-toolkit-how-to-report-your-own-story'>WNYC Radio Rookies</a>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session06-story-of-us.html#overview"
      }
    ]
  },
  {
    title: "Privacy Expansion",
    activities: [
      {
        title: "Create Secure Passwords",
        image1x: "/img/pages/protect-your-data/pass-phrase.jpg",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/privacy-basics/images/pass-phrase-1.jpg",
        caption: "CC-BY Aurich Lawson",
        subtitle: "Evaluate, Protect",
        description: "You will learn several different ways to generate secure passwords and pass-phrases and test their strength, learning web literacy skills like <strong>evaluate</strong> and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session07-create-secure-passwords.html#overview"
      },
      {
        title: "Cookies and Third-Party Tracking",
        image1x: "/img/pages/protect-your-data/img-cookies.png",
        image2x: "/img/pages/protect-your-data/img-cookies@2x.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/privacy-basics/images/lightbeam-1.jpg",
        caption: "CC-BY Mozilla",
        subtitle: "Navigate, Open Practice, Protect",
        description: "You will use a privacy tool called Mozilla Lightbeam to see how websites track your movement online, learning web literacy skills like <strong>navigate</strong>, <strong>open practice</strong>, and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session08-cookies-and-third-party-tracking.html#overview"
      },
      {
        title: "Data Trail Timeline",
        image1x: "/img/pages/protect-your-data/img-datatrail.png",
        image2x: "/img/pages/protect-your-data/img-datatrail@2x.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/privacy-basics/images/data-trail-badge-1.jpg",
        caption: "CC-BY Hive Toronto",
        subtitle: "Protect",
        description: "You will create a timeline on a poster or in a video or slideshow to demonstrate how information about your movement in the real world gets collected online by companies and other organizations throughout the course of a typical day while learning about web literacy skills like <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-one/session09-data-trail-timeline.html#overview"
      }
    ]
  }
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ClubsCurriculum = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: 'Web Literacy Basics',
    pageClassName: 'web-lit-basics'
  },



  render: function () {
    var blogPostLink = "https://blog.webmaker.org/help-us-get-local-with-web-literacy";
    var formatMessage = this.context.intl.formatMessage;
    var Intro = (
      <div>
        <h1>{formatMessage({id:"web_lit_basics_title"})}</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/web-lit-basics/photo-clubs-curriculum.jpg"
          src2x="/img/pages/web-lit-basics/photo-clubs-curriculum@2x.jpg"
          alt="Woman training a young man on a computer">
            <h2>{this.context.intl.formatMessage({id:"web_lit_basics_intro"})}</h2>
          </Illustration>
        </section>
      </div>
    );
    var WebLitBasics = (
      <section className="row web-lit-basics">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            The learning objectives underpinning each activity are informed by Mozilla&apos;s <Link to={"/" + this.context.intl.locale + "/web-literacy"}>Web
            Literacy Map</Link>. Complete the activities in sequence, or mix and match for your learners. Need
            help{'? '} <a href="https://discourse.webmaker.org/c/curriculum">Visit our discussion forum</a> to get help
            and share your experience.
          </p>
        </div>
      </section>
    );

    return (
      <div className="inner-container">
        {Intro}
        {WebLitBasics}
        <section>
          <div className="alert alert-warning">
            <strong>Help us translate: </strong>
            We're making an effort to localize our Web Literacy Basics I curriculum and we need your help!
            There's increasing interest in starting Mozilla Clubs and teaching web literacy skills in
            communities around the globe, but our current curricular modules are only available in
            English. <OutboundLink to={blogPostLink} eventLabel={blogPostLink}>Learn how you can help</OutboundLink>.
          </div>
        </section>
        {curriculum}
      </div>
    );
  }
});

module.exports = ClubsCurriculum;
