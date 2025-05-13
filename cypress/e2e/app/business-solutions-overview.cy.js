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
  describe("Business Solutions Overview - Functional Tests", () => {
    it("Visiting the Business Solutions Overview page", () => {
      cy.visitSite("app", "business-solutions");
      cy.url().should("include", "business-solutions");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Business Solutions Overview Hyperlinks", () => {
      cy.visitSite("app", "business-solutions");
      cy.url().should("include", "business-solutions");

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

  describe("Business Solutions Overview - Design Tests", () => {
    it.only("Validate Business Solutions Overview Page", () => {
      cy.visitSite("app", "business-solutions");
      cy.url().should("include", "business-solutions");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Business Solutions Overview Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Business Solutions Overview Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {
        // Left Hand Text (Caption/Header/Body Text)
        cy.get(cy_selectors.business_solutions_overview.hero_splash_caption).should("have.text",
          acm_constants.business_solutions_overview.hero_splash_caption);
        cy.get(cy_selectors.business_solutions_overview.hero_splash_header).should("have.text",
          acm_constants.business_solutions_overview.hero_splash_header);
        cy.get(cy_selectors.business_solutions_overview.hero_splash_body_text).should("have.text",
          acm_constants.business_solutions_overview.hero_splash_body_text);
      }

      /* ----------------------------------------------------------
       * business_solutions_overview - Businessess
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.business_solutions_overview.business_header_text).scrollIntoView();

        cy.get(cy_selectors.business_solutions_overview.business_caption_text).should("have.text",
          acm_constants.business_solutions_overview.business_caption_text);

        cy.get(cy_selectors.business_solutions_overview.business_header_text).should("have.text",
          acm_constants.business_solutions_overview.business_header_text);   

        cy.get(cy_selectors.business_solutions_overview.business_body_text).should("have.text",
          acm_constants.business_solutions_overview.business_body_text);

        cy.get(cy_selectors.business_solutions_overview.business_sole_title).should("have.text",
          acm_constants.business_solutions_overview.business_sole_title);

        cy.get(cy_selectors.business_solutions_overview.business_sole_text).should("have.text",
          acm_constants.business_solutions_overview.business_sole_text);

        cy.get(cy_selectors.business_solutions_overview.business_established_title).should("have.text",
          acm_constants.business_solutions_overview.business_established_title);

        cy.get(cy_selectors.business_solutions_overview.business_established_text).should("have.text",
          acm_constants.business_solutions_overview.business_established_text);

        cy.get(cy_selectors.business_solutions_overview.business_largescale_title).should("have.text",
          acm_constants.business_solutions_overview.business_largescale_title);

        cy.get(cy_selectors.business_solutions_overview.business_largescale_text).should("have.text",
          acm_constants.business_solutions_overview.business_largescale_text);

        cy.get(cy_selectors.business_solutions_overview.business_promotion_title).should("have.text",
          acm_constants.business_solutions_overview.business_promotion_title);

        cy.get(cy_selectors.business_solutions_overview.business_promotion_body_text).should("have.text",
          acm_constants.business_solutions_overview.business_promotion_body_text);

        cy.get(cy_selectors.business_solutions_overview.business_explore_business_btn).should("have.text",
          acm_constants.business_solutions_overview.business_explore_business_btn);

        cy.get(cy_selectors.business_solutions_overview.business_explore_business_btn).should("exist")

        cy.get(cy_selectors.business_solutions_overview.business_explore_business_btn).click({ force: true });        
        cy.title().should('eq', 'Small Business Insurance | Request a Personalized Quote');        
        cy.go('back');

        cy.get(cy_selectors.business_solutions_overview.business_coverage_title).should("have.text",
          acm_constants.business_solutions_overview.business_coverage_title);
          
        cy.get(cy_selectors.business_solutions_overview.business_coverage_body_text).should("have.text",
          acm_constants.business_solutions_overview.business_coverage_body_text);

        cy.get(cy_selectors.business_solutions_overview.business_coverage_btn).should("have.text",
          acm_constants.business_solutions_overview.business_coverage_btn);

        cy.get(cy_selectors.business_solutions_overview.business_coverage_btn).should("exist")

        cy.get(cy_selectors.business_solutions_overview.business_coverage_btn).click({ force: true });        
        cy.title().should('eq', 'Large Business Solutions');        
        cy.go('back');


      }
      /* ----------------------------------------------------------
       * business_solutions_overview - Business Solutions & Insurance solutions
       * ----------------------------------------------------------
       */
      {
        // Business Solutions Column Text
        cy.get(cy_selectors.business_solutions_overview.business_solution_header_text).scrollIntoView();

        cy.get(cy_selectors.business_solutions_overview.business_solution_caption_text).should("have.text",
          acm_constants.business_solutions_overview.business_solution_caption_text);
        
        cy.get(cy_selectors.business_solutions_overview.business_solution_header_text).should("have.text",
          acm_constants.business_solutions_overview.business_solution_header_text);   
        
        cy.get(cy_selectors.business_solutions_overview.business_solution_body_text1).should("have.text",
            acm_constants.business_solutions_overview.business_solution_body_text1);

        // Insurance Solutions Column Text

        cy.get(cy_selectors.business_solutions_overview.insurance_solution_header_text).scrollIntoView();

        cy.get(cy_selectors.business_solutions_overview.insurance_solution_caption_text).should("have.text",
          acm_constants.business_solutions_overview.insurance_solution_caption_text);

        cy.get(cy_selectors.business_solutions_overview.insurance_solution_header_text).should("have.text",
          acm_constants.business_solutions_overview.insurance_solution_header_text);     
    
        cy.get(cy_selectors.business_solutions_overview.insurance_solution_body_text1).should("have.text",
          acm_constants.business_solutions_overview.insurance_solution_body_text1);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      
      /* ---------------------------------------------------------
       * business_solutions_overview - Industries
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.business_solutions_overview.solutions_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.business_solutions_overview.solutions_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // Industries Caption
        cy.get(cy_selectors.business_solutions_overview.solutions_component_caption).should("have.text",
          acm_constants.business_solutions_overview.solutions_component_caption);

        // Inner Content (Header, Industry List, and See More Button)
        cy.get(cy_selectors.business_solutions_overview.industries_h2_header)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should(
            "have.text",
            acm_constants.business_solutions_overview.industries_h2_header
          );

        // Traverse all Industry Lists once fully expanded        
        cy.get(".accordion-list")
          .children()
          .each(($industry, index) => {
            cy.wrap($industry).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($industry)
              .find(cy_selectors.business_solutions_overview.industry_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.business_solutions_overview.industry_list_h6_headers[index]);
  
            cy.wrap($industry)
              .find(cy_selectors.business_solutions_overview.industry_list_body_text)
              .should("have.text", acm_constants.business_solutions_overview.industry_list_body_texts[index]);
          });        
      }

      /* --------------------------------------------------------------------
       * business_solutions_overview - Insights and Resources
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.business_solutions_overview.insights_component).scrollIntoView();

        // Insights Text (Caption, Header, and Body Text)
        cy.get(cy_selectors.business_solutions_overview.insights_caption).should("have.text",
          acm_constants.business_solutions_overview.insights_caption
        );

        cy.get(cy_selectors.business_solutions_overview.insights_h4_header).should("have.text",
          acm_constants.business_solutions_overview.insights_h4_header
        );

        cy.get(cy_selectors.business_solutions_overview.insights_body_text).should("have.text",
          acm_constants.business_solutions_overview.insights_body_text
        );

        // Resource Cards (Check each image and card title)
        cy.get(cy_selectors.business_solutions_overview.resource_card).each(
          ($ele, cardIndex) => {

            if(isMobile && cardIndex > 0){
              cy.get(cy_selectors.business_solutions_overview.resource_next_card_button)
              .scrollIntoView({ offset: { top: -550, left: 0 } })
              .click({ scrollBehavior: false });
            }

            if(isTablet && cardIndex > 3){
              cy.get(cy_selectors.business_solutions_overview.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }

            if(isLargeDesktop && cardIndex > 3){
              cy.get(cy_selectors.business_solutions_overview.resource_next_card_button)
                .scrollIntoView({ offset: { top: -800, left: 0 } })
                .click({ scrollBehavior: false });
            }
            
            cy.wrap($ele)
              .find(cy_selectors.business_solutions_overview.resource_card_image)
              .should("be.visible");

            cy.wrap($ele)
              .find(
                cy_selectors.business_solutions_overview.resource_card_h7_header
              )
              .should("be.visible")
              .should(
                "have.text",
                acm_constants.business_solutions_overview.resource_article_titles[
                  cardIndex
                ]
              );
          }
        );

        // Read More Button
        cy.get(cy_selectors.business_solutions_overview.read_more_button).should(
          "have.text",
          acm_constants.business_solutions_overview.read_more_button
        );
      }       
    });
  });
});