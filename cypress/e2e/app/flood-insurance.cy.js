const selectors = require("../../fixtures/app/selectors.json");
const form_data = require("../../fixtures/app/form_data.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Flood Insurance (Personal)", () => {
  it(`Validate flood insurance page components`, () => {
    //const isMobile = Cypress.config().viewportWidth <= 1200;
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "flood-insurance");

    cy.xpath(selectors.flood.heading_sm).should("be.visible");
    cy.xpath(selectors.flood.heading_lg).should("be.visible");
    cy.xpath(selectors.flood.caption).should("be.visible");

    // Quick quote
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.flood.quick_quote_sm).should("be.visible");
    cy.xpath(selectors.flood.quick_quote_lg).should("be.visible");
    cy.xpath(selectors.flood.address).type(form_data.home_insurance.street, { force: true });
    //cy.xpath(selectors.flood.address_option1).click();
    cy.xpath(selectors.flood.get_a_quote).should("be.visible");

    cy.xpath(selectors.common.onetrust1).click({ force: true });

  if (!isMobile) {
    // Coverage
    cy.xpath(selectors.flood.coverage_heading_sm1).scrollIntoView();
    cy.xpath(selectors.flood.coverage_heading_sm1).should("be.visible");
    cy.xpath(selectors.flood.coverage_heading_lg1).should("be.visible");
    cy.xpath(selectors.flood.coverage_caption1).should("be.visible");
    cy.xpath(selectors.flood.coverage_building_heading).should("be.visible");    
    cy.xpath(selectors.flood.coverage_building_caption).should("be.visible");
    cy.xpath(selectors.flood.coverage_contents_button1).click();
    cy.xpath(selectors.flood.coverage_contents_heading).should("be.visible");    
    cy.xpath(selectors.flood.coverage_contents_caption).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.common.pill_options).should("be.visible");
    cy.xpath(selectors.common.pill_easy).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(selectors.flood.why_caption_1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(selectors.flood.why_caption_2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(selectors.flood.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(selectors.common.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.flood.faq_question_1).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.flood.faq_question_2).should("be.visible");
    cy.xpath(selectors.flood.faq_question_3).should("be.visible");
    cy.xpath(selectors.flood.faq_question_4).should("be.visible");
    cy.xpath(selectors.flood.faq_question_5).should("be.visible");
    cy.xpath(selectors.flood.faq_question_6).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).click({ force: true });
    cy.xpath(selectors.flood.faq_question_7).should("be.visible");
    cy.xpath(selectors.flood.faq_question_8).should("be.visible");
    cy.xpath(selectors.flood.faq_question_9).should("be.visible");    

    // Insights
    cy.xpath(selectors.flood.card_insights).scrollIntoView();
    cy.xpath(selectors.flood.more_resources).should("be.visible");
    cy.xpath(selectors.flood.insights_caption).should("be.visible");
    cy.xpath(selectors.flood.insight_card_insurance).should("be.visible");
    cy.xpath(selectors.flood.insight_card_cost).should("be.visible");
    cy.xpath(selectors.flood.insight_card_agent).should("be.visible");
    cy.xpath(selectors.flood.insight_card_broker1).should("be.visible");
    cy.xpath(selectors.flood.insight_card_broker).should("be.visible");
    //cy.xpath(selectors.flood.insight_card_insurance).should("be.visible");
    cy.xpath(selectors.flood.read_more).should("be.visible");

    if(isTablet) {    
      cy.xpath(selectors.common.nextbutton).click({ force: true });     
      cy.xpath(selectors.flood.insight_card_insurance).should("be.visible");
      cy.wait(5000);
    }

    if (isLargeDesktop) {
    //cy.xpath(selectors.common.nextbutton).click({ force: true });
    cy.xpath(selectors.flood.insight_card_insurance).should("be.visible");
    }

    // Explore
    cy.xpath(selectors.flood.card_explore).scrollIntoView();

    // Scroll and wait for the animation to finish
    //cy.xpath(selectors.flood.explore_home).scrollIntoView();
    cy.xpath(selectors.flood.explore_home).should("be.visible");
    cy.xpath(selectors.flood.explore_auto).should("be.visible");

  }
  
  if (isMobile) {
    // Coverage
    cy.xpath(selectors.flood.coverage_heading_sm).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(selectors.flood.coverage_heading_sm).should("be.visible");
    cy.xpath(selectors.flood.coverage_heading_lg).should("be.visible");
    cy.xpath(selectors.flood.coverage_caption).should("be.visible");
    cy.xpath(selectors.flood.coverage_building_heading).should("be.visible");    
    cy.xpath(selectors.flood.coverage_building_caption).should("be.visible");
    cy.xpath(selectors.flood.coverage_contents_button).click();
    cy.xpath(selectors.flood.coverage_contents_heading).should("be.visible");    
    cy.xpath(selectors.flood.coverage_contents_caption).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.common.pill_options).should("be.visible");
    cy.xpath(selectors.common.pill_easy).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(selectors.flood.why_caption_1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(selectors.flood.why_caption_2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(selectors.flood.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(selectors.common.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.flood.faq_question_1).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.flood.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.flood.faq_question_2).should("be.visible");
    cy.xpath(selectors.flood.faq_question_3).should("be.visible");
    cy.xpath(selectors.flood.faq_question_4).should("be.visible");
    cy.xpath(selectors.flood.faq_question_5).should("be.visible");
    cy.xpath(selectors.flood.faq_question_6).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).click({ force: true });
    cy.xpath(selectors.flood.faq_question_7).should("be.visible");
    cy.xpath(selectors.flood.faq_question_8).should("be.visible");
    cy.xpath(selectors.flood.faq_question_9).should("be.visible");
    

    // Insights
    cy.xpath(selectors.flood.card_insights).scrollIntoView();
    cy.xpath(selectors.flood.more_resources).should("be.visible");
    cy.xpath(selectors.flood.insights_caption).should("be.visible");
    cy.xpath(selectors.flood.insight_card_cost).should("be.visible");
    cy.xpath(selectors.common.nextbutton).click({ force: true });
    cy.xpath(selectors.flood.insight_card_agent).should("be.visible");
    cy.xpath(selectors.common.nextbutton).click({ force: true });
    cy.xpath(selectors.flood.insight_card_broker1).should("be.visible");
    cy.xpath(selectors.common.nextbutton).click({ force: true });
    cy.xpath(selectors.flood.insight_card_broker).should("be.visible");
    cy.xpath(selectors.common.nextbutton).click({ force: true });
    cy.xpath(selectors.flood.insight_card_insurance).should("be.visible");
    cy.xpath(selectors.flood.read_more).should("be.visible");

    // Explore
    //cy.xpath(selectors.flood.card_explore).scrollIntoView();

    // Scroll and wait for the animation to finish     
    cy.xpath(selectors.flood.explore_home).scrollIntoView();
    cy.xpath(selectors.flood.explore_home).should("be.visible");
    cy.xpath(selectors.flood.explore_auto).should("be.visible");
  }
  });

  it(`Validate flood insurance quick quote`, () => {
    cy.visitSite("app", "flood-insurance");

    cy.xpath(selectors.flood.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.flood.address).type(form_data.home_insurance.street, {
      force: true,
    });
    //cy.xpath(selectors.flood.address_option1).click();
    cy.xpath(selectors.flood.get_a_quote).click({ force: true });

    const altwayUrl = envUtil.getAltwayUrl();
    cy.origin(altwayUrl, { args: { altwayUrl } }, ({ altwayUrl }) => {
      cy.url().should("include", `${altwayUrl}/flood`);
    });
  });
});
