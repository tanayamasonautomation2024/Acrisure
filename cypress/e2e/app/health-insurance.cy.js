const selectors = require("../../fixtures/app/selectors.json");
const constants = require("../../fixtures/app/constants.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Health Insurance (Personal)", () => {
  it(`Validate health insurance page components`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "health-insurance");

    // Main section
    cy.xpath(selectors.health.heading_sm).should("be.visible");
    cy.xpath(selectors.health.heading_lg).should("be.visible");
    cy.xpath(selectors.health.caption).should("be.visible");
    cy.xpath(selectors.health.pill_health).should("be.visible");
    cy.xpath(selectors.health.pill_simple).should("be.visible");

    // Quick Quotes
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.health.quick_quote_sm).should("be.visible");
    cy.xpath(selectors.health.quick_quote_lg).should("be.visible");
    cy.xpath(selectors.health.get_a_quote).should("be.visible");

    cy.xpath(selectors.common.onetrust1).click({ force: true });

    // Coverage
    if (isMobile) {
      cy.xpath(selectors.health.coverage_heading_lg).scrollIntoView();
      cy.xpath(selectors.health.coverage_heading_lg).should("be.visible");
      cy.xpath(selectors.health.coverage_caption).should("be.visible");
    }

    if (!isMobile) {
      cy.xpath(selectors.health.coverage_heading_lg1).scrollIntoView();
      cy.xpath(selectors.health.coverage_heading_lg1).should("be.visible");
      cy.xpath(selectors.health.coverage_caption1).should("be.visible");
    }
    
    cy.xpath(selectors.health.coverage_heading_sm).should("be.visible");    
    cy.xpath(selectors.health.coverage_exist_heading).should("be.visible");
    cy.xpath(selectors.health.coverage_exist_caption).should("be.visible");
    cy.xpath(selectors.health.coverage_drugs_heading).should("be.visible");
    cy.xpath(selectors.health.coverage_maternal_heading).should("be.visible");
    cy.xpath(selectors.health.coverage_emergency_heading).should("be.visible");
    cy.xpath(selectors.health.coverage_mental_heading).should("be.visible");
    cy.xpath(selectors.health.coverage_add_heading).should("be.visible");

    // Why Acrisure 1
    cy.xpath(selectors.health.card_why1).scrollIntoView();
    cy.xpath(selectors.health.why_acrisure_1).should("be.visible");
    cy.xpath(selectors.health.why_aca_header).should("be.visible");
    cy.xpath(selectors.health.why_aca_caption).should("be.visible");

    // Why Acrisure 2
    cy.xpath(selectors.health.card_why2).scrollIntoView();
    cy.wait(5000);
    cy.xpath(selectors.health.why_header1).should("be.visible");    
    cy.xpath(selectors.health.why_caption1).should("be.visible");
    cy.xpath(selectors.health.why_header2).should("be.visible");
    cy.xpath(selectors.health.why_caption2).should("be.visible");
    cy.xpath(selectors.health.why_header3).should("be.visible");
    cy.xpath(selectors.health.why_caption3).should("be.visible");
    cy.xpath(selectors.health.pill_options).should("be.visible");
    cy.xpath(selectors.health.pill_easy).should("be.visible");

    // FAQ
    cy.xpath(selectors.health.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.health.faq_question_1).should("be.visible");
    cy.xpath(selectors.health.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.health.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.health.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.health.faq_bullet_4).should("be.visible");    
    cy.xpath(selectors.health.faq_question_2).should("be.visible");
    cy.xpath(selectors.health.faq_question_3).should("be.visible");
    cy.xpath(selectors.health.faq_question_4).should("be.visible");
    cy.xpath(selectors.health.faq_question_5).should("be.visible");
    cy.xpath(selectors.health.faq_question_6).should("be.visible");
    cy.xpath(selectors.health.faq_question_6).scrollIntoView();
    cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).click();
    cy.xpath(selectors.health.faq_question_7).should("be.visible");
    cy.xpath(selectors.health.faq_question_8).should("be.visible");
    cy.xpath(selectors.health.faq_question_9).should("be.visible");

    if (isMobile) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -20, left: 0 } });
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.health.insights_caption).should("be.visible");
      cy.xpath(selectors.health.card_issue).should("be.visible"); 
      cy.xpath(selectors.health.nextbutton).click({ force: true });
      cy.xpath(selectors.health.card_broker).should("be.visible");
      cy.xpath(selectors.health.nextbutton).click({ force: true });
      cy.xpath(selectors.health.card_broker2).should("be.visible"); 
      cy.xpath(selectors.health.nextbutton).click({ force: true });
      cy.xpath(selectors.health.card_job).should("be.visible");
      cy.xpath(selectors.health.nextbutton).click({ force: true });
      cy.xpath(selectors.health.card_cost).should("be.visible");    
      //cy.xpath(selectors.health.nextbutton).click({ force: true });
      //cy.xpath(selectors.health.card_selfemployed).should("be.visible");
      //cy.xpath(selectors.health.nextbutton).click({ force: true });
      //cy.xpath(selectors.health.card_college).should("be.visible");
    }   

    if (isTablet) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -20, left: 0 } });
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.health.insights_caption).should("be.visible");
      cy.xpath(selectors.health.card_issue).should("be.visible"); 
      cy.xpath(selectors.health.card_broker).should("be.visible"); 
      cy.xpath(selectors.health.card_broker2).should("be.visible"); 
      cy.xpath(selectors.health.card_job).should("be.visible"); 
      cy.xpath(selectors.health.nextbutton).click({ force: true });     
      cy.xpath(selectors.health.card_cost).should("be.visible");      
      //cy.xpath(selectors.health.card_selfemployed).should("be.visible");
      //cy.xpath(selectors.health.nextbutton).click({ force: true });
      //cy.xpath(selectors.health.card_college).should("be.visible");
    }   

    if (isLargeDesktop) {
        // More Resources
        cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -20, left: 0 } });
        cy.wait(5000);
        cy.xpath(selectors.common.insights_sm).should("be.visible");
        cy.xpath(selectors.common.more_resources).should("be.visible");
        cy.xpath(selectors.health.insights_caption).should("be.visible");
        cy.xpath(selectors.health.card_issue).should("be.visible"); 
        cy.xpath(selectors.health.card_broker).should("be.visible"); 
        cy.xpath(selectors.health.card_broker2).should("be.visible"); 
        cy.xpath(selectors.health.card_job).should("be.visible");  
        cy.xpath(selectors.health.card_cost).should("be.visible");     
        //cy.xpath(selectors.health.card_selfemployed).should("be.visible");        
        //cy.xpath(selectors.health.card_college).should("be.visible");
      }

    cy.xpath(selectors.common.read_more).should("be.visible");

    // Explore
    cy.xpath(selectors.health.card_explore).scrollIntoView();

    if (isMobile) {
      cy.scrollTo(0, 50);
      cy.xpath(selectors.health.explore_life_header).scrollIntoView();
    }

    cy.xpath(selectors.health.explore_life_header).should("be.visible");
    cy.xpath(selectors.health.explore_life_link).should("be.visible");
    cy.xpath(selectors.health.explore_auto_header).should("be.visible");
    cy.xpath(selectors.health.explore_auto_link).should("be.visible");
  });

  it(`Validate health insurance quote flow`, () => {
    cy.visitSite("app", "health-insurance");

    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.health.get_a_quote).click({ force: true });

    const altwayUrl = envUtil.getAltwayUrl();
    cy.origin(altwayUrl, { args: { altwayUrl } }, ({ altwayUrl }) => {
      cy.url().should("include", `${altwayUrl}/health`);
    });
  });
});
