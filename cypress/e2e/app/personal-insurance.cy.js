const selectors = require("../../fixtures/app/selectors.json");
const constants = require("../../fixtures/app/constants.json");

const isLargeDesktop = Cypress.config().viewportWidth < 2000 
&& Cypress.config().viewportWidth >= 1441;
const isTablet = Cypress.config().viewportWidth < 1441 
&& Cypress.config().viewportWidth >= 768;
const isMobile = Cypress.config().viewportWidth < 768;

describe("Personal Insurance", () => {
  it(`Validate personal insurance page components`, () => {
  // const isNotLargeDesktop = Cypress.config().viewportWidth < 1441 
  //                       && Cypress.config().viewportWidth >= 1200;
  // const isTablet = Cypress.config().viewportWidth < 1200 
  //               && Cypress.config().viewportWidth >= 768;
  // const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "personal-insurance");

    // Main header section
    cy.xpath(selectors.personal.heading_sm).should("be.visible");
    cy.xpath(selectors.personal.heading_lg).should("be.visible");
    cy.xpath(selectors.personal.caption).should("be.visible");

    // Insurance cards
    cy.xpath(selectors.personal.grid_feature).scrollIntoView();
    const cards = isMobile ? ["home"] : ["auto", "home", "life", "flood"];
    for (const card of cards) {
      validateCard(card);
    }
    // Compare Companies
    cy.xpath(selectors.personal.compare_heading).should("be.visible");

    // Why Acrisure
    // if (!isMobile) {
    //   cy.xpath(selectors.personal.pill_coverage).should("be.visible");
    //   cy.xpath(selectors.personal.pill_prices).should("be.visible");
    // }   

    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.personal.pill_coverage).should("be.visible");
    cy.xpath(selectors.personal.pill_prices).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(selectors.personal.why_caption_1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(selectors.personal.why_caption_2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(selectors.personal.why_caption_3).should("be.visible");

    // FAQ
    cy.xpath(selectors.personal.faq_header).scrollIntoView();
    cy.xpath(selectors.personal.faq_header).should("be.visible");
    //cy.xpath(selectors.personal.faq_question_1).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_1).should("be.visible");
    cy.xpath(selectors.personal.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.personal.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.personal.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.personal.faq_bullet_4).should("be.visible");
    //cy.xpath(selectors.personal.faq_bullet_5).scrollIntoView();
    cy.xpath(selectors.personal.faq_bullet_5).should("be.visible");
    //cy.xpath(selectors.personal.faq_question_2).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_2).should("be.visible");
    //cy.xpath(selectors.personal.faq_question_3).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_3).should("be.visible");
    cy.xpath(selectors.personal.faq_question_4).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_4).should("be.visible");
    //cy.xpath(selectors.personal.faq_question_5).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_5).should("be.visible");
    //cy.xpath(selectors.personal.faq_question_6).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_6).should("be.visible");
    //cy.xpath(selectors.personal.faq_load_more_btn).scrollIntoView();
    cy.xpath(selectors.personal.faq_load_more_btn).should("be.visible");
    cy.xpath(selectors.personal.faq_load_more_btn).click();
    cy.xpath(selectors.personal.faq_question_7).scrollIntoView();
    cy.xpath(selectors.personal.faq_question_7).should("be.visible");

    // Explore
    cy.xpath(selectors.personal.explore_home_header).scrollIntoView();
    cy.xpath(selectors.personal.explore_home_header).should("be.visible");
    //cy.xpath(selectors.personal.explore_home_link).scrollIntoView();
    cy.xpath(selectors.personal.explore_home_link).should("be.visible");
    cy.xpath(selectors.personal.explore_auto_header).scrollIntoView();
    cy.xpath(selectors.personal.explore_auto_header).should("be.visible");
    //cy.xpath(selectors.personal.explore_auto_link).scrollIntoView();
    cy.xpath(selectors.personal.explore_auto_link).should("be.visible");
  });

  it(`Validate personal insurance page functionality`, () => {
    cy.visitSite("app", "personal-insurance");

    // Verify the Why Acrisure navigation functions correctly
    cy.xpath(selectors.common.card_why1).scrollIntoView({ offset: { top: 500, left: 0 } });
    cy.wait(5000);
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");    
    cy.xpath(selectors.common.why_acrisure1).click({scrollBehavior: "center",});
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).click({scrollBehavior: "center",});
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).click({scrollBehavior: "center",});    
    //cy.wait(1000);
    cy.xpath(selectors.personal.why_main_img).click();

    // Verify the FAQ accordions function correctly
    cy.xpath(selectors.personal.faq_question_1)
      .scrollIntoView()
      .click({ scrollBehavior: "center" });
    cy.xpath(selectors.personal.faq_load_more_btn)
      .scrollIntoView()
      .click({ scrollBehavior: "center" });
    clickAccordionsAndValidate(true, 6);
    clickAccordionsAndValidate(false, 6);

    // Verify page links
    cy.xpath(selectors.personal.page_links).each((link) => {
      cy.request({ url: link.prop("href"), failOnStatusCode: false }).then(
        (response) => {
          // The blog link sometimes returns a Cloudflare 403, consider this a pass
          const status =
            link.prop("href").includes("/blog") && response.status == 403
              ? 200
              : response.status;
          expect(status).to.eq(200);
        }
      );
    });
  });
});

/**
 * Verifies a card header, caption and quote link
 *
 * @param {string} type Type of insurance (auto, home, etc)
 */
function validateCard(type) {
  cy.xpath(selectors.personal[`card_${type}_header`]).should("be.visible");
  cy.xpath(selectors.personal[`card_${type}_caption`]).should("be.visible");
  cy.xpath(selectors.personal[`card_${type}_header`] + selectors.personal.get_quote).should("be.visible");
}

/**
 * Expands/collapses all accordions and verifies their bullet visibility
 *
 * @param {boolean} expectVisibility If the bullet points should be visible
 * @param {number} questionCount Total number of questions in the FAQ section
 */
function clickAccordionsAndValidate(expectVisibility, questionCount) {
  cy.xpath(selectors.personal.faq_accordions).each(($accordion) => {
    cy.wrap($accordion).click({ scrollBehavior: "center" });
  });

  if (isLargeDesktop){
    cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });
    cy.wait(10000);
    //cy.xpath(selectors.personal.faq_load_more_btn).click();
    for (let i = 1; i <= questionCount; i++) {
      
      const bulletSelector = selectors.personal.faq_bullet_template.replace("%s", constants.personal_insurance[`faq_q${i}_bullet1`]);
      //cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });    
      cy.xpath(bulletSelector).scrollIntoView({ offset: { top: -80, left: 0 } });
      cy.wait(5000);
      cy.xpath(bulletSelector).should(expectVisibility ? "be.visible" : "not.be.visible");    
        //.scrollIntoView()
        //.should(expectVisibility ? "be.visible" : "not.be.visible");    
    }
  }
  if (isTablet){
    cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });
    //cy.xpath(selectors.personal.faq_load_more_btn).click();
    for (let i = 1; i <= questionCount; i++) {
      
      const bulletSelector = selectors.personal.faq_bullet_template.replace("%s", constants.personal_insurance[`faq_q${i}_bullet1`]);
      //cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });    
      cy.xpath(bulletSelector).scrollIntoView({ offset: { top: -80, left: 0 } });
      cy.wait(5000);
      cy.xpath(bulletSelector).should(expectVisibility ? "be.visible" : "not.be.visible");    
        //.scrollIntoView()
        //.should(expectVisibility ? "be.visible" : "not.be.visible");    
    }
  }
  if (isMobile){
    cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.wait(10000);
    //cy.xpath(selectors.personal.faq_load_more_btn).click();
    for (let i = 1; i <= questionCount; i++) {
      
      const bulletSelector = selectors.personal.faq_bullet_template.replace("%s", constants.personal_insurance[`faq_q${i}_bullet1`]);
      //cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });  
      
      cy.xpath(bulletSelector).scrollIntoView({ offset: { top: -80, left: 0 } });
      cy.wait(5000);
      //cy.xpath(bulletSelector).should(expectVisibility ? "be.visible" : "not.be.visible");    
      cy.xpath(bulletSelector).should(expectVisibility ? "exist" : "not.be.visible");    
        //.scrollIntoView()
        //.should(expectVisibility ? "be.visible" : "not.be.visible");    
    }
  }

  // cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });
  // for (let i = 1; i <= questionCount; i++) {
  //   cy.wait(10000);
  //   const bulletSelector = selectors.personal.faq_bullet_template.replace("%s", constants.personal_insurance[`faq_q${i}_bullet1`]);
  //   //cy.xpath(selectors.personal.faq_accordions1).scrollIntoView({ offset: { top: -40, left: 0 } });
  //   cy.xpath(bulletSelector).scrollIntoView({ offset: { top: -80, left: 0 } });
  //   cy.wait(10000);
  //   cy.xpath(bulletSelector).should(expectVisibility ? "be.visible" : "not.be.visible");
  //     //.scrollIntoView()
  //     //.should(expectVisibility ? "be.visible" : "not.be.visible");
  // }
}
