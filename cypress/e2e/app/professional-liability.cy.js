const selectors = require("../../fixtures/app/selectors.json");
const proLiability = selectors.pro_liability;

describe("Professional Liability Insurance", () => {
  it(`Validate professional liability insurance page`, () => {
    cy.visitSite("app", "professional-liability-insurance");

    // Main section
    cy.xpath(proLiability.heading_sm).should("be.visible");
    cy.xpath(proLiability.heading_lg).should("be.visible");
    cy.get(proLiability.caption).should("be.visible");
    cy.xpath(proLiability.pill_professional).should("be.visible");
    cy.xpath(proLiability.pill_protection).should("be.visible");

    // Get Quote
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(proLiability.quotes_in_minutes).should("be.visible");
    cy.xpath(proLiability.quick_quote_lg).should("be.visible");
    cy.xpath(proLiability.getaquote_button).should("be.visible");   
    

    // Professional liability insurance
    cy.xpath(proLiability.what_is_eo_heading_sm).scrollIntoView();    
    cy.xpath(proLiability.what_is_eo_heading_sm).should("be.visible");
    cy.xpath(proLiability.what_is_eo_heading_lg).should("be.visible");
    cy.xpath(proLiability.what_is_eo_part_1).should("be.visible");
    cy.get(proLiability.what_is_eo_part_2).should("be.visible");
    cy.get(proLiability.what_is_eo_part_3).should("be.visible");
    cy.get(proLiability.what_is_eo_part_4).should("be.visible");
    cy.get(proLiability.what_is_eo_part_5).should("be.visible");     
    cy.xpath(proLiability.learn_more).should("be.visible");    
    cy.xpath(proLiability.pill_errors).should("be.visible");
    cy.xpath(proLiability.pill_omissions).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.common.pill_options).should("be.visible");
    cy.xpath(selectors.common.pill_easy).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(proLiability.why_caption_1).should("be.visible");    
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(proLiability.why_caption_2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(proLiability.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(selectors.common.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(proLiability.faq_question_1).should("be.visible");
    cy.xpath(proLiability.faq_question_2).should("be.visible");
    cy.xpath(proLiability.faq_question_3).should("be.visible");
    cy.xpath(proLiability.faq_question_4).should("be.visible");
    cy.xpath(proLiability.faq_question_5).should("be.visible");
    cy.xpath(proLiability.faq_question_6).should("be.visible");

    // Expand all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(proLiability.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
    }
    cy.xpath(proLiability.faq_question_body).its("length").should("eq", 6);

    // Collapse all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(proLiability.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
      cy.xpath(proLiability.faq_question_body).eq(i).should("not.be.visible");
    }
  });
});
