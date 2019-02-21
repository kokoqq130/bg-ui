import React from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import './index.less';
import Banner from './Banner';
import Page1 from './Page1';

function getStyle() {
    return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      max-width: 1200px;
      width: 100%;
      margin: 20px auto 0;
      padding: 0 24px;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
    #header #logo {
      padding: 0;
    }
    #header .ant-row > div:last-child #search-box,
    #header .ant-row > div:last-child .ant-select,
    #header .ant-row > div:last-child .ant-menu,
    #header .nav-phone-icon {
      display: none;
    }
    #header .ant-row > div:last-child .header-lang-button {
      margin-right: 0;
    }
    #header .ant-row .ant-col-lg-19,
    #header .ant-row .ant-col-xl-19 {
      width: 50%;
      float: right;
    }
    footer .footer-wrap{
      width: 100%;
      padding: 0;
    }
    footer .bottom-bar{
      margin: auto;
      max-width: 1200px;
      padding: 16px 24px;
    }
    footer  .bottom-bar{
      border-top: none;
    }
    footer .footer-wrap .ant-row{
      width: 100%;
      max-width: 1200px;
      padding: 86px 24px 93px 24px;
      margin: auto;
    }
    @media only screen and (max-width: 767.99px) {
      #footer .footer-wrap{
        padding: 40px 24px
      }
      footer .footer-wrap .ant-row {
        padding: 0;
      }
    }
  `;
}

/* eslint-disable react/prefer-stateless-function */
class Home extends React.Component {
  static contextTypes = {
      intl: PropTypes.object,
      isMobile: PropTypes.bool,
  };

  render() {
      const { isMobile } = this.context;
      const childProps = { ...this.props, isMobile, locale: {} };
      return (
          <DocumentTitle title="Backstage-UI">
              <div>
                  <div className="main-wrapper">
                      <Banner {...childProps} />
                      <Page1 {...childProps} />
                      <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
                  </div>
              </div>
          </DocumentTitle>
      );
  }
}

export default Home;