var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');
var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;

var HeroUnit = require('../components/hero-unit.jsx');
var Blockquote = require('../components/blockquote.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var IconButtons = require('../components/icon-buttons.jsx');
var IconButton = require('../components/icon-button.jsx');
var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');

var config = require('../lib/config');
var util = require('../lib/util');
var loadBlogPosts = require('../lib/blog-feed-loader');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <div>
            <Blockquote author="Maurya C. New York, United States"
                imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png">
              <p>"Web literacy is about more than coding - it's about how you can be a better web citizen."</p>
            </Blockquote>
          </div>
        </div>
      </div>
    );
  }
});

var FeaturedPost = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    publishedDate: React.PropTypes.string.isRequired,
    contentSnippet: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  },
  render: function() {
    var parsedMomentDate = this.props.publishedDate ? moment(new Date(this.props.publishedDate)) : null;
    return(
      <div className="featured-post">
        { parsedMomentDate ?
          // shows this section only when featured post data has been loaded
          <div>
            <div className="entry-posted-container">
              <p className="entry-posted">
                <time className="published" dateTime={this.props.publishedDate} >
                  <span className="posted-month">{parsedMomentDate.format("MMM")}</span>
                  <span className="posted-date">{parsedMomentDate.format("D")}</span>
                  <span className="posted-year">{parsedMomentDate.format("YYYY")}</span>
                </time>
              </p>
            </div>
            <div className="entry-header-container">
              <h3 className="entry-title"><a href={this.props.link}>{this.props.title}</a></h3>
              <cite className="author">{this.props.author}</cite>
            </div>
            <p className="excerpt">
              {this.props.contentSnippet}
            </p>
            <a className="more" href={this.props.link}>Continue reading</a>
          </div>
          : null
        }
      </div>
    );
  },
});

var LatestPosts = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <ul className="recent-posts">
        {
          this.props.posts.map(function(post, i) {
            return (
              <li key={i}>
                <a className="post-title" href={post.link}>{post.title}</a>
                <time className="published" dateTime={post.publishedDate}>
                  <span>{moment(new Date(post.publishedDate)).format("MMM D, YYYY")}</span>
                </time>
              </li>
            )
          })
        }
      </ul>
    );
  }
});

var BlogSection = React.createClass({
  getDefaultProps: function() {
    return {
      loadBlogPosts: loadBlogPosts
    };
  },
  getInitialState: function() {
    return {
      featuredPost: {
        title: "",
        author: "",
        publishedDate: "",
        contentSnippet: "",
        link: ""
      },
      latestPosts: []
    }
  },
  componentDidMount: function() {
    this.props.loadBlogPosts(function(data) {
      if (!this.isMounted()) {
        return;
      }
      this.setState({
        featuredPost: data.featuredPost,
        latestPosts: data.latestPosts
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className="blog-section">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>On the Blog</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <FeaturedPost {...this.state.featuredPost} />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <LatestPosts posts={this.state.latestPosts} />
            <a className="more" href="https://blog.webmaker.org/tag/teachtheweb/">See all blog posts</a>
          </div>
        </div>
      </div>
    );
  }
});

var validateSignupForm = function(signUpFormState) {
  var errors = [];
  if ( !util.isValidEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};

var PledgeSignupForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      email: "",
      validationErrors: []
    };
  },
  handleSubmit: function(e) {
    var validationErrors = validateSignupForm(_.pick(this.state,"email"));

    if (validationErrors.length) {
      e.preventDefault();
      this.setState({validationErrors: validationErrors});
      return;
    }

    if (process.env.NODE_ENV !== 'production' &&
        !process.env.PLEDGE_MAILINGLIST_URL) {
      e.preventDefault();
      alert("PLEDGE_MAILINGLIST_URL is not defined. Simulating " +
            "a successful pledge signup now.");
      window.location = "?pledge=thanks";
    }
  },
  renderValidationErrors: function() {
    if (this.state.validationErrors.length) {
      return (
        <div className="alert alert-danger" role="alert">
          <p className="error-msg">Please enter an email address.</p>
        </div>
      );
    }
  },
  render: function() {
    var idPrefix = this.props.idPrefix;
    return (
      <form className="mailinglist-signup" action={process.env.PLEDGE_MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <fieldset>
          <div className="fields-container">
            <label htmlFor={idPrefix+"email"} className="sr-only">email</label>
            <div className="icon-field-container">
              <i className="fa fa-envelope"></i>
              <input id={idPrefix+"email"} name="email" type="email" placeholder="email@example.com" valueLink={this.linkState("email")} required />
              <input type="submit" value="Pledge Now" className="btn" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={idPrefix+"privacy"} className="sr-only">I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a></label>
          <input id={idPrefix+"privacy"} name={process.env.PLEDGE_MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
          <p className="pp-note"><i className="fa fa-check-square-o"></i> I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.</p>
          {this.renderValidationErrors()}
        </fieldset>
      </form>
    )
  }
});

var ThankYouModal = React.createClass({
  render: function() {
  // we can't preset the message sharing on Facebook
  var facebookShare = "https://www.facebook.com/sharer/sharer.php?u=" +
                      encodeURIComponent("https://teach.mozilla.org");
  var twitterShare = "https://twitter.com/home?status=" +
                     encodeURIComponent("I just pledged to #TeachTheWeb! https://teach.mozilla.org");
    return (
      <Modal modalTitle="Thanks for your pledge!" className="modal-pledge">
        <p>We appreciate your commitment to keeping the web open, accessible and ours.</p>
        <p><strong>Share and tell your friends</strong></p>
        <div className="social-share">
          <a href={facebookShare} className="facebook">
            <i className="fa fa-facebook"></i>
            Facebook
          </a>
          <a href={twitterShare} className="twitter">
            <i className="fa fa-twitter"></i>
            Twitter
          </a>
        </div>
      </Modal>
    );
  }
});

var HomePage = React.createClass({
  statics: {
    pageClassName: 'home-page',
    PledgeSignupForm: PledgeSignupForm,
    validateSignupForm: validateSignupForm,
    BlogSection: BlogSection
  },
  mixins: [ModalManagerMixin],
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    if (this.context.router.getCurrentQuery().pledge === "thanks") {
      this.showModal(ThankYouModal);
      // Optimizely conversion tracking
      window.optimizely = window.optimizely || [];
      window.optimizely.push(['trackEvent', 'pledgeFormSubmitted']);
    }
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>The Mozilla Learning Network</h1>
        </HeroUnit>
        <div className="row full-row pledge-cta-container-3">
          <div className="inner-container">
            <section>
              <Illustration
                width={100} height={100}
                src1x="/img/pages/home3/svg/icon_teacher.svg"
                alt="">
                <h2>Pledge to Teach</h2>
                <p>Because the Web is a global public resource that's integral to modern life, I pledge to Teach the Web.</p>
                <PledgeSignupForm idPrefix="embedded-pledge-form-" />
              </Illustration>
            </section>
          </div>
        </div>
        <div className="inner-container">
          <section>
            <div className="about-us">
              <Illustration
                height={200} width={200}
                src1x="/img/pages/about/about-illustration.svg" src2x="/img/pages/about/about-illustration.svg"
                alt="">
                  <h2>About Us</h2>
                  <p>We want more people to see themselves as citizens of the web. The Mozilla Learning Network offers programs and a global community dedicated to helping people learn the most important skills of our age: <em>the ability to read, write and participate in the digital world.</em> <Link to="about" className="more">Learn more</Link></p>
              </Illustration>
            </div>
          </section>
          <section>
            <BlogSection/>
          </section>
        </div>
        <div className="row quote">
          <section>
            <CaseStudies/>
          </section>
        </div>
        <div className="inner-container">
          <IconLinks>
            <IconLink
              href={config.TWITTER_LINK}
              imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
              head="Follow Us"
              subhead="Start a conversation on Twitter"
            />
            <IconLink
              href={"mailto:"+config.TEACH_THE_WEB_EMAIL}
              imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
              head="Get Help"
              subhead="Email us anytime"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
              head="Say Hello"
              subhead="Connect on the Discourse forum"
            />
          </IconLinks>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
