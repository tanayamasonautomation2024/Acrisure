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
  describe("Corporate Advisory - Functional Tests", () => {
    it("Visiting the Corporate Advisory page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Corporate Advisory Hyperlinks", () => {
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

  describe("Corporate Advisory - Design Tests", () => {
    it.only("Validate Corporate Advisory Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");      
      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Corporate Advisory Webpage
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

      /* ----------------------------------------------------------
       * Reinsurance Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.corporate_advisory.hero_splash_caption).should("have.text",
          acm_constants.corporate_advisory.hero_splash_caption);
        //cy.get(cy_selectors.corporate_advisory.hero_splash_header).should("have.text",
         // acm_constants.corporate_advisory.hero_splash_header);
        cy.get(cy_selectors.corporate_advisory.hero_splash_body_text).should("have.text",
          acm_constants.corporate_advisory.hero_splash_body_text);
        cy.get(cy_selectors.corporate_advisory.hero_splash_connectwithus_button).should("have.text",
          acm_constants.corporate_advisory.hero_splash_connectwithus_button);

      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * Corporate Advisory - Services
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.corporate_advisory.services_header_text).scrollIntoView();
        
        cy.get(cy_selectors.corporate_advisory.services_caption_text).should("have.text",
          acm_constants.corporate_advisory.services_caption_text);

        cy.get(cy_selectors.corporate_advisory.services_header_text).should("have.text",
          acm_constants.corporate_advisory.services_header_text);

        cy.get(cy_selectors.corporate_advisory.services_body_text1).should("have.text",
          acm_constants.corporate_advisory.services_body_text1);

        cy.get(cy_selectors.corporate_advisory.services_body_text2).should("have.text",
          acm_constants.corporate_advisory.services_body_text2);

        cy.get(cy_selectors.corporate_advisory.services_connectwithus_button).should("have.text",
          acm_constants.corporate_advisory.services_connectwithus_button);

        cy.get(cy_selectors.corporate_advisory.services_advisory_text).should("have.text",
          acm_constants.corporate_advisory.services_advisory_text);

        cy.get(cy_selectors.corporate_advisory.services_advisory_body).should("have.text",
          acm_constants.corporate_advisory.services_advisory_body);

        cy.get(cy_selectors.corporate_advisory.services_ratingagency_text).should("have.text",
          acm_constants.corporate_advisory.services_ratingagency_text);

        cy.get(cy_selectors.corporate_advisory.services_ratingagency_body).should("have.text",
          acm_constants.corporate_advisory.services_ratingagency_body);

        cy.get(cy_selectors.corporate_advisory.services_funds_text).scrollIntoView();

        cy.get(cy_selectors.corporate_advisory.services_funds_text).should("have.text",
          acm_constants.corporate_advisory.services_funds_text);
          
        cy.get(cy_selectors.corporate_advisory.services_funds_body).should("have.text",
          acm_constants.corporate_advisory.services_funds_body);

        cy.get(cy_selectors.corporate_advisory.services_investment_text).should("have.text",
          acm_constants.corporate_advisory.services_investment_text);
  
        cy.get(cy_selectors.corporate_advisory.services_investment_body).should("have.text",
          acm_constants.corporate_advisory.services_investment_body);
  
        cy.get(cy_selectors.corporate_advisory.services_legacy_text).should("have.text",
          acm_constants.corporate_advisory.services_legacy_text);
  
        cy.get(cy_selectors.corporate_advisory.services_legacy_body).should("have.text",
          acm_constants.corporate_advisory.services_legacy_body);
  
        cy.get(cy_selectors.corporate_advisory.services_CATbond_text).scrollIntoView();
  
        cy.get(cy_selectors.corporate_advisory.services_CATbond_text).should("have.text",
          acm_constants.corporate_advisory.services_CATbond_text);
            
        cy.get(cy_selectors.corporate_advisory.services_CATbond_body).should("have.text",
          acm_constants.corporate_advisory.services_CATbond_body);

      }
      /* ------------------------------------------------------
       * Corporate Advisory - Why Acrisure RE
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.corporate_advisory.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });

        // Left Column Image
        cy.get(cy_selectors.corporate_advisory.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.wait(5000);
        // Get outer pill container and traverse elements to confirm the pill text in the middle 
        cy.xpath(cy_selectors.corporate_advisory.pill_box_text_expertise).should("have.text", acm_constants.corporate_advisory.pill_box_text_expertise);
        cy.xpath(cy_selectors.corporate_advisory.pill_box_text_and).should("have.text", acm_constants.corporate_advisory.pill_box_text_and);
        cy.xpath(cy_selectors.corporate_advisory.pill_box_text_service).should("have.text", acm_constants.corporate_advisory.pill_box_text_service);        

        cy.get(cy_selectors.corporate_advisory.whyacrisure_slides).its("length").as("numberOfSlides");
        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.corporate_advisory.whyacrisure_active_slide, { timeout: 15000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");
              
            cy.get(cy_selectors.corporate_advisory.whyacrisure_active_slide)
              .find(cy_selectors.corporate_advisory.whyacrisure_slide_caption)
              .should("have.text", acm_constants.corporate_advisory.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.corporate_advisory.whyacrisure_active_slide)
              .find(cy_selectors.corporate_advisory.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.corporate_advisory.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.corporate_advisory.whyacrisure_active_slide)
              .find(cy_selectors.corporate_advisory.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.corporate_advisory.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.corporate_advisory.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      } 


      /* --------------------------------------------------------------------
       * Corporate Advisory & Solutions Consultation
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.corporate_advisory.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.corporate_advisory.webform_component_title)
          .should("have.text", acm_constants.corporate_advisory.webform_component_title);

        cy.get(cy_selectors.corporate_advisory.webform_component_body_text)
          .should("have.text", acm_constants.corporate_advisory.webform_component_body_text);

        cy.get(cy_selectors.corporate_advisory.webform_industry_label)
          .should("have.text", acm_constants.corporate_advisory.webform_industry_label);

        cy.get(cy_selectors.corporate_advisory.webform_industry_placeholder)
          .should("have.attr", "placeholder", acm_constants.corporate_advisory.webform_industry_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_first_name_label)
          .should("have.text", acm_constants.corporate_advisory.webform_first_name_label);

        cy.get(cy_selectors.corporate_advisory.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_first_name_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_last_name_label)
          .should("have.text", acm_constants.corporate_advisory.webform_last_name_label);

        cy.get(cy_selectors.corporate_advisory.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_last_name_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_company_name_label)
          .should("have.text", acm_constants.corporate_advisory.webform_company_name_label);

        cy.get(cy_selectors.corporate_advisory.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_company_name_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_number_of_employees_label)
          .should("have.text", acm_constants.corporate_advisory.webform_number_of_employees_label);

        cy.get(cy_selectors.corporate_advisory.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_state_label)
          .should("have.text", acm_constants.corporate_advisory.webform_state_label);

        cy.get(cy_selectors.corporate_advisory.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_state_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_email_label)
          .should("have.text", acm_constants.corporate_advisory.webform_email_label);

        cy.get(cy_selectors.corporate_advisory.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_email_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_phone_label)
          .should("have.text", acm_constants.corporate_advisory.webform_phone_label);

        cy.get(cy_selectors.corporate_advisory.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.corporate_advisory.webform_phone_placeholder);

        cy.get(cy_selectors.corporate_advisory.webform_submit_button)
          .should("have.text", acm_constants.corporate_advisory.webform_submit_button);
      }
      
      /* --------------------------------------------------------------------
       * Corporate Advisory - promo cards
       * --------------------------------------------------------------------
       */
      cy.get(cy_selectors.corporate_advisory.corporate_reinsurancesolutions_header).scrollIntoView();

      if (isMobile) {
        cy.wait(3000);
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.corporate_advisory.corporate_reinsurancesolutions_header).scrollIntoView();
      }	  
      cy.get(cy_selectors.corporate_advisory.corporate_reinsurancesolutions_header).should("be.visible");
      cy.get(cy_selectors.corporate_advisory.corporate_learnmore_link).should("be.visible");
      cy.get(cy_selectors.corporate_advisory.corporate_learnmore_link).click({ force: true });
      cy.title().should('eq', 'Insurance, Cybersecurity and Business Solutions Insights');
      cy.go('back');      
      cy.wait(5000);

      /* --------------------------------------------------------------------
       * Corporate Advisory - Insights and News
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.corporate_advisory.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.corporate_advisory.insights_caption).should("have.text",
          acm_constants.corporate_advisory.insights_caption);

        cy.get(cy_selectors.corporate_advisory.insights_h4_header).should("have.text",
          acm_constants.corporate_advisory.insights_h4_header);

        cy.get(cy_selectors.corporate_advisory.insights_body_text).should("have.text",
          acm_constants.corporate_advisory.insights_body_text);

        cy.xpath(selectors.common.onetrust1).click({ force: true });

        // News Cards (Check each image and card title)
        cy.get(cy_selectors.corporate_advisory.resource_card).each(($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.corporate_advisory.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 2){
              cy.get(cy_selectors.corporate_advisory.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isNotLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.corporate_advisory.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.corporate_advisory.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.corporate_advisory.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.corporate_advisory.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.corporate_advisory.read_more_button).should("have.text",
          acm_constants.corporate_advisory.read_more_button);

        // Disclaimer - Acrisure Re Group Privacy Policy

        cy.get(cy_selectors.corporate_advisory.acrisurere_disclaimer).scrollIntoView();

        cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy).should("have.text",
          acm_constants.corporate_advisory.acrisurere_privacy_policy);

        cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy1).should("have.text",
          acm_constants.corporate_advisory.acrisurere_privacy_policy1);
        cy.get(cy_selectors.corporate_advisory.brokercheck).click({ force: true });
        cy.title().should('eq', "ACRISURE RE CORPORATE ADVISORY & SOLUTIONS, LLC - BrokerCheck");
        cy.go('back');
        cy.wait(5000);

        cy.get(cy_selectors.corporate_advisory.arcas_disclosure).should("have.text",
          acm_constants.corporate_advisory.arcas_disclosure);
        cy.get(cy_selectors.corporate_advisory.arcas_disclosure).click({ force: true });
        cy.title().should('eq', "Remuneration Disclosure");
        cy.go('back');
        cy.wait(5000);

        cy.get(cy_selectors.corporate_advisory.bcp_disclosure).should("have.text",
          acm_constants.corporate_advisory.bcp_disclosure);
        cy.get(cy_selectors.corporate_advisory.bcp_disclosure).click({ force: true });
        cy.title().should('eq', "BCP Disclosure");
        cy.go('back');
        cy.wait(5000);

        cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy_link).should("have.text",
          acm_constants.corporate_advisory.acrisurere_privacy_policy_link);        
        cy.get(cy_selectors.corporate_advisory.acrisurere_privacy_policy_link).click({ force: true });
        cy.title().should('eq', "Acrisure Re group Privacy Policy");
        cy.go('back');
        cy.wait(3000);
      }   
    });
  });
});