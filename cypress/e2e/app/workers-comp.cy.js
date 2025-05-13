const selectors = require("../../fixtures/app/selectors.json");
const workersComp = selectors.worker_comp;

describe("Worker's Comp Insurance", () => {
  it(`Validate worker's comp insurance page`, () => {
    cy.visitSite("app", "workers-compensation-insurance");

    // Splash
    cy.xpath(workersComp.heading_sm).should("be.visible");
    cy.xpath(workersComp.heading_lg).should("be.visible");
    cy.xpath(workersComp.caption).should("be.visible");
    cy.xpath(workersComp.pill_hardworking).should("be.visible");
    cy.xpath(workersComp.pill_coverage).should("be.visible");

    // Get Quote
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(workersComp.quick_quote_sm).should("be.visible");
    cy.xpath(workersComp.quick_quote_lg).should("be.visible");
    cy.xpath(workersComp.get_a_quote).should("be.visible");

    // What is workers' comp insurance
    cy.xpath(workersComp.work_insblock).scrollIntoView();
    cy.xpath(workersComp.what_is_wc_heading_sm).should("be.visible");
    cy.xpath(workersComp.what_is_wc_heading_lg).should("be.visible");
    cy.xpath(workersComp.what_is_wc_paragraph_1).should("be.visible");
    cy.xpath(workersComp.what_is_wc_paragraph_2).should("be.visible");
    cy.xpath(workersComp.what_is_wc_paragraph_3).should("be.visible");
    cy.xpath(workersComp.what_is_wc_paragraph_4).should("be.visible");
    cy.xpath(workersComp.what_is_wc_paragraph_5).should("be.visible");
    cy.xpath(workersComp.learn_more).should("be.visible");
    cy.xpath(workersComp.pill_staysafe).should("be.visible");
    cy.xpath(workersComp.pill_staycovered).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(workersComp.pill_options).scrollIntoView();
    cy.xpath(workersComp.pill_options).should("be.visible");
    cy.xpath(workersComp.pill_choice).should("be.visible");    
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(workersComp.why_caption_1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(workersComp.why_caption_2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(workersComp.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(workersComp.card_faq).scrollIntoView();
    cy.xpath(workersComp.faq_header).should("be.visible");
    cy.xpath(workersComp.faq_question_body).should("be.visible");
    cy.xpath(workersComp.faq_question_1).should("be.visible");
    cy.xpath(workersComp.faq_bullet_1).should("be.visible");
    cy.xpath(workersComp.faq_bullet_2).should("be.visible");
    cy.xpath(workersComp.faq_bullet_3).should("be.visible");
    cy.xpath(workersComp.faq_question_2).should("be.visible");
    cy.xpath(workersComp.faq_question_3).should("be.visible");
    cy.xpath(workersComp.faq_question_4).should("be.visible");
    cy.xpath(workersComp.faq_question_5).should("be.visible");
    cy.xpath(workersComp.faq_question_6).should("be.visible");

    // Expand all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(workersComp.faq_accordion_icon)
        .eq(i)
        .scrollIntoView({ offset: { top: -400, left: 0 } })
        .click({ force: true });
      cy.wait(500);
    }
    cy.xpath(workersComp.faq_question_body).its("length").should("eq", 6);

    // Collapse all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(workersComp.faq_accordion_icon)
        .eq(i)
        .scrollIntoView({ offset: { top: -400, left: 0 } })
        .click({ force: true });
      cy.wait(500);
      cy.xpath(workersComp.faq_question_body).eq(i).should("not.be.visible");
    }
  });
});
