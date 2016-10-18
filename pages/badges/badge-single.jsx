var React = require('react'),
    Link = require('react-router').Link,
    LoginLink = require('../../components/login/LoginLink.jsx'),

    RequirementsList = require('../../components/badges/RequirementsList.jsx'),
    Badge = require('../../components/badges/badge.jsx'),
    BadgeHorizontalIcon = require('../../components/badges/badge-horizontal-icon.jsx'),
    CredlyLinkForm = require('../../components/badges/CredlyLinkForm.jsx'),

    Divider = require('../../components/Divider.jsx'),
    BadgesAPI = require('../../lib/badges-api'),
    TeachAPI = require('../../lib/teach-api'),
    Modal = require('../../components/modal.jsx'),

    config = require('../../config/config');

var ACHIEVED_BADGE_BASE_URL = config.CREDLY_BASE_URL + 'credit/';

var Navigation = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var prev = this.props.prev;
    var next = this.props.next;

    return (
      <div className="badge-navigation">
        <a className="previous" href={"/" + this.context.intl.locale + prev.url}>
          <img src={prev.img} />
          <span clasName="label">← {prev.title}</span>
        </a>
        <a className="next" href={"/" + this.context.intl.locale + next.url}>
          <span clasName="label">{next.title} →</span>
          <img src={next.img} />
        </a>
      </div>
    );
  }
});

/**
 * Single badge Page
 */
var BadgePage = React.createClass({
  statics: {
    pageTitle: 'Badges',
    pageClassName: 'badges single-badge'
  },

  contextTypes: {
    history: React.PropTypes.object,
    intl: React.PropTypes.object
  },

  getInitialState: function () {
    var teachAPI = this.props.teachAPI || new TeachAPI();
    var badgeAPI = new BadgesAPI({ teachAPI: teachAPI });

    return {
      showLinkModal: false,
      teachAPI: teachAPI,
      hasAccess: false,
      badgeAPI: badgeAPI,
      applying: false,
      showApplyModal: false,
      applicationError: false,
      badge: {
        id: "",
        title: "",
        status: '',
        description: "",
        icon: "",
        icon2x: "",
        criteria: []
      },
      prev: false,
      next: false,
      evidence: []
    };
  },

  toggleAccess: function(err, result) {
    result = result || { access: false };
    this.setState({
      hasAccess: result.access
    });
  },

  componentDidMount: function() {
    // get this specific badge's details
    this.state.badgeAPI.getBadgeDetails(this.props.params.id, this.handleBadgeData);

    // we're also interested in whether this user is credly-authenticated
    this.state.badgeAPI.hasAccess(this.toggleAccess, function(err, data) {
      if (err) {
        return console.error("not logged into credly");
      }
    });
  },

  handleBadgeData: function(err, data) {
    if (err) {
      return console.error('Error in fetch badge information', err);
    }
    this.parseBadgeDetails(data);
  },

  parseBadgeDetails: function(data) {
    var bdata = data.badge;

    var prev = false;

    if (data.prev) {
      prev = {
        title: data.prev.title,
        url: '/badge/' + data.prev.id,
        img: data.prev.image_url
      };
    }

    var next = false;

    if (data.next) {
      next = {
        title: data.next.title,
        url: '/badge/' + data.next.id,
        img: data.next.image_url
      };
    }

    // FIXME: these need to be constants on the badgeAPI, probably
    var status = Badge.eligible;

    if (data.earned) { status = Badge.achieved; }
    if (data.pending) { status = Badge.pending; }

    var evidence = [];
    var criteria = [];
    var splitOnItems = /\n\r?/g;
    var parser = document.createDocumentFragment();
    var pbody = document.createElement("body");

    parser.appendChild(pbody);

    // extract evidence as itemized list based on newlines (\n with optional \r) if we can
    if (criteria.indexOf('\n') === -1) {
      splitOnItems = /[\s\n\r]+(?=Task)/g;
    }

    if (bdata.require_claim_evidence_description) {
      evidence = bdata.require_claim_evidence_description.trim();
      pbody.innerHTML = evidence;

      let items = Array.from(pbody.querySelectorAll("li"));

      if (items.length > 0) {
        evidence = items.map( e => e.innerHTML );
      }
    }

    if (bdata.criteria) {
      criteria = bdata.criteria.trim();
      pbody.innerHTML = criteria;

      let items = Array.from(pbody.querySelectorAll("li"));

      if (items.length > 0) {
        criteria = items.map( e => e.innerHTML );
      }
    }

    var desc = document.createElement("p");

    desc.innerHTML = bdata.description;

    this.setState({
      badge: {
        id: bdata.id,
        title: bdata.title,
        description: desc.textContent,
        icon: bdata.image_url,
        icon2x: bdata.image_url,
        criteria,
        evidence,
        date_achieved: bdata.created_at,
        status,
        achievedLink: ACHIEVED_BADGE_BASE_URL + bdata.member_badge_id
      },
      earned: data.earned || false,
      prev: prev,
      next: next
    });
  },

  render: function () {
    if (this.state.applying && this.state.showApplyModal) {
      return this.showBackToBadgeModal();
    }

    var content = null;
    var user = this.state.teachAPI.getLoginInfo();

    // We have quite a lot of different states that each require
    // we render (sometimes subtly) different content, so we decide
    // what to render in the following cascade:
    if (!this.state.badge.id) {
      content = this.renderLoadingView();
    } else if (!user) {
      content = this.renderAnonymousView();
    } else if (!this.state.hasAccess) {
      content = this.renderNeedCredlyLinked();
    } else if (this.state.badge.status === Badge.achieved) {
      content = this.renderAchieved();
    } else if (this.state.badge.status === Badge.pending) {
      content = this.renderPending();
    } else {
      content = this.renderEligible();
    }

    return (
      <div className="individual-badge">
        <div> <a href={"/" + this.context.intl.locale + "/badges"}>← back to credentials</a> </div>
        <BadgeHorizontalIcon badge={this.state.badge} />
        { content }
        <Divider />
        <Navigation prev={this.state.prev} next={this.state.next} />
      </div>
    );
  },

  showBackToBadgeModal: function() {
    var canClose = this.state.canCloseModal;
    var error = this.state.applicationError;
    var disabled = "disabled";

    if (canClose || error) {
      disabled = null;
    }

    if (error) {
      return (
        <Modal className="modal-credly error folded" hideModal={this.state.canCloseModal? this.hideApplyModal : false}>
          <h3 className="centered">Uh-oh, something went wrong...</h3>
          <p>
            Something went wrong with your application for this badge.
            Please let us know what you were doing so that we can
            look into getting that fixed as soon as possible for you!
          </p>
          <button className="btn back" onClick={this.hideApplyModal}>Back to the badge</button>
        </Modal>
      );
    }

    return (
      <Modal modalTitle="" className="modal-credly folded" hideModal={this.state.canCloseModal? this.hideApplyModal : false}>
        <h3 className="centered">Thanks for applying for this badge!</h3>
        <p>
          We will be reviewing your badge application and evidence as soon as possible.
        </p>
        <button disabled={disabled} className="btn back" onClick={this.hideApplyModal}>Back to my badge</button>
      </Modal>
    );
  },

  renderAnonymousView: function() {
    return (
      <div>
        <Divider/>
          <p>You need to be signed in before you can earn badges.</p>
          <LoginLink className="btn" loginBaseURL={this.state.teachAPI.baseURL} callbackURL={this.props.currentPath}>Sign in</LoginLink>
      </div>
    );
  },

  renderNeedCredlyLinked: function() {
    // FIXME: TODO: finish this up.
    var modal = null;

    if (this.state.showLinkModal) {
      modal = (
        <Modal modalTitle="" className="modal-credly folded" hideModal={this.hideLinkModal}>
          <h3 className="centered">Connect to Credly</h3>
          <p>
            Credly allows you to earn and store digital badges and credentials from a variety of
            education providers and services, including Mozilla.
            Learn more <a href='https://example.org'>about Credly</a>.
          </p>
          <CredlyLinkForm teachAPI={this.state.teachAPI} linkAccounts={this.linkAccounts} hideModal={this.hideLinkModal}/>
        </Modal>
      );
    }

    var badgeCriteria = this.formRequirements(this.state.badge.criteria);
    var username = this.state.teachAPI.getUsername();

    return (
      <div className="credly-link">
        { badgeCriteria }
        <Divider/>
        <h3 className={'text-light'}>Apply for this badge</h3>
        <p>Hi {username}! Connect to Credly to apply for this badge. <button className="btn" onClick={this.showLinkModal}>Connect</button></p>
        {modal}
      </div>
    );
  },

  renderLoadingView: function() {
    return (
      <div>
        <Divider/>
        <div style={{textAlign: 'center'}}>Loading badge details...</div>
      </div>
    );
  },

  getShareCodes: function() {
    var url = encodeURIComponent(window.location.toString());
    var msg = encodeURIComponent(`I earned the Mozilla ${this.state.badge.title} badge`);

    return (
      <ul className="social-share">
        <li>
          <a href={`https://twitter.com/home?status=${msg + encodeURIComponent(': ') + url}`} target={'_blank'}>
            <span className="fa fa-twitter"/> Tweet this badge
          </a>
          </li>
        <li>
          <a href={`https://www.facebook.com/sharer.php?u=${url}&t=${msg}`} target={'_blank'}>
            <span className="fa fa-facebook-official"/> Share this on facebook
          </a>
        </li>
      </ul>
    );
  },

  renderPending: function() {
    // FIXME: MAKE SURE THE PHRASING IS ENCOURAGING HERE

    return (
      <div className="badge-pending">
        <h3 className={'text-light'}>Your badge claim is pending.</h3>

        <div className="badge-reward-text">
          <p>Your badge claim is currently pending review by our staff.
          Once we{"'"}ve reviewed and approved your claim, visiting this
          page will show you the badge as having been achieved by you!</p>
        </div>
      </div>
    );
  },

  renderAchieved: function() {
    var badge = this.state.badge;
    var date = new Date(this.state.earned);
    var when = date.toLocaleString();

    // FIXME: MAKE SURE THE PHRASING IS ENCOURAGING HERE

    return (
      <div className="badge-achieved">
        <h3 className={'text-light'}>
          Congrats, you were awarded this badge!
        </h3>
        <p>
          Click <a href={ badge.achievedLink }>here</a> to see your badge
        </p>
        <div className="badge-reward-text">
          <div className="date">
            You earned this badge {when}
          </div>
        </div>
        { this.getShareCodes() }
      </div>
    );
  },

  renderEligible: function() {
    var badge = this.state.badge;
    var criteria = this.formRequirements(badge.criteria, badge.evidence);

    return (
      <div className="badge-available">
        { criteria }
        <button className={"btn"} disabled={!this.canUserApply()} onClick={this.claimBadge}>Apply</button>
      </div>
    );
  },

  canUserApply: function() {
    var ev = this.state.evidence;
    var gaps = ev.some(v => v===false);

    return !gaps && (ev.length === this.state.badge.evidence.length);
  },

  formRequirements: function(applicationCriteriaList, requiredEvidenceList) {
    return (
      <div className="badge-requirement" key={'badge-requirement-list'}>
        <h3 className={'text-light'}>Badge Requirements</h3>
        <p>Make or write something that demonstrates your understanding of any two or more of the following:</p>
        <RequirementsList
          icon="fa fa-check"
          criteria={applicationCriteriaList}
          evidence={requiredEvidenceList}
          onEvidence={this.setEvidence}
        />
      </div>
    );
  },

  setEvidence: function(evidence) {
    this.setState({ evidence });
  },

  claimBadge: function() {
    var evidences = [];
    var userSupplied = this.state.evidence;

    // iterate through all items that the user supplied evidence for.
    userSupplied.forEach( (state, position) => {
      if (state.evidenceText) {
        evidences.push({
          file: btoa(state.evidenceText),
          name: "Claim description"
        });
      }

      if (state.evidenceFiles.length > 0) {
        evidences = evidences.concat(this.state.evidenceFiles);
      }
    });

    if (evidences.length === 0) {
      return console.error("a badge claim without evidence was attempted");
    }

    this.setState({
      applying: true,
      showApplyModal: true,
      canCloseModal: false
    }, function() {
      this.state.badgeAPI.claimBadge(this.state.badge.id, { evidences }, this.handleClaimRequest);
    });
  },

  handleClaimRequest: function(err, data) {
    // TODO: improve the UX for when network errors occur, leading to errors
    this.setState({
      canCloseModal: true,
      applicationError: err ? data : false
    });
  },

  showLinkModal: function(evt) {
    this.setState({ showLinkModal: true });
  },

  hideLinkModal: function(evt) {
    this.setState({ showLinkModal: false });
  },

  showApplyModal: function(evt) {
    this.setState({ showApplyModal: true });
  },

  hideApplyModal: function(evt) {
    this.setState({ showApplyModal: false });

    // only do a full page reload on a successful application
    if (this.state.applicationError) {
      this.setState({
        applicationError: false
      });
    } else {
      this.reloadPage();
    }
  },

  linkAccounts: function(email, password, handleLinkResult) {
    // tell the badgeAPI to set up an access token for this user using their
    // supplied email and password, which we will then immediately forget again.
    var self = this;

    this.state.badgeAPI.ensureLogin(email, password, function(err, result) {
      if (handleLinkResult(err, result)) {
        self.reloadPage();
      }
    });
  },

  // reload the page on important events like logins and application state changes
  reloadPage: function() {
    window.location = window.location.toString();
  }

});

module.exports = BadgePage;
