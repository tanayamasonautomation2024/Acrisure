const selectors = require("../../fixtures/app/selectors.json");

describe("Your Privacy Choices (Cookie Dialog)", () => {
  it(`Validate privacy choices functionality`, () => {
    cy.visitSite("app", "");

    // The privacy center pop-up has an issue where it only loads correctly on refresh
    reloadAndOpenDialog();

    // Validate header and accordians
    cy.xpath(selectors.privacy_pref_dialog.header).should("be.visible");
    cy.xpath(selectors.privacy_pref_dialog.accordians).each(($el) => {
      cy.wrap($el).click();
    });

    // cy.xpath(selectors.privacy_pref_dialog.performance_desc)
    //   .scrollIntoView()
    //   .should("be.visible");
    cy.xpath(selectors.privacy_pref_dialog.necessary_desc).scrollIntoView();
    cy.xpath(selectors.privacy_pref_dialog.necessary_desc).should("be.visible");
    // cy.xpath(selectors.privacy_pref_dialog.targeting_desc)
    //   .scrollIntoView()
    //   .should("be.visible");
    cy.xpath(selectors.privacy_pref_dialog.functional_desc).scrollIntoView();
    cy.xpath(selectors.privacy_pref_dialog.functional_desc).should("be.visible");

    // Toggle the targeting cookie off and confirm
    // cy.xpath(selectors.privacy_pref_dialog.targeting_toggle_on).click({
    //   force: true,
    // });
    // cy.xpath(selectors.privacy_pref_dialog.targeting_toggle_off).should(
    //   "exist"
    // );
    // cy.xpath(selectors.privacy_pref_dialog.btn_confirm).click();

    // Verify the targeting cookie is still set to off, toggle on and confirm
    reloadAndOpenDialog();
    // cy.xpath(selectors.privacy_pref_dialog.targeting_toggle_off).click({
    //   force: true,
    // });
    // cy.xpath(selectors.privacy_pref_dialog.targeting_toggle_on).should("exist");
    // cy.xpath(selectors.privacy_pref_dialog.btn_confirm).click();

    // Verify the toggle is still set to on and the dialog can be closed
    reloadAndOpenDialog();
    cy.xpath(selectors.privacy_pref_dialog.header).should("be.visible");
    // cy.xpath(selectors.privacy_pref_dialog.targeting_toggle_on).should("exist");
    cy.xpath(selectors.privacy_pref_dialog.close).click();
    cy.xpath(selectors.privacy_pref_dialog.header).should("not.be.visible");
  });
});

/**
 * Reloads the page and clicks on the Your Privacy Choices link
 */
function reloadAndOpenDialog() {
  cy.reload();
  cy.wait(10000);
  cy.xpath(selectors.footer.your_privacy)
    .scrollIntoView()
    //.click({ scrollBehavior: "center" });    
    .click({force: true});    
}
