const selectors = require("../../fixtures/app/selectors.json");
const form_data = require("../../fixtures/app/form_data.json");
const envUtil = require("../../support/util/EnvUtil");

describe("Home Insurance (Personal)", () => {
  it(`Validate home insurance landing page`, () => {
    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

    cy.visitSite("app", "home");

    // Main section
    cy.xpath(selectors.home_insurance.heading_sm).should("be.visible");
    cy.xpath(selectors.home_insurance.heading_lg).should("be.visible");
    cy.xpath(selectors.home_insurance.caption).should("be.visible");
    cy.xpath(selectors.home_insurance.pill_personalized).should("be.visible");
    cy.xpath(selectors.home_insurance.pill_coverage).should("be.visible");

    // Quick Quotes
    cy.xpath(selectors.common.card_quick_quote).scrollIntoView();
    cy.xpath(selectors.home_insurance.quick_quote_sm).should("be.visible");
    cy.xpath(selectors.home_insurance.quick_quote_lg).should("be.visible");
    cy.xpath(selectors.home_insurance.address_label).should("be.visible");
    cy.xpath(selectors.home_insurance.address_input).should("be.visible");
    cy.wait(3000);
    cy.xpath(selectors.home_insurance.get_a_quote).should("be.visible");

    // Coverage
    //cy.xpath(selectors.home_insurance.card_coverage).scrollIntoView();
    if (isMobile) {
      cy.xpath(selectors.home_insurance.coverage_heading_lg).scrollIntoView();
      cy.xpath(selectors.home_insurance.coverage_heading_lg).should("be.visible");
      cy.xpath(selectors.home_insurance.coverage_caption).should("be.visible");
    }

    if (!isMobile) {
      cy.xpath(selectors.home_insurance.coverage_heading_lg1).scrollIntoView();
      cy.xpath(selectors.home_insurance.coverage_heading_lg1).should("be.visible");
      cy.xpath(selectors.home_insurance.coverage_caption1).should("be.visible");
    }

    cy.xpath(selectors.home_insurance.coverage_heading_sm).should("be.visible");    
    cy.xpath(selectors.home_insurance.coverage_dwelling_heading).should("be.visible");
    cy.xpath(selectors.home_insurance.coverage_dwelling_caption).should("be.visible");
    cy.xpath(selectors.home_insurance.coverage_property_heading).should("be.visible");
    cy.xpath(selectors.home_insurance.coverage_other_heading).should("be.visible");
    cy.xpath(selectors.home_insurance.coverage_loss_heading).should("be.visible");
    cy.xpath(selectors.home_insurance.coverage_liability_heading).should("be.visible");

    // Compare
    cy.xpath(selectors.common.card_logos).scrollIntoView();
    cy.xpath(selectors.common.compare_heading).should("be.visible");

    // Why Acrisure
    cy.xpath(selectors.common.card_why1).scrollIntoView();
    cy.xpath(selectors.common.pill_options).should("be.visible");
    cy.xpath(selectors.common.pill_easy).should("be.visible");
    cy.xpath(selectors.common.why_acrisure).should("be.visible");
    cy.xpath(selectors.common.why_acrisure1).should("be.visible");
    cy.xpath(selectors.home_insurance.why_caption1).should("be.visible");
    cy.xpath(selectors.common.why_acrisure2).should("be.visible");
    cy.xpath(selectors.home_insurance.why_caption2).should("be.visible");
    cy.xpath(selectors.common.why_acrisure3).should("be.visible");
    cy.xpath(selectors.home_insurance.why_caption3).should("be.visible");

    // FAQ
    cy.xpath(selectors.common.card_faq).scrollIntoView();
    cy.xpath(selectors.common.faq_header_sm).should("be.visible");
    cy.xpath(selectors.common.faq_header).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_question_1).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_bullet_1).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_bullet_2).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_bullet_3).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_question_4).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_question_5).should("be.visible");
    cy.xpath(selectors.home_insurance.faq_question_6).should("be.visible");
    cy.xpath(selectors.common.faq_load_more_btn).should("be.visible");

    if (isMobile) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.home_insurance.insights_caption).should("be.visible");	  
      cy.xpath(selectors.home_insurance.card_agent).should("be.visible");
      cy.xpath(selectors.home_insurance.nextbutton).click({ force: true });
      cy.xpath(selectors.home_insurance.card_broker).should("be.visible");    
      cy.xpath(selectors.home_insurance.nextbutton).click({ force: true });
      cy.xpath(selectors.home_insurance.card_broker2).should("be.visible");
      cy.xpath(selectors.home_insurance.nextbutton).click({ force: true });
      cy.xpath(selectors.home_insurance.card_types).should("be.visible");    
      cy.xpath(selectors.home_insurance.nextbutton).click({ force: true });  
      cy.xpath(selectors.home_insurance.card_benefits).should("be.visible");
    }   
  
    if (isTablet) {
      // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.home_insurance.insights_caption).should("be.visible");	  
	    cy.xpath(selectors.home_insurance.card_agent).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_broker).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_broker2).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_types).should("be.visible");
	    cy.xpath(selectors.home_insurance.nextbutton).click({ force: true }); 
      cy.xpath(selectors.home_insurance.card_benefits).should("be.visible");
    } 

    if (isLargeDesktop) {
        // More Resources
      cy.xpath(selectors.common.card_insights).scrollIntoView();
      cy.xpath(selectors.common.insights_sm).should("be.visible");
      cy.xpath(selectors.common.more_resources).should("be.visible");
      cy.xpath(selectors.home_insurance.insights_caption).should("be.visible");	  
	    cy.xpath(selectors.home_insurance.card_agent).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_broker).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_broker2).should("be.visible");    
      cy.xpath(selectors.home_insurance.card_types).should("be.visible");     
      cy.xpath(selectors.home_insurance.card_benefits).should("be.visible");
    } 

    if (!isMobile) {
      cy.xpath(selectors.home_insurance.card_types).should("be.visible");
    }

    cy.xpath(selectors.home_insurance.read_more).should("be.visible");

    // Explore
    cy.xpath(selectors.common.card_explore).scrollIntoView();

    if (isMobile) {
      cy.scrollTo(0, 50);
      cy.xpath(selectors.home_insurance.explore_flood_header).scrollIntoView();
    }

    cy.xpath(selectors.home_insurance.explore_flood_header).should(
      "be.visible"
    );
    cy.xpath(selectors.home_insurance.explore_flood_link).should("be.visible");
    cy.xpath(selectors.home_insurance.explore_auto_header).should("be.visible");
    cy.xpath(selectors.home_insurance.explore_auto_link).should("be.visible");
  });

  it(`Validate home insurance quote workflow`, () => {
    cy.visitSite("app", "home");

    cy.xpath(selectors.home_insurance.address).type(
      form_data.home_insurance.street,
      {
        force: true,
      }
    );
    cy.wait(3000);
    cy.xpath(selectors.home_insurance.get_a_quote).click({ force: true  });

      //  Assert the URLs?
  const altwayUrl = envUtil.getAltwayUrl();  

  cy.origin(altwayUrl, { args: { altwayUrl } }, ({ altwayUrl }) => {
    cy.url().should("include", `${altwayUrl}/home`);

  });

    // 1. Getting Started
    // cy.xpath(selectors.home_insurance.city).type(
    //   form_data.home_insurance.city,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.state).click({ force: true });
    // cy.xpath(selectors.home_insurance.state).type(
    //   form_data.home_insurance.state,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.select_first_option).click();
    // cy.xpath(selectors.home_insurance.zip_code).type(
    //   form_data.home_insurance.zip,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.county).type(
    //   form_data.home_insurance.county,
    //   { force: true }
    // );
    // cy.wait(5000);
    // cy.xpath(selectors.home_insurance.onetrust1).click({ force: true });

    // cy.xpath(selectors.home_insurance.first_name).type(
    //   form_data.home_insurance.first_name,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.last_name).type(
    //   form_data.home_insurance.last_name,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.date_of_birth).type(
    //   form_data.home_insurance.date_of_birth,
    //   { force: true }
    // );
	  // cy.xpath(selectors.home_insurance.marital_status).click({ force: true });
	  // cy.xpath(selectors.home_insurance.select_first_option).click();
	  //   cy.xpath(selectors.home_insurance.email).type(
    //   form_data.home_insurance.email,
    //   { force: true }
    // );
	  // cy.xpath(selectors.home_insurance.mobile_phone).type(
    //   form_data.home_insurance.phone,
    //   { force: true }
    // );

    // cy.xpath(selectors.home_insurance.areyouinterestedtext).scrollIntoView();
    // cy.xpath(selectors.home_insurance.areyouinterestedtext).should("be.visible")
    // cy.xpath(selectors.home_insurance.bundlingNoradiobutton).check('false')
    // cy.xpath(selectors.home_insurance.bundlingNoradiobutton).check('true')
    // cy.xpath(selectors.home_insurance.bundlePolicies).should("be.exist");
    // cy.xpath(selectors.home_insurance.fantastictext).should("be.visible");   

    // cy.xpath(selectors.home_insurance.continue).click({ force: true });

    // // 2. Getting Started - II
    // cy.xpath(selectors.home_insurance.whatcanhelptext).should("be.visible");
    // cy.xpath(selectors.home_insurance.telluswhichoption).should("be.visible"); 
    // cy.xpath(selectors.home_insurance.purchasingahome).should("be.visible");
    // cy.xpath(selectors.home_insurance.lookingforabetterpolicy).should("be.visible");
    // cy.xpath(selectors.home_insurance.refinancingmyhome).should("be.visible");

    // cy.xpath(selectors.home_insurance.purchasingahomeradiobutton).click({ force: true });
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });

    // // 3. Home Details - I
    
    // cy.xpath(selectors.home_insurance.whataddresstext).should("be.visible");
    // cy.xpath(selectors.home_insurance.tellusthetext).should("be.visible");


    // cy.xpath(selectors.home_insurance.street1).clear()
    // cy.xpath(selectors.home_insurance.street1).type(
    //   form_data.home_insurance.street,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.unit1).type(
    //   form_data.home_insurance.unit,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.city1).type(
    //   form_data.home_insurance.city,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.state1).type(
    //   form_data.home_insurance.state,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.zip_code1).type(
    //   form_data.home_insurance.zip,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.county1).type(
    //   form_data.home_insurance.county,
    //   { force: true }
    // );

    // cy.xpath(selectors.home_insurance.yourmailingtext).should("be.visible");
    // cy.xpath(selectors.home_insurance.sometimesyourtext).should("be.visible");
    // cy.xpath(selectors.home_insurance.mymailingtext).should("be.visible");
    
    // cy.xpath(selectors.home_insurance.street2).type(
    //   form_data.home_insurance.street,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.unit2).type(
    //   form_data.home_insurance.unit,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.city2).type(
    //   form_data.home_insurance.city,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.state2).type(
    //   form_data.home_insurance.state,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.zip_code2).type(
    //   form_data.home_insurance.zip,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.county2).type(
    //   form_data.home_insurance.county,
    //   { force: true }
    // );

    // cy.xpath(selectors.home_insurance.yourmailingcheckbox).check()
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    // cy.xpath(selectors.home_insurance.canyouverifytext).should("be.visible");
    // cy.xpath(selectors.home_insurance.yes_continuebutton).click({ force: true });


    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    
    // // // 4. Details about your Property 

    // cy.xpath(selectors.home_insurance.detailsabouttext).should("be.visible");
    // cy.xpath(selectors.home_insurance.tellusmoretext).should("be.visible");
    
    // cy.xpath(selectors.home_insurance.home_type).click({ force: true });
    // cy.xpath(selectors.home_insurance.select_first_option).click();
    // cy.xpath(selectors.home_insurance.property_use).click({ force: true });
    // cy.xpath(selectors.home_insurance.select_first_option).click();
    // cy.xpath(selectors.home_insurance.year_built).type(
    //   form_data.home_insurance.year_built,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.sq_ft).type(
    //   form_data.home_insurance.sq_ft,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.num_stories).click({ force: true });
    // cy.xpath(selectors.home_insurance.select_first_option).click();

    // cy.xpath(selectors.home_insurance.roof_age).type(
    //   form_data.home_insurance.roofage,
    //   { force: true }
    // );
    // // cy.xpath(selectors.home_insurance.est_closing_date).type(
    // //   form_data.home_insurance.closing_date,
    // //   { force: true }
    // // );

    // cy.xpath(selectors.home_insurance.est_closing_date).type(
    //   form_data.home_insurance.closing_date,
    //   { force: true }
    // );
    // cy.xpath(selectors.home_insurance.calendar_Icon).click({ force: true });

    // setDatePicker();

    // cy.xpath(selectors.home_insurance.continue).click({ force: true });

    // // cy.xpath(selectors.home_insurance.next_month).click({ force: true });
    // // cy.xpath(selectors.home_insurance.previous_month).click({ force: true });
    // // cy.xpath(selectors.home_insurance.continue).click({ force: true });

    // // 5. Get a Quote - Final Page

    // // cy.xpath(selectors.home_insurance.afewmoretext).should("be.visible");
    // // cy.xpath(selectors.home_insurance.letusknowtext).should("be.visible"); 
    // // cy.xpath(selectors.home_insurance.getaquotepage_radiobutton).check()
    // cy.xpath(selectors.home_insurance.pool_question).should("be.visible");
    // cy.xpath(selectors.home_insurance.pool_radiobutton).check()
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    // cy.xpath(selectors.home_insurance.trampoline_question).should("be.visible");
    // cy.xpath(selectors.home_insurance.trampoline_radiobutton).check()
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    // cy.xpath(selectors.home_insurance.stove_question).should("be.visible");
    // cy.xpath(selectors.home_insurance.stove_radiobutton).check()
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    // cy.xpath(selectors.home_insurance.homeinsurance_question).should("be.visible");
    // cy.xpath(selectors.home_insurance.homeinsurance_radiobutton).check()
    // cy.xpath(selectors.home_insurance.continue).click({ force: true });
    // cy.xpath(selectors.home_insurance.last5years_question).should("be.visible");
    // cy.xpath(selectors.home_insurance.last5years_radiobutton).check()    
    // cy.xpath(selectors.home_insurance.claimslast5years_question).should("be.visible");    
    // cy.xpath(selectors.home_insurance.plus_icon).click({ force: true });     
    // cy.xpath(selectors.home_insurance.minus_icon).click({ force: true });   
    // cy.xpath(selectors.home_insurance.noof_claims).type(
    //   form_data.home_insurance.noofclaims,
    //   { force: true }
    // );
    // //cy.xpath(selectors.home_insurance.getaquote_button).click({ force: true })
    // //cy.wait(30000);
    // //cy.xpath(selectors.home_insurance.lookslike_msg).should("be.visible");
    // //cy.xpath(selectors.home_insurance.toreceivequote_msg).should("be.visible");    
  });
});

/**
 * Sets the date picker if it is present on the page.
 * This is sometimes necessary when running in headless mode on Linux.
 */
// function setDatePicker() {
//   cy.get("body").then(($body) => {
//     const element = $body.find(selectors.home_insurance.date_picker_class);

//     if (element.length) {
//       cy.xpath(selectors.home_insurance.date_picker_active_days).eq(0).click();
//       //cy.xpath(selectors.home_insurance.date_picker_ok).click();
//     }
//   });                                                                                                                                                               
// }
