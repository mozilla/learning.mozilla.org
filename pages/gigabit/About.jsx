var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="clearfix">
          <div className="col-sm-4">
            <img className="w-100" src="/img/pages/gigabit/gigabit_fox.svg"/>
          </div>
          <div className="col-sm-8">
            <h2>What is Mozilla Gigabit?</h2>
            <p>Mozilla Gigabit Community Fund provides catalytic funding in US communities to support pilot tests of gigabit technology and related curricula. We increase the participation in next-generation innovation to help support an Internet where all people are empowered, safe, and independent.</p>
          </div>
        </div>

        <div className="text-center">
          <h2>The Gigabit Approach</h2>
          <p>Our approach to taking gigabit discoveries out of the lab and into the field is threefold:</p>
        </div>

        <div className="m-b-3 clearfix">
          <div className="col-sm-4">
            <img className="w-100 p-a-3" src="/img/pages/gigabit/gigabit-icon_fund.svg"/>
            <h3>Fund and Support</h3>
            <p>We support the development of gigabit applications and associated curricula through the Gigabit Community Fund. Grants support pilots that take gigabit technologies out of the lab and into learning spaces in select cities across the United States.</p>
          </div>
          <div className="col-sm-4">
            <img className="w-100 p-a-3" src="/img/pages/gigabit/gigabit-icon_innovate.svg"/>
            <h3>Innovate and Spread</h3>
            <p>We catalyze the creation, adoption, and spread of these innovations through Hive Learning Networks. Hives are a local network of teachers, informal educators, technologists, and community members working together to advance the promise of the web for learning.</p>
          </div>
          <div className="col-sm-4">
            <img className="w-100 p-a-3" src="/img/pages/gigabit/gigabit-icon_grow.svg"/>
            <h3>Scale and Grow</h3>
            <p>We leverage Mozilla’s national networks to share these successes across Hive cities, other gigabit cities, and beyond. Our open innovation practices facilitate the adoption of gigabit technologies by diverse new communities of users.</p>
          </div>
        </div>

        <div className="m-b-3 text-center">
          <h2>Where are Mozilla Gigabit Cities</h2>
          <p>Get in touch with your local Gigabit Hive community</p>
        </div>

        <div className="m-b-3 clearfix">
          <div className="col-sm-8">
            <img className="w-100 p-a-2" src="/img/pages/gigabit/map.svg"/>
          </div>
          <div className="col-sm-4">
            <div className="m-b-2 gigabit-contact">
              <h4>Austin</h4>
              <p>Robert Friedman</p>
              <a className="glyph-link glyph-link-email" href="mailto:robert@mozillafoundation.org">robert@mozillafoundation.org</a>
              <a className="glyph-link glyph-link-twitter" target="_blank" href="https://twitter.com/HiveATX">@HiveATX</a>
            </div>
            <div className="m-b-2 gigabit-contact">
              <h4>Chattanooga</h4>
              <p>Katie Hendrix</p>
              <a className="glyph-link glyph-link-email" href="mailto:katieh@mozillafoundation.org">katieh@mozillafoundation.org</a>
              <a className="glyph-link glyph-link-twitter" target="_blank" href="https://twitter.com/Hive_CHA">@Hive_CHA</a>
              <a className="glyph-link glyph-link-facebook" target="_blank" href="https://facebook.com/HiveCHA">{`https://facebook.com/HiveCHA`}</a>
            </div>
            <div className="m-b-2 gigabit-contact">
              <h4>Kansas City</h4>
              <p>Janice Wait</p>
              <a className="glyph-link glyph-link-email" href="mailto:janice@mozillafoundation.org">janice@mozillafoundation.org</a>
              <a className="glyph-link glyph-link-twitter" target="_blank" href="https://twitter.com/HiveKC">@HiveKC</a>
            </div>
          </div>
        </div>

        <div className="m-b-3 text-center">
          <h2>Expanding the Gigabit Community Fund</h2>
          <p>In partnership with the National Science Foundation and US Ignite, we’re expanding the Gigabit Community Fund to three additional gigabit cities by 2018. Add your community below if you are interested in adding to the expansion.</p>
          <div className="middle-button">
            <a className="secondary-button" href="/gigabit/apply">Start a Gigabit City</a>
          </div>
        </div>

        <div className="clearfix grey-block">
          <h2 className="m-b-3 text-center">Featured Updates</h2>

          <ul className="featured-updates row">
            <li className="col-sm-4">
              <div className="box">
                <h3>Blog</h3>
                <h1><a href="#">Hive’s First Month in Austin: What We’ve Learned</a></h1>
                <p>On July 11, Mozilla hit the ground in Austin to spin up our newest Hive Learning Network right here in the heart of Texas. You can read our last post to learn why we chose Austin from two dozen candidate cities. Our first month</p>
                <a href="#">Continue reading</a>
                <a className="secondary-button" href="#">See all blog posts</a>
              </div>
            </li>
            <li className="col-sm-4">
              <div className="box">
                <h3>Events</h3>
                <h1><a href="#">48Hour IoT Launch</a></h1>
                <p>September 9-11 (CHA)</p>
                <p>48Hour Launch is a weekend-long business startup experience, designed to inspire entrepreneurial action at the local level. 48HL brings bright minds together to participate in an intensive period of community building, planning</p>
                <a href="#">Continue reading</a>
                <a className="secondary-button" href="/gigabit/events">See all events</a>
              </div>
            </li>
            <li className="col-sm-4">
              <div className="box">
                <h3>Projects</h3>
                <h1><a href="#">GigBridge</a></h1>
                <p>GigBridge was an afterschool project that used mobile application design to teach ESL, healthy living, and digital literacy. The project connected students at Chattanooga Girls Leadership Academy and East Lake Academy, two Title I schools in Hamilton County, via</p>
                <a href="#">Continue reading</a>
                <a className="secondary-button" href="#">Go to portfolio</a>
              </div>
            </li>
          </ul>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
