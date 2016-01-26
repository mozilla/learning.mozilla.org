var React = require('react');
var Illustration = require('../../components/illustration.jsx');

var SubSection = React.createClass({
  render: function() {
    return (
      <section>
        <Illustration height={150} width={150}
          src1x={this.props.imgSrc}
          src2x={this.props.imgSrc2x || this.props.imgSrc}
          alt=""
          caption={this.props.caption}
          link={this.props.link}
          className={this.props.className}>
          <div>
            <h3>{this.props.header}</h3>
            {this.props.description}
          </div>
        </Illustration>
      </section>
    );
  }
});

module.exports = SubSection;
