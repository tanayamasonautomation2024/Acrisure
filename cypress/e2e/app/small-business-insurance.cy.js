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
  describe("Small Business Insurance - Functional Tests", () => {
    it("Visiting the Small Business Insurance page", () => {
      cy.visitSite("app", "small-business-insurance");
      cy.url().should("include", "small-business-insurance");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Small Business Insurance Hyperlinks", () => {
      cy.visitSite("app", "small-business-insurance");
      cy.url().should("include", "small-business-insurance");

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

  describe("Small Business Insurance - Design Tests", () => {
    it.only("Validate Small Business Insurance Page", () => {
      cy.visitSite("app", "small-business-insurance");
      cy.url().should("include", "small-business-insurance");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ----------------------------------------------------------
       * Small Business Insurance Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {
        // Left Hand Text (Caption/Header/Body Text)
        cy.get(cy_selectors.small_business_insurance.hero_splash_caption)
          .should("have.text", acm_constants.small_business_insurance.hero_splash_caption);
        cy.get(cy_selectors.small_business_insurance.hero_splash_header)
          .should("have.text", acm_constants.small_business_insurance.hero_splash_header);
        cy.get(cy_selectors.small_business_insurance.hero_splash_body_text)
          .should("have.text", acm_constants.small_business_insurance.hero_splash_body_text);

        // Graphic Image
        cy.get(cy_selectors.small_business_insurance.hero_splash_image).should("be.visible");
        cy.get(cy_selectors.small_business_insurance.hero_splash_pill_title0)
          .should("have.text", acm_constants.small_business_insurance.hero_splash_image_title0);
        cy.get(cy_selectors.small_business_insurance.hero_splash_pill_title1)
          .should("have.text", acm_constants.small_business_insurance.hero_splash_image_title1);
      }

      /* ------------------------------------------------------
       * Small Business Insurance Hero Component - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.hero2_component_caption).scrollIntoView();

        // Caption
        cy.get(cy_selectors.small_business_insurance.hero2_component_caption).should("have.text", "Why Acrisure");

        // Hero Image and Corner Cut Container
        cy.get(cy_selectors.small_business_insurance.hero2_component_image).should("be.visible");

        cy.get(cy_selectors.small_business_insurance.hero2_component_cornercut_image).should("be.visible");
        cy.get(cy_selectors.small_business_insurance.hero2_component_cornercut_text)
          .should("have.text", acm_constants.small_business_insurance.hero2_component_cornercut_text);

        cy.get(cy_selectors.small_business_insurance.hero2_component_h2_header).scrollIntoView();
        cy.get(cy_selectors.small_business_insurance.hero2_component_h2_header)
          .should("have.text", acm_constants.small_business_insurance.hero2_component_h2_header);

        cy.get(cy_selectors.small_business_insurance.hero2_component_body_text)
          .contains(acm_constants.small_business_insurance.hero2_component_body_text);

        cy.get(cy_selectors.small_business_insurance.hero2_component_primary_button)
          .should("have.text", acm_constants.small_business_insurance.hero2_component_primary_button);
      }
      //cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* -----------------------------------------------------------------------
       * Small Business Insurance Desktop Coverage Component - Business Coverage
       * -----------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.coverage_component).scrollIntoView();

        // Busines Coverage Caption
        cy.get(cy_selectors.small_business_insurance.coverage_component_caption)
          .should("have.text", acm_constants.small_business_insurance.coverage_component_caption);

        cy.get(cy_selectors.small_business_insurance.coverage_component_root).scrollIntoView();

        // Top Content Text (header and body text)
        cy.get(cy_selectors.small_business_insurance.coverage_component_h3_header)
          .should("have.text", acm_constants.small_business_insurance.coverage_component_h3_header);
        cy.get(cy_selectors.small_business_insurance.coverage_component_body_text)
          .contains(acm_constants.small_business_insurance.coverage_component_body_text); 
      
      {   
      // Business Coverage Cards (Button, Header, Body Text)
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container)
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .find(cy_selectors.small_business_insurance.business_coverage_card).each(($ele, coverageCardIndex) => {
        //if(coverageCardIndex === 0){              
          //cy.wrap($ele).click({ scrollBehavior: false });
          //cy.wait(5000);
          //cy.go('back')
          //cy.wait(5000);
        //}
        
        // cy.wrap($ele)
        //   .find(cy_selectors.small_business_insurance.business_coverage_card_button)
        //   .should("be.visible")
        //   .scrollIntoView({ offset: { top: -120, left: 0 } })
        //   //.click({ scrollBehavior: false });
        // cy.wait(750);
        //cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView();
        //cy.wait(5000);
        cy.wrap($ele)              
          .find(cy_selectors.small_business_insurance.business_coverage_card_h6_headers)              
          .should("have.text", acm_constants.small_business_insurance.business_coverage_card_h6_headers[coverageCardIndex]);

        cy.wrap($ele)
          .find(cy_selectors.small_business_insurance.business_coverage_card_body_text)
          .should("have.text", acm_constants.small_business_insurance.business_coverage_card_body_text[coverageCardIndex]);

        cy.wrap($ele)
          .find(cy_selectors.small_business_insurance.business_coverage_card_button)
          .scrollIntoView({ offset: { top: -120, left: 0 } })
          //.click({ scrollBehavior: false });
        cy.wait(1500);

        // cy.wrap($ele)
        //   .find(cy_selectors.small_business_insurance.business_coverage_card_h6_headers)
        //   .should("be.visible");

        if(!(isTablet || isMobile)){
          cy.wrap($ele)
            .find(cy_selectors.small_business_insurance.business_coverage_card_body_text)
            .should("be.visible");
          }
        });

        // Business Insurance Coverage - Card Navigations 
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });

        cy.get(cy_selectors.small_business_insurance.business_coverage_card_button1).click({ force: true });
        cy.title().should('eq', 'Commercial General Liability Insurance (CGL) | Request A Quote');        
        cy.go('back');
        
        cy.wait(2000);
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_button2).click({ force: true });
        cy.title().should('eq', 'Professional Liability Insurance | Request A Free Quote');        
        cy.go('back');

        cy.wait(2000);
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_button3).click({ force: true });
        cy.title().should('eq', "Business Owner's Policy | Request A Personalized Quote");
        cy.go('back');
        
        cy.wait(2000);
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_button4).click({ force: true });
        cy.title().should('eq', 'Cyber Insurance | Request A Personalized Quote');        
        cy.go('back'); 

        cy.wait(2000);
        cy.get(cy_selectors.small_business_insurance.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });     

        cy.get(cy_selectors.small_business_insurance.business_coverage_card_button5).click({ force: true });
        cy.title().should('eq', "Workers' Comp Insurance | Request A Personalized Quote");        
        cy.go('back');
        cy.wait(2000);

        /* --------------------------------------------------------------
       * Small Business Insurance Logo Parade Component - Company Logos
       * --------------------------------------------------------------
       */
        // Logo Text
        cy.wait(3000);
        cy.get(cy_selectors.small_business_insurance.logo_parade_body_text).scrollIntoView();
        cy.wait(3000);
        cy.get(cy_selectors.small_business_insurance.logo_parade_body_text)
          .should("have.text", acm_constants.small_business_insurance.logo_parade_body_text);

        // Confirm Order of Logos as it displays on the app
        cy.get(cy_selectors.small_business_insurance.logo_list)
          .children()
          .then(($listEl) => {
            const getIMG = (el) => Array.from(el.children)[0];
            const getALTTtext = (img) => img.getAttribute("alt");

            return Cypress._.map($listEl, (el) => getALTTtext(getIMG(el)));
          })
          .as("imageArray");

        cy.get("@imageArray").then((array) => {
          expect(array).to.include.ordered.members(
            acm_constants.small_business_insurance.company_logos,
            "Checking order of company logos"
          );
        });
      }        
      }     
      //cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ---------------------------------------------------------
       * Small Business Insurance Solutions Component - Industries
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.solutions_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.small_business_insurance.solutions_component)
            .scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // Industries Caption
        cy.get(cy_selectors.small_business_insurance.solutions_component_caption)
          .should("have.text", acm_constants.small_business_insurance.solutions_component_caption);

        // Inner Content (Header, Industry List, and See More Button)
        cy.get(cy_selectors.small_business_insurance.industries_h2_header).scrollIntoView({ offset: { top: -50, left: 0 } });
        cy.get(cy_selectors.small_business_insurance.industries_h2_header)
          .should("have.text", acm_constants.small_business_insurance.industries_h2_header);

        ////////////////// Expand the Industry list fully and validate the contents /////////////////////////////////////
        // if(isMobile){
        //   cy.get(cy_selectors.small_business_insurance.industry_button)
        //   .should(
        //     "have.text",
        //     acm_constants.small_business_insurance.industry_button_see_more_text
        //   )
        //   .scrollIntoView({ offset: { top: -150, left: 0 } })
        //   .click({ scrollBehavior: false });
        // }
        // else {
        //   cy.get(cy_selectors.small_business_insurance.industry_button)
        //   .should(
        //     "have.text",
        //     acm_constants.small_business_insurance.industry_button_see_more_text
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
              .find(cy_selectors.small_business_insurance.industry_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.small_business_insurance.industry_list_h6_headers[index]);
  
            cy.wrap($industry)
              .find(cy_selectors.small_business_insurance.industry_list_body_text)
              .should("have.text", acm_constants.small_business_insurance.industry_list_body_texts[index]);
          });

        // cy.get(cy_selectors.small_business_insurance.industry_button)
        //   .should("have.text", acm_constants.small_business_insurance.industry_button_see_less_text);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* --------------------------------------------------
       * Small Business Insurance Accordion Component - FAQ
       * --------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.accordion_component).scrollIntoView();

        // FAQ Text (Caption and Header)
        cy.get(cy_selectors.small_business_insurance.accordion_component_caption)
          .should("have.text", acm_constants.small_business_insurance.accordion_component_caption);

        cy.get(cy_selectors.small_business_insurance.faq_header)
          .should("have.text", acm_constants.small_business_insurance.faq_header);

        cy.get(cy_selectors.small_business_insurance.faq_load_more)
          .should("have.text", acm_constants.small_business_insurance.faq_load_more);

        cy.wait(10000);
        cy.get(cy_selectors.small_business_insurance.faq_load_more).click({ force: true });
        cy.wait(10000);
        /* 
          Handle then main section of the FAQ Tabs. (Late April Update: FAQs only have
          one section of FAQs rather than two)

          First close the first expanded tab. Then for each tab, expand the tab and
          confirm the contents within each tab
          */
        cy.get(cy_selectors.small_business_insurance.faq_expanded_tab)
          .scrollIntoView({ offset: { top: -60, left: 0 } })
          .find(cy_selectors.small_business_insurance.faq_panel_header)          
          //.click({ scrollBehavior: false });
        cy.wait(10000);
        cy.get(cy_selectors.small_business_insurance.faq_regular_tab).each(
          ($ele, panelIndex) => {
            cy.wrap($ele)
              .find(cy_selectors.small_business_insurance.faq_panel_header)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .click({ scrollBehavior: false });

            // Confirm the tab text
            cy.wrap($ele)
              .find(cy_selectors.small_business_insurance.faq_panel_header_text)
              .should("have.text", acm_constants.small_business_insurance.faq_section_i_panel_headers[panelIndex]);

            // Confirm each bullet point text
            cy.wrap($ele)
              .find(cy_selectors.small_business_insurance.faq_panel_bullet_points)
              .each(($ele, bulletIndex) => {
                const bulletArray =
                  acm_constants.small_business_insurance[
                    `faq_section_i_panel_header_${panelIndex + 1}_bullet_points`
                  ];
                cy.wrap($ele).should("have.text", bulletArray[bulletIndex]);
              });

            cy.wait(1500);
          }
        );
      }

      /* -----------------------------------------------------------------------
       * Small Business Insurance Promotion Component - Full Image and Container
       * -----------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.promotion_component)
          .scrollIntoView({ offset: { top: -70, left: 0 } })
          .should("be.visible");

        cy.get(cy_selectors.small_business_insurance.promotion_card_text)
          .should("have.text", acm_constants.small_business_insurance.promotion_card_text);

        cy.get(cy_selectors.small_business_insurance.promotion_card_button)
          .should("have.text", acm_constants.small_business_insurance.promotion_card_button);          

        cy.get(cy_selectors.small_business_insurance.promotion_card_button).click({ force: true });
        cy.title().should('eq', 'Insurance, Cybersecurity and Business Solutions Insights');
        cy.go('back');
        cy.wait(2000);
      }
      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* --------------------------------------------------------------------
       * Small Business Insurance Insights Component - Insights and Resources
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.small_business_insurance.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.small_business_insurance.insights_caption)
          .should("have.text", acm_constants.small_business_insurance.insights_caption);

        cy.get(cy_selectors.small_business_insurance.insights_h4_header)
          .should("have.text", acm_constants.small_business_insurance.insights_h4_header);

        cy.get(cy_selectors.small_business_insurance.insights_body_text)
          .should("have.text", acm_constants.small_business_insurance.insights_body_text);

        // Resource Cards (Check each image and card title)
        cy.get(cy_selectors.small_business_insurance.resource_card).each(
          ($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.small_business_insurance.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 3){
              cy.get(cy_selectors.small_business_insurance.resource_next_card_button)
                .scrollIntoView({ offset: { top: -550, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.small_business_insurance.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.small_business_insurance.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(cy_selectors.small_business_insurance.resource_card_h7_header)
              .should("be.visible")
              .should("have.text", acm_constants.small_business_insurance.resource_article_titles[cardIndex]);
          }
        );

        // Read More Button
        cy.get(cy_selectors.small_business_insurance.read_more_button)
          .should("have.text", acm_constants.small_business_insurance.read_more_button);
      }
    });
  });
});