const selectors = require("../../fixtures/app/selectors.json");
const states = require("../../fixtures/app/us_states.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Auto Insurance", () => {
it(`Validate Auto Insurance page components`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;
  cy.visitSite("app", "auto-insurance");

  // Main section
  cy.xpath(selectors.auto.heading_sm).should("be.visible");
  cy.xpath(selectors.auto.heading_lg).should("be.visible");
  cy.xpath(selectors.auto.caption).should("be.visible");
  cy.xpath(selectors.auto.pill_personalized).should("be.visible");
  cy.xpath(selectors.auto.pill_coverage).should("be.visible");

  // Quick Quotes
  cy.xpath(selectors.auto.get_a_quote).scrollIntoView({ offset: { top: -1000, left: 0 } });
  cy.xpath(selectors.auto.quick_quote_sm).should("be.visible");
  cy.xpath(selectors.auto.quick_quote_lg).should("be.visible");
  cy.xpath(selectors.auto.address_label).should("be.visible");
  cy.xpath(selectors.auto.state_combobox).should("be.visible");
  cy.xpath(selectors.auto.get_a_quote).should("be.visible");

  cy.xpath(selectors.common.onetrust1).click({ force: true });

  // Auto Coverage
  if (isMobile) {      
    cy.xpath(selectors.auto.coverage_heading_lg).scrollIntoView({ offset: { top: -200, left: 0 } });    
    cy.xpath(selectors.auto.coverage_heading_sm).should("be.visible");
    cy.xpath(selectors.auto.coverage_heading_lg).should("be.visible");
    cy.xpath(selectors.auto.coverage_caption).should("be.visible");
    cy.xpath(selectors.auto.coverage_uninsured_heading).should("be.visible");    
    cy.xpath(selectors.auto.coverage_uninsured_caption).should("be.visible");  
    cy.xpath(selectors.auto.coverage_uninsured_button).click({ force: true }); 
    cy.xpath(selectors.auto.coverage_roadside_heading).should("be.visible");  
    cy.xpath(selectors.auto.coverage_roadside_button).click({ force: true });
    cy.xpath(selectors.auto.coverage_roadside_caption).should("be.visible");
    cy.xpath(selectors.auto.coverage_personalinjury_heading).should("be.visible");
    cy.xpath(selectors.auto.coverage_personalinjury_button).click({ force: true });
    cy.xpath(selectors.auto.coverage_personalinjury_caption).should("be.visible");
    cy.xpath(selectors.auto.coverage_medicalpayments_heading).should("be.visible");
    cy.xpath(selectors.auto.coverage_medicalpayments_button).click({ force: true });
    cy.xpath(selectors.auto.coverage_medicalpayments_caption).should("be.visible");
    cy.xpath(selectors.auto.coverage_liability_heading).should("be.visible");
    cy.xpath(selectors.auto.coverage_liability_button).click({ force: true });
    cy.xpath(selectors.auto.coverage_liability_caption).should("be.visible");
    cy.xpath(selectors.auto.coverage_expertadvice_heading).should("be.visible");
    cy.xpath(selectors.auto.coverage_expertadvice_button).click({ force: true });
    cy.xpath(selectors.auto.coverage_expertadvice_caption).should("be.visible");
  }      
  if (!isMobile) {      
    cy.xpath(selectors.auto.coverage_heading_lg1).scrollIntoView({ offset: { top: -200, left: 0 } });     
    cy.xpath(selectors.auto.coverage_heading_sm).should("be.visible");
    cy.xpath(selectors.auto.coverage_heading_lg1).should("be.visible");
    cy.xpath(selectors.auto.coverage_caption1).should("be.visible");
    cy.xpath(selectors.auto.coverage_uninsured_heading1).should("be.visible");    
    cy.xpath(selectors.auto.coverage_uninsured_caption1).should("be.visible");  
    cy.xpath(selectors.auto.coverage_uninsured_button1).click({ force: true }); 
    cy.xpath(selectors.auto.coverage_roadside_heading1).should("be.visible");  
    cy.xpath(selectors.auto.coverage_roadside_button1).click({ force: true });  
    cy.xpath(selectors.auto.coverage_roadside_caption1).should("be.visible");
    cy.xpath(selectors.auto.coverage_personalinjury_heading1).should("be.visible");
    cy.xpath(selectors.auto.coverage_personalinjury_button1).click({ force: true });
    cy.xpath(selectors.auto.coverage_personalinjury_caption1).should("be.visible");
    cy.xpath(selectors.auto.coverage_medicalpayments_heading1).should("be.visible");
    cy.xpath(selectors.auto.coverage_medicalpayments_button1).click({ force: true });
    cy.xpath(selectors.auto.coverage_medicalpayments_caption1).should("be.visible");
    cy.xpath(selectors.auto.coverage_liability_heading1).should("be.visible");
    cy.xpath(selectors.auto.coverage_liability_button1).click({ force: true });
    cy.xpath(selectors.auto.coverage_liability_caption1).should("be.visible");
    cy.xpath(selectors.auto.coverage_expertadvice_heading1).should("be.visible");
    cy.xpath(selectors.auto.coverage_expertadvice_button1).click({ force: true });
    cy.xpath(selectors.auto.coverage_expertadvice_caption1).should("be.visible");
  } 

  // Compare
  cy.xpath(selectors.common.card_logos).scrollIntoView();
  cy.xpath(selectors.common.compare_heading).should("be.visible");

  // Why Acrisure
  cy.xpath(selectors.common.card_why1).scrollIntoView();
  cy.xpath(selectors.common.pill_options).should("be.visible");
  cy.xpath(selectors.common.pill_easy).should("be.visible");
  cy.xpath(selectors.common.why_acrisure).should("be.visible");
  cy.xpath(selectors.common.why_acrisure1).should("exist");
  cy.xpath(selectors.auto.why_caption_1).should("exist");
  cy.xpath(selectors.common.why_acrisure2).should("exist");
  cy.xpath(selectors.auto.why_caption_2).should("exist");
  cy.xpath(selectors.common.why_acrisure3).should("exist");
  cy.xpath(selectors.auto.why_caption_3).should("exist");  

  // FAQ
  cy.xpath(selectors.common.card_faq).scrollIntoView();
  cy.xpath(selectors.common.faq_header_sm).should("be.visible");
  cy.xpath(selectors.common.faq_header).should("be.visible");
  cy.xpath(selectors.auto.faq_question_1).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_1).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_2).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_3).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_4).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_5).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_5a).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_6).should("be.visible");
  cy.xpath(selectors.auto.faq_bullet_6a).should("be.visible");
  cy.xpath(selectors.auto.faq_question_2).should("be.visible");
  cy.xpath(selectors.auto.faq_question_3).should("be.visible");
  cy.xpath(selectors.auto.faq_question_4).should("be.visible");
  cy.xpath(selectors.auto.faq_question_5).should("be.visible");
  cy.xpath(selectors.auto.faq_question_6).should("be.visible");
  cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
  cy.xpath(selectors.common.faq_load_more_btn).click({ force: true });
  cy.xpath(selectors.auto.faq_question_7).should("be.visible");
  cy.xpath(selectors.auto.faq_question_8).should("be.visible");
  cy.xpath(selectors.auto.faq_question_9).should("be.visible");
  cy.xpath(selectors.auto.faq_question_10).should("be.visible");
  cy.xpath(selectors.auto.faq_question_11).should("be.visible");
  cy.xpath(selectors.auto.faq_question_12).should("be.visible");
  cy.xpath(selectors.auto.faq_question_13).should("be.visible");

  if (isMobile) {
    // More Resources
    cy.xpath(selectors.common.card_insights).scrollIntoView();
    cy.xpath(selectors.common.insights_sm).should("be.visible");
    cy.xpath(selectors.common.more_resources).should("be.visible");
    cy.xpath(selectors.common.insights_caption).should("be.visible");	  
    cy.xpath(selectors.auto.card_carinsurance).should("be.visible");
    cy.xpath(selectors.auto.nextbutton).click({ force: true });
    cy.xpath(selectors.auto.card_agent).should("be.visible");
    cy.xpath(selectors.auto.nextbutton).click({ force: true });
    cy.xpath(selectors.auto.card_broker1).should("be.visible");
    cy.xpath(selectors.auto.nextbutton).click({ force: true });	
    cy.xpath(selectors.auto.card_broker).should("be.visible");
    cy.xpath(selectors.auto.nextbutton).click({ force: true });
    cy.xpath(selectors.auto.card_types).should("be.visible");
  }   

  if (isTablet) {
    // More Resources
    cy.xpath(selectors.common.card_insights).scrollIntoView();
    cy.xpath(selectors.common.insights_sm).should("be.visible");
    cy.xpath(selectors.common.more_resources).should("be.visible");
    cy.xpath(selectors.common.insights_caption).should("be.visible");	  
    cy.xpath(selectors.auto.card_carinsurance).should("be.visible");
    cy.xpath(selectors.auto.card_agent).should("be.visible");
    cy.xpath(selectors.auto.card_broker1).should("be.visible");  
    cy.xpath(selectors.auto.card_broker).should("be.visible");
    cy.xpath(selectors.auto.nextbutton).click({ force: true });
    cy.xpath(selectors.auto.card_types).should("be.visible");
  }   

  if (isLargeDesktop) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.common.insights_caption).should("be.visible");
      cy.xpath(selectors.auto.card_carinsurance).should("be.visible");
      //cy.xpath(selectors.auto.nextbutton).click({ force: true });
      cy.xpath(selectors.auto.card_agent).should("be.visible");
      cy.xpath(selectors.auto.card_broker1).should("be.visible");  
      cy.xpath(selectors.auto.card_broker).should("be.visible");
      cy.xpath(selectors.auto.card_types).should("be.visible");
      //cy.xpath(selectors.auto.card_broker1).scrollIntoView(); 
  } 
  
  if (!isMobile) {
    cy.xpath(selectors.auto.card_types).should("exist");
  }
  cy.xpath(selectors.auto.read_more).should("be.visible");

  // Explore
  cy.xpath(selectors.common.card_explore).scrollIntoView();

  if (isMobile) {
    cy.scrollTo(0, 50);
    cy.xpath(selectors.auto.explore_home_header).scrollIntoView();
  }
  cy.xpath(selectors.auto.explore_home_header).should("be.visible");
  cy.xpath(selectors.auto.explore_home_link).should("be.visible");
  cy.xpath(selectors.auto.explore_home_btn).click({ force: true });
  cy.title().should('eq', 'Homeowners Insurance | Get Your Personalized Quote');
  cy.go('back');
  cy.wait(2000);
  cy.xpath(selectors.auto.explore_home_header).scrollIntoView();
  cy.xpath(selectors.auto.explore_life_header).should("be.visible");
  cy.xpath(selectors.auto.explore_life_link).should("be.visible");
  cy.xpath(selectors.auto.explore_life_btn).click({ force: true });
  cy.title().should('eq', 'Term Life Insurance | Get Your Personalized Quote');
  cy.go('back');
  cy.wait(2000);
});
});

describe("Auto Insurance", () => {
  beforeEach(() => {
    initSession();
  });

  for (const [stateAbbreviation, stateName] of Object.entries(states)) {
    it(`Validate form: ${stateName}`, () => {
      assertAutoForm({ stateAbbreviation, stateName });
    });
  }
});

function initSession() {
  cy.session("login", () => {
    cy.visitSite("app");
    cy.visitSite("app", "auto-insurance", {
      skipOnetrust: true,
      skipLogin: true,
    });
  });
}

function assertAutoForm({ stateAbbreviation, stateName }) {
  cy.visitSite("app", "auto-insurance", {    
    skipOnetrust: true,
    skipLogin: true,
  });

  // Get page to load
  cy.xpath(selectors.auto.state_combobox).scrollIntoView();
  cy.wait(3000);

  // Fill the form  
  cy.xpath(selectors.auto.state_combobox).type(`${stateName}`, { force: true });
  cy.wait(3000);  
  cy.xpath(selectors.auto.state_option.replace("%s", stateName)).click({ force: true });
  cy.xpath(selectors.auto.get_a_quote).scrollIntoView().click({ force: true });

  //  Assert the URLs?
  const altwayUrl = envUtil.getAltwayUrl();
  
  cy.origin(
    altwayUrl,
    { args: { stateAbbreviation, altwayUrl } },
    ({ stateAbbreviation, altwayUrl }) => {
      // Ignore errors on altway
      Cypress.on("uncaught:exception", (err) => {
        return false;
      });

      // Assert the URL
      cy.url().should("include", altwayUrl);
      cy.url().should("include", `state=${stateAbbreviation}`);
    }
  );
}
