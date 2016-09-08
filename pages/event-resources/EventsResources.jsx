var React = require('react');

var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var Illustration = require('../../components/illustration.jsx');

var EventsHeader = require('../../components/events/events-header.jsx');
var EventsNav = require('../../components/events/events-nav.jsx');

var LogoAsset = require('./LogoAsset.jsx');

var LogoAssetLink = require('./LogoAssetLink.jsx');

var EventsResources = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: 'Event Resources',
    pageClassName: 'event-resources',
    LogoAsset: LogoAsset
  },
  render: function() {
    return (
      <div>
        <EventsHeader/>
        <EventsNav/>

        <div className="inner-container">
          <section>
            <h2 className="text-center">
              {this.context.intl.formatMessage({id: 'host_maker_party'})}
            </h2>
            <p>
              {this.context.intl.formatMessage({id: 'host_maker_party_paragraph'})}
            </p>
          </section>

          <section>
            <h2 className="text-center">
              {this.context.intl.formatMessage({id: 'maker_party_activities'})}
            </h2>
          </section>

          <section>
            <Illustration
            height={183} width={250}
            src1x="/img/pages/events/meme.png"
            src2x="/img/pages/events/meme_2x.png"
            alt="Maker Party logo"
            >
              <a href="#">
                {this.context.intl.formatMessage({id: 'maker_party_activity_1_title'})}
              </a>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_activity_1_body'})}
              </p>
            </Illustration>
            <Illustration
            height={183} width={250}
            src1x="/img/pages/events/contribute.png"
            src2x="/img/pages/events/contribute_2x.png"
            alt="Maker Party logo"
            >
              <a href="#">
                {this.context.intl.formatMessage({id: 'maker_party_activity_2_title'})}
              </a>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_activity_2_body'})}
              </p>
            </Illustration>
            <Illustration
            height={183} width={250}
            src1x="/img/pages/events/hack.png"
            src2x="/img/pages/events/hack_2x.png"
            alt="Maker Party logo"
            >
              <a href="#">
                {this.context.intl.formatMessage({id: 'maker_party_activity_3_title'})}
              </a>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_activity_3_body'})}
              </p>
            </Illustration>
            <Illustration
            height={183} width={250}
            src1x="/img/pages/events/dont-break.png"
            src2x="/img/pages/events/dont-break_2x.png"
            alt="Maker Party logo"
            >
              <a href="#">
                {this.context.intl.formatMessage({id: 'maker_party_activity_4_title'})}
              </a>
              <p>
                {this.context.intl.formatMessage({id: 'maker_party_activity_4_body'})}
              </p>
            </Illustration>
          </section>

          <section>
            <h2 className="text-center">
              {this.context.intl.formatMessage({id: 'hosting_maker_party'})}
            </h2>
            <p>
              {this.context.intl.formatMessage({id: 'maker_party_hosting_paragraph_1'})}
            </p>
            <p>
              {this.context.intl.formatMessage({id: 'maker_party_hosting_paragraph_2'})}
            </p>
            <ol>
              <li>
                {this.context.intl.formatMessage({id: 'hosting_list_1'})}
              </li>
              <li>
                {this.context.intl.formatMessage({id: 'hosting_list_2'})}
              </li>
              <li>
                {this.context.intl.formatMessage({id: 'hosting_list_3'})}
              </li>
              <li>
                {this.context.intl.formatMessage({id: 'hosting_list_4'})}
              </li>
            </ol>
            <div className="text-center">
              <a href="#" className="btn">
                {this.context.intl.formatMessage({id: 'get_host_pack'})}
              </a>
            </div>
          </section>

          <section>
            <h2 id="logo-assets">
              {this.context.intl.formatMessage({id: 'logos_and_assets'})}
            </h2>
            <p>
              {this.context.intl.formatMessage({id: 'maker_party_logo_and_assets'})}
            </p>

            <div className="row">
              <LogoAsset head={this.context.intl.formatMessage({id: 'maker_party_logo'})}
              alt="Maker Party Logo Image"
              src1x="/img/pages/event-resources/resource-thumbnails-01.png"
              src2x="/img/pages/event-resources/resource-thumbnails-01@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyLogo.eps">
                  {this.context.intl.formatMessage({id: 'download_eps'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyLogo.png">
                  {this.context.intl.formatMessage({id: 'download_png'})}
                </LogoAssetLink>
              </LogoAsset>
              <LogoAsset head={this.context.intl.formatMessage({id: 'brand_palette'})}
              alt="Brand Palette Image"
              src1x="/img/pages/event-resources/resource-thumbnails-03.png"
              src2x="/img/pages/event-resources/resource-thumbnails-03@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyBrandPalette.eps">
                  {this.context.intl.formatMessage({id: 'download_eps'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyBrandPalette.png">
                  {this.context.intl.formatMessage({id: 'download_png'})}
                </LogoAssetLink>
              </LogoAsset>
              <LogoAsset head={this.context.intl.formatMessage({id: 'poster'})}
              alt="Poster Image"
              src1x="/img/pages/event-resources/resource-thumbnails-07.png"
              src2x="/img/pages/event-resources/resource-thumbnails-07@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyBanner.eps">
                  {this.context.intl.formatMessage({id: 'download_eps'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyBanner.png">
                  {this.context.intl.formatMessage({id: 'download_png'})}
                </LogoAssetLink>
              </LogoAsset>
              <LogoAsset head={this.context.intl.formatMessage({id: 'desktop_wallpaper'})}
              alt="Desktop Wallpaper Image"
              src1x="/img/pages/event-resources/resource-thumbnails-10.png"
              src2x="/img/pages/event-resources/resource-thumbnails-10@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyWallpaper-1-320x480.jpg">
                  {this.context.intl.formatMessage({id: 'maker_party_size_1'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyWallpaper-1-640x1136.jpg">
                  {this.context.intl.formatMessage({id: 'maker_party_size_2'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyWallpaper-1-768x1280.jpg">
                  {this.context.intl.formatMessage({id: 'maker_party_size_3'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyWallpaper-1-1920x1200.jpg">
                  {this.context.intl.formatMessage({id: 'maker_party_size_4'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyWallpaper-1-2560x1440.jpg">
                  {this.context.intl.formatMessage({id: 'maker_party_size_5'})}
                </LogoAssetLink>
              </LogoAsset>
              <LogoAsset head={this.context.intl.formatMessage({id: 'table_cloth_design'})}
              alt="Table Cloth Design Image"
              src1x="/img/pages/event-resources/resource-thumbnails-04.png"
              src2x="/img/pages/event-resources/resource-thumbnails-04@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyTableClothDesign.eps">
                  {this.context.intl.formatMessage({id: 'download_eps'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyTableClothDesign.png">
                  {this.context.intl.formatMessage({id: 'download_png'})}
                </LogoAssetLink>
              </LogoAsset>
              <LogoAsset head={this.context.intl.formatMessage({id: 'buttons'})}
              alt="Buttons Image"
              src1x="/img/pages/event-resources/resource-thumbnails-06.png"
              src2x="/img/pages/event-resources/resource-thumbnails-06@2x.png">
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyButtons.eps">
                  {this.context.intl.formatMessage({id: 'download_eps'})}
                </LogoAssetLink>
                <LogoAssetLink href="https://stuff.webmaker.org/teach.mozilla.org/MakerPartyButtons.png">
                  {this.context.intl.formatMessage({id: 'download_png'})}
                </LogoAssetLink>
              </LogoAsset>
            </div>
          </section>


          <div className="row full-row quote">
            <section>
              <div>
                <h3 className="text-center">
                  {this.context.intl.formatMessage({id: 'become_maker_party_partner'})}
                </h3>
                <div className="row">
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <h4>
                      {this.context.intl.formatMessage({id: 'partner_item_1_title'})}
                    </h4>
                    <p>
                      {this.context.intl.formatMessage({id: 'partner_item_1_paragraph'})}
                    </p>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <h4>
                      {this.context.intl.formatMessage({id: 'partner_item_2_title'})}
                    </h4>
                    <p>
                      {this.context.intl.formatMessage({id: 'partner_item_2_paragraph'})}
                    </p>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <h4>
                      {this.context.intl.formatMessage({id: 'partner_item_3_title'})}
                    </h4>
                    <p>
                      {this.context.intl.formatMessage({id: 'partner_item_3_paragraph'})}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a href="#" className="btn">
                    {this.context.intl.formatMessage({id: 'partner_with_us'})}
                  </a>
                </div>
              </div>
            </section>
          </div>

          <section>
            <IconLinks>
              <IconLink
                link="#"
                imgSrc="/img/pages/events/svg/icon-join.svg"
                head={this.context.intl.formatMessage({id: 'press'})}
                subhead={this.context.intl.formatMessage({id: 'maker_party_press'})}
              />
              <IconLink
                link="#"
                imgSrc="/img/pages/events/svg/icon-home-help.png"
                head={this.context.intl.formatMessage({id: 'contact'})}
                subhead={this.context.intl.formatMessage({id: 'maker_party_contact'})}
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = EventsResources;
