var React = require('react');
var Link = require('react-router').Link;
var ImageTag = require('./imagetag.jsx');
var OutboundLink = require('react-ga').OutboundLink;

var LinkSwap = React.createClass({
  propTypes: {
    link: React.PropTypes.string.isRequired
  },
  render: function() {
    var link = this.props.link;
    if (!link) return this.props.children;
    var ifExternalLink = (link.substr(0,4).toLowerCase() === "http") || (link.substr(0,7).toLowerCase() === "mailto:");
    return (
      ifExternalLink ?  <OutboundLink to={this.props.link} eventLabel={this.props.link} className="external-link">{this.props.children}</OutboundLink> :
                        <Link to={this.props.link} ref={this.props.key}>{this.props.children}</Link>
    );
  }
});

var Subhead = React.createClass({
  render: function() {
    var highlightedText = this.props.highlightedText || null;
    var textArray = this.props.bodyText.split(highlightedText);
    var content = <p>
                    {textArray[0]}
                    <strong>{highlightedText}</strong>
                    {textArray[1]}
                  </p>;
    return(
      <div className="subhead">{content}</div>
    );
  }
})


var IconLink = React.createClass({
  propTypes: {
    link: React.PropTypes.string.isRequired,
    subhead: React.PropTypes.string.isRequired,
    highlightText: React.PropTypes.string
  },
  render: function() {
    return (
      <div className={"icon-link " + this.props.className}>
        <LinkSwap link={this.props.link}>
          <figure>
            <ImageTag
              className="image"
              src1x={this.props.imgSrc}
              src2x={this.props.imgSrc2x}
              width={this.props.width}
              height={this.props.height}
              alt="" />
            <figcaption>
              <h3 className="head">{this.props.head}</h3>
              <Subhead bodyText={this.props.subhead} highlightedText={this.props.highlightedText} />
            </figcaption>
          </figure>
        </LinkSwap>
      </div>
    );
  }
});

module.exports = IconLink;
