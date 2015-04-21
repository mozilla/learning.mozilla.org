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
                <ul>
                  <li>Accessing the web using the common features of a browser.</li>
                  <li>Using hyperlinks to access a range of resources on the web.</li>
                  <li>Reading, evaluating, and manipulating URLs.</li>
                  <li>Recognizing the common visual cues in the services.</li>
                  <li>Exploring browser add-ons and extensions to provice additional functionality.</li>
                </ul>
              </Expander>
              <Expander head="web mechanics">
                <ul>
                  <li>Using and understanding the differences between URLs, IP addresses and search terms.</li>
                  <li>Identifying where data is in the network of devices that makes up the Internet.</li>
                  <li>Exporting, moving, and backing up data from web services.</li>
                  <li>Explaining the role algorithms play in creating and managing content on the web.</li>
                  <li>Creating or modifying an algorithm to serve content from around the web.</li>
                </ul>
              </Expander>
              <Expander head="search">
                <ul>
                  <li>Developing questions to aid a search.</li>
                  <li>Using and revising keywords to make web searches more efficient.</li>
                  <li>Evaluating search results to determine if the information is relevant.</li>
                  <li>Finding real-time or time-sensitive information using a range of search techniques.</li>
                  <li>Discovering information and resources by asking people within social networks.</li>
                </ul>
              </Expander>
              <Expander head="credibility">
                <ul>
                  <li>Comparing and contrasting information from a number of sources.</li>
                  <li>Making judgments based on technical and design characteristics.</li>
                  <li>Discriminating between ‘original’ and derivative web content.</li>
                  <li>Identifying and investigating the author or publisher of web resources.</li>
                  <li>Evaluating how purpose and perspectives shape web resources.</li>
                </ul>
              </Expander>
              <Expander head="security">
                <ul>
                  <li>Recommending how to avoid online scams and 'phishing’.</li>
                  <li>Managing and maintaining account security.</li>
                  <li>Encrypting data and communications using software and add-ons.</li>
                  <li>Changing the default behavior of websites, add-ons and extensions to make web browsing more secure.</li>
                </ul>
              </Expander>
            </WebMap>
            <WebMap head="Build" subhead="Writing the Web">
              <Expander head="composing">
                <ul>
                  <li>Inserting hyperlinks into a web page.</li>
                  <li>Identifying and using HTML tags.</li>
                  <li>Embedding multimedia content into a web page.</li>
                  <li>Creating web resources in ways appropriate to the medium/genre.</li>
                  <li>Setting up and controlling a space to publish on the Web.</li>
                </ul>
              </Expander>
              <Expander head="remixing">
                <ul>
                  <li>Identifying remixable content.</li>
                  <li>Combining multimedia resources to create something new on the web.</li>
                  <li>Shifting context and meaning by creating derivative content.</li>
                  <li>Citing and referencing original content.</li>
                </ul>
              </Expander>
              <Expander head="designing">
                <ul>
                  <li>Using CSS properties to change the style and layout of a Web page.</li>
                  <li>Demonstrating the difference between inline, embedded and external CSS.</li>
                  <li>Improving user experiences through feedback and iteration.</li>
                  <li>Creating device-agnostic web resources.</li>
                </ul>
              </Expander>
              <Expander head="coding/scripting">
                <ul>
                  <li>Reading and explaining the structure of code.</li>
                  <li>Identifying and applying common coding patterns and concepts.</li>
                  <li>Adding comments to code for clarification and attribution.</li>
                  <li>Applying a script framework.</li>
                  <li>Querying a web service using an API.</li>
                </ul>
              </Expander>
              <Expander head="accessibility">
                <ul>
                  <li>Using empathy and awareness to inform the design of web content that is accessible to all users.</li>
                  <li>Designing for different cultures which may have different interpretations of design elements.</li>
                  <li>Comparing and exploring how different interfaces impact diverse users.</li>
                  <li>Improving the accessibility of a web page through the design of its color scheme, structure/hierarchy and markup.</li>
                  <li>Comparing and contrasting how different interfaces impact diverse web users.</li>
                </ul>
              </Expander>
            </WebMap>
            <WebMap head="Connect" subhead="Participating on the Web">
              <Expander head="sharing">
                <ul>
                  <li>Creating and using a system to distribute web resources to others.</li>
                  <li>Contributing and finding content for the benefit of others.</li>
                  <li>Creating, curating, and circulating web resources to elicit peer feedback.</li>
                  <li>Understanding the needs of audiences in order to make relevant contributions to a community.</li>
                  <li>Identifying when it is safe to contribute content in a variety of situations on the web.</li>
                </ul>
              </Expander>
              <Expander head="collaborating">
                <ul>
                  <li>Choosing a Web tool to use for a particular contribution/ collaboration.</li>
                  <li>Co-creating Web resources.</li>
                  <li>Configuring notifications to keep up-to-date with community spaces and interactions.</li>
                  <li>Working towards a shared goal using synchronous and asynchronous tools.</li>
                  <li>Developing and communicating a set of shared expectations and outcomes.</li>
                </ul>
              </Expander>
              <Expander head="participation">
                <ul>
                  <li>Engaging in web communities at varying levels of activity.</li>
                  <li>Respecting community norms when expressing opinions in web discussions.</li>
                  <li>Making sense of different terminology used within online communities.</li>
                  <li>Participating in both synchronous and asynchronous discussions.</li>
                </ul>
              </Expander>
              <Expander head="privacy">
                <ul>
                  <li>Debating privacy as a value and right in a networked world.</li>
                  <li>Explaining ways in which unsolicited third parties can track users across the web.</li>
                  <li>Controlling (meta)data shared with online services.</li>
                  <li>Identifying rights retained and removed through user agreements.</li>
                  <li>Managing and shaping online identities.</li>
                </ul>
              </Expander>
              <Expander head="open practices">
                <ul>
                  <li>Distinguishing between open and closed licensing.</li>
                  <li>Making web resources available under an open license.</li>
                  <li>Contributing to an open source project.</li>
                  <li>Advocating for an open web.</li>
                </ul>
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
              imgSrc="/img/web-literacy-page/icon-reading.svg"
              imgAlt="icon reading"
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
