const selectors = require("../../fixtures/app/selectors.json");
const form_data = require("../../fixtures/app/form_data.json");

describe("Contact Us Page", () => {
  it(`Validate Contact Us page components`, () => {
    cy.visitSite("app", "contact-us");

    // Main section
    cy.xpath(selectors.contact_us.header_hello).should("be.visible");
    cy.xpath(selectors.contact_us.caption).should("be.visible");

    // Contact Us Form
    cy.xpath(selectors.contact_us.card_form).scrollIntoView();
    cy.xpath(selectors.contact_us.header_sm).should("be.visible");
    cy.xpath(selectors.contact_us.header_lg).should("be.visible");
    cy.xpath(selectors.contact_us.body_text).should("be.visible");
    cy.xpath(selectors.contact_us.first_name_label).should("be.visible");
    cy.xpath(selectors.contact_us.first_name_input).should("be.visible");
    cy.xpath(selectors.contact_us.last_name_label).should("be.visible");
    cy.xpath(selectors.contact_us.last_name_input).should("be.visible");
    cy.xpath(selectors.contact_us.email_label).should("be.visible");
    cy.xpath(selectors.contact_us.email_input).should("be.visible");
    cy.xpath(selectors.contact_us.phone_label).should("be.visible");
    cy.xpath(selectors.contact_us.phone_input).should("be.visible");
    cy.xpath(selectors.contact_us.city_label).should("be.visible");
    cy.xpath(selectors.contact_us.city_input).should("be.visible");
    cy.xpath(selectors.contact_us.state_label).should("be.visible");
    cy.xpath(selectors.contact_us.state_input).should("be.visible");
    cy.xpath(selectors.contact_us.interested_label).should("be.visible");
    cy.xpath(selectors.contact_us.interested_input).should("be.visible");
    cy.xpath(selectors.contact_us.help_label).should("be.visible");
    cy.xpath(selectors.contact_us.help_input).should("be.visible");
    cy.xpath(selectors.contact_us.btn_submit).should("be.visible");

    // Careers
    cy.xpath(selectors.contact_us.card_careers).scrollIntoView();
    cy.xpath(selectors.contact_us.join_team).should("be.visible");
    cy.xpath(selectors.contact_us.explore_carriers).should("be.visible");
    cy.xpath(selectors.contact_us.pill_network).should("be.visible");
  });

  it(`Validate Contact Us form submission`, () => {
    cy.visitSite("app", "contact-us");

    cy.xpath(selectors.contact_us.card_form).scrollIntoView();
    cy.xpath(selectors.contact_us.first_name_input).type(form_data.home_insurance.first_name,{ force: true });
    cy.xpath(selectors.contact_us.last_name_input).type(form_data.home_insurance.last_name,{ force: true });
    cy.xpath(selectors.contact_us.email_input).type(form_data.home_insurance.email,{ force: true });
    cy.xpath(selectors.contact_us.phone_input).type(form_data.home_insurance.phone,{ force: true });
    cy.xpath(selectors.contact_us.city_input).type(form_data.home_insurance.city,{ force: true });
    cy.xpath(selectors.contact_us.state_input).type(form_data.home_insurance.state,{ force: true });
    cy.xpath(selectors.home_insurance.select_first_option).click();
    cy.xpath(selectors.contact_us.interested_input).type(form_data.contact.interested,{ force: true });
    cy.xpath(selectors.home_insurance.select_first_option).click();
    cy.xpath(selectors.contact_us.help_input).type(form_data.contact.help,{force: true });
    cy.xpath(selectors.contact_us.btn_submit).click({ force: true });
    cy.xpath(selectors.contact_us.response_recorded).should("be.visible");
    cy.xpath(selectors.contact_us.response_recorded_desc).should("be.visible");
  });
});
