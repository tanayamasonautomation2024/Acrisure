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
  describe("Renumeration-Disclosure - Functional Tests", () => {
    it("Visiting the Renumeration-Disclosure page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Renumeration-Disclosure Hyperlinks", () => {
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

  describe("Renumeration-Disclosure - Design Tests", () => {
    it.only("Validate Renumeration-Disclosure Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Renumeration Disclosure - Webpage
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

      cy.get(cy_selectors.corporate_advisory.arcas_disclosure).should("have.text",
        acm_constants.corporate_advisory.arcas_disclosure);        
      cy.get(cy_selectors.corporate_advisory.arcas_disclosure).click({ force: true });
      cy.title().should('eq', "Remuneration Disclosure");
      cy.wait(3000);

      /* ----------------------------------------------------------
       * Renumeration Disclosure Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.remuneration_disclosure.hero_splash_caption).should("have.text",
          acm_constants.remuneration_disclosure.hero_splash_caption);
        cy.get(cy_selectors.remuneration_disclosure.hero_splash_header).should("have.text",
         acm_constants.remuneration_disclosure.hero_splash_header);
        cy.get(cy_selectors.remuneration_disclosure.hero_splash_body_text1).should("have.text",
          acm_constants.remuneration_disclosure.hero_splash_body_text1);
        cy.get(cy_selectors.remuneration_disclosure.hero_splash_body_text2).should("have.text",
          acm_constants.remuneration_disclosure.hero_splash_body_text2);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* ----------------------------------------------------------
       * Renumeration Disclosure - Principle
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_principles_info1);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1).scrollIntoView({ offset: { top: -200, left: 0 } });        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_principles_info1_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_principles_info1_body1);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_principles_info1_body2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_principles_info1_body2);        
      }          
      /* ----------------------------------------------------------
       * Renumeration Disclosure - Goverance
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_header).scrollIntoView({ offset: { top: -300, left: 0 } });        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_body1);        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body1_bullet1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_body1_bullet1);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body1_bullet2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_body1_bullet2);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body1_bullet3).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_body1_bullet3);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body1_bullet4).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_governance_info2_body1_bullet4);        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_governance_info2_body2).should("have.text",
           acm_constants.remuneration_disclosure.remuneration_governance_info2_body2);
      }  
      /* ----------------------------------------------------------
       * Renumeration Disclosure - Variable Pay and Link to Performance
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_variablepay_info3);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3_header).scrollIntoView({ offset: { top: -350, left: 0 } });        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_variablepay_info3_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_variablepay_info3_body1);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_variablepay_info3_body2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_variablepay_info3_body2);
      } 
       // /* ----------------------------------------------------------
      //  * Renumeration Disclosure - Remuneration Adjustment
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_header).scrollIntoView({ offset: { top: -350, left: 0 } });
        cy.wait(10000);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4_body1);		  
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_body2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4_body2);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_body3).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4_body3);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_adjustment_info4_body4).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_adjustment_info4_body4);
      }  
             // /* ----------------------------------------------------------
      //  * Renumeration Disclosure - Quantitative Disclosure
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5).scrollIntoView({ offset: { top: -200, left: 0 } });
        //cy.wait(9000);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_body1);        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_body2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_body2);    		  
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_body3).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_body3);    		  
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_body4).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_body4);  
        cy.get(cy_selectors.remuneration_disclosure.remuneration_quantitative_info5_body5).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_quantitative_info5_body5); 
      }  
      // /* ----------------------------------------------------------
      //  * Renumeration Disclosure - Specific Remuneration Structures
      //  * ----------------------------------------------------------
      // */
      {     
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_specific_info6);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6).click( {force : true} );
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6).scrollIntoView({ offset: { top: -200, left: 0 } });
        //cy.wait(10000);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6_header).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_specific_info6_header);
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6_body1).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_specific_info6_body1);        
        cy.get(cy_selectors.remuneration_disclosure.remuneration_specific_info6_body2).should("have.text",
          acm_constants.remuneration_disclosure.remuneration_specific_info6_body2);    
      }      
    });
  });
});