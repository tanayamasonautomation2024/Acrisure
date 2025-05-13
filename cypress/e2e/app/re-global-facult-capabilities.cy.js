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
  describe("Global Facultative Capabilities - Functional Tests", () => {
    it("Visiting the Global Facultative Capabilities page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Global Facultative Capabilities Hyperlinks", () => {
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

  describe("Global Facultative Capabilities - Design Tests", () => {
    it.only("Validate Global Facultative Capabilities Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");      
      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Global Facultative Capabilities Webpage
       * ================================
       */
      cy.get(cy_selectors.reinsurance.global_facultative_header).scrollIntoView();

      if (isMobile) {
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.reinsurance.global_facultative_header).scrollIntoView();
      }	  
      cy.get(cy_selectors.reinsurance.global_facultative_explore_link).should("be.visible");
      cy.get(cy_selectors.reinsurance.global_facultative_explore_link).click({ force: true });
      cy.title().should('eq', "Acrisure Re Global Facultative Capabilities");
      cy.wait(5000);

      /* ----------------------------------------------------------
       * Reinsurance Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.global_facultative_capabilities.hero_splash_caption).should("have.text",
          acm_constants.global_facultative_capabilities.hero_splash_caption);
        // cy.get(cy_selectors.global_facultative_capabilities.hero_splash_header).should("have.text",
        //  acm_constants.global_facultative_capabilities.hero_splash_header);
        cy.get(cy_selectors.global_facultative_capabilities.hero_splash_body_text).should("have.text",
          acm_constants.global_facultative_capabilities.hero_splash_body_text);
        cy.get(cy_selectors.global_facultative_capabilities.hero_splash_connectwithus_button).should("have.text",
          acm_constants.global_facultative_capabilities.hero_splash_connectwithus_button);

      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * Global Facultative Capabilities - Services
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.global_facultative_capabilities.services_header_text).scrollIntoView();
        
        cy.get(cy_selectors.global_facultative_capabilities.services_caption_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_caption_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_header_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_header_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_body_text1).should("have.text",
          acm_constants.global_facultative_capabilities.services_body_text1);

        // cy.get(cy_selectors.global_facultative_capabilities.services_body_text2).should("have.text",
        //   acm_constants.global_facultative_capabilities.services_body_text2);

        cy.get(cy_selectors.global_facultative_capabilities.services_connectwithus_button).should("have.text",
          acm_constants.global_facultative_capabilities.services_connectwithus_button);

        cy.get(cy_selectors.global_facultative_capabilities.services_specialist_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_specialist_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_specialist_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_specialist_body);

        cy.get(cy_selectors.global_facultative_capabilities.services_service_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_service_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_service_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_service_body);

        cy.get(cy_selectors.global_facultative_capabilities.services_global_text).scrollIntoView();

        cy.get(cy_selectors.global_facultative_capabilities.services_global_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_global_text);
          
        cy.get(cy_selectors.global_facultative_capabilities.services_global_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_global_body);

        cy.get(cy_selectors.global_facultative_capabilities.services_integrated_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_integrated_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_integrated_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_integrated_body);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_claims_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_claims_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_claims_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_claims_body);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_facultative_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_facultative_text);
            
        cy.get(cy_selectors.global_facultative_capabilities.services_facultative_body).should("have.text",
          acm_constants.global_facultative_capabilities.services_facultative_body);

        cy.get(cy_selectors.global_facultative_capabilities.services_primary_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_primary_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_traditional_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_traditional_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_single_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_single_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_fronted_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_fronted_text);
        
        cy.get(cy_selectors.global_facultative_capabilities.services_sideways_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_sideways_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_deductible_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_deductible_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_binders_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_binders_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_clash_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_clash_text);

        cy.get(cy_selectors.global_facultative_capabilities.services_nat_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_nat_text);
        
        cy.get(cy_selectors.global_facultative_capabilities.services_portfolio_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_portfolio_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_net_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_net_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_top_up_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_top_up_text);
  
        cy.get(cy_selectors.global_facultative_capabilities.services_captive_text).should("have.text",
          acm_constants.global_facultative_capabilities.services_captive_text);

          cy.get(cy_selectors.global_facultative_capabilities.services_captive_text).scrollIntoView();

        // cy.get(".list-items > ul > li:nth-child(6) > p > ul")
        //   .children()
        //   .each(($whatwedo, index) => {
        //     cy.wrap($whatwedo).scrollIntoView({ offset: { top: -100, left: 0 } });

        //     cy.wrap($whatwedo)
        //       .find(cy_selectors.global_facultative_capabilities.whatwedo_list_h6_header)
        //       //.scrollIntoView({ offset: { top: -50, left: 0 } })
        //       .should("have.text", acm_constants.global_facultative_capabilities.whatwedo_list_h6_headers[index]);
        //     // cy.wait(5000);
        //     // cy.wrap($whatwedo)
        //     //   .find(cy_selectors.global_facultative_capabilities.whatwedo_list_h6_header)
        //     //   .should("have.text", acm_constants.global_facultative_capabilities.whatwedo_list_h6_headers[index]);
        //   });

        cy.get(cy_selectors.global_facultative_capabilities.services_facultative_body).scrollIntoView({ offset: { top: 200, left: 0 } });        

      }
      /* ------------------------------------------------------
       * Global Facultative Capabilities - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.global_facultative_capabilities.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });
        //cy.get(cy_selectors.global_facultative_capabilities.two_column_component_container).scrollIntoView();

        // Left Column Image
        cy.get(cy_selectors.global_facultative_capabilities.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.wait(5000);
        // Get outer pill container and traverse elements to confirm the pill text in the middle 
        cy.xpath(cy_selectors.global_facultative_capabilities.pill_box_text_expertise).should("have.text", acm_constants.global_facultative_capabilities.pill_box_text_expertise);
        cy.xpath(cy_selectors.global_facultative_capabilities.pill_box_text_and).should("have.text", acm_constants.global_facultative_capabilities.pill_box_text_and);
        cy.xpath(cy_selectors.global_facultative_capabilities.pill_box_text_service).should("have.text", acm_constants.global_facultative_capabilities.pill_box_text_service);        

        cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_slides).its("length").as("numberOfSlides");
        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_active_slide, { timeout: 15000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");
              
            cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_active_slide)
              .find(cy_selectors.global_facultative_capabilities.whyacrisure_slide_caption)
              .should("have.text", acm_constants.global_facultative_capabilities.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_active_slide)
              .find(cy_selectors.global_facultative_capabilities.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.global_facultative_capabilities.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_active_slide)
              .find(cy_selectors.global_facultative_capabilities.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.global_facultative_capabilities.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.global_facultative_capabilities.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      } 


      /* --------------------------------------------------------------------
       * Global Facultative Capabilities - Consultation
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.global_facultative_capabilities.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.global_facultative_capabilities.webform_component_title)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_component_title);

        cy.get(cy_selectors.global_facultative_capabilities.webform_component_body_text)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_component_body_text);

        cy.get(cy_selectors.global_facultative_capabilities.webform_industry_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_industry_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_industry_placeholder)
          .should("have.attr", "placeholder", acm_constants.global_facultative_capabilities.webform_industry_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_first_name_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_first_name_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_first_name_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_last_name_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_last_name_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_last_name_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_company_name_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_company_name_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_company_name_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_number_of_employees_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_number_of_employees_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_state_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_state_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_state_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_email_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_email_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_email_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_phone_label)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_phone_label);

        cy.get(cy_selectors.global_facultative_capabilities.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.global_facultative_capabilities.webform_phone_placeholder);

        cy.get(cy_selectors.global_facultative_capabilities.webform_submit_button)
          .should("have.text", acm_constants.global_facultative_capabilities.webform_submit_button);
      }
      
      /* --------------------------------------------------------------------
       * Global Facultative Capabilities - promo cards
       * --------------------------------------------------------------------
       */
      cy.get(cy_selectors.global_facultative_capabilities.corporate_reinsurancesolutions_header).scrollIntoView();

      if (isMobile) {
        cy.wait(3000);
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.global_facultative_capabilities.corporate_reinsurancesolutions_header).scrollIntoView();
      }	  
      cy.get(cy_selectors.global_facultative_capabilities.corporate_reinsurancesolutions_header).should("be.visible");
      cy.get(cy_selectors.global_facultative_capabilities.corporate_learnmore_link).should("be.visible");
      cy.get(cy_selectors.global_facultative_capabilities.corporate_learnmore_link).click({ force: true });
      cy.title().should('eq', 'Insurance, Cybersecurity and Business Solutions Insights');
      cy.go('back');      
      cy.wait(5000);

      /* --------------------------------------------------------------------
       * Global Facultative Capabilities - Insights and News
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.global_facultative_capabilities.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.global_facultative_capabilities.insights_caption).should("have.text",
          acm_constants.global_facultative_capabilities.insights_caption);

        cy.get(cy_selectors.global_facultative_capabilities.insights_h4_header).should("have.text",
          acm_constants.global_facultative_capabilities.insights_h4_header);

        cy.get(cy_selectors.global_facultative_capabilities.insights_body_text).should("have.text",
          acm_constants.global_facultative_capabilities.insights_body_text);

        cy.xpath(selectors.common.onetrust1).click({ force: true });

        // News Cards (Check each image and card title)
        cy.get(cy_selectors.global_facultative_capabilities.resource_card).each(($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.global_facultative_capabilities.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 2){
              cy.get(cy_selectors.global_facultative_capabilities.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isNotLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.global_facultative_capabilities.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.global_facultative_capabilities.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.global_facultative_capabilities.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.global_facultative_capabilities.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.global_facultative_capabilities.read_more_button).should("have.text",
          acm_constants.global_facultative_capabilities.read_more_button);

        // Disclaimer - Acrisure Re Group Privacy Policy

        cy.get(cy_selectors.global_facultative_capabilities.acrisurere_disclaimer).scrollIntoView();

        cy.get(cy_selectors.global_facultative_capabilities.acrisurere_privacy_policy).should("have.text",
          acm_constants.global_facultative_capabilities.acrisurere_privacy_policy);

        cy.get(cy_selectors.global_facultative_capabilities.acrisurere_privacy_policy_link).should("have.text",
          acm_constants.global_facultative_capabilities.acrisurere_privacy_policy_link);        
        cy.get(cy_selectors.global_facultative_capabilities.acrisurere_privacy_policy_link).click({ force: true });        
        cy.title().should('eq', "Acrisure Re group Privacy Policy");
        cy.go('back');
        cy.wait(3000);
      }   
    });
  });
});