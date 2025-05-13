const selectors = require("../../fixtures/app/selectors.json");
const aboutAcrisure = selectors.about_acrisure;

describe("About Acrisure", () => {
  it(`Validate about Acrisure page`, () => {

  const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
  const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
  const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "about-acrisure");

    // Meet Acrisure
    cy.xpath(aboutAcrisure.big_title)
      .invoke("text")
      .then(($text) => $text.replace(/\u00a0/g, " ")) // Remove non breaking space
      .should("eq", "Your partner in ambition.");
    cy.xpath(aboutAcrisure.meet_acrisure).scrollIntoView().should("be.visible");
    cy.xpath(aboutAcrisure.meet_acrisure_desc).should("be.visible");

    //Transforming Human
    cy.xpath(aboutAcrisure.Transforming_caption).scrollIntoView();
    cy.xpath(aboutAcrisure.pill_BetterExperience).should("be.visible");
    cy.xpath(aboutAcrisure.pill_FasterDecisions).should("be.visible");
    cy.xpath(aboutAcrisure.pill_PersonalizedSolutions).should("be.visible");
    cy.xpath(aboutAcrisure.Transforming_caption).should("be.visible");
    cy.xpath(aboutAcrisure.Transforming_desc_1).should("be.visible");
    cy.xpath(aboutAcrisure.Transforming_desc_2).should("be.visible");
    cy.xpath(aboutAcrisure.Transforming_desc_3).should("be.visible");

    cy.xpath(selectors.common.onetrust1).click({ force: true });
    
    // Cards
    cy.xpath(aboutAcrisure.leadership_card).scrollIntoView({ offset: { top: -500, left: 0 } });
    cy.wait(10000);
    cy.xpath(aboutAcrisure.leadership_card).should("be.visible");       
    cy.xpath(aboutAcrisure.leadership)
      .siblings("span.card-btn")
      .invoke("text")
      .then(($text) => $text.toLowerCase())
      .should("eq", "meet the team");
     
     cy.xpath(aboutAcrisure.leadership_btn).click({ force: true }); 
     cy.title().should('eq', "Acrisure's Leadership Team");
     cy.go('back');
     cy.wait(3000); 

     cy.xpath(aboutAcrisure.leadership_card).scrollIntoView();
     cy.wait(2000);
     cy.xpath(aboutAcrisure.join_team_card).should("be.visible");

    cy.xpath(aboutAcrisure.join_team)
      .siblings("span.card-btn")
      .invoke("text")
      .then(($text) => $text.toLowerCase())
      .should("eq", "explore careers");

    // cy.xpath(aboutAcrisure.join_team_btn).click({ force: true }); 
    // cy.title().should('eq', "Acrisure's Leadership Team");
    // cy.go('back');
    // cy.wait(2000); 

    //cy.xpath(aboutAcrisure.backing_caption).scrollIntoView();
    //cy.xpath(aboutAcrisure.backing_caption).should("be.visible");    

    // Business Solutions    
    cy.xpath(aboutAcrisure.businesssolution_caption).scrollIntoView({ offset: { top: -180, left: 0 } });     
    cy.xpath(aboutAcrisure.oursolution_busiheader).should("exist");
    cy.xpath(aboutAcrisure.businesssolution_caption).should("exist");
    cy.xpath(aboutAcrisure.businesssolution_desc).should("exist");          
    cy.xpath(aboutAcrisure.businesssolution_payroll_desc).should("exist");
    cy.xpath(aboutAcrisure.businesssolution_payroll_desc).scrollIntoView();         
    cy.xpath(aboutAcrisure.pill_businessinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_employeebenefits).should("exist");    
    cy.xpath(aboutAcrisure.pill_payrollservices).should("exist");
    cy.xpath(aboutAcrisure.pill_payrollservices).scrollIntoView();
    cy.xpath(aboutAcrisure.pill_managedIT).should("exist");
    cy.xpath(aboutAcrisure.pill_realestateservices).should("exist");
    cy.xpath(aboutAcrisure.pill_cybersecurity).should("exist");
    cy.xpath(aboutAcrisure.pill_riskmanagementservices).should("exist");
    cy.xpath(aboutAcrisure.pill_reinsurance).should("exist");    
    cy.xpath(aboutAcrisure.businesssolution_explore_btn).should("exist");    
    cy.xpath(aboutAcrisure.businesssolution_explore_btn).click({ force: true });
    cy.title().should('eq', 'Business Solutions');
    cy.go('back');
    cy.wait(2000);

    // Personal Solutions
    //cy.xpath(aboutAcrisure.personalsolution_desc).scrollIntoView();    
    cy.xpath(aboutAcrisure.personalsolution_caption).scrollIntoView({ offset: { top: 500, left: 0 } });
    cy.xpath(aboutAcrisure.oursolution_perheader).should("exist");
    cy.xpath(aboutAcrisure.personalsolution_caption).should("exist");
    cy.xpath(aboutAcrisure.personalsolution_desc).should("exist");      
    cy.xpath(aboutAcrisure.personalsolution_payroll_desc).should("exist");
    cy.xpath(aboutAcrisure.pill_homeinsurance).scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.xpath(aboutAcrisure.pill_homeinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_autoinsurance).should("exist");    
    cy.xpath(aboutAcrisure.pill_floodinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_lifeinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_healthinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_titleinsurance).should("exist");
    cy.xpath(aboutAcrisure.pill_mortgageorigination).should("exist");    
    cy.xpath(aboutAcrisure.personalsolution_explore_btn).should("exist");
    cy.xpath(aboutAcrisure.personalsolution_explore_btn).click({ force: true });
    cy.title().should('eq', 'Personal Insurance Solutions | Get Your Personalized Quote');
    cy.go('back');
    cy.wait(2000);
    
    // Why Acrisure
    cy.xpath(aboutAcrisure.why_acrisure).scrollIntoView().should("be.visible");    
    cy.xpath(aboutAcrisure.why_acrisure_caption).should("be.visible");

    // Why Acrisure - stats

    assertStat({
      n: "01",
      stat: "$4.8B+",
      caption: "in revenue",
    });

    assertStat({
      n: "02",
      stat: "21",
      caption: "countries",
    });

    assertStat({
      n: "03",
      stat: "17K",
      caption: "team members and counting",
    });

    assertStat({
      n: "04",
      stat: "5%",
      caption: "of all US businesses served",
    });

    // Our Impact
    cy.xpath(aboutAcrisure.impact_sm).scrollIntoView().should("be.visible");
    cy.xpath(aboutAcrisure.impact_heading).should("be.visible");
    cy.xpath(aboutAcrisure.impact_p1).should("be.visible");
    cy.xpath(aboutAcrisure.child_health).should("be.visible");
    cy.xpath(aboutAcrisure.child_health_p1).should("be.visible");
    cy.xpath(aboutAcrisure.sustainability).should("be.visible");
    cy.xpath(aboutAcrisure.sustainability_p1).should("be.visible");
    cy.xpath(aboutAcrisure.community_impact).should("be.visible");
    cy.get(aboutAcrisure.community_impact_p1).should("be.visible");
    cy.get(aboutAcrisure.community_impact_p2).should("be.visible");

    // Newsroom
    if (isMobile) {      
      cy.xpath(aboutAcrisure.news_heading).scrollIntoView().should("be.visible");
      cy.xpath(aboutAcrisure.newsroom_caption).should("be.visible");
      cy.xpath(aboutAcrisure.news_up_to_date).should("be.visible");	
      cy.xpath(aboutAcrisure.card_benchmarking).should("be.visible");
      cy.xpath(aboutAcrisure.nextbutton).click({ force: true });
      cy.xpath(aboutAcrisure.card_honored).should("be.visible");
      cy.xpath(aboutAcrisure.nextbutton).click({ force: true });
      cy.xpath(aboutAcrisure.card_partner).should("be.visible");
      cy.xpath(aboutAcrisure.nextbutton).click({ force: true });	
      cy.xpath(aboutAcrisure.card_rollsout).should("be.visible");
      cy.xpath(aboutAcrisure.nextbutton).click({ force: true });
      cy.xpath(aboutAcrisure.card_chiefdigital).should("be.visible");
    }   
  
    if (isTablet) {      
      cy.xpath(aboutAcrisure.news_heading).scrollIntoView().should("be.visible");
      cy.xpath(aboutAcrisure.newsroom_caption).should("be.visible");
      cy.xpath(aboutAcrisure.news_up_to_date).should("be.visible");	
      cy.xpath(aboutAcrisure.card_benchmarking).should("be.visible");
      cy.xpath(aboutAcrisure.card_honored).should("be.visible");
      cy.xpath(aboutAcrisure.card_partner).should("be.visible");  
      cy.xpath(aboutAcrisure.card_rollsout).should("be.visible");      
      cy.xpath(aboutAcrisure.nextbutton).click({ force: true });      
      cy.xpath(aboutAcrisure.card_chiefdigital).should("be.visible");
    }   
  
    //if (!isMobile) {        
    if (isLargeDesktop) {
      cy.xpath(aboutAcrisure.news_heading).scrollIntoView().should("be.visible");
      cy.xpath(aboutAcrisure.newsroom_caption).should("be.visible");
      cy.xpath(aboutAcrisure.news_up_to_date).should("be.visible");
      cy.xpath(aboutAcrisure.card_benchmarking).should("be.visible");      
      cy.xpath(aboutAcrisure.card_honored).should("be.visible");      
      cy.xpath(aboutAcrisure.card_partner).should("be.visible");      
      cy.xpath(aboutAcrisure.card_rollsout).should("be.visible");      
      cy.xpath(aboutAcrisure.card_chiefdigital).should("be.visible");      
    } 

    cy.xpath(aboutAcrisure.read_more_btn).scrollIntoView().should("be.visible");
    cy.xpath(aboutAcrisure.read_more_btn)
      .should("be.visible")
      .should("have.attr", "href", "/News");
  });
});

function assertStat({ n, stat, caption }) {
  cy.xpath(aboutAcrisure.stats_count_n.replace("%n", n))
    .scrollIntoView()
    .siblings("span.data-count")
    .should("contain.text", stat);

  cy.xpath(aboutAcrisure.stats_desc_n.replace("%n", n)).should(
    "have.text",
    caption
  );
}
