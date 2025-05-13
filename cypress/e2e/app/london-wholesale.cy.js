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
  describe("London Wholesale - Functional Tests", () => {
    it("Visiting the London Wholesale page", () => {
      cy.visitSite("app", "london-wholesale");
      cy.url().should("include", "london-wholesale");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking london wholesale Hyperlinks", () => {
      cy.visitSite("app", "london-wholesale");
      cy.url().should("include", "london-wholesale");

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

  describe("London Wholesale - Design Tests", () => {
    it.only("Validate London Wholesale Page", () => {
      cy.visitSite("app", "london-wholesale");
      cy.url().should("include", "london-wholesale");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * London Wholesale Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * London Wholesale Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        //cy.get(cy_selectors.londonwholesale.hero_splash_caption).should("have.text",
          //acm_constants.londonwholesale.hero_splash_caption);
        //cy.get(cy_selectors.londonwholesale.hero_splash_header).should("have.text",
         // acm_constants.londonwholesale.hero_splash_header);
        cy.get(cy_selectors.londonwholesale.hero_splash_body_text).should("have.text",
          acm_constants.londonwholesale.hero_splash_body_text);
        cy.get(cy_selectors.londonwholesale.hero_splash_connectwithus_button).should("have.text",
          acm_constants.londonwholesale.hero_splash_connectwithus_button);

      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * London Wholesale How We Work - Text
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.londonwholesale.howwework_header_text).scrollIntoView();
        
        cy.get(cy_selectors.londonwholesale.howwework_caption_text).should("have.text",
          acm_constants.londonwholesale.howwework_caption_text);

        cy.get(cy_selectors.londonwholesale.howwework_header_text).should("have.text",
          acm_constants.londonwholesale.howwework_header_text);

        cy.get(cy_selectors.londonwholesale.howwework_resultsfocused_text).should("have.text",
          acm_constants.londonwholesale.howwework_resultsfocused_text);

        cy.get(cy_selectors.londonwholesale.howwework_resultsfocused_body).should("have.text",
          acm_constants.londonwholesale.howwework_resultsfocused_body);

        cy.get(cy_selectors.londonwholesale.howwework_servicesupport_text).should("have.text",
          acm_constants.londonwholesale.howwework_servicesupport_text);

        cy.get(cy_selectors.londonwholesale.howwework_servicesupport_body).should("have.text",
          acm_constants.londonwholesale.howwework_servicesupport_body);

        cy.get(cy_selectors.londonwholesale.howwework_specializedexp_text).scrollIntoView();

        cy.get(cy_selectors.londonwholesale.howwework_specializedexp_text).should("have.text",
          acm_constants.londonwholesale.howwework_specializedexp_text);
          
        cy.get(cy_selectors.londonwholesale.howwework_specializedexp_body).should("have.text",
          acm_constants.londonwholesale.howwework_specializedexp_body
        );
      }
      
      /* ---------------------------------------------------------
       * London Wholesale - What We Do
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.londonwholesale.whatwedo_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.londonwholesale.whatwedo_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // What We Do -  Caption
        cy.get(cy_selectors.londonwholesale.whatwedo_component_caption).should("have.text",
          acm_constants.londonwholesale.whatwedo_component_caption);

        cy.get(cy_selectors.londonwholesale.whatwedo_component_text).should("have.text",
          acm_constants.londonwholesale.whatwedo_component_text);

        cy.get(cy_selectors.londonwholesale.load_more_button).click( {force : true} );

        // Inner Content (Header, What We Do List)
        cy.get(cy_selectors.londonwholesale.whatwedo_component_text)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should("have.text", acm_constants.londonwholesale.whatwedo_component_text);

        cy.get(".accordion-list")
          .children()
          .each(($whatwedo, index) => {
            cy.wrap($whatwedo).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($whatwedo)
              .find(cy_selectors.londonwholesale.whatwedo_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.londonwholesale.whatwedo_list_h6_headers[index]);
  
            cy.wrap($whatwedo)
              .find(cy_selectors.londonwholesale.whatwedo_list_body_text)
              .should("have.text", acm_constants.londonwholesale.whatwedo_list_body_texts[index]);
          });
      }
    
      /* ------------------------------------------------------
       * London Wholesale - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.londonwholesale.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });

        // Left Column Image
        cy.get(cy_selectors.londonwholesale.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.wait(5000);
        // Get outer pill container and traverse elements to confirm the pill text in the middle 
        cy.xpath(cy_selectors.londonwholesale.pill_box_text_expertise).should("have.text", acm_constants.londonwholesale.pill_box_text_expertise);
        cy.xpath(cy_selectors.londonwholesale.pill_box_text_and).should("have.text", acm_constants.londonwholesale.pill_box_text_and);
        cy.xpath(cy_selectors.londonwholesale.pill_box_text_service).should("have.text", acm_constants.londonwholesale.pill_box_text_service);        

        cy.get(cy_selectors.londonwholesale.whyacrisure_slides).its("length").as("numberOfSlides");
        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.londonwholesale.whyacrisure_active_slide, { timeout: 15000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");
              
            cy.get(cy_selectors.londonwholesale.whyacrisure_active_slide)
              .find(cy_selectors.londonwholesale.whyacrisure_slide_caption)
              .should("have.text", acm_constants.londonwholesale.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.londonwholesale.whyacrisure_active_slide)
              .find(cy_selectors.londonwholesale.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.londonwholesale.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.londonwholesale.whyacrisure_active_slide)
              .find(cy_selectors.londonwholesale.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.londonwholesale.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.londonwholesale.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      } 

      /* --------------------------------------------------------------------
       * London Wholesale - London Wholesale Consultation
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.londonwholesale.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.londonwholesale.webform_component_title)
          .should("have.text", acm_constants.londonwholesale.webform_component_title);

        cy.get(cy_selectors.londonwholesale.webform_component_body_text)
          .should("have.text", acm_constants.londonwholesale.webform_component_body_text);

        cy.get(cy_selectors.londonwholesale.webform_areaofinterest_label)
          .should("have.text", acm_constants.londonwholesale.webform_areaofinterest_label);

        cy.get(cy_selectors.londonwholesale.webform_areaofinterest_placeholder)
          .should("have.attr", "placeholder", acm_constants.londonwholesale.webform_areaofinterest_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_first_name_label)
          .should("have.text", acm_constants.londonwholesale.webform_first_name_label);

        cy.get(cy_selectors.londonwholesale.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_first_name_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_last_name_label)
          .should("have.text", acm_constants.londonwholesale.webform_last_name_label);

        cy.get(cy_selectors.londonwholesale.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_last_name_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_company_name_label)
          .should("have.text", acm_constants.londonwholesale.webform_company_name_label);

        cy.get(cy_selectors.londonwholesale.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_company_name_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_number_of_employees_label)
          .should("have.text", acm_constants.londonwholesale.webform_number_of_employees_label);

        cy.get(cy_selectors.londonwholesale.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_state_label)
          .should("have.text", acm_constants.londonwholesale.webform_state_label);

        cy.get(cy_selectors.londonwholesale.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_state_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_email_label)
          .should("have.text", acm_constants.londonwholesale.webform_email_label);

        cy.get(cy_selectors.londonwholesale.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_email_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_phone_label)
          .should("have.text", acm_constants.londonwholesale.webform_phone_label);

        cy.get(cy_selectors.londonwholesale.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.londonwholesale.webform_phone_placeholder);

        cy.get(cy_selectors.londonwholesale.webform_submit_button)
          .should("have.text", acm_constants.londonwholesale.webform_submit_button);
      }

      /* --------------------------------------------------------------------
       * London Wholesale - Insights and News
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.londonwholesale.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.londonwholesale.insights_caption).should("have.text",
          acm_constants.londonwholesale.insights_caption);

        cy.get(cy_selectors.londonwholesale.insights_h4_header).should("have.text",
          acm_constants.londonwholesale.insights_h4_header);

        cy.get(cy_selectors.londonwholesale.insights_body_text).should("have.text",
          acm_constants.londonwholesale.insights_body_text);

        // News Cards (Check each image and card title)
        cy.get(cy_selectors.londonwholesale.resource_card).each(($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.londonwholesale.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 2){
              cy.get(cy_selectors.londonwholesale.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isNotLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.londonwholesale.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.londonwholesale.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.londonwholesale.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.londonwholesale.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.londonwholesale.read_more_button).should("have.text",
          acm_constants.londonwholesale.read_more_button);
      }   
    });
  });
});