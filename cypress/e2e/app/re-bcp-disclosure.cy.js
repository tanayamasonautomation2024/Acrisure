const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv =
  config.sites.app.config.env[0].toUpperCase() +
  config.sites.app.config.env.slice(1);

const isNotLargeDesktop = Cypress.config().viewportWidth < 1441 
                       && Cypress.config().viewportWidth >= 1200;
const isTablet = Cypress.config().viewportWidth < 1200 
              && Cypress.config().viewportWidth >= 768;
const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("BOP-Disclosure - Functional Tests", () => {
    it("Visiting the BOP-Disclosure page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking BOP-Disclosure Hyperlinks", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).within(($mainWebpage) => {
        // Get all the links within the main webpage

        cy.get(cy_selectors.global.target_links).each((link) => {
          if (link.prop("href")) {
            cy.request({ url: link.prop("href"), failOnStatusCode: true });
            cy.log(link.prop("href"));
          }
        });
      });
    });
  });

  describe("BOP-Disclosure - Design Tests", () => {
    it.only("Validate BOP-Disclosure Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * BOP-Disclosure Webpage
       * ================================
       */
      cy.get(cy_selectors.reinsurance.corporate_advisory_header).scrollIntoView();

      if (isMobile) {
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.reinsurance.corporate_advisory_header).scrollIntoView();
      }	  
      cy.get(cy_selectors.reinsurance.corporate_advisory_explore_link).should("be.visible");
      cy.get(cy_selectors.reinsurance.corporate_advisory_explore_link).click({ force: true });
      cy.title().should('eq', 'Acrisure Re Corporate Advisory & Solutions');
      cy.wait(5000);

      cy.get(cy_selectors.corporate_advisory.acrisurere_disclaimer).scrollIntoView();

      cy.get(cy_selectors.corporate_advisory.bcp_disclosure).should("have.text",
        acm_constants.corporate_advisory.bcp_disclosure);
      cy.get(cy_selectors.corporate_advisory.bcp_disclosure).click({ force: true });
      cy.title().should('eq', "BCP Disclosure");
      cy.wait(5000);

      /* ----------------------------------------------------------
       * BOP-Disclosure Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.bopdisclosure.hero_splash_caption).should("have.text",
          acm_constants.bopdisclosure.hero_splash_caption);
        cy.get(cy_selectors.bopdisclosure.hero_splash_header).should("have.text",
         acm_constants.bopdisclosure.hero_splash_header);
        cy.get(cy_selectors.bopdisclosure.hero_splash_body_text).should("have.text",
          acm_constants.bopdisclosure.hero_splash_body_text);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* ----------------------------------------------------------
       * BOP-Disclosure - Paragraph
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.bopdisclosure.bcp_body_para1).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para1);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para2).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para2);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para3).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para3);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para4).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para4);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para5).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para5);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para6).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para6);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para7).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para7);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para8).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para8);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para9).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para9);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para10).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para10);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para11).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para11);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para12).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para12);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para13).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para13);
        cy.get(cy_selectors.bopdisclosure.bcp_body_para14).should("have.text",
          acm_constants.bopdisclosure.bcp_body_para14);
        cy.get(cy_selectors.bopdisclosure.acrisurere_privacy_policy_link).should("have.text",
          acm_constants.bopdisclosure.acrisurere_privacy_policy_link);        
        cy.get(cy_selectors.bopdisclosure.acrisurere_privacy_policy_link).click({ force: true });
        cy.title().should('eq', "Acrisure Re group Privacy Policy");
        cy.go('back');
        cy.wait(3000);
      }          
    });
  });
});