var React = require('react');

var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Expander = require('../components/expander.jsx');

var WebMaps = React.createClass({
  render: function() {
    return (
      <div className="row web-maps">{this.props.children}</div>
    );
  }
});

var WebMap = React.createClass({
  render: function() {
    return (
      <div className="web-map col-sm-4 col-md-4 col-lg-4">
        <h2>{this.props.head}</h2>
        <span>{this.props.subhead}</span>
        <div className="web-map-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var ActivitiesPage = React.createClass({
  statics: {
    pageClassName: "web-literacy"
  },
  render: function() {
    return (
      <div className="inner-container">
        <h1>Web Literacy</h1>
        <section className="intro">
          <Illustration
          width={210} height={210}
          src1x="/img/web-literacy-page/icon-web-literacy.svg"
          alt="web literacy illustration">
            <h2>
              Web Literacy is the skills and competencies needed for reading, writing, and participating on the Web.
            </h2>
          </Illustration>
        </section>
        <section>
          <WebMaps>
            <WebMap head="Explore" subhead="Reading the Web">
              <Expander head="navigation">
                <p>Accessing the web using the common features of a browser</p>
                <p>Using hyperlinks to access a range of resourves on the web.</p>
                <p>Reading, evaluating, and manipulating URLs.</p>
                <p>Recognizing the common visual cues in the services.</p>
                <p>Exploring browser add-ons and extensions to provice additional functionality.</p>
              </Expander>
              <Expander head="web mechanics">
                <p>Using and understanding the differences between URLs, IP addresses and search terms.</p>
                <p>Identifying where data is in the network of devices that makes up the Internet.</p>
                <p>Exporting, moving, and backing up data from web services.</p>
                <p>Explaining the role algorithms play in creating and managing content on the web.</p>
                <p>Creating or modifying an algorithm to serve content from around the web.</p>
              </Expander>
              <Expander head="search">
                <p>Developing questions to aid a search.</p>
                <p>Using and revising keywords to make web searches more efficient.</p>
                <p>Evaluating search results to determine if the information is relevant.</p>
                <p>Finding real-time or time-sensitive information using a range of search techniques.</p>
                <p>Discovering information and resources by asking people within social networks.</p>
              </Expander>
              <Expander head="credibility">
                <p>Comparing and contrasting information from a number of sources.</p>
                <p>Making judgments based on technical and design characteristics.</p>
                <p>Discriminating between ‘original’ and derivative web content.</p>
                <p>Identifying and investigating the author or publisher of web resources.</p>
                <p>Evaluating how purpose and perspectives shape web resources.</p>
              </Expander>
              <Expander head="security">
                <p>Recommending how to avoid online scams and 'phishing’.</p>
                <p>Managing and maintaining account security.</p>
                <p>Encrypting data and communications using software and add-ons.</p>
                <p>Changing the default behavior of websites, add-ons and extensions to make web browsing more secure.</p>
              </Expander>
            </WebMap>
            <WebMap head="Build" subhead="Writing the Web">
              <Expander head="composing">
                <p>Inserting hyperlinks into a web page.</p>
                <p>Identifying and using HTML tags.</p>
                <p>Embedding multimedia content into a web page.</p>
                <p>Creating web resources in ways appropriate to the medium/genre.</p>
                <p>Setting up and controlling a space to publish on the Web.</p>
              </Expander>
              <Expander head="remixing">
                <p>Identifying remixable content.</p>
                <p>Combining multimedia resources to create something new on the web.</p>
                <p>Shifting context and meaning by creating derivative content.</p>
                <p>Citing and referencing original content.</p>
              </Expander>
              <Expander head="designing">
                <p>Using CSS properties to change the style and layout of a Web page.</p>
                <p>Demonstrating the difference between inline, embedded and external CSS.</p>
                <p>Improving user experiences through feedback and iteration.</p>
                <p>Creating device-agnostic web resources.</p>
              </Expander>
              <Expander head="coding/scripting">
                <p>Reading and explaining the structure of code.</p>
                <p>Identifying and applying common coding patterns and concepts.</p>
                <p>Adding comments to code for clarification and attribution.</p>
                <p>Applying a script framework.</p>
                <p>Querying a web service using an API.</p>
              </Expander>
              <Expander head="accessibility">
                <p>Using empathy and awareness to inform the design of web content that is accessible to all users.</p>
                <p>Designing for different cultures which may have different interpretations of design elements.</p>
                <p>Comparing and exploring how different interfaces impact diverse users.</p>
                <p>Improving the accessibility of a web page through the design of its color scheme, structure/hierarchy and markup.</p>
                <p>Comparing and contrasting how different interfaces impact diverse web users.</p>
              </Expander>
            </WebMap>
            <WebMap head="Connect" subhead="Participating on the Web">
              <Expander head="sharing">
                <p>Creating and using a system to distribute web resources to others.</p>
                <p>Contributing and finding content for the benefit of others.</p>
                <p>Creating, curating, and circulating web resources to elicit peer feedback.</p>
                <p>Understanding the needs of audiences in order to make relevant contributions to a community.</p>
                <p>Identifying when it is safe to contribute content in a variety of situations on the web.</p>
              </Expander>
              <Expander head="collaborating">
                <p>Choosing a Web tool to use for a particular contribution/ collaboration.</p>
                <p>Co-creating Web resources.</p>
                <p>Configuring notifications to keep up-to-date with community spaces and interactions.</p>
                <p>Working towards a shared goal using synchronous and asynchronous tools.</p>
                <p>Developing and communicating a set of shared expectations and outcomes.</p>
              </Expander>
              <Expander head="participation">
                <p>Engaging in web communities at varying levels of activity.</p>
                <p>Respecting community norms when expressing opinions in web discussions.</p>
                <p>Making sense of different terminology used within online communities.</p>
                <p>Participating in both synchronous and asynchronous discussions.</p>
              </Expander>
              <Expander head="privacy">
                <p>Debating privacy as a value and right in a networked world.</p>
                <p>Explaining ways in which unsolicited third parties can track users across the web.</p>
                <p>Controlling (meta)data shared with online services.</p>
                <p>Identifying rights retained and removed through user agreements.</p>
                <p>Managing and shaping online identities.</p>
              </Expander>
              <Expander head="open practices">
                <p>Distinguishing between open and closed licensing.</p>
                <p>Making web resources available under an open license.</p>
                <p>Contributing to an Open Source project.</p>
                <p>Advocating for an open web.</p>
              </Expander>
            </WebMap>
          </WebMaps>
          <IconLinks>
            <IconLink
              href="https://wiki.mozilla.org/Webmaker/WebLiteracyMap"
              imgSrc="/img/web-literacy-page/icon-contribute.svg"
              imgAlt="icon contribute"
              head="Contribute"
              subhead="Join the community on defining Web Literacy at Mozilla"
            />
            <IconLink
              href="https://mozilla.github.io/webmaker-whitepaper/"
              imgSrc="/img/web-literacy-page/icon-learn-more.svg"
              imgAlt="icon learn more"
              head="Learn More"
              subhead="This whitepaper explores why Mozilla cares about Web Literacy"
            />
            <IconLink
              href="https://www.mozilla.org/en-US/about/manifesto/"
              imgSrc="/img/web-literacy-page/icon-mozilla.svg"
              imgAlt="icon mozilla"
              head="Get Reading"
              subhead="Web Literacy is core to the Mozilla mission and values"
            />
          </IconLinks>
        </section>
      </div>
    );
  }
});

module.exports = ActivitiesPage;
