const selectors = require("../../fixtures/app/selectors.json");
const bop = selectors.bop;

describe("BOP Insurance", () => {
  it(`Validate BOP insurance page`, () => {
    cy.visitSite("app", "bop-insurance");

    // Splash
    cy.xpath(bop.heading_sm).should("be.visible");
    cy.xpath(bop.heading_lg).should("be.visible");
    cy.get(bop.caption).should("be.visible");

    // Get Quote
    cy.xpath(bop.quotes_in_minutes).scrollIntoView({ offset: { top: -1000, left: 0 } });
    cy.xpath(bop.quotes_in_minutes).should("be.visible");
    cy.get(bop.quotes_text_large).should("be.visible");
    cy.xpath(bop.get_a_quote_button).should("be.visible");

    // What is BOP insurance
    cy.xpath(bop.what_is_bop_heading_sm).scrollIntoView({ offset: { top: -300, left: 0 } });
    cy.xpath(bop.what_is_bop_heading_sm).should("be.visible");
    cy.xpath(bop.what_is_bop_heading_lg).should("be.visible");
    cy.get(bop.what_is_bop_part_1).should("be.visible");
    cy.get(bop.pill_commercialGL).should("be.visible");
    cy.get(bop.pill_propertyinsurance).should("be.visible");                                                                                                     

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView({ offset: { top: -200, left: 0 } });
    //cy.xpath(bop.why_acrisure).eq(1).scrollIntoView().should("exist");
    cy.xpath(bop.why_acrisure_heading_1).should("be.visible");
    cy.get(bop.why_acrisure_text_1).should("be.visible");
    cy.xpath(bop.why_acrisure_heading_2).should("be.visible");
    cy.get(bop.why_acrisure_text_2).should("be.visible");
    cy.xpath(bop.why_acrisure_heading_3).should("be.visible");
    cy.get(bop.why_acrisure_text_3).should("be.visible");
    cy.xpath(selectors.common.pill_options).should("be.visible");
    cy.xpath(selectors.common.pill_easy).should("be.visible");

    // FAQ
    cy.xpath(bop.faq_header).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(bop.faq_question_body);
    cy.xpath(bop.faq_question_1).should("be.visible");
    cy.xpath(bop.faq_question_2).should("be.visible");
    cy.xpath(bop.faq_question_3).should("be.visible");
    cy.xpath(bop.faq_question_4).should("be.visible");
    cy.xpath(bop.faq_question_5).should("be.visible");
    cy.xpath(bop.faq_question_6).should("be.visible");

    // Expand all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(bop.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
    }
    cy.xpath(bop.faq_question_body).its("length").should("eq", 6);

    // Collapse all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(bop.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
      cy.wait(1000);
      cy.xpath(bop.faq_question_body).eq(i).should("not.be.visible");
    }
  });
});
