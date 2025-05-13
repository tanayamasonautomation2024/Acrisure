const selectors = require("../../fixtures/app/selectors.json");

/// The purpose of this is to fetch all URLs from news / blog and save them to
/// a fixture under the Cypress folder.

describe("Get Urls", () => {
  before(() => {
    // Clear out the old fixture
    cy.writeFile("./cypress/fixtures/app/news-blog-urls.json", {});
  });

  it("Get Urls: News", () => {
    getUrls({ baseUrl: "news", limit: 50 });
  });

  it("Get Urls: Blog", () => {
    getUrls({ baseUrl: "blog", limit: 50 });
  });
});

/**
 * For a base url (news / blog) gets all the URLs for each article, The
 * "load more" button will be clicked within the limit or until no more items
 * exist to be loaded.
 */
function getUrls({ baseUrl, limit = 30 }) {
  cy.viewport(1920, 1080);
  cy.visitSite("app", baseUrl);
  cy.wait(3000);
  // Automatically load more until limit exceeded or none more exist
  //autoLoadMore({ delay: 1000, limit });
  for (let i = 0; i <= 5; i++){

    cy.get("body").then(($body) => {
      const loadMore = $body.find(selectors.news_blog.load_more_css);
      if (loadMore.length > 0) {
            

        cy.xpath(selectors.news_blog.load_more)
          .scrollIntoView({ top: -500 })
          .click({ force: true });  
        cy.wait(5000);
  
        // Get all of the URLs and add to the array
        const urls = [];
        cy.xpath(selectors.news_blog.article).each(($a) => {
          cy.wrap($a)
            .invoke("attr", "href")
            .then((href) => {
              // Check for duplicate urls
              if (href in urls == false) {
                cy.log(href);
                urls.push(href);
              } else {
                cy.log(`duplicate: ${href}`);
              }
            });
        });

        // Load the existing URLs and append the ones just fetched
        cy.readFile("./cypress/fixtures/app/news-blog-urls.json").then((json) => {
          json[baseUrl] = urls;
          cy.writeFile("./cypress/fixtures/app/news-blog-urls.json", json);
        });
      //newly added } & })
      }
    });

  }
}
// cy.wait(5000);
//   cy.xpath(selectors.news_blog.load_more)
//     .scrollIntoView({ top: -500 })
//     .click({ force: true });

/**
 * Loads more URLs by clicking "load more" until no more exist or the defined
 * limit is exceeded. This is a recursive function to work with Cypress.
 */
// function autoLoadMore({ delay = 1000, limit = 30 }) {
//   if (limit < 1) {
//     // Limit exceeded
//     return;
//   }
//   // Delay then get and click the load more button
//   cy.wait(delay);
//   cy.get("body").then(($body) => {
//     const loadMore = $body.find(selectors.news_blog.load_more_css);
//     if (loadMore.length > 0) {
//       // Button exists, click it 
//       cy.xpath(selectors.news_blog.load_more)
//         .scrollIntoView({ top: -500 })
//         .click({ force: true });

//       // Increment limit and repeat
//       limit--;
//       autoLoadMore({ delay, limit });
//     }
//   });
// }
