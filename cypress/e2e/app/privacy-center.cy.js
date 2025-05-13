const selectors = require("../../fixtures/app/selectors.json");

describe("Privacy Center", () => {
  it(`Privacy center page components`, () => {
    cy.visitSite("app", "privacy");

    // Main Header
    cy.xpath(selectors.privacy_center.main_header).should("be.visible");
    cy.xpath(selectors.privacy_center.main_description).should("be.visible");

    // Acrisure Privacy Policies and Customer Notices section
    cy.xpath(selectors.privacy_center.header_section1).scrollIntoView();
    cy.xpath(selectors.privacy_center.header_section1).should("be.visible");
    cy.xpath(selectors.privacy_center.link_us_privacy).should("be.visible");
    cy.xpath(selectors.privacy_center.link_customer_notice).should("be.visible");

    // Data Subject Privacy Requests section
    cy.xpath(selectors.privacy_center.header_section2).scrollIntoView();
    cy.xpath(selectors.privacy_center.header_section2).should("be.visible");
    cy.xpath(selectors.privacy_center.link_us_except_ca).should("be.visible");
    cy.xpath(selectors.privacy_center.link_ca_residents).should("be.visible");
    cy.xpath(selectors.privacy_center.link_caifipa).should("be.visible");

    // Data Subject Privacy Requests section
    cy.xpath(selectors.privacy_center.header_section3).scrollIntoView();
    cy.xpath(selectors.privacy_center.header_section3).should("be.visible");      
    cy.xpath(selectors.privacy_center.link_privacy_choices).should("exist");
  
    // FAQ section
    cy.xpath(selectors.privacy_center.faq1_header).scrollIntoView();
    cy.xpath(selectors.privacy_center.faq1_header).should("be.visible");
    cy.xpath(selectors.privacy_center.faq1_bullet1).should("be.visible");
    cy.xpath(selectors.privacy_center.faq2_header).click({ force: true });
    cy.xpath(selectors.privacy_center.faq2_bullet1).should("be.visible");
    cy.xpath(selectors.privacy_center.faq2_bullet2).should("be.visible");    
    cy.xpath(selectors.privacy_center.faq3_header).click({ force: true });
    cy.xpath(selectors.privacy_center.faq3_bullet1).should("be.visible");
  });
});
