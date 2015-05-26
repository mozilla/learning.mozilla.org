var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HeroUnit = require('../components/hero-unit.jsx');
var Blockquote = require('../components/blockquote.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <div>
            <Blockquote author="Maurya C. New York, United States"
                imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png" imgAlt="Maurya NYC Quote">
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
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    var publishedDate = new Date(this.props.data.publishedDate);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][publishedDate.getMonth()];
    return(
      <div id="featured-post">
        <div className="entry-posted-container">
          <p className="entry-posted">
            <time className="published" title={this.props.data.publishedDate} dateTime={this.props.data.publishedDate} >
              <span className="posted-month">{month}</span>
              <span className="posted-date">{publishedDate.getDate()}</span>
              <span className="posted-year">{publishedDate.getFullYear()}</span>
            </time>
          </p>
        </div>
        <div className="entry-header-container">
          <h3 className="entry-title"><a href={this.props.data.link}>{this.props.data.title}</a></h3>
          <cite className="author">{this.props.data.author}</cite>
        </div>
        <p className="excerpt">
          {this.props.data.contentSnippet}
        </p>
        <a className="more" href={this.props.data.link}>Continue reading</a>
      </div>
    );
  },
});

var LatestPosts = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    function formatDate(theDate) {
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][theDate.getMonth()] + " " +
        theDate.getDate() + ", " +
        theDate.getFullYear();
    }
    return (
      <ul id="recent-posts">
        {
          this.props.data.map(function(post, i) {
            return (
              <li key={i}>
                <a className="post-title">{post.title}</a>
                <time className="published" title={post.publishedDate} dateTime={post.publishedDate}>
                  <span>{formatDate(new Date(post.publishedDate))}</span>
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
  getInitialState: function() {
    return {
      featuredPostData: {
        title: "",
        author: "",
        publishedDate: "",
        contentSnippet: "",
        link: ""
      },
      latestPostsData: []
    }
  },
  loadGoogleAPI: function(callback) {
    var head = document.getElementsByTagName("head")[0];
    var gScript = document.createElement("script");
    gScript.setAttribute("src", "https://www.google.com/jsapi");
    gScript.onload = callback;
    head.appendChild(gScript);
    this.setState({googleAPILoaded: true});
  },
  componentDidMount: function() {
    var self = this;
    var google;
    this.loadGoogleAPI(function() {
      google = window.google;
      if (google) {
        google.load("feeds", "1", {
          callback: function() {
            var feed = new google.feeds.Feed("https://blog.webmaker.org/tag/teachtheweb/feed");
            var latestPosts = [];
            feed.load(function(result) {
              var post;
              for (var i=0; i<4; i++) {
                post = result.feed.entries[i];
                latestPosts.push({
                  title: post.title,
                  author: post.author,
                  publishedDate: post.publishedDate,
                  contentSnippet: post.contentSnippet,
                  link: post.link
                });
              }
              self.setState({
                featuredPostData: latestPosts[0],
                latestPostsData: latestPosts.slice(1)
              });
            });
          }
        });
      }
    });
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
            <FeaturedPost data={this.state.featuredPostData} />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <LatestPosts data={this.state.latestPostsData} />
            <a className="more" href="https://blog.webmaker.org/tag/teachtheweb/">See all blog posts</a>
          </div>
        </div>
      </div>
    );
  }
});

var HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/pages/home/hero-unit.png"
                  image2x="/img/pages/home/hero-unit@2x.png">
          <h1>The Mozilla Learning Network</h1>

        </HeroUnit>
        <div className="inner-container">
          <div className="about-us">
            <Illustration
              height={200} width={200}
              src1x="/img/pages/about/about-illustration.svg" src2x="/img/pages/about/about-illustration.svg"
              alt="">
                <h2>About Us</h2>
                <p>We want more people to see themselves as citizens of the web. Mozilla Learning Networks offers programs and a global community dedicated to helping people learn the most important skills of our age: <em>the ability to read, write and participate in the digital world.</em> <Link to="about" className="more">Learn more</Link></p>
            </Illustration>
          </div>
          <BlogSection/>
        </div>
        <div className="quote">
          <div className="inner-container">
            <CaseStudies/>
          </div>
        </div>
        <div className="inner-container">
          <IconLinks>
            <IconLink
              href="https://twitter.com/webmaker"
              imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
              imgAlt="twitter logo"
              head="Follow Us"
              subhead="Start a conversation on Twitter"
            />
            <IconLink
              href="mailto:teachtheweb@mozillafoundation.org"
              imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
              imgAlt="question mark icon"
              head="Get Help"
              subhead="Email us anytime"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
              imgAlt="illustration of two people connecting"
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
