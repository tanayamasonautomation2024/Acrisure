const selectors = require("../../fixtures/app/selectors.json");
const form_data = require("../../fixtures/app/form_data.json");
const constants = require("../../fixtures/app/constants.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Life Insurance", () => {
  it(`Validate life insurance page components`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "life-insurance");

    // Main header section
    cy.xpath(selectors.life.heading_sm).should("be.visible");
    cy.xpath(selectors.life.heading_lg).should("be.visible");
    cy.xpath(selectors.life.caption).should("be.visible");
    cy.xpath(selectors.life.pill_life).should("be.visible");
    cy.xpath(selectors.life.pill_simple).should("be.visible");

    // Quick Quote
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.life.quick_quote_sm).should("be.visible");
    cy.xpath(selectors.life.quick_quote_lg).should("be.visible");
    cy.xpath(selectors.life.state_label).should("be.visible");
    cy.xpath(selectors.life.state_select).should("be.visible");
    cy.xpath(selectors.life.get_a_quote).should("be.visible");

    // What is term life insurance?
    cy.xpath(selectors.life.card_what).scrollIntoView();
    cy.xpath(selectors.life.what_heading_sm).should("be.visible");
    cy.xpath(selectors.life.what_heading_lg).should("be.visible");
    cy.xpath(selectors.life.what_caption_1).should("be.visible");
    cy.xpath(selectors.life.learn_more).should("be.visible");
    cy.xpath(selectors.life.pill_years).should("be.visible");
    cy.xpath(selectors.life.pill_afford).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.life.pill_options).should("be.visible");
    cy.xpath(selectors.life.pill_easy).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.life.why_heading_1).should("be.visible");
    cy.xpath(selectors.life.why_caption_1).should("be.visible");
    cy.xpath(selectors.life.why_heading_2).should("be.visible");
    cy.xpath(selectors.life.why_caption_2).should("be.visible");
    cy.xpath(selectors.life.why_heading_3).should("be.visible");
    cy.xpath(selectors.life.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(selectors.common.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.life.faq_question_1).should("be.visible");
    cy.xpath(selectors.life.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.life.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.life.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.life.faq_bullet_4).should("be.visible");
    cy.xpath(selectors.life.faq_bullet_5).should("be.visible");
    cy.xpath(selectors.life.faq_question_2).should("be.visible");
    cy.xpath(selectors.life.faq_question_3).should("be.visible");
    cy.xpath(selectors.life.faq_question_4).should("be.visible");
    cy.xpath(selectors.life.faq_question_5).should("be.visible");
    cy.xpath(selectors.life.faq_question_6).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).click();
    cy.wait(2000);
    cy.xpath(selectors.life.faq_question_7).should("be.visible");
    cy.xpath(selectors.life.faq_question_8).should("be.visible");
    cy.xpath(selectors.life.faq_question_9).should("be.visible");
    cy.xpath(selectors.life.faq_question_10).should("be.visible");
    cy.xpath(selectors.life.faq_question_11).should("be.visible");

    if (isMobile) {
      // Insights
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.life.insights_caption).should("be.visible");
      cy.xpath(selectors.life.card_broker).should("be.visible");
      cy.xpath(selectors.life.nextbutton).click({ force: true });
      cy.xpath(selectors.life.card_term).should("be.visible");
      cy.xpath(selectors.life.nextbutton).click({ force: true });
      cy.xpath(selectors.life.card_whole).should("be.visible");
      cy.xpath(selectors.life.nextbutton).click({ force: true });
      cy.xpath(selectors.life.card_barrow).should("be.visible");    
      cy.xpath(selectors.life.nextbutton).click({ force: true });
      cy.xpath(selectors.life.card_agentvsbroker).should("be.visible");
    } 
    if (isTablet) {
      // Insights
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.life.insights_caption).should("be.visible");
      cy.xpath(selectors.life.card_broker).should("be.visible");      
      cy.xpath(selectors.life.card_term).should("be.visible");
      cy.xpath(selectors.life.card_whole).should("be.visible");
      cy.xpath(selectors.life.card_barrow).should("be.visible");    
      cy.xpath(selectors.life.nextbutton).click({ force: true });
      cy.xpath(selectors.life.card_agentvsbroker).should("be.visible");
    }   

    if (isLargeDesktop) {
      // Insights
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.life.insights_caption).should("be.visible");
      cy.xpath(selectors.life.card_broker).should("be.visible");      
      cy.xpath(selectors.life.card_term).should("be.visible");
      cy.xpath(selectors.life.card_whole).should("be.visible");
      cy.xpath(selectors.life.card_barrow).should("be.visible");        
      cy.xpath(selectors.life.card_agentvsbroker).should("be.visible");
      }

    cy.xpath(selectors.common.read_more).should("be.visible");

    // Explore
    cy.xpath(selectors.common.card_explore).scrollIntoView();

    // Needs to scroll down slightly to trigger explore visibility on mobile
    if (isMobile) {
      cy.scrollTo(0, 50);
      cy.xpath(selectors.life.explore_home_header).scrollIntoView();
    }

    cy.xpath(selectors.life.explore_home_header).should("be.visible");
    cy.xpath(selectors.life.explore_home_link).should("be.visible");
    cy.xpath(selectors.life.explore_auto_header).should("be.visible");
    cy.xpath(selectors.life.explore_auto_link).should("be.visible");
  });

  it(`Validate life insurance quote flow`, () => {
    cy.visitSite("app", "life-insurance");

    cy.xpath(selectors.life.state_select).type(form_data.home_insurance.state, {
      force: true,
    });
    cy.xpath(selectors.flood.address_option1).click();
    cy.xpath(selectors.life.get_a_quote).click({ force: true });

    const altwayUrl = envUtil.getAltwayUrl();
    cy.origin(altwayUrl, { args: { altwayUrl } }, ({ altwayUrl }) => {
      cy.url().should("include", `${altwayUrl}/life`);
    });
  });
});
