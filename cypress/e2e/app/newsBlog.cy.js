const selectors = require("../../fixtures/app/selectors.json");
const states = require("../../fixtures/app/us_states.json");

/// This is an optional way to validate the news / blog URLS
/// It has been marked skip becasue `tests/testNewsBlog.js` is faster

describe("Newsroom", () => {
  assertUrlStatusCodes({ baseUrl: "news", waitAfter: 5000 });
});

describe("Blog", () => {
  assertUrlStatusCodes({ baseUrl: "blog", waitAfter: 5000 });
});

/**
 * For a URL type (blog or news), gets all URLs from the fixture and validates
 * that they are all a 200 status, and returns any failures.
 *
 * Method can also be 'request' which will perform a cy.request() instead of
 * visiting the URL to validate it.
 *
 * waitAfter is how many millisecods the 'visit' mode should wait after
 * visiting and validating a URL. Useful to see the page if observing headed.
 */
function assertUrlStatusCodes({ baseUrl, method = "visit", waitAfter = 0 }) {
  beforeEach(() => {
    cy.session("login", () => {
      cy.visitSite("app");
      cy.visitSite("app", baseUrl, {
        skipOnetrust: true,
        skipLogin: true,
      });
    });
  });

  try {
    const newsUrls = require("../../fixtures/app/news-blog-urls.json")[baseUrl];
    newsUrls.forEach((url) => {
      it(url, () => {
        // Apply the app environment to the URL
        const fullUrl = `${getAppUrl()}${url}`;

        if (method == "visit") {          
          // Assert URLs buy visiting (slower but more accurate)
          cy.visitSite("app", url.substring(1), {
            skipOnetrust: true,
            skipLogin: true,
          });

          cy.xpath("//div[text() = 'Page not found']").should("not.exist");
          cy.xpath("//div[@class = 'date']").should("exist");

          cy.wait(waitAfter);
        } else if (method == "request") {
          // Assert URLs by request
          cy.request(fullUrl, { failOnStatusCode: false }).should(
            (response) => {
              expect(response.status).to.eq(200);
            }
          );
        }
      });
    });
  } catch {}
}

/**
 * Get the app url for the congured environment
 */
function getAppUrl() {
  const siteConfig = Cypress.env("sites")["app"];
  const env = siteConfig.config.env;
  const envConfig = siteConfig.envs[env];
  const appUrl = envConfig["app_url"];

  return appUrl;
}
