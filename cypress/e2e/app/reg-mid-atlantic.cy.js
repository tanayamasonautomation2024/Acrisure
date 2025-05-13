const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv = config.sites.app.config.env[0].toUpperCase() + config.sites.app.config.env.slice(1);

const isNotLargeDesktop = Cypress.config().viewportWidth < 1441 
                       && Cypress.config().viewportWidth >= 1200;
const isTablet = Cypress.config().viewportWidth < 1200 
              && Cypress.config().viewportWidth >= 768;
const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("midatlantic - Design Tests", () => { 
    it("Validate Acrisure mid-atlantic", () => {
      cy.visitSite("app", "mid-atlantic");
      cy.url().should("include", "mid-atlantic");

      /* ---------------------------------------------------------
       * midatlantic Hero Component
       * ---------------------------------------------------------
       */
      {
        // hero2 section over hero image
        cy.get(cy_selectors.midatlantic.hero2_section_hero_component).should("be.visible");
        cy.get(cy_selectors.midatlantic.hero2_section_caption)
          .should("have.text", acm_constants.midatlantic.hero2_section_caption);

        cy.get(cy_selectors.midatlantic.hero2_section_h2_header)
          .should("have.text", acm_constants.midatlantic.hero2_section_h2_header);

        cy.get(cy_selectors.midatlantic.hero2_section_body_text)
          .should("have.text", acm_constants.midatlantic.hero2_section_body_text);
          
        cy.get(cy_selectors.midatlantic.hero2_section_primary_button).should("be.visible");
        cy.get(cy_selectors.midatlantic.hero2_section_primary_button).click({ force: true }); 
        cy.wait(5000);
		    cy.get(cy_selectors.midatlantic.webform_component_container).should("be.visible");

        cy.get(cy_selectors.midatlantic.hero2_section_hero_component).scrollIntoView();

        cy.get(cy_selectors.midatlantic.hero2_section_secondary_button).should("be.visible");
        cy.get(cy_selectors.midatlantic.hero2_section_secondary_button).click({ force: true });             
        cy.title().should('eq', 'Business Solutions');   
        cy.wait(2000); 
        cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.go('back')
        cy.location('pathname').should('eq', '/mid-atlantic');
        cy.wait(2000);
      }
      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* --------------------------------------------------
       * Client Resources - Accordion component
       * --------------------------------------------------
       */
      {
        cy.get(cy_selectors.midatlantic.accordion_component).scrollIntoView();

        // Client Resources (Caption and Header)
        cy.get(cy_selectors.midatlantic.accordion_component_caption)
          .should("have.text", acm_constants.midatlantic.accordion_component_caption);

        cy.get(cy_selectors.midatlantic.accordion_component_header)
          .should("have.text", acm_constants.midatlantic.accordion_component_header);

        cy.get(cy_selectors.midatlantic.accordion_component_load_more)
          .should("have.text", acm_constants.midatlantic.accordion_component_load_more);

        cy.wait(1000);
        cy.get(cy_selectors.midatlantic.accordion_component_load_more).click({ force: true });
        cy.wait(1000);
		
        /* 
          First close the first expanded tab. Then for each tab, expand the tab and
          confirm the contents within each tab
          */
		  
        cy.get(cy_selectors.midatlantic.client_resources_expanded_tab)
          .scrollIntoView({ offset: { top: -60, left: 0 } })
          .find(cy_selectors.midatlantic.client_resources_panel_header)          
          //.click({ scrollBehavior: false });

        cy.get(cy_selectors.midatlantic.client_resources_regular_tab).each(
          ($ele, panelIndex) => {
            cy.wrap($ele)
              .find(cy_selectors.midatlantic.client_resources_panel_header)
              .scrollIntoView({ offset: { top: -80, left: 0 } })
              .click({ scrollBehavior: false });

            // Confirm the tab text
            cy.wrap($ele)
              .find(cy_selectors.midatlantic.client_resources_panel_header_text)
              .should("have.text", acm_constants.midatlantic.client_resources_section_i_panel_headers[panelIndex]);

            // Confirm each link point text
            cy.wrap($ele)
              .find(cy_selectors.midatlantic.client_resources_panel_links)
              .each(($ele, linkIndex) => {
                const linkArray =
                  acm_constants.midatlantic[
                    `client_resources_section_i_panel_header_${panelIndex + 1}_links`
                  ];
                cy.wrap($ele).should("have.text", linkArray[linkIndex]);
              });

            cy.wait(1500);
          }
        );
      }

      /* --------------------------------------------------------------------
       * midatlantic - webform component container
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.midatlantic.webform_component_container).scrollIntoView();
        cy.wait(1500);

        cy.get(cy_selectors.midatlantic.webform_component_title)
          .should("have.text", acm_constants.midatlantic.webform_component_title);

        cy.get(cy_selectors.midatlantic.webform_component_body_text)
          .should("have.text", acm_constants.midatlantic.webform_component_body_text);        

        cy.get(cy_selectors.midatlantic.webform_first_name_label)
          .should("have.text", acm_constants.midatlantic.webform_first_name_label);

        cy.get(cy_selectors.midatlantic.webform_first_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.midatlantic.webform_first_name_placeholder);

        cy.get(cy_selectors.midatlantic.webform_last_name_label)
          .should("have.text", acm_constants.midatlantic.webform_last_name_label);

        cy.get(cy_selectors.midatlantic.webform_last_name_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.midatlantic.webform_last_name_placeholder);        

        cy.get(cy_selectors.midatlantic.webform_email_label)
          .should("have.text", acm_constants.midatlantic.webform_email_label);

        cy.get(cy_selectors.midatlantic.webform_email_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.midatlantic.webform_email_placeholder);

        cy.get(cy_selectors.midatlantic.webform_state_label)
            .should("have.text", acm_constants.midatlantic.webform_state_label);
  
        cy.get(cy_selectors.midatlantic.webform_state_placeholder).should(
            "have.attr",
            "placeholder",
            acm_constants.midatlantic.webform_state_placeholder);

        cy.get(cy_selectors.midatlantic.webform_comments_label)
          .should("have.text", acm_constants.midatlantic.webform_comments_label);

        cy.get(cy_selectors.midatlantic.webform_submit_button)
          .should("have.text", acm_constants.midatlantic.webform_submit_button);

        // cy.get(cy_selectors.midatlantic.Webform_response_recorded_title)
        //   .should("have.text", acm_constants.midatlantic.Webform_response_recorded_title);
        
        // cy.get(cy_selectors.midatlantic.Webform_response_recorded_message)
        //   .should("have.text", acm_constants.midatlantic.Webform_response_recorded_message);
      }   
      
      /* --------------------------------------------------------------------
       * id-atlantic - promo cards
       * --------------------------------------------------------------------
       */
      cy.get(cy_selectors.midatlantic.learn_about_acrisure_header).scrollIntoView();

      if (isMobile) {
        cy.scrollTo(0, 50);
        cy.get(cy_selectors.midatlantic.learn_about_acrisure_header).scrollIntoView();
      }
      cy.get(cy_selectors.midatlantic.learn_about_acrisure_header).should("be.visible");
      cy.get(cy_selectors.midatlantic.learn_more_about_us_link).should("be.visible");
      cy.get(cy_selectors.midatlantic.learn_more_about_us_link).click({ force: true });
      cy.title().should('eq', 'About Us');
      cy.go('back');
      cy.wait(3000);
      cy.get(cy_selectors.midatlantic.meet_the_team_header).scrollIntoView();
	    cy.get(cy_selectors.midatlantic.meet_the_team_header).should("be.visible");
      cy.get(cy_selectors.midatlantic.meet_the_team_link).should("be.visible");
      cy.get(cy_selectors.midatlantic.meet_the_team_link).click({ force: true });
      cy.title().should('eq', "Acrisure's Leadership Team");
      cy.go('back');
      cy.wait(2000);

    });
  });
});