var React = require('react');
var Illustration = require('../../components/illustration.jsx');

var MakerPartyExample = React.createClass({
  render: function() {
    var host = this.props.host.link ? <a href={this.props.host.link}>{this.props.host.name}</a> : this.props.host.name;

    host = this.props.host.description ? <span>{host}, {this.props.host.description}</span> : host;

    return (
      <div className="activity-kit">
        <Illustration
        height={200} width={200}
        src1x={this.props.src1x}
        src2x={this.props.src2x}
        alt=""
        link={this.props.link}>
          <div className="activity-kit-content">
            <h3>{this.props.title}</h3>
            <div>
              <span className="span-content label-tag">Hosted by</span><span className="span-content">{host}</span>
            </div>
            <div>
              <span className="span-content label-tag">Location</span><span className="span-content">{this.props.location}</span>
            </div>
            { this.props.participants ?
              <div>
                <span className="span-content label-tag">Participants</span><span className="span-content">{this.props.participants}</span>
              </div> : null
            }
            <div>
              <p className="description" dangerouslySetInnerHTML={{__html: this.props.descriptionHTML}}></p>
            </div>
          </div>
        </Illustration>
      </div>
    );
  }
});

module.exports = MakerPartyExample;
