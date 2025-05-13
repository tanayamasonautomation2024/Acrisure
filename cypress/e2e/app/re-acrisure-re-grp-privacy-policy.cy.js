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
  describe("Acrisure-Re-Group-Privacy-Policy - Functional Tests", () => {
    it("Visiting the Acrisure-Re-Group-Privacy-Policy page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Acrisure-Re-Group-Privacy-Policy Hyperlinks", () => {
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

  describe("Acrisure-Re-Group-Privacy-Policy - Design Tests", () => {
    it.only("Validate Acrisure-Re-Group-Privacy-Policy Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Acrisure Re Group Privacy Policy - Webpage
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

      cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy_link).should("have.text",
        acm_constants.corporate_advisory.acrisurere_privacy_policy_link);        
      cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy_link).click({ force: true });
      cy.title().should('eq', "Acrisure Re group Privacy Policy");
      cy.wait(3000);

      /* ----------------------------------------------------------
       * Acrisure Re Group Privacy Policy Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.hero_splash_caption).should("have.text",
          acm_constants.acrisure_privacy_policy.hero_splash_caption);
        cy.get(cy_selectors.acrisure_privacy_policy.hero_splash_header).should("have.text",
         acm_constants.acrisure_privacy_policy.hero_splash_header);
        cy.get(cy_selectors.acrisure_privacy_policy.hero_splash_body_text).should("have.text",
          acm_constants.acrisure_privacy_policy.hero_splash_body_text);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* ----------------------------------------------------------
       * Acrisure Re Group Privacy Policy - Policy Information 1
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body3)
          .should('contain', acm_constants.acrisure_privacy_policy.privacy_policy_info1_body3);        
        // cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body3).should("have.text",
        //   acm_constants.acrisure_privacy_policy.privacy_policy_info1_body3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body3a).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body3a);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet1)
          .should('contain', acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet2)
          .should('contain', acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet6).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet6);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet7).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet7);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info1_body5_bullet8).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info1_body5_bullet8);
      }          
      /* ----------------------------------------------------------
       * Acrisure Re Group Privacy Policy - Policy Information 2
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_body1);        
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body1_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_body1_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body1_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_body1_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body1_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_body1_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body1_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info2_body1_bullet4);        
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info2_body2).should("have.text",
           acm_constants.acrisure_privacy_policy.privacy_policy_info2_body2);
      }  
      /* ----------------------------------------------------------
       * Acrisure Re Group Privacy Policy - Policy Information 3
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet1).should("have.text",
           acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet6).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet6);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body2_bullet7).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body2_bullet7);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body3_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body3_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body3_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body3_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body4_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body4_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body4_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body4_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body4_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body4_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body4_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body4_bullet4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body5a).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body5a);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info3_body6).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info3_body6);
      } 
       // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 4
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4_body1);        
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4_body1_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4_body1_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4_body1_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4_body1_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info4_body1_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info4_body1_bullet3);
      }  
             // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 5
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1);        
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet5);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet6).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet6);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body1_bullet7).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body1_bullet7);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body2);   
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body2_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body2_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info5_body2_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info5_body2_bullet2);        
      }  
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 6
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info6);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info6_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info6_body1);        
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info6_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info6_body2); 
      }  
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 7
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body1_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body1_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body1_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body1_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body1_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body1_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body2); 
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body3); 
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body3_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body3_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body3_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body3_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body3_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body3_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info7_body4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info7_body4); 
      } 
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 8
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info8);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info8_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info8_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info8_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info8_body2);          
      } 
            // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 9
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info9).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info9);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info9).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info9).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info9_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info9_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info9_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info9_body1);
      } 
      //  * Acrisure Re Group Privacy Policy - Policy Information 10
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body4);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body1_bullet1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body1_bullet1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body1_bullet2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body1_bullet2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body1_bullet3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body1_bullet3);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body1_bullet4).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body1_bullet4);  
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info10_body5).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info10_body5);
        } 
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 11
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info11).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info11);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info11).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info11).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info11_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info11_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info11_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info11_body1);
      } 
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 12
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info12);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info12_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info12_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info12_address1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info12_address1);
      } 
      // /* ----------------------------------------------------------
      //  * Acrisure Re Group Privacy Policy - Policy Information 13
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13).click( {force : true} );
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13).scrollIntoView({ offset: { top: -200, left: 0 } });
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_header).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_header);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_body1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_body1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_body2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_body2);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_body3).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_body3);  
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_address1).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_address1);
        cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info13_address2).should("have.text",
          acm_constants.acrisure_privacy_policy.privacy_policy_info13_address2);
        } 
                // /* ----------------------------------------------------------
        //  * Acrisure Re Group Privacy Policy - Policy Information 14
        //  * ----------------------------------------------------------
        // */
        {     
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14).should("have.text",
            acm_constants.acrisure_privacy_policy.privacy_policy_info14);
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14).click( {force : true} );
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14).scrollIntoView({ offset: { top: -200, left: 0 } });
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14_header).should("have.text",
            acm_constants.acrisure_privacy_policy.privacy_policy_info14_header);
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14_body1).should("have.text",
            acm_constants.acrisure_privacy_policy.privacy_policy_info14_body1);
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14_body2).should("have.text",
            acm_constants.acrisure_privacy_policy.privacy_policy_info14_body2);
          cy.get(cy_selectors.acrisure_privacy_policy.privacy_policy_info14_address1).should("have.text",
            acm_constants.acrisure_privacy_policy.privacy_policy_info14_address1);
        } 
    });
  });
});