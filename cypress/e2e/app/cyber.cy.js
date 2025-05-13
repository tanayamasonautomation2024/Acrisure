const selectors = require("../../fixtures/app/selectors.json");
const cyber = selectors.cyber;

describe("Cyber Insurance", () => {
  it(`Validate cyber insurance page`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;
    cy.visitSite("app", "cyber-insurance");

    // Splash
    cy.xpath(cyber.heading_sm).should("be.visible");
    cy.xpath(cyber.heading_lg).should("be.visible");
    cy.get(cyber.caption).should("be.visible");
    cy.xpath(cyber.pill_connectingto).should("be.visible");
    cy.xpath(cyber.pill_cybercoverage).should("be.visible");

    // Get Quote
    cy.xpath(cyber.quotes_component).scrollIntoView({ offset: { top: -1000, left: 0 } }); 
    cy.xpath(cyber.quotes_in_minutes).should("be.visible");    
    cy.get(cyber.quotes_text_large).should("be.visible");
    
    // What is cyber insurance
    cy.xpath(cyber.what_is_cyber_heading_sm).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(cyber.what_is_cyber_heading_sm).should("be.visible");
    cy.xpath(cyber.what_is_cyber_heading_lg).should("be.visible");
    cy.get(cyber.what_is_cyber).should("be.visible");    
    cy.xpath(cyber.learn_more).should("be.visible");
    cy.xpath(cyber.pill_connected).should("be.visible");
    cy.xpath(cyber.pill_covered).should("be.visible");     

    cy.xpath(selectors.common.onetrust1).click({ force: true });

    // FAQ
    cy.xpath(cyber.faq_header).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(cyber.faq_header).should("be.visible");
    cy.xpath(cyber.faq_question_1).scrollIntoView().should("be.visible");
    cy.xpath(cyber.faq_question_2).scrollIntoView().should("be.visible");
    cy.xpath(cyber.faq_question_3).scrollIntoView().should("be.visible");
    cy.xpath(cyber.faq_question_4).scrollIntoView().should("be.visible");
    cy.xpath(cyber.faq_question_5).scrollIntoView().should("be.visible");
    cy.xpath(cyber.faq_question_6).scrollIntoView().should("be.visible");

    // Expand all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(cyber.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
    }
    cy.xpath(cyber.faq_question_body).its("length").should("eq", 6);

    // Collapse all FAQ sections
    for (let i = 1; i < 6; i++) {
      cy.xpath(cyber.faq_accordion_icon)
        .eq(i)
        .scrollIntoView()
        .click({ force: true });
      cy.wait(1000);
      cy.xpath(cyber.faq_question_body).eq(i).should("not.be.visible");
    }
    
    cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -100, left: 0 } });

    if (isMobile) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -100, left: 0 } });  
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(cyber.more_resources).should("exist");
      cy.xpath(cyber.insights_caption).should("exist");
      cy.xpath(cyber.read_more).scrollIntoView({ offset: { top: -400, left: 0 } });	
      cy.xpath(cyber.card_reducecyber).should("exist");
      cy.xpath(cyber.nextbutton).click({ force: true });
      cy.xpath(cyber.cyberattack).should("exist");
      cy.xpath(cyber.nextbutton).click({ force: true });
      cy.xpath(cyber.cybertips).should("exist");
      cy.xpath(cyber.nextbutton).click({ force: true });
      cy.xpath(cyber.cyberchecklist).should("exist");
      cy.xpath(cyber.nextbutton).click({ force: true });  
      cy.xpath(cyber.waystoprevent).should("exist");
      cy.xpath(cyber.read_more).should("exist");

      
    }   
  
    if (isTablet) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -50, left: 0 } });       
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(cyber.more_resources).should("exist");
      cy.xpath(cyber.insights_caption).should("exist");
      cy.xpath(cyber.read_more).scrollIntoView({ offset: { top: -400, left: 0 } });	
      cy.xpath(cyber.card_reducecyber).should("exist");
      cy.xpath(cyber.cyberattack).should("exist");
      cy.xpath(cyber.cybertips).should("exist");
      //cy.xpath(cyber.nextbutton).click({ force: true });        
      cy.xpath(cyber.cyberchecklist).should("exist");	
      cy.xpath(cyber.nextbutton).click({ force: true });  
      cy.xpath(cyber.waystoprevent).should("exist");
      cy.xpath(cyber.read_more).should("exist");
    } 

    if (isLargeDesktop) {
        // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView({ offset: { top: -80, left: 0 } });
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(cyber.more_resources).should("exist");
      cy.xpath(cyber.insights_caption).should("exist");
      cy.xpath(cyber.read_more).scrollIntoView({ offset: { top: -400, left: 0 } });	  
      cy.xpath(cyber.card_reducecyber).should("exist");
      cy.xpath(cyber.cyberattack).should("exist");
      cy.xpath(cyber.cybertips).should("exist");
      cy.xpath(cyber.cyberchecklist).should("exist");
      cy.xpath(cyber.waystoprevent).should("exist");
      cy.xpath(cyber.read_more).should("exist");
    } 

    // Explore
    cy.xpath(selectors.common.card_explore).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(cyber.explore_workers_header).should("be.visible");
    cy.xpath(cyber.explore_workers_link).should("be.visible");
    cy.xpath(cyber.explore_bop_header).should("be.visible");
    cy.xpath(cyber.explore_bop_link).should("be.visible");
  });
});
