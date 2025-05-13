const selectors = require("../../fixtures/app/selectors.json");
const form_data = require("../../fixtures/app/form_data.json");

describe("Mortgage origination", () => {
  it(`Validate mortgage origination page components`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "mortgages");

    // Main section
    cy.xpath(selectors.mortgages.heading_sm).should("be.visible");
    cy.xpath(selectors.mortgages.heading_lg).should("be.visible");
    cy.xpath(selectors.mortgages.caption1).should("be.visible");
    cy.xpath(selectors.mortgages.caption2).should("be.visible");
    cy.xpath(selectors.mortgages.pill_personalized).should("be.visible");
    cy.xpath(selectors.mortgages.pill_mortgages).should("be.visible");

    // Learn More
    cy.xpath(selectors.mortgages.card_form).scrollIntoView();
    cy.xpath(selectors.mortgages.learn_more).should("be.visible");
    cy.xpath(selectors.mortgages.learn_caption).should("be.visible");
    cy.xpath(selectors.mortgages.first_name).should("be.visible");
    cy.xpath(selectors.mortgages.last_name).should("be.visible");
    cy.xpath(selectors.mortgages.email).should("be.visible");
    cy.xpath(selectors.mortgages.phone).should("be.visible");
    cy.xpath(selectors.mortgages.state).should("be.visible");
    cy.xpath(selectors.mortgages.purpose).should("be.visible");
    cy.xpath(selectors.mortgages.submit).should("be.visible");

    // Mortgage Solutions
    //cy.xpath(selectors.common.card_coverage).scrollIntoView();
    //cy.xpath(selectors.common.card_why1).scrollIntoView();
    if (!isMobile) {
      cy.xpath(selectors.mortgages.solutions_heading_sm1).scrollIntoView();
      cy.xpath(selectors.mortgages.solutions_heading_sm1).should("be.visible");
      cy.xpath(selectors.mortgages.solutions_heading_lg1).should("be.visible");
      cy.xpath(selectors.mortgages.mortgage_orig1).should("be.visible");
      cy.xpath(selectors.mortgages.purchase_heading).should("be.visible");    
      cy.xpath(selectors.mortgages.purchase_caption).should("be.visible");
      cy.xpath(selectors.mortgages.coverage_contents_button1).click();
      cy.xpath(selectors.mortgages.refinance_heading).should("be.visible");    
      cy.xpath(selectors.mortgages.refinance_caption1).should("be.visible");
      cy.xpath(selectors.mortgages.coverage_contents_button2).click();
      cy.xpath(selectors.mortgages.renovate_heading).should("be.visible");
      cy.xpath(selectors.mortgages.renovate_caption1).should("be.visible");
    }

    if (isMobile) {
      cy.xpath(selectors.mortgages.solutions_heading_sm).scrollIntoView();
      cy.xpath(selectors.mortgages.solutions_heading_sm).should("be.visible");
      cy.xpath(selectors.mortgages.solutions_heading_lg).should("be.visible");
      cy.xpath(selectors.mortgages.mortgage_orig).should("be.visible");
      cy.xpath(selectors.mortgages.purchase_heading).should("be.visible");    
      cy.xpath(selectors.mortgages.purchase_caption).should("be.visible");
      cy.xpath(selectors.mortgages.coverage_contents_button_mob1).click();
      cy.xpath(selectors.mortgages.refinance_heading).should("be.visible");    
      cy.xpath(selectors.mortgages.refinance_caption).should("be.visible");
      cy.xpath(selectors.mortgages.coverage_contents_button_mob2).click();
      cy.xpath(selectors.mortgages.renovate_heading).should("be.visible");
      cy.xpath(selectors.mortgages.renovate_caption).should("be.visible");
    }

    // Why Acrisure
      cy.xpath(selectors.common.card_why1).scrollIntoView();
      cy.xpath(selectors.mortgages.pill_gotthis).should("be.visible");
      cy.xpath(selectors.mortgages.pill_gotyou).should("be.visible");
      cy.xpath(selectors.common.why_acrisure).should("be.visible");
      cy.xpath(selectors.mortgages.why_header1).should("be.visible");
      cy.xpath(selectors.mortgages.why_description1).should("be.visible");
      cy.xpath(selectors.mortgages.why_header2).should("be.visible");
      cy.xpath(selectors.mortgages.why_description2).should("be.visible");
      cy.xpath(selectors.mortgages.why_header3).should("be.visible");
      cy.xpath(selectors.mortgages.why_description3).should("be.visible");

    // FAQ
      cy.xpath(selectors.common.card_faq).scrollIntoView();
      cy.xpath(selectors.common.faq_header_sm).should("be.visible");
      cy.xpath(selectors.common.faq_header).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_1).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_1).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_2).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_3).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_4).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_5).should("be.visible");
      cy.xpath(selectors.mortgages.faq_bullet_6).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_2).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_3).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_4).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_5).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_6).should("be.visible");
      cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");
      cy.xpath(selectors.common.faq_load_more_btn).click({ force: true });
      cy.xpath(selectors.mortgages.faq_question_7).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_8).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_9).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_10).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_11).should("be.visible");
      cy.xpath(selectors.mortgages.faq_question_12).should("be.visible");

    // Insights
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.mortgages.insights_caption).should("be.visible");
      cy.xpath(selectors.common.read_more).should("be.visible");

    if (isMobile) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.mortgages.insights_caption).should("be.visible");
      cy.xpath(selectors.mortgages.insight_card_agent).should("be.visible");
      cy.xpath(selectors.mortgages.nextbutton).click({ force: true });
      cy.xpath(selectors.mortgages.insight_card_broker).should("be.visible");
      cy.xpath(selectors.mortgages.nextbutton).click({ force: true });
      cy.xpath(selectors.mortgages.insight_card_broker1).should("be.visible");
      cy.xpath(selectors.mortgages.nextbutton).click({ force: true });
      cy.xpath(selectors.mortgages.insight_card_types).should("be.visible");    
      cy.xpath(selectors.mortgages.nextbutton).click({ force: true });
      cy.xpath(selectors.mortgages.insight_card_benefits).should("be.visible");
    }  

    if (isTablet) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.mortgages.insights_caption).should("be.visible");
      cy.xpath(selectors.mortgages.insight_card_agent).should("be.visible");      
      cy.xpath(selectors.mortgages.insight_card_broker).should("be.visible");      
      cy.xpath(selectors.mortgages.insight_card_broker1).should("be.visible");
      cy.xpath(selectors.mortgages.insight_card_types).should("be.visible");    
      cy.xpath(selectors.mortgages.nextbutton).click({ force: true });
      cy.xpath(selectors.mortgages.insight_card_benefits).should("be.visible");
    }  

    if (isLargeDesktop) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.wait(5000);
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.mortgages.insights_caption).should("be.visible");
      cy.xpath(selectors.mortgages.insight_card_agent).should("be.visible");      
      cy.xpath(selectors.mortgages.insight_card_broker).should("be.visible");      
      cy.xpath(selectors.mortgages.insight_card_broker1).should("be.visible");
      cy.xpath(selectors.mortgages.insight_card_types).should("be.visible");    
      cy.xpath(selectors.mortgages.insight_card_benefits).should("be.visible");
    }

    // Explore
    cy.xpath(selectors.common.card_explore).scrollIntoView();
    cy.xpath(selectors.mortgages.explore_home_header).should("be.visible");
    cy.xpath(selectors.mortgages.explore_home_link).should("be.visible");
    cy.xpath(selectors.mortgages.explore_life_header).should("be.visible");
    cy.xpath(selectors.mortgages.explore_life_link).should("be.visible");
  });

  it(`Validate mortgage origination form submission`, () => {
    cy.visitSite("app", "mortgages");

    // Complete & validate form
    cy.xpath(selectors.mortgages.card_form).scrollIntoView();
    cy.xpath(selectors.mortgages.first_name).type(form_data.home_insurance.first_name, { force: true });
    cy.xpath(selectors.mortgages.last_name).type(form_data.home_insurance.last_name, { force: true });
    cy.xpath(selectors.mortgages.email).type(form_data.home_insurance.email, {force: true });
    cy.xpath(selectors.mortgages.phone).type(form_data.home_insurance.phone, {force: true });
    cy.xpath(selectors.mortgages.state).type(form_data.home_insurance.state, {force: true });
    cy.xpath(selectors.home_insurance.select_first_option).click({force: true });
    cy.xpath(selectors.mortgages.purpose).type(form_data.home_insurance.purpose, {force: true });
    cy.xpath(selectors.home_insurance.select_first_option).click({force: true });
  });
});
