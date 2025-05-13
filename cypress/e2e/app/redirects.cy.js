const redirects = require("../../fixtures/app/redirects.json");
const config = require("../../../cypress.env.json");

describe.skip("Blogs Redirect Tests", () => {
  redirects.blogs.forEach((urls) => {
    const fromUrl = updateUrlEnv(urls.fromUrl);
    const toUrl = updateUrlEnv(urls.toUrl);

    it(`${fromUrl} -> ${toUrl}`, () => {
      cy.visit(fromUrl, { failOnStatusCode: false });
      cy.url().should("include", toUrl);
    });
  });
});

describe.skip("Vanity Redirect Tests", () => {
  redirects.vanity.forEach((urls) => {
    const fromLink = updateUrlEnv(`https://www.acrisure.com/${urls.fromLink}`);

    it(`${urls.fromLink} -> ${urls.redirectUrl}`, () => {
      cy.visit(fromLink, { failOnStatusCode: false });
      cy.url().should("include", urls.redirectUrl);
    });
  });
});

describe.skip("Redirect Tests", () => {
  redirects.urls.forEach((urls) => {
    const fromUrl = updateUrlEnv(urls.fromUrl);
    const toUrl = updateUrlEnv(urls.toUrl);

    it(`${fromUrl} -> ${toUrl}`, () => {
      cy.visit(fromUrl, { failOnStatusCode: false });
      cy.url().should("include", toUrl);
    });
  });
});

/**
 * Replaces the appropriate environment in the URL based on config environment
 * example: https://www.acrisure.com -> https://beta.acrisure.com
 */
function updateUrlEnv(url) {
  const env = config.sites.app.config.env;
  return url.replace("www", env);
  // return url.replace("www", env);
}
