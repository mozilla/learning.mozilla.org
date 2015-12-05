var React = require('react');
var Router = require('react-router');
var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');


var ModalRemoveYourClub = React.createClass({
  mixins: [ModalManagerMixin, Router.Navigation, TeachAPIClientMixin],
  propTypes: {
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  STEP_CONFIRM: 1,
  STEP_WAIT_FOR_NETWORK: 2,
  STEP_SHOW_RESULT: 3,
  getInitialState: function() {
    return {
      step: this.STEP_CONFIRM,
      networkError: null
    };
  },
  handleConfirm: function() {
    this.setState({
      step: this.STEP_WAIT_FOR_NETWORK,
      networkError: false
    });
    this.getTeachAPI().deleteClub(this.props.url, this.handleNetworkResult);
  },
  handleNetworkResult: function(err) {
    if (!this.isMounted()) {
      return;
    }
    this.setState({
      networkError: !!err,
      step: err ? this.STEP_CONFIRM : this.STEP_SHOW_RESULT
    });
  },
  render: function() {
    var content, isFormDisabled;

    if (this.state.step !== this.STEP_SHOW_RESULT) {
      isFormDisabled = (this.state.step === this.STEP_WAIT_FOR_NETWORK);
      content = (
        <div>
          {this.state.networkError
           ? <div className="alert alert-danger">
               <p>Unfortunately, an error occurred when trying to remove your club.</p>
               <p>Please try again later.</p>
             </div>
           : null}
          <p>Are you sure you want to remove your club <strong>{this.props.name}</strong>?</p>
          <button className="btn btn-primary btn-block"
           disabled={isFormDisabled}
           onClick={this.handleConfirm}>
             {isFormDisabled
              ? <span>Removing <strong>{this.props.name}</strong>&hellip;</span>
              : <span>Yes, remove <strong>{this.props.name}</strong></span>}
           </button>
        </div>
      );
    } else {
      content = (
        <div className="text-center">
          <p><img className="globe" src="/img/pages/clubs/svg/globe-without-pin.svg"/></p>
          <h2>Your club has been removed.</h2>
        </div>
      );
    }

    return (
      <Modal modalTitle="Remove Your Club">
        {content}
      </Modal>
    );
  }
});


module.exports = ModalRemoveYourClub;
