const selectors = require("../../fixtures/app/selectors.json");

describe("Legal Notice", () => {
  it(`Validate legal notice page components`, () => {
    cy.visitSite("app", "legal");

    cy.xpath(selectors.legal.main_header).should("be.visible");

    // Products and services
    cy.xpath(selectors.legal.link_products).scrollIntoView().click();
    cy.xpath(selectors.legal.header_products).should("be.visible");

    // U.S. Producer Compensation Disclosure
    cy.xpath(selectors.legal.link_us_producer).click();
    cy.xpath(selectors.legal.header_us_producer).should("be.visible");

    // California Producer License
    cy.xpath(selectors.legal.link_ca_producer).click();
    cy.xpath(selectors.legal.header_ca_producer).should("be.visible");
    cy.xpath(selectors.legal.link_ca_license).should("be.visible");
    cy.xpath(selectors.legal.link_ca_license_disclosure).should("be.visible");

    // Disclosure and Agreement to Conduct Electronic Transactions
    cy.xpath(selectors.legal.link_transactions).click();
    cy.xpath(selectors.legal.header_transactions).should("be.visible");

    // Acrisure International Holdings Limited – UK Tax Strategy
    cy.xpath(selectors.legal.link_uk_strategy).click();
    cy.xpath(selectors.legal.header_uk).should("be.visible");

    // Acrisure International - Section 54 Modern Slavery Act Statement
    cy.xpath(selectors.legal.link_section54).click();
    cy.xpath(selectors.legal.header_section54).should("be.visible");
  });
});
