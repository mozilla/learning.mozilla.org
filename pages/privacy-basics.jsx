var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Intro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Privacy Basics: Passwords, Tracking, and Data Retention</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x=" https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg"
          alt=""
          className="illustration-img-circle">
            <h2>Learn how to safeguard your privacy online and develop an awareness of how companies and governments track and collect your data online.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});


var LearningObjectives = React.createClass({
  render: function () {
    return (
      <section className="row privacy-basics">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            Learners will understand Web mechanics, security, and privacy as they analyze and reflect on common surveillance practices, as well as their own privacy habits.
          </p>
        </div>
      </section>
    );
  }
});


var PrivacyBasics = React.createClass({
  statics: {
    pageTitle: 'Privacy Basics: Passwords, Tracking, and Data Retention',
    pageClassName: 'privacy-basics'
  },
  sections: [
    {
      title: "Passwords",
      activities: [
        {
          title: "Passwords Agenda",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Security",
          description: "Learners will evaluate strong and weak passwords and develop their own strategies for creating secure passwords, learning about security and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/passwords.html"
        },
        {
          title: "Testing Password Strength",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Security",
          description: "Learners will look at leaked passwords to identify weak password habits to avoid and then they'll test possible passwords using an online \"password meter\", learning about security and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/testing-password-strength.html"
        },
        {
          title: "Creating Strong Passwords",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Security",
          description: "Learners will use several different ways to create strong passwords, learning about security and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/creating-strong-passwords.html"
        },
        {
          title: "Avoiding Password Reuse",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Security",
          description: "Learners will see why re-using passwords is a bad idea and pick up strategies for avoiding that habit, learning about security.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/avoiding-password-reuse.html"
        },
        {
          title: "Using Two-Factor Authentication",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Web Mechanics",
          description: "Learners will find out how two-factor authentication works to secure personal information online, learning about web mechanics and security.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/two-factor-authentication.html"
        }
      ]
    },
    {
      title: "Privacy",
      activities: [
        {
          title: "Privacy Agenda",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/7/75/International_justice_and_privacy.jpg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:International_justice_and_privacy.jpg">EFF-Graphics, CC3.0-AT, view original</a>,
          subtitle: "Understanding Privacy",
          description: "Learners will develop strategies to safeguard their information online and discover how to monitor websites that track their browser histories using cookies, learning about privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/privacy.html"
        },
        {
          title: "If it’s Personal Offline, it’s Personal Online",
          image1x: " https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:Monitor_padlock.svg">Lunarbunny, CC3.0-AT-SA, view original</a>,
          subtitle: "Understanding Composing",
          description: "Learners will watch a series of videos highlighting the importance of safeguarding personal, private information online, as well as offline, learning about privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/personal.html"
        },
        {
          title: "Spectrogram for Privacy",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/7/75/International_justice_and_privacy.jpg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:International_justice_and_privacy.jpg">EFF-Graphics, CC3.0-AT, view original</a>,
          subtitle: "Understanding Composing",
          description: "Learners will participate in a spectrogram activity to develop and discuss their own viewpoints on Internet privacy, learning about privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/privacy-spectrogram"
        },
        {
          title: "Tracking cookies with Lightbeam",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/7/75/International_justice_and_privacy.jpg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:International_justice_and_privacy.jpg">EFF-Graphics, CC3.0-AT, view original</a>,
          subtitle: "Understanding Privacy",
          description: "Learners will use Lightbeam, an online privacy tool, to discover who is tracking them online while the browse the Web, learning about privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/tracking-cookies.html"
        },
        {
          title: "Privacy Elevator Speech",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/7/75/International_justice_and_privacy.jpg",
          caption: <a href="https://commons.wikimedia.org/wiki/File:International_justice_and_privacy.jpg">EFF-Graphics, CC3.0-AT, view original</a>,
          subtitle: "Understanding Composing",
          description: "Learners will write their own 30- to 60-second elevator speeches championing healthy data privacy habits online and share their pitches with others learning to participate on the Web, learning about privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/elevator-speech.html"
        }
      ]
    },
    {
      title: "Data Retention",
      activities: [
        {
          title: "Data Retention Agenda",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png/781px-To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png",
          caption: <a href="https://commons.wikimedia.org/wiki/File:To_deposit_or_not_to_deposit,_that_is_the_question_-_journal.pbio.1001779.g001.png">Ainsley Seago, CC4.0-AT, view original</a>,
          subtitle: "Understanding Privacy",
          description: "Learners will understand how and why companies and governments collect metadata about Web users and evaluate their need for privacy against the pros and cons of data retention, learning about Web mechanics and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/data-retention.html"
        },
        {
          title: "Data Retention: Pros and Cons",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png/781px-To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png",
          caption: <a href="https://commons.wikimedia.org/wiki/File:To_deposit_or_not_to_deposit,_that_is_the_question_-_journal.pbio.1001779.g001.png">Ainsley Seago, CC4.0-AT, view original</a>,
          subtitle: "Understanding Privacy",
          description: "Learners will understand how and why companies and governments collect metadata about Web users and evaluate users' individual needs for privacy against the pros and cons of data retention, learning about Web mechanics and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/pros-and-cons.html"
        },
        {
          title: "Follow Your Data Trail",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png/781px-To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png",
          caption: <a href="https://commons.wikimedia.org/wiki/File:To_deposit_or_not_to_deposit,_that_is_the_question_-_journal.pbio.1001779.g001.png">Ainsley Seago, CC4.0-AT, view original</a>,
          subtitle: "Understanding Web Mechanics",
          description: "Learners will understand how a large amount of data can be collected about individuals through their movement in the real and digital worlds, learning about Web mechanics and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/follow-your-trail.html"
        },
        {
          title: "Minding your Metadata",
          image1x: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png/781px-To_deposit_or_not_to_deposit%2C_that_is_the_question_-_journal.pbio.1001779.g001.png",
          caption: <a href="https://commons.wikimedia.org/wiki/File:To_deposit_or_not_to_deposit,_that_is_the_question_-_journal.pbio.1001779.g001.png">Ainsley Seago, CC4.0-AT, view original</a>,
          subtitle: "Understanding Web mechanics",
          description: "Learners will understand how a large amount of data can be collected about individuals through their movement in the real and digital worlds, learning about Web mechanics and privacy.",
          link: "https://chadsansing.github.io/curriculum-testing/expanded-privacy-curriculum/minding-your-metadata.html"
        }
      ]
    }
  ],
  render: function() {
    return (
      <div className="inner-container">
        <Intro/>
        <LearningObjectives/>
        {this.sections.map(function (section, key) {
          return (
            <ActivitySection title={section.title} key={section.title} activities={section.activities} />
          );
        })}
      </div>
    );
  }
});


module.exports = PrivacyBasics;
