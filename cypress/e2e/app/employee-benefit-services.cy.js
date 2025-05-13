const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv = config.sites.app.config.env[0].toUpperCase() + config.sites.app.config.env.slice(1);

    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("Employee Benefits Services - Functional Tests", () => {
    it("Visiting the Employee Benefits Services page", () => {
      cy.visitSite("app", "employee-benefit-services");
      cy.url().should("include", "employee-benefit-services");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Employee Benefits Services Hyperlinks", () => {
      cy.visitSite("app", "employee-benefit-services");
      cy.url().should("include", "employee-benefit-services");

      cy.xpath(selectors.main_container).within(($mainWebpage) => {
        // Get all the links within the main webpage
      
        cy.get(cy_selectors.global.target_links).each(link => {
          if (link.prop('href')) {
            cy.request({ url: link.prop('href'), failOnStatusCode: true });
            cy.log( link.prop('href'));
          }
        });
      });
    });
  });

  describe("Employee Benefits Services - Design Tests", () => {
    it("Validate Employee Benefits Services Webpage", () => {
      cy.visitSite("app", "employee-benefit-services");
      cy.url().should("include", "employee-benefit-services");

      /* ================================
       * Employee Benefits Services Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Employee Benefits Services Hero Component - Text and Image
       * ----------------------------------------------------------
       */
      {
        //  Left Side Portion (Caption, Paragraph Header, Body Text, and Button)
        cy.get(cy_selectors.employee_benefit_services.hero_component_caption)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_caption);

        cy.get(cy_selectors.employee_benefit_services.hero_component_header)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_header);

        cy.get(cy_selectors.employee_benefit_services.hero_component_body_text)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_body_text);

        cy.get(cy_selectors.employee_benefit_services.hero_component_button)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_button);

        // Right Side Portion (Image and Text)
        cy.get(cy_selectors.employee_benefit_services.hero_component_image)
          .should("be.visible");

        cy.get(cy_selectors.employee_benefit_services.hero_component_image_text0)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_image_text0);

        cy.get(cy_selectors.employee_benefit_services.hero_component_image_text1)
          .should("have.text", acm_constants.employee_benefit_services.hero_component_image_text1);
      }
      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* --------------------------------------------------------------------
       * Employee Benefits Services Webform Component - Benefits Consultation
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.employee_benefit_services.webform_component_container).scrollIntoView();
        //cy.get(cy_selectors.employee_benefit_services.webform_component_container).scrollIntoView({ offset: { top: -50, left: 0 } });
        cy.wait(1500);

        cy.get(cy_selectors.employee_benefit_services.webform_component_title)
          .should("have.text", acm_constants.employee_benefit_services.webform_component_title);

        cy.get(cy_selectors.employee_benefit_services.webform_component_body_text)
          .should("have.text", acm_constants.employee_benefit_services.webform_component_body_text);

        // Right Side Form 
        cy.get(cy_selectors.employee_benefit_services.webform_employee_benefits_insurance_options_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_employee_benefits_insurance_options_label);

        cy.get(cy_selectors.employee_benefit_services.webform_employee_benefits_insurance_options_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_employee_benefits_insurance_options_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_first_name_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_first_name_label);

        cy.get(cy_selectors.employee_benefit_services.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_first_name_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_last_name_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_last_name_label);

        cy.get(cy_selectors.employee_benefit_services.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_last_name_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_company_name_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_company_name_label);

        cy.get(cy_selectors.employee_benefit_services.webform_company_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_company_name_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_number_of_employees_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_number_of_employees_label);

        cy.get(cy_selectors.employee_benefit_services.webform_number_of_employees_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_number_of_employees_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_state_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_state_label);

        cy.get(cy_selectors.employee_benefit_services.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_state_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_email_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_email_label);

        cy.get(cy_selectors.employee_benefit_services.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_email_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_phone_label)
          .should("have.text", acm_constants.employee_benefit_services.webform_phone_label);

        cy.get(cy_selectors.employee_benefit_services.webform_phone_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.employee_benefit_services.webform_phone_placeholder);

        cy.get(cy_selectors.employee_benefit_services.webform_submit_button)
          .should("have.text", acm_constants.employee_benefit_services.webform_submit_button);
      }

      /* -------------------------------------------------------------------------
       * Employee Benefits Services Desktop Coverages Component - Benefit Services
       * -------------------------------------------------------------------------
       */
      if (isMobile) {      
        cy.get(cy_selectors.employee_benefit_services.coverage_component_caption).scrollIntoView();
        
        // Benefits Services (Caption, Header, Body Text)
        cy.get(cy_selectors.employee_benefit_services.coverage_component_caption)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_caption);

        cy.get(cy_selectors.employee_benefit_services.coverage_component_h3_header)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_h3_header)
          .should("be.visible");          
        
        cy.get(cy_selectors.employee_benefit_services.coverage_component_body_text)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_body_text)
          .should("be.visible");     
          
        // Benefits Services Coverage Cards (Button, Header, Body Text)
        cy.get(cy_selectors.employee_benefit_services.benefit_services_coverage_card_container)          
        .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card).each(($ele, coverageCardIndex) => {
          if(coverageCardIndex === 0){
            cy.wrap($ele)
              .click({ force: true });
            cy.wait(500);
          }            
          cy.wrap($ele)
            .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_button)
            .should("be.visible")              
            .click({ force: true });              
          cy.wait(750);

          cy.wrap($ele)
            .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_h6_headers)
            .should("have.text", acm_constants.employee_benefit_services.benefit_services_coverage_card_h6_headers[coverageCardIndex]);

          cy.wrap($ele)
            .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_body_text)
            .should("have.text", acm_constants.employee_benefit_services.benefit_services_coverage_card_body_text[coverageCardIndex]);

          cy.wrap($ele)
            .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_button)
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .click({ force: true });              
          cy.wait(1500);

          cy.wrap($ele)
            .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_h6_headers)
            .should("be.visible");

          if(!(isTablet || isMobile)){
            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_body_text)
              .should("be.visible");
          }
        });
      }
      if (!isMobile) {      
        cy.get(cy_selectors.employee_benefit_services.coverage_component_caption1).scrollIntoView();
        
        // Benefits Services (Caption, Header, Body Text)
        cy.get(cy_selectors.employee_benefit_services.coverage_component_caption1)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_caption);

        cy.get(cy_selectors.employee_benefit_services.coverage_component_h3_header1)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_h3_header)
        cy.get(cy_selectors.employee_benefit_services.coverage_component_h3_header1).should("be.visible");          
        
        cy.get(cy_selectors.employee_benefit_services.coverage_component_body_text1)
          .should("have.text", acm_constants.employee_benefit_services.coverage_component_body_text)
          .should("be.visible");    
          
        // Benefits Services Coverage Cards (Button, Header, Body Text)
        cy.get(cy_selectors.employee_benefit_services.benefit_services_coverage_card_container1)          
          .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card).each(($ele, coverageCardIndex) => {
            if(coverageCardIndex === 0){
              cy.wrap($ele)
                .click({ force: true });
              cy.wait(500);
            }            
            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_button)
              .should("be.visible")              
              .click({ force: true });              
            cy.wait(750);

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_h6_headers)
              .should("have.text", acm_constants.employee_benefit_services.benefit_services_coverage_card_h6_headers[coverageCardIndex]);

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_body_text)
              .should("have.text", acm_constants.employee_benefit_services.benefit_services_coverage_card_body_text[coverageCardIndex]);

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_button)
              .scrollIntoView({ offset: { top: -120, left: 0 } })
              .click({ force: true });              
            cy.wait(1500);

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_h6_headers)
              .should("be.visible");

            if(!(isTablet || isMobile)){
              cy.wrap($ele)
                .find(cy_selectors.employee_benefit_services.benefit_services_coverage_card_body_text)
                .should("be.visible");
            }
          });
      }
        
      //}

      /* --------------------------------------------------------------
       * Employee Benefits Services Two Column Component - Why Acrisure
       * --------------------------------------------------------------
       */
      {
        //cy.get(cy_selectors.employee_benefit_services.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });
        cy.get(cy_selectors.employee_benefit_services.two_column_component_container).scrollIntoView();
        // Left Column Image
        cy.get(cy_selectors.employee_benefit_services.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.get(cy_selectors.employee_benefit_services.pill_box_text_QuickQuotes).should("have.text", acm_constants.employee_benefit_services.pill_box_text_QuickQuotes);
        cy.get(cy_selectors.employee_benefit_services.pill_box_text_and1).should("have.text", acm_constants.employee_benefit_services.pill_box_text_and1);
        cy.get(cy_selectors.employee_benefit_services.pill_box_text_PersonalizedService).should("have.text", acm_constants.employee_benefit_services.pill_box_text_PersonalizedService); 

        cy.get(cy_selectors.employee_benefit_services.why_acrisure_slides).its("length").as("numberOfSlides");

        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.employee_benefit_services.why_acrisure_active_slide, { timeout: 20000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");

            cy.get(cy_selectors.employee_benefit_services.why_acrisure_active_slide)
              .find(cy_selectors.employee_benefit_services.why_acrisure_slide_caption)
              .should("have.text", acm_constants.employee_benefit_services.why_acrisure_slide_caption);

            cy.get(cy_selectors.employee_benefit_services.why_acrisure_active_slide)
              .find(cy_selectors.employee_benefit_services.why_acrisure_slide_h4_header)
              .should("have.text", acm_constants.employee_benefit_services.why_acrisure_h4_headers[slideIndex]);

            cy.get(cy_selectors.employee_benefit_services.why_acrisure_active_slide)
              .find(cy_selectors.employee_benefit_services.why_acrisure_slide_body_text)
              .should("have.text", acm_constants.employee_benefit_services.why_acrisure_body_text[slideIndex]);

            cy.get(cy_selectors.employee_benefit_services.why_acrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
          }
        });
      }

      /* ----------------------------------------------------
       * Employee Benefits Services Accordion Component - FAQ
       * ----------------------------------------------------
       */
      {
        cy.get(cy_selectors.employee_benefit_services.accordion_component).scrollIntoView();

        // FAQ Text (Caption and Header)
        cy.get(cy_selectors.employee_benefit_services.accordion_component_caption)
          .should("have.text",acm_constants.employee_benefit_services.accordion_component_caption);

        cy.get(cy_selectors.employee_benefit_services.faq_header)
          .should("have.text", acm_constants.employee_benefit_services.faq_header);

        /* 
          Handle entire section of the FAQ Tabs.

          First close the first expanded tab. Then for each tab, expand the tab and
          confirm the contents within each tab
          */
        cy.get(cy_selectors.employee_benefit_services.faq_expanded_tab)
          .find(cy_selectors.employee_benefit_services.faq_panel_header)
          .scrollIntoView({ offset: { top: -60, left: 0 } })
          //.click({ scrollBehavior: false });
        
        cy.get(cy_selectors.employee_benefit_services.faq_regular_tab).each(
          ($ele, panelIndex) => {
            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.faq_panel_header)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .click({ scrollBehavior: false });

            // Confirm the tab text
            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.faq_panel_header_text)
              .should("have.text", acm_constants.employee_benefit_services.faq_section_panel_headers[panelIndex]);

            // Confirm each bullet point text
            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.faq_panel_bullet_points)
              .each(($ele, bulletIndex) => {
                const bulletArray = acm_constants.employee_benefit_services[`faq_section_panel_header_${panelIndex + 1}_bullet_points`];
                cy.wrap($ele).should("have.text", bulletArray[bulletIndex]);
              });

            cy.wait(1500);
          }
        );
      }

      /* ----------------------------------------------------------------------
       * Employee Benefits Services Insights Component - Insights and Resources
       * ----------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.employee_benefit_services.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.employee_benefit_services.insights_caption)
          .should("have.text", acm_constants.employee_benefit_services.insights_caption);

        cy.get(cy_selectors.employee_benefit_services.insights_h4_header)
          .should("have.text", acm_constants.employee_benefit_services.insights_h4_header);

        cy.get(cy_selectors.employee_benefit_services.insights_body_text)
          .should("have.text", acm_constants.employee_benefit_services.insights_body_text);

        // Resource Cards (Check each image and card title)
        cy.get(cy_selectors.employee_benefit_services.resource_card).each(($ele, cardIndex) => {
            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.employee_benefit_services.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 3){
              cy.get(cy_selectors.employee_benefit_services.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.employee_benefit_services.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.employee_benefit_services.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.employee_benefit_services.resource_article_titles[cardIndex]);
          });

        // Read More Button
        cy.get(cy_selectors.employee_benefit_services.read_more_button)
          .should("have.text", acm_constants.employee_benefit_services.read_more_button);
      }

      /* ---------------------------------------------------------------------
       * Employee Benefits Services Promotion Component - Image and Text Cards
       * ---------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.employee_benefit_services.promotion_component).scrollIntoView();

        // Left Card (Image, Text, and Button)
        cy.get(cy_selectors.employee_benefit_services.left_card_image).should("be.visible");

        cy.get(cy_selectors.employee_benefit_services.left_card_text)
          .should("have.text", acm_constants.employee_benefit_services.left_card_text);

        cy.get(cy_selectors.employee_benefit_services.left_card_button)
          .should("have.text", acm_constants.employee_benefit_services.left_card_button);

        cy.get(cy_selectors.employee_benefit_services.left_card_button).click({ force: true });
        cy.title().should('eq', "Workers' Comp Insurance | Request A Personalized Quote");
        cy.go('back');
        cy.wait(2000);

        // Right Card (Image, Text, and Button)
        cy.get(cy_selectors.employee_benefit_services.right_card_image).should("exist");

        cy.get(cy_selectors.employee_benefit_services.right_card_text)
          .should("have.text", acm_constants.employee_benefit_services.right_card_text);

        cy.get(cy_selectors.employee_benefit_services.right_card_button)
          .should("have.text", acm_constants.employee_benefit_services.right_card_button);

        cy.get(cy_selectors.employee_benefit_services.right_card_button).click({ force: true });
        cy.title().should('eq', "Business Owner's Policy | Request A Personalized Quote");
        cy.go('back');
        cy.wait(2000);
      }
    });
  });
});