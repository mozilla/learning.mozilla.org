var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

var HeroUnit = require('../components/hero-unit.jsx');
var Blockquote = require('../components/blockquote.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var IconButtons = require('../components/icon-buttons.jsx');
var IconButton = require('../components/icon-button.jsx');

var config = require('../lib/config');
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

var HomePage = React.createClass({
  statics: {
    pageClassName: 'home-page',
    BlogSection: BlogSection
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>The Mozilla Learning Network</h1>
          <IconButtons>
            <IconButton
              imgSrc="/img/pages/home/svg/icon-teach-man-chalkboard-pledge.svg"
              head="Pledge to Teach"
            />
            <IconButton
              linkTo="activities"
              imgSrc="/img/pages/home/svg/icon-teachanactivity.svg"
              head="Teach an Activity"
            />
            <IconButton
              linkTo="mozilla-clubs"
              imgSrc="/img/pages/home/svg/icon-startamozillaclub.svg"
              head="Start A Mozilla Club"
            />
          </IconButtons>
        </HeroUnit>
        <div className="row full-row makerparty-banner">
          <div className="inner-container">
            <section>
              <Illustration
                height={200} width={384}
                src1x="/img/pages/home/maker-party-banner.png" src2x="/img/pages/home/maker-party-banner@2x.png"
                alt="">
                  <p>Maker Party is Mozilla's global campaign to teach the web. Participate in our year-round party by hosting or attending events to teach, build and share amazing things online.</p>
                  <Link className="btn btn-awsm" to="events">Host a Maker Party</Link>
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
