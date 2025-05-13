describe("Site loading test", () => {
  it("Can visit the home page", () => {
    cy.visitSite("app");
    cy.url().should("include", "acrisure");    
    cy.xpath("//div[@id='content']").should("exist");
  });
});
