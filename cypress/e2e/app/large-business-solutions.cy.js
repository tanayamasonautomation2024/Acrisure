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
  describe("Large Business Solutions - Functional Tests", () => {
    it("Visiting the Large Business Solutions page", () => {
      cy.visitSite("app", "large-business-solutions");
      cy.url().should("include", "large-business-solutions");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Large Business Solutions Hyperlinks", () => {
      cy.visitSite("app", "large-business-solutions");
      cy.url().should("include", "large-business-solutions");

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

  describe("Large Business Solutions - Design Tests", () => {
    it.only("Validate Large Business Solutions Page", () => {
      cy.visitSite("app", "large-business-solutions");
      cy.url().should("include", "large-business-solutions");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Large Business Solutions Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Large Business Solutions Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {
        // Left Hand Text (Caption/Header/Body Text)
        cy.get(cy_selectors.large_business_solutions.hero_splash_caption).should("have.text",
          acm_constants.large_business_solutions.hero_splash_caption);
        cy.get(cy_selectors.large_business_solutions.hero_splash_header).should("have.text",
          acm_constants.large_business_solutions.hero_splash_header);
        cy.get(cy_selectors.large_business_solutions.hero_splash_body_text).should("have.text",
          acm_constants.large_business_solutions.hero_splash_body_text);
        cy.get(cy_selectors.large_business_solutions.hero_splash_getconnected_button).should("have.text",
          acm_constants.large_business_solutions.hero_splash_getconnected_button);
      }

      /* ----------------------------------------------------------
       * large_business_solutions - Consultative Approach
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.large_business_solutions.consultative_header_text).scrollIntoView();
        cy.get(cy_selectors.large_business_solutions.consultative_caption_text).should("have.text",
          acm_constants.large_business_solutions.consultative_caption_text);
        cy.get(cy_selectors.large_business_solutions.consultative_header_text).should("have.text",
          acm_constants.large_business_solutions.consultative_header_text);         
        cy.get(cy_selectors.large_business_solutions.consultative_body_text).should("have.text",
          acm_constants.large_business_solutions.consultative_body_text);
        cy.get(cy_selectors.large_business_solutions.consultative_tout_title).should("have.text",
          acm_constants.large_business_solutions.consultative_tout_title);     
      }
      
      //cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * large_business_solutions - Business Solutions & Insurance solutions
       * ----------------------------------------------------------
       */
      {
        // Business Solutions Column Text
        cy.get(cy_selectors.large_business_solutions.business_solution_header_text).scrollIntoView();

        cy.get(cy_selectors.large_business_solutions.business_solution_caption_text).should("have.text",
          acm_constants.large_business_solutions.business_solution_caption_text);

        cy.get(cy_selectors.large_business_solutions.business_solution_header_text).should("have.text",
          acm_constants.large_business_solutions.business_solution_header_text);     
    
        cy.get(cy_selectors.large_business_solutions.business_solution_body_text1).should("have.text",
            acm_constants.large_business_solutions.business_solution_body_text1);

        cy.get(cy_selectors.large_business_solutions.business_solution_body_text2).should("have.text",
          acm_constants.large_business_solutions.business_solution_body_text2);


        // Insurance Solutions Column Text

        cy.get(cy_selectors.large_business_solutions.insurance_solution_header_text).scrollIntoView();

        cy.get(cy_selectors.large_business_solutions.insurance_solution_caption_text).should("have.text",
          acm_constants.large_business_solutions.insurance_solution_caption_text);

        cy.get(cy_selectors.large_business_solutions.insurance_solution_header_text).should("have.text",
          acm_constants.large_business_solutions.insurance_solution_header_text);     
    
        cy.get(cy_selectors.large_business_solutions.insurance_solution_body_text1).should("have.text",
          acm_constants.large_business_solutions.insurance_solution_body_text1);

        cy.get(cy_selectors.large_business_solutions.insurance_solution_body_text2).should("have.text",
          acm_constants.large_business_solutions.insurance_solution_body_text2);
      }

      /* ---------------------------------------------------------
       * large_business_solutions - Industries
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.large_business_solutions.solutions_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.large_business_solutions.solutions_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // Industries Caption
        cy.get(cy_selectors.large_business_solutions.solutions_component_caption).should("have.text",
          acm_constants.large_business_solutions.solutions_component_caption);

        // Inner Content (Header, Industry List, and See More Button)
        cy.get(cy_selectors.large_business_solutions.industries_h2_header)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should(
            "have.text",
            acm_constants.large_business_solutions.industries_h2_header
          );

        // Traverse all Industry Lists once fully expanded        
        cy.get(".accordion-list")
          .children()
          .each(($industry, index) => {
            cy.wrap($industry).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($industry)
              .find(cy_selectors.large_business_solutions.industry_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.large_business_solutions.industry_list_h6_headers[index]);
  
            cy.wrap($industry)
              .find(cy_selectors.large_business_solutions.industry_list_body_text)
              .should("have.text", acm_constants.large_business_solutions.industry_list_body_texts[index]);
          });        
      }

      /* ---------------------------------------------------------
       * large_business_solutions - Capabilities
       * ---------------------------------------------------------
       */

      {
        cy.get(cy_selectors.large_business_solutions.capabilities_component).scrollIntoView();

        // Component Headers and Text
        cy.get(cy_selectors.large_business_solutions.capabilities_component_caption)
          .should("have.text", acm_constants.large_business_solutions.capabilities_component_caption);

        cy.get(cy_selectors.large_business_solutions.capabilities_h2_header)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_h2_header);

        if (Cypress.config("viewportWidth") < 768) {      
        // Capabilities List Sections        
        cy.get(cy_selectors.large_business_solutions.capabilities_risk_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_risk_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_risk_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_text2);

          cy.get(cy_selectors.large_business_solutions.capabilities_employee_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_header1)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_text2);
        } 
      
        if (Cypress.config("viewportWidth") > 768) {
      // Capabilities List Sections (for resolution 1920 and 1440)
        cy.get(cy_selectors.large_business_solutions.capabilities_risk_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_risk_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_risk_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_risk_text2);
        
        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_cyber_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_cyber_text2);
        
        cy.get(cy_selectors.large_business_solutions.capabilities_claims_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_claims_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_claims_text2);
        
        cy.get(cy_selectors.large_business_solutions.capabilities_employee_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_employee_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_employee_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_dataanalytics_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_dataanalytics_text2);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_button).click({ force: true });

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_header)
          .should("exist")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_header);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_text1)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_text1);

        cy.get(cy_selectors.large_business_solutions.capabilities_hrrequlatory_text2)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.capabilities_hrrequlatory_text2);
        }
      }
      /* ------------------------------------------------------
       * large_business_solutions - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.large_business_solutions.stats_component).scrollIntoView();

        // Component Headers and Text
        cy.get(cy_selectors.large_business_solutions.stats_component_caption)
          .should("have.text", acm_constants.large_business_solutions.stats_component_caption);

        cy.get(cy_selectors.large_business_solutions.stats_component_h2_header)
          .should("be.visible")
          .should("have.text", acm_constants.large_business_solutions.stats_component_h2_header);

        // cy.get(cy_selectors.large_business_solutions.stats_component_body_text)
        //   .should("be.visible")
        //   .should("have.text", acm_constants.large_business_solutions.stats_component_body_text);

        // Stat List Sections
        cy.get(cy_selectors.large_business_solutions.stat_box_wrapper)
          .find(cy_selectors.large_business_solutions.stat_box)
          .each(($statBox, index) => {
            cy.wrap($statBox)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .should("be.visible");

            cy.wrap($statBox)
              .find(cy_selectors.large_business_solutions.stat_box_count)
              .should("have.text", acm_constants.large_business_solutions.stat_list_counts[index])
              .should("be.visible");
        
            cy.wrap($statBox)
              .find(cy_selectors.large_business_solutions.stat_box_data_count)
              .should("have.text", acm_constants.large_business_solutions.stat_list_data_counts[index])
              .should("be.visible");
            
            cy.wrap($statBox)
              .find(cy_selectors.large_business_solutions.stat_box_h7_header)
              .should("have.text", acm_constants.large_business_solutions.stat_list_h7_headers[index])
              .should("be.visible");
            
              // cy.wrap($statBox)
              // .find(cy_selectors.large_business_solutions.stat_box_medium_body_text)
              // .should("have.text", acm_constants.large_business_solutions.stat_list_medium_body_texts[index])
              // .should("be.visible");
          });
      }
 
      /* --------------------------------------------------------------------
       * large_business_solutions - Webform Component
       * --------------------------------------------------------------------
       */
      //  {
      //   cy.get(cy_selectors.large_business_solutions.webform_component_container).scrollIntoView();
      //   cy.wait(1500);

      //   cy.get(cy_selectors.large_business_solutions.webform_component_title)
      //     .should("have.text", acm_constants.large_business_solutions.webform_component_title);

      //   cy.get(cy_selectors.large_business_solutions.webform_component_body_text)
      //     .should("have.text", acm_constants.large_business_solutions.webform_component_body_text);

      //   // Right Side Form 
      //   cy.get(cy_selectors.large_business_solutions.webform_first_name_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_first_name_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_first_name_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_first_name_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_last_name_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_last_name_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_last_name_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_last_name_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_company_name_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_company_name_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_company_name_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_company_name_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_number_of_employees_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_number_of_employees_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_number_of_employees_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_number_of_employees_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_state_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_state_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_state_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_state_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_email_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_email_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_email_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_email_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_phone_label)
      //     .should("have.text", acm_constants.large_business_solutions.webform_phone_label);

      //   cy.get(cy_selectors.large_business_solutions.webform_phone_placeholder).should(
      //       "have.attr",
      //       "placeholder",
      //       acm_constants.large_business_solutions.webform_phone_placeholder);

      //   cy.get(cy_selectors.large_business_solutions.webform_submit_button)
      //     .should("have.text", acm_constants.large_business_solutions.webform_submit_button);

      //   // cy.get(cy_selectors.large_business_solutions.Webform_response_recorded_title)
      //   //   .should("have.text", acm_constants.large_business_solutions.Webform_response_recorded_title);
        
      //   // cy.get(cy_selectors.large_business_solutions.Webform_response_recorded_message)
      //   //   .should("have.text", acm_constants.large_business_solutions.Webform_response_recorded_message);
      // }       
    });
  });
});