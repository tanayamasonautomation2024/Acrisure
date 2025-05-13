const selectors = require("../../fixtures/app/selectors.json");

describe("Terms of Use", () => {
  it(`Terms of use page components`, () => {
    cy.visitSite("app", "terms-of-use");

    // Main Header
    cy.xpath(selectors.terms_of_use.main_header).should("be.visible");
    cy.xpath(selectors.terms_of_use.main_description).should("be.visible");

    // Terms Sections
    cy.xpath(selectors.terms_of_use.term_content).scrollIntoView();
    cy.xpath(selectors.terms_of_use.term_description1).should("be.visible");
    cy.xpath(selectors.terms_of_use.term_description2).should("be.visible");

    for (let i = 1; i <= 12; i++) {
      cy.xpath(selectors.terms_of_use[`section${i}`])
        .scrollIntoView()
        .should("be.visible");

    // Check the privacy policy link in the 1st section
    //cy.xpath(selectors.common.onetrust1).click({ force: true });
      if (i === 1) {
        cy.xpath(selectors.terms_of_use.section1_desc).should("be.visible");
        //  Check the mail to link in the 2nd section
      } else if (i === 2) {
        cy.xpath(selectors.terms_of_use.section2_1_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section2_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.term_content).scrollIntoView({ offset: { top: 1000, left: 0 } });
        cy.xpath(selectors.terms_of_use.section2_3_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_5_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_5_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.term_content).scrollIntoView({ offset: { top: 1600, left: 0 } });        
        cy.xpath(selectors.terms_of_use.section2_3_5_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_5_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_3_6_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section2_5_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.term_content).scrollIntoView({ offset: { top: 2100, left: 0 } });        
        cy.xpath(selectors.terms_of_use.section2_6_desc).should("be.visible");       
        
        //  Check the mail to link in the 3rd section
      } else if (i === 3) {
        cy.xpath(selectors.terms_of_use.section3_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section3_desc).should("be.visible");

        //  Check the mail to link in the 4th section
      } else if (i === 4) {
        cy.xpath(selectors.terms_of_use.section4_1_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section4_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.term_content).scrollIntoView({ offset: { top: 2600, left: 0 } });
        cy.xpath(selectors.terms_of_use.section4_1_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_5_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_6_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_7_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_8_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_1_9_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section4_2_desc).should("be.visible");

        //  Check the mail to link in the 5th section
      } else if (i === 5) {
        cy.xpath(selectors.terms_of_use.section5_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.privacy_policy).should("be.visible");
        cy.xpath(selectors.terms_of_use.section5_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section5a_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section5b_desc).should("be.visible");

        //  Check the mail to link in the 6th section
      } else if (i === 6) {
        cy.xpath(selectors.terms_of_use.section6_1_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section6_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section6_2_desc).should("be.visible");        

        //  Check the mail to link in the 7th section
      } else if (i === 7) {
        cy.xpath(selectors.terms_of_use.section7_1_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.law_mail_to1).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_5_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_2_6_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section7_4_desc).should("be.visible");

        //  Check the mail to link in the 8th section
      } else if (i === 8) {
        //cy.xpath(selectors.terms_of_use.section7_4_desc).scrollIntoView();
        //cy.xpath(selectors.terms_of_use.section8_desc).should("exist");
        //cy.xpath(selectors.terms_of_use.section8a_desc).should("be.visible");
        //cy.xpath(selectors.terms_of_use.section8b_desc).should("be.visible");        

        //  Check the mail to link in the 9th section
      } else if (i === 9) {
        cy.xpath(selectors.terms_of_use.section9_1_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section9_2_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section9_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section9_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section9_5_desc).should("be.visible");  
        cy.xpath(selectors.terms_of_use.section9_5_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section9_5_2_desc).should("be.visible");          

        //  Check the mail to link in the 10th section
      } else if (i === 10) {
        cy.xpath(selectors.terms_of_use.section10_1_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section10_2_desc).should("be.visible");        
        //cy.xpath(selectors.terms_of_use.section10_3_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section10_4_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section10_5_desc).should("be.visible");  
        cy.xpath(selectors.terms_of_use.section10_6_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section10_7_desc).should("be.visible");          

        //  Check the mail to link in the 11th section
      } else if (i === 11) {
        cy.xpath(selectors.terms_of_use.disclosure).scrollIntoView();
        cy.xpath(selectors.terms_of_use.disclosure).should("be.visible");
        cy.xpath(selectors.terms_of_use.section11_desc).should("be.visible");
        cy.xpath(selectors.terms_of_use.section11a_desc).should("be.visible");

        //  Check the mail to link in the 12th section
      } else if (i === 12) {
        cy.xpath(selectors.terms_of_use.section12_desc).scrollIntoView();
        cy.xpath(selectors.terms_of_use.section12_desc).should("be.visible");
      }
    }

    cy.xpath(selectors.terms_of_use.law_mail_to2).should("be.visible");
  });
});
