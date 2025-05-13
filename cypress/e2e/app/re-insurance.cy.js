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
  describe("Reinsurance - Functional Tests", () => {
    it("Visiting the Reinsurance page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Reinsurance Hyperlinks", () => {
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

  describe("Reinsurance - Design Tests", () => {
    it.only("Validate Reinsurance Page", () => {
      cy.visitSite("app", "reinsurance");
      cy.url().should("include", "reinsurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Reinsurance Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Reinsurance Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.reinsurance.hero_splash_caption).should("have.text",
          acm_constants.reinsurance.hero_splash_caption);
        // cy.get(cy_selectors.reinsurance.hero_splash_header).should("have.text",
        //  acm_constants.reinsurance.hero_splash_header);
        cy.get(cy_selectors.reinsurance.hero_splash_body_text).should("have.text",
          acm_constants.reinsurance.hero_splash_body_text);
        cy.get(cy_selectors.reinsurance.hero_splash_connectwithus_button).should("have.text",
          acm_constants.reinsurance.hero_splash_connectwithus_button);

      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * Reinsurance How We Work - Text
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.reinsurance.howwework_header_text).scrollIntoView();
        
        cy.get(cy_selectors.reinsurance.howwework_caption_text).should("have.text",
          acm_constants.reinsurance.howwework_caption_text);

        cy.get(cy_selectors.reinsurance.howwework_header_text).should("have.text",
          acm_constants.reinsurance.howwework_header_text);

        cy.get(cy_selectors.reinsurance.howwework_resultsfocused_text).should("have.text",
          acm_constants.reinsurance.howwework_resultsfocused_text);

        cy.get(cy_selectors.reinsurance.howwework_resultsfocused_body).should("have.text",
          acm_constants.reinsurance.howwework_resultsfocused_body);

        cy.get(cy_selectors.reinsurance.howwework_servicesupport_text).should("have.text",
          acm_constants.reinsurance.howwework_servicesupport_text);

        cy.get(cy_selectors.reinsurance.howwework_servicesupport_body).should("have.text",
          acm_constants.reinsurance.howwework_servicesupport_body);

        cy.get(cy_selectors.reinsurance.howwework_specializedexp_text).scrollIntoView();

        cy.get(cy_selectors.reinsurance.howwework_specializedexp_text).should("have.text",
          acm_constants.reinsurance.howwework_specializedexp_text);
          
        cy.get(cy_selectors.reinsurance.howwework_specializedexp_body).should("have.text",
          acm_constants.reinsurance.howwework_specializedexp_body
        );
      }

      /* ---------------------------------------------------------
       * Reinsurance - Services
       * ---------------------------------------------------------
       */

      {
        cy.get(cy_selectors.reinsurance.services_component).scrollIntoView();

        // Component Headers and Text
        cy.get(cy_selectors.reinsurance.services_component_caption)
          .should("have.text", acm_constants.reinsurance.services_component_caption);

        cy.get(cy_selectors.reinsurance.services_h2_header)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_h2_header);

        cy.get(cy_selectors.reinsurance.services_body_text)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_body_text);

        cy.get(cy_selectors.reinsurance.service_connectwithus_button)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.service_connectwithus_button);

        if (Cypress.config("viewportWidth") < 768) {      
        // services List Sections        
        cy.get(cy_selectors.reinsurance.services_advisory_header1)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_advisory_header);

        cy.get(cy_selectors.reinsurance.services_advisory_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_advisory_text1);

        cy.get(cy_selectors.reinsurance.services_advisory_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_advisory_link);

        cy.get(cy_selectors.reinsurance.services_global_button).click({ force: true });

        cy.get(cy_selectors.reinsurance.services_global_header1)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_global_header);

        cy.get(cy_selectors.reinsurance.services_global_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_global_text1);

        cy.get(cy_selectors.reinsurance.services_global_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_global_link);

        cy.get(cy_selectors.reinsurance.services_analytics_button).click({ force: true });

        cy.get(cy_selectors.reinsurance.services_analytics_header1)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_analytics_header);

        cy.get(cy_selectors.reinsurance.services_analytics_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_analytics_text1);

        cy.get(cy_selectors.reinsurance.services_analytics_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_analytics_link);
          
        } 
      
        if (Cypress.config("viewportWidth") > 768) {
      // services List Sections (for resolution 1920 and 1440)
        cy.get(cy_selectors.reinsurance.services_advisory_header)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_advisory_header);

        cy.get(cy_selectors.reinsurance.services_advisory_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_advisory_text1);

        cy.get(cy_selectors.reinsurance.services_advisory_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_advisory_link);
        
        cy.get(cy_selectors.reinsurance.services_global_button).click({ force: true });

        cy.get(cy_selectors.reinsurance.services_global_header)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_global_header);

        cy.get(cy_selectors.reinsurance.services_global_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_global_text1);

        cy.get(cy_selectors.reinsurance.services_global_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_global_link);
        
        cy.get(cy_selectors.reinsurance.services_analytics_button).click({ force: true });

        cy.get(cy_selectors.reinsurance.services_analytics_header)
          .should("exist")
          .should("have.text", acm_constants.reinsurance.services_analytics_header);

        cy.get(cy_selectors.reinsurance.services_analytics_text1)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_analytics_text1);

        cy.get(cy_selectors.reinsurance.services_analytics_link)
          .should("be.visible")
          .should("have.text", acm_constants.reinsurance.services_analytics_link);  
        
        }
      }
      
      /* ---------------------------------------------------------
       * Reinsurance - What We Do
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.reinsurance.whatwedo_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.reinsurance.whatwedo_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // What We Do -  Caption
        cy.get(cy_selectors.reinsurance.whatwedo_component_caption).should("have.text",
          acm_constants.reinsurance.whatwedo_component_caption);

        cy.get(cy_selectors.reinsurance.whatwedo_component_text).should("have.text",
          acm_constants.reinsurance.whatwedo_component_text);

        cy.get(cy_selectors.reinsurance.load_more_button).click( {force : true} );

        // Inner Content (Header, What We Do List)
        cy.get(cy_selectors.reinsurance.whatwedo_component_text)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should("have.text", acm_constants.reinsurance.whatwedo_component_text);

        cy.get(".accordion-list")
          .children()
          .each(($whatwedo, index) => {
            cy.wrap($whatwedo).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($whatwedo)
              .find(cy_selectors.reinsurance.whatwedo_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.reinsurance.whatwedo_list_h6_headers[index]);
            cy.wait(10000),
            cy.wrap($whatwedo)
              .find(cy_selectors.reinsurance.whatwedo_list_body_text)
              .should("have.text", acm_constants.reinsurance.whatwedo_list_body_texts[index]);
          });
      }
    
      /* ------------------------------------------------------
       * Reinsurance - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.reinsurance.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });

        // Left Column Image
        cy.get(cy_selectors.reinsurance.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.wait(5000);
        // Get outer pill container and traverse elements to confirm the pill text in the middle 
        cy.xpath(cy_selectors.reinsurance.pill_box_text_expertise).should("have.text", acm_constants.reinsurance.pill_box_text_expertise);
        cy.xpath(cy_selectors.reinsurance.pill_box_text_and).should("have.text", acm_constants.reinsurance.pill_box_text_and);
        cy.xpath(cy_selectors.reinsurance.pill_box_text_service).should("have.text", acm_constants.reinsurance.pill_box_text_service);        

        cy.get(cy_selectors.reinsurance.whyacrisure_slides).its("length").as("numberOfSlides");
        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.reinsurance.whyacrisure_active_slide, { timeout: 15000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");
              
            cy.get(cy_selectors.reinsurance.whyacrisure_active_slide)
              .find(cy_selectors.reinsurance.whyacrisure_slide_caption)
              .should("have.text", acm_constants.reinsurance.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.reinsurance.whyacrisure_active_slide)
              .find(cy_selectors.reinsurance.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.reinsurance.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.reinsurance.whyacrisure_active_slide)
              .find(cy_selectors.reinsurance.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.reinsurance.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.reinsurance.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      } 

      /* --------------------------------------------------------------------
       * Reinsurance - Reinsurance Consultation
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.reinsurance.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.reinsurance.webform_component_title)
          .should("have.text", acm_constants.reinsurance.webform_component_title);

        cy.get(cy_selectors.reinsurance.webform_component_body_text)
          .should("have.text", acm_constants.reinsurance.webform_component_body_text);

        cy.get(cy_selectors.reinsurance.webform_industry_label)
          .should("have.text", acm_constants.reinsurance.webform_industry_label);

        cy.get(cy_selectors.reinsurance.webform_industry_placeholder)
          .should("have.attr", "placeholder", acm_constants.reinsurance.webform_industry_placeholder);

        cy.get(cy_selectors.reinsurance.webform_first_name_label)
          .should("have.text", acm_constants.reinsurance.webform_first_name_label);

        cy.get(cy_selectors.reinsurance.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_first_name_placeholder);

        cy.get(cy_selectors.reinsurance.webform_last_name_label)
          .should("have.text", acm_constants.reinsurance.webform_last_name_label);

        cy.get(cy_selectors.reinsurance.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_last_name_placeholder);

        cy.get(cy_selectors.reinsurance.webform_company_name_label)
          .should("have.text", acm_constants.reinsurance.webform_company_name_label);

        cy.get(cy_selectors.reinsurance.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_company_name_placeholder);

        cy.get(cy_selectors.reinsurance.webform_number_of_employees_label)
          .should("have.text", acm_constants.reinsurance.webform_number_of_employees_label);

        cy.get(cy_selectors.reinsurance.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.reinsurance.webform_state_label)
          .should("have.text", acm_constants.reinsurance.webform_state_label);

        cy.get(cy_selectors.reinsurance.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_state_placeholder);

        cy.get(cy_selectors.reinsurance.webform_email_label)
          .should("have.text", acm_constants.reinsurance.webform_email_label);

        cy.get(cy_selectors.reinsurance.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_email_placeholder);

        cy.get(cy_selectors.reinsurance.webform_phone_label)
          .should("have.text", acm_constants.reinsurance.webform_phone_label);

        cy.get(cy_selectors.reinsurance.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.reinsurance.webform_phone_placeholder);

        cy.get(cy_selectors.reinsurance.webform_submit_button)
          .should("have.text", acm_constants.reinsurance.webform_submit_button);
      }

      /* --------------------------------------------------------------------
       * Reinsurance - promo cards
       * --------------------------------------------------------------------
       */
      cy.get(cy_selectors.reinsurance.corporate_advisory_header).scrollIntoView();

      if (isMobile) {
        cy.wait(3000);
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.reinsurance.corporate_advisory_header).scrollIntoView();
      }	  
      cy.get(cy_selectors.reinsurance.corporate_advisory_header).should("be.visible");
      cy.get(cy_selectors.reinsurance.corporate_advisory_explore_link).should("be.visible");
      cy.get(cy_selectors.reinsurance.corporate_advisory_explore_link).click({ force: true });
      cy.title().should('eq', 'Acrisure Re Corporate Advisory & Solutions');
      cy.go('back');
      cy.wait(5000);
      cy.get(cy_selectors.reinsurance.global_facultative_header).scrollIntoView();
	    cy.get(cy_selectors.reinsurance.global_facultative_header).should("be.visible");
      cy.get(cy_selectors.reinsurance.global_facultative_explore_link).should("be.visible");
      cy.get(cy_selectors.reinsurance.global_facultative_explore_link).click({ force: true });
      cy.title().should('eq', "Acrisure Re Global Facultative Capabilities");
      cy.go('back');
      cy.wait(5000);
      cy.get(cy_selectors.reinsurance.analytics_catastrophe_header).scrollIntoView();
      cy.wait(3000);
	    cy.get(cy_selectors.reinsurance.analytics_catastrophe_header).should("be.visible");
      cy.get(cy_selectors.reinsurance.analytics_catastrophe_explore_link).should("be.visible");
      cy.get(cy_selectors.reinsurance.analytics_catastrophe_explore_link).click({ force: true });
      cy.title().should('eq', 'Acrisure Re Analytics & Catastrophe Modeling');
      cy.go('back');
      cy.wait(5000);

      /* --------------------------------------------------------------------
       * Reinsurance - Insights and News
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.reinsurance.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.reinsurance.insights_caption).should("have.text",
          acm_constants.reinsurance.insights_caption);

        cy.get(cy_selectors.reinsurance.insights_h4_header).should("have.text",
          acm_constants.reinsurance.insights_h4_header);

        cy.get(cy_selectors.reinsurance.insights_body_text).should("have.text",
          acm_constants.reinsurance.insights_body_text);

        cy.xpath(selectors.common.onetrust1).click({ force: true });

        // News Cards (Check each image and card title)
        cy.get(cy_selectors.reinsurance.resource_card).each(($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.reinsurance.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 2){
              cy.get(cy_selectors.reinsurance.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isNotLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.reinsurance.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.reinsurance.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.reinsurance.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.reinsurance.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.reinsurance.read_more_button).should("have.text",
          acm_constants.reinsurance.read_more_button);

        // Disclaimer - Acrisure Re Group Privacy Policy

        cy.get(cy_selectors.reinsurance.acrisurere_disclaimer).scrollIntoView();

        cy.get(cy_selectors.reinsurance.acrisurere_privacy_policy).should("have.text",
          acm_constants.reinsurance.acrisurere_privacy_policy);

        cy.get(cy_selectors.reinsurance.acrisurere_privacy_policy_link).should("have.text",
          acm_constants.reinsurance.acrisurere_privacy_policy_link);
        
        cy.get(cy_selectors.reinsurance.acrisurere_privacy_policy_link).click({ force: true });
        cy.title().should('eq', "Acrisure Re group Privacy Policy");
        cy.go('back');
        cy.wait(3000);

      }   
    });
  });
});