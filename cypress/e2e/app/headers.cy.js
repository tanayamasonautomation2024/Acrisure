 const selectors = require("../../fixtures/app/selectors.json");
const testData = require("../../fixtures/app/header-testdata.json");

testData.pages.forEach((page) => {
  describe(
    `Header Tests: Page = ${page || "index"}`,
    {
      retries: {
        runMode: 1,
        openMode: 1,
      },
    },
    () => {
      // If any test data is flagged as "only" filter that subset to run
      const itemsFlaggedOnly = testData.items.filter((i) => i.only == true);
      if (itemsFlaggedOnly.length > 0) {
        testData.items = itemsFlaggedOnly;
      }

      // Test every header link in the test data
      testData.items.forEach((item) => validateHeaderItem({ page, ...item }));
    }
  );
});

/**
 * Validates an item in the header, which includes clicking to it, verifying
 * it exists, visiting it's href and validating the correct URL was loaded.
 *
 * @param {*} arg
 * @param {*} arg.page The page the site should verify headers on
 * @param {*} arg.section Optionally, the header section the item belongs to
 * @param {*} arg.cardTitle If the item is a card, its title
 * @param {*} arg.linkTitle If the item is a link, it's link text
 * @param {*} arg.expectedUrl URL that should be loaded by clicking the item
 */
function validateHeaderItem({
  page,
  section,
  cardTitle,
  linkTitle,
  expectedUrl,
}) {
  it(cardTitle || linkTitle || section, () => {
    // Set viewport and visit the site
    cy.viewport(1366, 768);    
    cy.visitSite("app", page);        
    cy.xpath(selectors.header.menu_btn).click();
    
    // Click a section
    if (section) {
      cy.xpath(selectors.header.card_btn.replace("%s", section)).click();
    }

    // Click a card title
    if (cardTitle) {
      cy.xpath(selectors.header.card_title.replace("%s", cardTitle)).click();
    }

    // Click a link title
    if (linkTitle) {
      cy.xpath(selectors.header.link.replace("%s", linkTitle)).click();
    }

    // Validate correct URL
    cy.url().should("contain", expectedUrl);
  });
}
