const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv =
  config.sites.app.config.env[0].toUpperCase() +
  config.sites.app.config.env.slice(1);

    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("Cybersecurity - Functional Tests", () => {
    it("Visiting the Cybersecurity page", () => {
      cy.visitSite("app", "cybersecurity");
      cy.url().should("include", "cybersecurity");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Cybersecurity Hyperlinks", () => {
      cy.visitSite("app", "cybersecurity");
      cy.url().should("include", "cybersecurity");

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

  describe("Cybersecurity - Design Tests", () => {
    it.only("Validate Cybersecurity Page", () => {
      cy.visitSite("app", "cybersecurity");
      cy.url().should("include", "cybersecurity");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Cybersecurity Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Cybersecurity Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {
        // Left Hand Text (Caption/Header/Body Text)
        cy.get(cy_selectors.cybersecurity.hero_splash_caption).should("have.text",
          acm_constants.cybersecurity.hero_splash_caption);
        cy.get(cy_selectors.cybersecurity.hero_splash_header).should("have.text",
          acm_constants.cybersecurity.hero_splash_header);
        cy.get(cy_selectors.cybersecurity.hero_splash_body_text).should("have.text",
          acm_constants.cybersecurity.hero_splash_body_text);
        cy.get(cy_selectors.cybersecurity.hero_splash_getconnected_button).should("have.text",
          acm_constants.cybersecurity.hero_splash_getconnected_button);

        // Right Hand Text (Graphic Image)
        cy.get(cy_selectors.cybersecurity.hero_splash_image).should("be.visible");
        cy.get(cy_selectors.cybersecurity.hero_splash_image_title0).should("have.text",
          acm_constants.cybersecurity.hero_splash_image_title0);
        cy.get(cy_selectors.cybersecurity.hero_splash_image_title1).should("have.text",
          acm_constants.cybersecurity.hero_splash_image_title1);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * Cybersecurity Services Component - Text
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.cybersecurity.services_header_text).scrollIntoView();
        cy.get(cy_selectors.cybersecurity.services_caption_text).should("have.text",
          acm_constants.cybersecurity.services_caption_text);
        cy.get(cy_selectors.cybersecurity.services_header_text).should("have.text",
          acm_constants.cybersecurity.services_header_text);
        cy.get(cy_selectors.cybersecurity.services_getconnected_button).should("have.text",
          acm_constants.cybersecurity.services_getconnected_button); 
        cy.get(cy_selectors.cybersecurity.services_managedIT_text).should("have.text",
          acm_constants.cybersecurity.services_managedIT_text);
        cy.get(cy_selectors.cybersecurity.services_managedIT_body).should("have.text",
          acm_constants.cybersecurity.services_managedIT_body);
        cy.get(cy_selectors.cybersecurity.services_cybersecurity_services_text).should("have.text",
          acm_constants.cybersecurity.services_cybersecurity_services_text);
        cy.get(cy_selectors.cybersecurity.services_cybersecurity_services_body).should("have.text",
          acm_constants.cybersecurity.services_cybersecurity_services_body);
        cy.get(cy_selectors.cybersecurity.services_cyber_insurance_text).scrollIntoView();
        cy.get(cy_selectors.cybersecurity.services_cyber_insurance_text).should("have.text",
          acm_constants.cybersecurity.services_cyber_insurance_text);
        cy.get(cy_selectors.cybersecurity.services_clickhere_text).should("have.text",
          acm_constants.cybersecurity.services_clickhere_text);
      }
      /* ----------------------------------------------------------
       * Cybersecurity How We Work Component - Text
       * ----------------------------------------------------------
       */
      {        
        cy.get(cy_selectors.cybersecurity.two_column_component_image).scrollIntoView({ offset: { top: -100, left: 0 } });

        // Left Column Image
        cy.get(cy_selectors.cybersecurity.two_column_component_image)
          .should("be.visible")
          //.click({ scrollBehavior: false });

        // Get outer pill container and traverse elements to confirm the pill text in the middle
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_Optimization).should("have.text", acm_constants.cybersecurity.pill_box_text_Optimization);
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_and1).should("have.text", acm_constants.cybersecurity.pill_box_text_and1);
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_Security).should("have.text", acm_constants.cybersecurity.pill_box_text_Security);    
      
      cy.get(cy_selectors.cybersecurity.howwework_slides).its("length").as("numberOfSlides");

      cy.get("@numberOfSlides").then((slides) => {
        for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
          cy.get(cy_selectors.cybersecurity.howwework_active_slide, { timeout: 20000 })
            .should("have.attr", "data-swiper-slide-index", slideIndex)
            .should("be.visible");

          cy.get(cy_selectors.cybersecurity.howwework_active_slide)
            .find(cy_selectors.cybersecurity.howwework_slide_caption)
            .should("have.text", acm_constants.cybersecurity.howwework_slide_caption);

          cy.get(cy_selectors.cybersecurity.howwework_active_slide)
            .find(cy_selectors.cybersecurity.howwework_slide_h4_header)
            .should("have.text", acm_constants.cybersecurity.howwework_slide_h4_header[slideIndex]);

          cy.get(cy_selectors.cybersecurity.howwework_active_slide)
            .find(cy_selectors.cybersecurity.howwework_slide_body_text)
            .should("have.text", acm_constants.cybersecurity.howwework_slide_body_text[slideIndex]);

          cy.get(cy_selectors.cybersecurity.howwework_slide_pagination_bullet)
            .eq(slideIndex)
            .should("have.class", "swiper-pagination-bullet-active");
          }
        });
      }
      /* ------------------------------------------------------
       * Cybersecurity - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.cybersecurity.solutions_component_caption).scrollIntoView({ offset: { top: -700, left: 0 } });
        
        // Left Column Image
        cy.get(cy_selectors.cybersecurity.two_column_component_image).should("be.visible")
        //cy.get(cy_selectors.cybersecurity.two_column_component_image).click({ scrollBehavior: false });

        // Get outer pill container and traverse elements to confirm the pill text in the middle
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_Expertise).should("have.text", acm_constants.cybersecurity.pill_box_text_Expertise);
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_and2).should("have.text", acm_constants.cybersecurity.pill_box_text_and2);
        cy.xpath(cy_selectors.cybersecurity.pill_box_text_Value).should("have.text", acm_constants.cybersecurity.pill_box_text_Value);

        cy.get(cy_selectors.cybersecurity.solutions_component_caption).scrollIntoView({ offset: { top: -600, left: 0 } });

        cy.get(cy_selectors.cybersecurity.whyacrisure_slides).its("length").as("numberOfSlides");        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.cybersecurity.whyacrisure_active_slide, { timeout: 30000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              //.should("be.visible");
            cy.get(cy_selectors.cybersecurity.whyacrisure_active_slide).should("be.visible");            
              
            cy.get(cy_selectors.cybersecurity.whyacrisure_active_slide)
              .find(cy_selectors.cybersecurity.whyacrisure_slide_caption)
              .should("have.text", acm_constants.cybersecurity.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.cybersecurity.whyacrisure_active_slide)
              .find(cy_selectors.cybersecurity.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.cybersecurity.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.cybersecurity.whyacrisure_active_slide)
              .find(cy_selectors.cybersecurity.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.cybersecurity.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.cybersecurity.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      }
 
      /* ---------------------------------------------------------
       * Cybersecurity - Industries
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.cybersecurity.solutions_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.cybersecurity.solutions_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(2000);
        }

        // Industries Caption
        cy.get(cy_selectors.cybersecurity.solutions_component_caption).should("have.text",
          acm_constants.cybersecurity.solutions_component_caption);

        // Inner Content (Header, Industry List, and See More Button)
        cy.get(cy_selectors.cybersecurity.industries_h2_header)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should(
            "have.text",
            acm_constants.cybersecurity.industries_h2_header
          );

        ////////////////// Expand the Industry list fully and validate the contents /////////////////////////////////////
        // if(isMobile){
        //   cy.get(cy_selectors.cybersecurity.industry_button)
        //   .should(
        //     "have.text",
        //     acm_constants.cybersecurity.industry_button_see_more_text
        //   )
        //   .scrollIntoView({ offset: { top: -150, left: 0 } })
        //   .click({ scrollBehavior: false });
        // }
        // else {
        //   cy.get(cy_selectors.cybersecurity.industry_button)
        //   .should(
        //     "have.text",
        //     acm_constants.cybersecurity.industry_button_see_more_text
        //   )
        //   .click({ scrollBehavior: false });
        // }

        // Traverse all Industry Lists once fully expanded
        //cy.get(".solution-component .MuiList-root.MuiList-padding")
        cy.get(".accordion-list")
          .children()
          .each(($industry, index) => {
            cy.wrap($industry).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($industry)
              .find(cy_selectors.cybersecurity.industry_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.cybersecurity.industry_list_h6_headers[index]);
  
            cy.wrap($industry)
              .find(cy_selectors.cybersecurity.industry_list_body_text)
              .should("have.text", acm_constants.cybersecurity.industry_list_body_texts[index]);
          });

        // cy.get(cy_selectors.cybersecurity.industry_button)
        //   .should("have.text", acm_constants.cybersecurity.industry_button_see_less_text);
      }

      /* --------------------------------------------------------------------
       * Cybersecurity - IT & Cybersecurity Consultation
       * --------------------------------------------------------------------
       */
       {
        cy.get(cy_selectors.cybersecurity.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.cybersecurity.webform_component_title)
          .should("have.text", acm_constants.cybersecurity.webform_component_title);

        cy.get(cy_selectors.cybersecurity.webform_component_body_text)
          .should("have.text", acm_constants.cybersecurity.webform_component_body_text);

        // Right Side Form 
        // cy.get(cy_selectors.cybersecurity.webform_employee_benefits_insurance_options_label)
        //   .should("have.text", acm_constants.cybersecurity.webform_employee_benefits_insurance_options_label);

        // cy.get(cy_selectors.cybersecurity.webform_employee_benefits_insurance_options_placeholder).should(
        //     "have.attr",
        //     "placeholder",
        //     acm_constants.cybersecurity.webform_employee_benefits_insurance_options_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_first_name_label)
          .should("have.text", acm_constants.cybersecurity.webform_first_name_label);

        cy.get(cy_selectors.cybersecurity.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_first_name_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_last_name_label)
          .should("have.text", acm_constants.cybersecurity.webform_last_name_label);

        cy.get(cy_selectors.cybersecurity.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_last_name_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_company_name_label)
          .should("have.text", acm_constants.cybersecurity.webform_company_name_label);

        cy.get(cy_selectors.cybersecurity.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_company_name_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_number_of_employees_label)
          .should("have.text", acm_constants.cybersecurity.webform_number_of_employees_label);

        cy.get(cy_selectors.cybersecurity.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_state_label)
          .should("have.text", acm_constants.cybersecurity.webform_state_label);

        cy.get(cy_selectors.cybersecurity.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_state_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_email_label)
          .should("have.text", acm_constants.cybersecurity.webform_email_label);

        cy.get(cy_selectors.cybersecurity.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_email_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_phone_label)
          .should("have.text", acm_constants.cybersecurity.webform_phone_label);

        cy.get(cy_selectors.cybersecurity.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.cybersecurity.webform_phone_placeholder);

        cy.get(cy_selectors.cybersecurity.webform_submit_button)
          .should("have.text", acm_constants.cybersecurity.webform_submit_button);

        // cy.get(cy_selectors.cybersecurity.Webform_response_recorded_title)
        //   .should("have.text", acm_constants.cybersecurity.Webform_response_recorded_title);
        
        // cy.get(cy_selectors.cybersecurity.Webform_response_recorded_message)
        //   .should("have.text", acm_constants.cybersecurity.Webform_response_recorded_message);
      }

      /* --------------------------------------------------
       * Cybersecurity - FAQ
       * --------------------------------------------------
       */
      {
        cy.get(cy_selectors.cybersecurity.accordion_component).scrollIntoView();

        // FAQ Text (Caption and Header)
        cy.get(cy_selectors.cybersecurity.accordion_component_caption).should("have.text",
          acm_constants.cybersecurity.accordion_component_caption);

        cy.get(cy_selectors.cybersecurity.faq_header).should("have.text",
          acm_constants.cybersecurity.faq_header);

        /* First close the first expanded tab. Then for each tab, expand the tab and confirm the contents within each tab */
        cy.get(cy_selectors.cybersecurity.faq_expanded_tab).scrollIntoView({ offset: { top: -100, left: 0 } });
        cy.get(cy_selectors.cybersecurity.faq_expanded_tab)
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .find(cy_selectors.cybersecurity.faq_panel_header)          
          //.click({ scrollBehavior: false });

        cy.get(cy_selectors.cybersecurity.faq_regular_tab).each(
          ($ele, panelIndex) => {
            cy.wait(5000);
            cy.wrap($ele)
              .find(cy_selectors.cybersecurity.faq_panel_header)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .click({ scrollBehavior: false });
            cy.wait(5000);
            // Confirm the tab text
            cy.wrap($ele)
              .find(cy_selectors.cybersecurity.faq_panel_header_text)
              .should(
                "have.text",
                acm_constants.cybersecurity
                  .faq_section_i_panel_headers[panelIndex]
              );

            // Confirm each bullet point text
            cy.wrap($ele)
              .find(
                cy_selectors.cybersecurity.faq_panel_bullet_points
              )
              .each(($ele, bulletIndex) => {
                const bulletArray =
                  acm_constants.cybersecurity[
                    `faq_section_i_panel_header_${panelIndex + 1}_bullet_points`
                  ];
                cy.wrap($ele).should("have.text", bulletArray[bulletIndex]);
              });

            cy.wait(1500);
          }
        );
      }
      /* --------------------------------------------------------------------
       * Cybersecurity - Insights and Resources
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.cybersecurity.insights_component).scrollIntoView({ offset: { top: -150, left: 0 } });

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.cybersecurity.insights_caption).should("have.text",
          acm_constants.cybersecurity.insights_caption);

        cy.get(cy_selectors.cybersecurity.insights_h4_header).should("have.text",
          acm_constants.cybersecurity.insights_h4_header);

        cy.get(cy_selectors.cybersecurity.insights_body_text).should("have.text",
          acm_constants.cybersecurity.insights_body_text);

        // Resource Cards (Check each image and card title)
        cy.get(cy_selectors.cybersecurity.resource_card).each(($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.cybersecurity.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 3){
              cy.get(cy_selectors.cybersecurity.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.cybersecurity.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.cybersecurity.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.cybersecurity.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.cybersecurity.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.cybersecurity.read_more_button).should("have.text",
          acm_constants.cybersecurity.read_more_button);
      }
      /* -----------------------------------------------------------------------
       * Cybersecurity Promotion Component - Full Image and Container
       * -----------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.cybersecurity.promotion_component)
          .scrollIntoView({ offset: { top: -70, left: 0 } })
          .should("be.visible");

        cy.get(cy_selectors.cybersecurity.promotion_card_text).should("have.text",
          acm_constants.cybersecurity.promotion_card_text);

        cy.get(cy_selectors.cybersecurity.promotion_card_button).should("have.text",
          acm_constants.cybersecurity.promotion_card_button);
      }      
    });
  });
});