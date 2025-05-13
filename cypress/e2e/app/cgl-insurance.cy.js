const selectors = require("../../fixtures/app/selectors.json");
const constants = require("../../fixtures/app/constants.json");
const form_data = require("../../fixtures/app/form_data.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Commercial General Liability Insurance", () => {
  it(`Validate CGL page components`, () => {
    cy.visitSite("app", "commercial-general-liability-insurance");

    // Main section
    cy.wait(4000);
    cy.xpath(selectors.cgl.heading_sm).should("be.visible");
    cy.xpath(selectors.cgl.heading_lg).should("be.visible");
    cy.xpath(selectors.cgl.caption).should("be.visible");
    cy.xpath(selectors.cgl.pill_caution).should("be.visible");
    cy.xpath(selectors.cgl.pill_coverage).should("be.visible");

    // Quick quotes
    cy.wait(4000);
    cy.xpath(selectors.cgl.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.cgl.quick_quotes).should("be.visible");
    cy.xpath(selectors.cgl.get_personalized).should("be.visible");
    cy.xpath(selectors.common.get_a_quote).should("be.visible");

    // What is CGL?
    cy.wait(4000);
    cy.xpath(selectors.cgl.what_header).scrollIntoView();
    cy.xpath(selectors.cgl.pill_hard_work).should("be.visible");
    cy.xpath(selectors.cgl.pill_protected).should("be.visible");
    cy.xpath(selectors.cgl.what_header).should("be.visible");
    cy.xpath(selectors.cgl.what_is_cgl).should("be.visible");
    cy.xpath(selectors.cgl.what_caption).should("be.visible");
    cy.xpath(selectors.cgl.learn_more).should("be.visible");

    // Why Acrisure
    cy.wait(4000);
    cy.xpath(selectors.cgl.pill_options).scrollIntoView();
    cy.xpath(selectors.cgl.pill_options).should("be.visible");
    cy.xpath(selectors.cgl.pill_choice).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(selectors.cgl.why_caption_1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("exist");
    cy.xpath(selectors.cgl.why_caption_2).should("exist");
    cy.xpath(selectors.common.why_acrisure3).should("exist");
    cy.xpath(selectors.cgl.why_caption_3).should("exist");

    // FAQ
    cy.wait(4000);
    cy.xpath(selectors.cgl.card_faq).scrollIntoView();    
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_1).should("be.visible");
    cy.xpath(selectors.cgl.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_2).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_3).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_4).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_5).should("be.visible");
    cy.xpath(selectors.cgl.faq_question_6).should("be.visible");
  });

  it(`Validate CGL quote flow`, () => {
    cy.visitSite("app", "commercial-general-liability-insurance");
    cy.xpath(selectors.common.get_a_quote).click({ force: true });
  });
});