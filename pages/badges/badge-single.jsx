var React = require('react'),
    Link = require('react-router').Link,
    LoginLink = require('../../components/login/LoginLink.jsx'),

    RequirementsList = require('../../components/badges/requirement-list.jsx'),
    SocialShare = require('../../components/badges/social-share.jsx'),
    Badge = require('../../components/badges/badge.jsx'),
    BadgeHorizontalIcon = require('../../components/badges/badge-horizontal-icon.jsx'),
    CredlyLinkForm = require('../../components/badges/CredlyLinkForm.jsx'),

    Divider = require('../../components/Divider.jsx'),
    BadgesAPI = require('../../lib/badges-api'),
    TeachAPI = require('../../lib/teach-api'),
    Modal = require('../../components/modal.jsx');

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
      hasAccess: false,
      showLinkModal: false,
      applying: false,
      showApplyModal: false,
      teachAPI: teachAPI,
      badgeAPI: badgeAPI,
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
      evidenceLink: '',
      evidenceText: '',
      evidenceFiles: []
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

    var evidenceRegex = /((\d+([.\!?])?)?[^.]+)/g;
    var criteriaRegex = /[\n\r]+/g;
    var criteria = bdata.criteria.length > 0 ? bdata.criteria.trim().split(criteriaRegex) : [];
    var evidence = bdata.require_claim_evidence_description.match(evidenceRegex) || [];

    this.setState({
      badge: {
        id: bdata.id,
        title: bdata.title,
        description: bdata.short_description,
        icon: bdata.image_url,
        icon2x: bdata.image_url,
        criteria,
        evidence,
        date_achieved: bdata.created_at,
        status
      },
      prev: prev,
      next: next
    });
  },

  render: function () {
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
          <CredlyLinkForm linkAccounts={this.linkAccounts} hideModal={this.hideLinkModal}/>
        </Modal>
      );
    }

    var badgeCriteria = this.formBadgeCriteria(this.state.badge.criteria);
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
      <div className="social-share">
        <a href={`https://twitter.com/home?status=${msg + encodeURIComponent(': ') + url}`} target={'_blank'}>twitter</a>
        <a href={`https://www.facebook.com/sharer.php?u=${url}&t=${msg}`} target={'_blank'}>facebook</a>
      </div>
    );
  },

  renderAchieved: function() {
    var badgeCriteria = this.formBadgeCriteria(this.state.badge.criteria);

    // FIXME: TODO: retrieve the information on when/how this badge was earned... IF we use this information at all.
    return (
      <div className="badge-achieved">
        <h3 className={'text-light'}>Congrats, you were awarded this credential.</h3>
        { this.getShareCodes() }
        <div className="badge-reward-text">
          <div className="date">
            DATE FROM API (although we may not end up using this);
          </div>
          <div className="qualifications">
            EVIDENCE FOR THIS BADGE, FROM API (although we may not end up using this)
          </div>
        </div>
      </div>
    );
  },

  renderPending: function() {
    var badgeCriteria = this.formBadgeCriteria(this.state.badge.criteria);
    var share = null; // <SocialShare />

    return (
      <div className="badge-pending">
        <h3 className={'text-light'}>Your badge claim is pending.</h3>
        { share }
        <div className="badge-reward-text">
          <div className="date">
            DATE FROM API (although we may not end up using this);
          </div>
          <div className="qualifications">
            EVIDENCE FOR THIS BADGE, FROM API (although we may not end up using this)
          </div>
        </div>
      </div>
    );
  },

  renderEligible: function() {
    var badgeCriteria = this.formBadgeCriteria(this.state.badge.criteria);

    return (
      <div className="badge-available">
        { badgeCriteria }
        { this.renderApplicationForm() }
      </div>
    );
  },

  formBadgeCriteria: function(list) {
    // FIXME: TODO: make this a local component
    return (
      <div className="badge-requirement" key={''}>
        <h3 className={'text-light'}>Badge Requirements</h3>
        <p>Make or write something that demonstrates your understanding of any two or more of the following:</p>
        <RequirementsList list={list} icon="fa fa-check"/>
      </div>
    );
  },

  renderApplicationForm: function() {
    var removeAttachment = this.removeAttachment.bind(this);
    var showButton = this.state.evidenceText || this.state.evidenceLink || this.state.evidenceFiles.length > 0;

    if (this.state.applying && this.state.showApplyModal) {
      return (
        <Modal modalTitle="" className="modal-credly folded" hideModal={this.hideApplyModal}>
          <h3 className="centered">Thanks for applying for this badge!</h3>
          <p>
            We will be reviewing your badge application and evidence as soon as possible.
          </p>
          <input type="submit" className="btn center-block" onClick={this.hideApplyModal} value="Back to my badge"/>
        </Modal>
      );
    }

    return (
      <div className="apply-send-qualifications">
        <h3 className={'text-light'}>Apply for this badge</h3>

        <div className="horizontal-form">
          <fieldset>
            <label className="control-label">Tell us what qualifies you to earn this badge:</label>
            <textarea rows={10} onChange={this.updateEvidenceText} value={this.state.evidenceText} placeholder="Describe what you've done to earn this badge..."/>
          </fieldset>

          <fieldset>
            <label className="control-label">Attach an (optional) link as part of your evidence:</label>
            <input type="text" placeholder="Give a link to a page to act as evidence" value={this.state.evidenceLink} onChange={this.updateEvidenceLink} />
          </fieldset>

          <fieldset>
            <input type="file" className="hidden" ref="optionalFile" onChange={this.handleFiles}/>
            <label className="control-label">Attach an (optional) file as part of your evidence:</label>
            <button className="btn attach" onClick={this.selectFiles}>pick file...</button>
            {
              (this.state.evidenceFiles && this.state.evidenceFiles.length > 0) ?
              this.state.evidenceFiles.map(function(e) {
                return <span className="attached">{e.name} <span className="fa fa-times" onClick={removeAttachment(e.name)}/></span>;
              }) : null
            }
          </fieldset>

          <button className={"btn"} disabled={!showButton} onClick={this.claimBadge}>Apply</button>
        </div>
      </div>
    );
  },

  updateEvidenceText: function(evt) {
    this.setState({
      evidenceText: evt.target.value
    });
  },

  updateEvidenceLink: function(evt) {
    this.setState({
      evidenceLink: evt.target.value
    });
  },

  selectFiles: function() {
    this.refs.optionalFile.click();
  },

  handleFiles: function(evt) {
    var self = this;
    var files = evt.target.files;
    var attachments = [];

    Array.from(files).forEach(function(file) {
      var reader = new FileReader();

      reader.onload = (function(f) {
        return function(e) {
          var name = escape(f.name);
          var data = e.target.result;

          if (data) {
            // FIXME: TODO: There is a 20MB limit on file uploads whch
            //              I doubt we'll run into, but _might_ be an issue
            //              eventually, so I'm leaving this comment.
            data = data.substring(data.indexOf('base64,')+'base64,'.length);
            attachments.push({ name: name, file: data });
          }

          if(attachments.length === files.length) {
            self.setState({
              evidenceFiles: attachments
            });
          }
        };
      })(file);
      reader.readAsDataURL(file);
    });
  },

  removeAttachment: function(name) {
    var self = this;

    return function() {
      var files = self.state.evidenceFiles;
      var pos = -1;

      files.forEach(function(file, idx) {
        if (file.name === name) {
          pos = idx;
        }
      });
      if (pos > -1) {
        files.splice(pos, 1);
        self.setState({
          evidenceFiles: files
        });
      }
    };
  },

  claimBadge: function() {
    var evidences = [];

    if (this.state.evidenceText) {
      evidences.push({
        file: btoa(this.state.evidenceText),
        name: "Claim description"
      });
    }

    if (this.state.evidenceLink) {
      evidences.push({
        file: this.state.evidenceLink,
        name: "Proof of claim link"
      });
    }

    if (this.state.evidenceFiles.length > 0) {
      evidences = evidences.concat(this.state.evidenceFiles);
    }

    if (evidences.length === 0) {
      return console.error("a badge claim without evidence was attempted");
    }

    this.setState({
      applying: true,
      showApplyModal: true
    }, function() {
      this.state.badgeAPI.claimBadge(this.state.badge.id, { evidences: evidences }, this.handleClaimRequest);
    });
  },

  handleClaimRequest: function(err, data) {
    // TODO: improve the UX for when network errors occur, leading to errors
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
    this.reloadPage();
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
