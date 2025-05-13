const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv =
  config.sites.app.config.env[0].toUpperCase() +
  config.sites.app.config.env.slice(1);

  const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                     && Cypress.config().viewportWidth >= 1441;
  const isTablet = Cypress.config().viewportWidth < 1441 
                    && Cypress.config().viewportWidth >= 768;
  const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("Manufacturing - Functional Tests", () => {
    it("Visiting the Manufacturing page", () => {
      cy.visitSite("app", "industries/manufacturing");
      cy.url().should("include", "industries/manufacturing");
      cy.xpath(selectors.theme_container).should("exist");
    });

    it("Checking Manufacturing Hyperlinks", () => {
      cy.visitSite("app", "industries/manufacturing");
      cy.url().should("include", "industries/manufacturing");

      cy.xpath(selectors.main_container, { timeout: 10000 }).within(($mainWebpage) => {
        // Get all the links within the main webpage

        cy.get(cy_selectors.global.target_links).each((link) => {
          if (link.prop("href")) {
            cy.request({ url: link.prop("href"), failOnStatusCode: true });
            cy.log(link.prop("href"));
          }
        });
      });
    });
  });

  describe("Manufacturing - Design Tests", () => {
    it.only("Validate Manufacturing Page", () => {
      cy.visitSite("app", "industries/manufacturing");
      cy.url().should("include", "industries/manufacturing");

      cy.xpath(selectors.main_container, { timeout: 10000 }).should("exist");

      /* ================================
       * Manufacturing Webpage
       * ================================
       */

      /* ----------------------------------------------------------
       * Manufacturing Splash Component - Text and Image
       * ----------------------------------------------------------
       */
      {     
        cy.get(cy_selectors.manufacturing.hero_splash_caption).should("have.text",
          acm_constants.manufacturing.hero_splash_caption);
        cy.get(cy_selectors.manufacturing.hero_splash_header).should("have.text",
         acm_constants.manufacturing.hero_splash_header);
        cy.get(cy_selectors.manufacturing.hero_splash_body_text).should("have.text",
          acm_constants.manufacturing.hero_splash_body_text);
        cy.get(cy_selectors.manufacturing.hero_splash_getconnected_button).should("have.text",
          acm_constants.manufacturing.hero_splash_getconnected_button);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------------
       * Manufacturing How We Work - Text
       * ----------------------------------------------------------
       */
      {
        // Caption/Header/Body Text
        cy.get(cy_selectors.manufacturing.howwework_header_text).scrollIntoView();
        
        cy.get(cy_selectors.manufacturing.howwework_caption_text).should("have.text",
          acm_constants.manufacturing.howwework_caption_text);

        cy.get(cy_selectors.manufacturing.howwework_header_text).should("have.text",
          acm_constants.manufacturing.howwework_header_text);

        cy.get(cy_selectors.manufacturing.howwework_body_text1).should("have.text",
          acm_constants.manufacturing.howwework_body_text1);

        cy.get(cy_selectors.manufacturing.howwework_body_text2).should("have.text",
          acm_constants.manufacturing.howwework_body_text2);

        cy.get(cy_selectors.manufacturing.howwework_body_text3).should("have.text",
          acm_constants.manufacturing.howwework_body_text3);

        cy.get(cy_selectors.manufacturing.howwework_body_text4).should("have.text",
          acm_constants.manufacturing.howwework_body_text4);

        cy.get(cy_selectors.manufacturing.howwework_body_text_para1).scrollIntoView();

        cy.get(cy_selectors.manufacturing.howwework_body_text_para1).should("have.text",
          acm_constants.manufacturing.howwework_body_text_para1);
          
        cy.get(cy_selectors.manufacturing.howwework_body_text_para2).should("have.text",
          acm_constants.manufacturing.howwework_body_text_para2);

        cy.get(cy_selectors.manufacturing.howwework_body_text_para3).should("have.text",
          acm_constants.manufacturing.howwework_body_text_para3);
        
        cy.get(cy_selectors.manufacturing.howwework_getconnected_button).should("have.text",
          acm_constants.manufacturing.howwework_getconnected_button);
      }

      /* ---------------------------------------------------------
       * Manufacturing - Services
       * ---------------------------------------------------------
       */

      {
        cy.get(cy_selectors.manufacturing.services_component).scrollIntoView();

        // Component Headers and Text
        cy.get(cy_selectors.manufacturing.services_component_caption)
          .should("have.text", acm_constants.manufacturing.services_component_caption);

        cy.get(cy_selectors.manufacturing.services_h3_header)
          .should("be.visible")
          .should("have.text", acm_constants.manufacturing.services_h3_header);

        cy.get(cy_selectors.manufacturing.services_body_text)
          .should("be.visible")
          .should("have.text", acm_constants.manufacturing.services_body_text);

        cy.get(cy_selectors.manufacturing.service_expl_sol_largebusiness_link)
          .should("be.visible")
          .should("have.text", acm_constants.manufacturing.service_expl_sol_largebusiness_link);

        cy.get(cy_selectors.manufacturing.service_expl_sol_largebusiness_link).click({ force: true });         
        cy.title().should('eq', 'Large Business Solutions');   
        cy.wait(2000);
        //cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.go('back')
        cy.wait(3000);

        cy.get(cy_selectors.manufacturing.services_component).scrollIntoView();

        cy.get(cy_selectors.manufacturing.seemorebtn).should("be.visible")
        cy.get(cy_selectors.manufacturing.seemorebtn).click({ force: true }); 

        // services List Sections

        cy.get("[data-testid='SOLUTIONS_COMPONENT'] > .MuiContainer-root > .inner-content > .bottom > ul")
        .children()
        .each(($services, index) => {
          cy.wrap($services).scrollIntoView({ offset: { top: -100, left: 0 } });
            cy.wrap($services)
              .find(cy_selectors.manufacturing.services_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.manufacturing.services_list_h6_headers[index]);
            cy.wait(5000),
            cy.wrap($services)
              .find(cy_selectors.manufacturing.services_list_body_text)
              .should("have.text", acm_constants.manufacturing.services_list_body_texts[index]);
          });
      }

      /* ---------------------------------------------------------
       * Manufacturing - Specialities
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.manufacturing.specialities_component).scrollIntoView();

        if(isTablet || isMobile){
          cy.wait(2000);
          cy.get(cy_selectors.manufacturing.specialities_component).scrollIntoView({ offset: { top: -50, left: 0 } });
          cy.wait(1000);
        }

        // Specialities -  Caption
        cy.get(cy_selectors.manufacturing.specialities_component_caption).should("have.text",
          acm_constants.manufacturing.specialities_component_caption);

        cy.get(cy_selectors.manufacturing.specialities_component_text).should("have.text",
          acm_constants.manufacturing.specialities_component_text);

        cy.get(cy_selectors.manufacturing.load_more_button).should("be.visible")
        cy.get(cy_selectors.manufacturing.load_more_button).click( {force : true} );

        // Inner Content (Header, Specialities List)
        cy.get(cy_selectors.manufacturing.specialities_component_text)
          .scrollIntoView({ offset: { top: -50, left: 0 } })
          .should("have.text", acm_constants.manufacturing.specialities_component_text);

        cy.get(".accordion-list")
          .children()
          .each(($specialities, index) => {
            cy.wrap($specialities).scrollIntoView({ offset: { top: -100, left: 0 } });

            cy.wrap($specialities)
              .find(cy_selectors.manufacturing.specialities_list_h6_header)
              .scrollIntoView({ offset: { top: -50, left: 0 } })
              .should("have.text", acm_constants.manufacturing.specialities_list_h6_headers[index]);
            cy.wait(5000),
            cy.wrap($specialities)
              .find(cy_selectors.manufacturing.specialities_list_body_text)
              .should("have.text", acm_constants.manufacturing.specialities_list_body_texts[index]);
          });
      }
        
      /* ---------------------------------------------------------
       * Manufacturing - Coverage
       * ---------------------------------------------------------
       */
         {
          cy.get(cy_selectors.manufacturing.coverage_component).scrollIntoView();
  
          if(isTablet || isMobile){
            cy.wait(2000);
            cy.get(cy_selectors.manufacturing.coverage_component).scrollIntoView({ offset: { top: -50, left: 0 } });
            cy.wait(1000);
          }
  
          // Coverage -  Caption
          cy.get(cy_selectors.manufacturing.coverage_component_caption).should("have.text",
            acm_constants.manufacturing.coverage_component_caption);          
  
          // Inner Content (Header, Coverage List)
          cy.get(cy_selectors.manufacturing.coverage_h2_header).should("have.text",
            acm_constants.manufacturing.coverage_h2_header);
        
          cy.get(cy_selectors.manufacturing.coverage_body_text).should("have.text",
            acm_constants.manufacturing.coverage_body_text);
        
          cy.get(cy_selectors.manufacturing.coverage_getaquotebtn).should("have.text",
            acm_constants.manufacturing.coverage_getaquotebtn);

          cy.get(cy_selectors.manufacturing.coverage_getaquotebtn).click({ force: true });         
          cy.title().should('eq', 'Acrisure - You');   
          cy.wait(2000);
          cy.xpath(selectors.common.onetrust1).click({ force: true });    
          cy.go('back')
          cy.go('back')
          cy.wait(3000);

          cy.xpath(selectors.common.onetrust1).click({ force: true });
          cy.wait(5000);          
          cy.get(cy_selectors.manufacturing.two_column_component_image).scrollIntoView();
          //cy.get(cy_selectors.manufacturing.coverage_body_text).scrollIntoView({ offset: { top: -200, left: 0 } });
          cy.wait(3000);
          cy.get(cy_selectors.manufacturing.coverage_seemorebtn).click( {force : true} );
          

          if(isMobile){
            cy.get(cy_selectors.manufacturing.two_column_component_image).scrollIntoView({ offset: { top: -100, left: 0 } });
            cy.wait(3000);
            cy.get("#content > div:nth-child(6) > .MuiContainer-root > .inner-content > .right > .MuiList-root")
            .children()
            .each(($coverage, index) => {
              cy.wrap($coverage).scrollIntoView({ offset: { top: -100, left: 0 } });
  
              cy.wrap($coverage)
                .find(cy_selectors.manufacturing.coverage_list_h6_header)
                .scrollIntoView({ offset: { top: -50, left: 0 } })
                .should("have.text", acm_constants.manufacturing.coverage_list_h6_headers[index]);
              cy.wait(5000),
              cy.wrap($coverage)
                .find(cy_selectors.manufacturing.coverage_list_body_text)
                .should("have.text", acm_constants.manufacturing.coverage_list_body_texts[index]);
            });
          }

          if(!isMobile){
          cy.get("#content > div:nth-child(6) > .MuiContainer-root > .inner-content > .right > .MuiList-root")
            .children()
            .each(($coverage, index) => {
              cy.wrap($coverage).scrollIntoView({ offset: { top: -100, left: 0 } });
  
              cy.wrap($coverage)
                .find(cy_selectors.manufacturing.coverage_list_h6_header)
                .scrollIntoView({ offset: { top: -50, left: 0 } })
                .should("have.text", acm_constants.manufacturing.coverage_list_h6_headers[index]);
              cy.wait(5000),
              cy.wrap($coverage)
                .find(cy_selectors.manufacturing.coverage_list_body_text)
                .should("have.text", acm_constants.manufacturing.coverage_list_body_texts[index]);
            });
          }
        } 

      /* ------------------------------------------------------
       * Manufacturing - Why Acrisure
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.manufacturing.two_column_component_container).scrollIntoView({ offset: { top: -70, left: 0 } });

        // Left Column Image
        cy.get(cy_selectors.manufacturing.two_column_component_image)
          .should("be.visible")
          .click({ scrollBehavior: false });

        cy.wait(5000);
        // Get outer pill container and traverse elements to confirm the pill text in the middle 
        cy.xpath(cy_selectors.manufacturing.pill_box_text_strategic).should("have.text", acm_constants.manufacturing.pill_box_text_strategic);
        cy.xpath(cy_selectors.manufacturing.pill_box_text_and).should("have.text", acm_constants.manufacturing.pill_box_text_and);
        cy.xpath(cy_selectors.manufacturing.pill_box_text_proactive).should("have.text", acm_constants.manufacturing.pill_box_text_proactive);        

        cy.get(cy_selectors.manufacturing.whyacrisure_slides).its("length").as("numberOfSlides");
        
        cy.get("@numberOfSlides").then((slides) => {
          for (let slideIndex = 0; slideIndex < slides; slideIndex++) {
            cy.get(cy_selectors.manufacturing.whyacrisure_active_slide, { timeout: 15000 })
              .should("have.attr", "data-swiper-slide-index", slideIndex)
              .should("be.visible");
              
            cy.get(cy_selectors.manufacturing.whyacrisure_active_slide)
              .find(cy_selectors.manufacturing.whyacrisure_slide_caption)
              .should("have.text", acm_constants.manufacturing.whyacrisure_slide_caption);            
            
            cy.get(cy_selectors.manufacturing.whyacrisure_active_slide)
              .find(cy_selectors.manufacturing.whyacrisure_slide_h4_header)
              .should("have.text", acm_constants.manufacturing.whyacrisure_slide_h4_header[slideIndex]);
  
            cy.get(cy_selectors.manufacturing.whyacrisure_active_slide)
              .find(cy_selectors.manufacturing.whyacrisure_slide_body_text)
              .should("have.text", acm_constants.manufacturing.whyacrisure_slide_body_text[slideIndex]);
  
            cy.get(cy_selectors.manufacturing.whyacrisure_slide_pagination_bullet)
              .eq(slideIndex)
              .should("have.class", "swiper-pagination-bullet-active");
            }
          });
      } 

      /* ------------------------------------------------------
       * Manufacturing - Let's get started.
       * ------------------------------------------------------
       */
      {
        cy.get(cy_selectors.manufacturing.banner_component).scrollIntoView();

        cy.get(cy_selectors.manufacturing.banner_caption).should("have.text",
          acm_constants.manufacturing.banner_caption);

        cy.get(cy_selectors.manufacturing.banner_body_text).should("have.text",
          acm_constants.manufacturing.banner_body_text);

        cy.get(cy_selectors.manufacturing.banner_connectwithus_link).should("have.text",
          acm_constants.manufacturing.banner_connectwithus_link);

        cy.get(cy_selectors.manufacturing.banner_connectwithus_link).click({ force: true });         
        cy.title().should('eq', 'Acrisure - You');   
        cy.wait(2000);
        cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.go('back')
        cy.go('back')
        cy.wait(3000);
      }
      
      /* --------------------------------------------------------------------
       * Manufacturing - Insights
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.manufacturing.insights_component).scrollIntoView();
        
        cy.get(cy_selectors.manufacturing.insights_card_insights).should("have.text",
          acm_constants.manufacturing.insights_card_insights);

        cy.get(cy_selectors.manufacturing.insights_card_insights_link).should("have.text",
          acm_constants.manufacturing.insights_card_insights_link);

        cy.get(cy_selectors.manufacturing.insights_card_insights_link).click({ force: true });         
        cy.title().should('eq', 'Insurance, Cybersecurity and Business Solutions Insights');   
        cy.wait(2000);
        cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.go('back')
        cy.wait(3000);
        cy.get(cy_selectors.manufacturing.insights_component).scrollIntoView();
        

        cy.get(cy_selectors.manufacturing.insights_card_growboldly).should("have.text",
          acm_constants.manufacturing.insights_card_growboldly);

        cy.get(cy_selectors.manufacturing.insights_card_growboldly_link).should("have.text",
          acm_constants.manufacturing.insights_card_growboldly_link);
          
        cy.get(cy_selectors.manufacturing.insights_card_growboldly_link).click({ force: true });         
        cy.title().should('eq', 'Business Solutions');   
        cy.wait(2000);
        cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.go('back')
        cy.wait(3000);
        cy.get(cy_selectors.manufacturing.insights_component).scrollIntoView();


      /* --------------------------------------------------
       * Manufacturing - FAQ
       * --------------------------------------------------
       */
        cy.get(cy_selectors.manufacturing.accordion_component).scrollIntoView();

        // FAQ Text (Caption and Header)
        cy.get(cy_selectors.manufacturing.accordion_component_caption)
          .should("have.text", acm_constants.manufacturing.accordion_component_caption);

        cy.get(cy_selectors.manufacturing.faq_header)
          .should("have.text", acm_constants.manufacturing.faq_header);
          
      /* 
        First close the first expanded tab. Then for each tab, expand the tab and
        confirm the contents within each tab
       */
          cy.get(cy_selectors.manufacturing.faq_expanded_tab)
            .scrollIntoView({ offset: { top: -60, left: 0 } })
            .find(cy_selectors.manufacturing.faq_panel_header)          
            //.click({ scrollBehavior: false });
          cy.wait(5000);
          cy.get(cy_selectors.manufacturing.faq_regular_tab).each(($ele, panelIndex) => {
            cy.wrap($ele)
              .find(cy_selectors.manufacturing.faq_panel_header)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .click({ scrollBehavior: false });

            // Confirm the tab text
            cy.wrap($ele)
              .find(cy_selectors.manufacturing.faq_panel_header_text)
              .should("have.text", acm_constants.manufacturing.faq_section_i_panel_headers[panelIndex]);

            // Confirm each bullet point text
            cy.wrap($ele)
              .find(cy_selectors.manufacturing.faq_panel_bullet_points)
              .each(($ele, bulletIndex) => {
                const bulletArray =
                  acm_constants.manufacturing[
                    `faq_section_i_panel_header_${panelIndex + 1}_bullet_points`
                  ];
                cy.wrap($ele).should("have.text", bulletArray[bulletIndex]);
              });

            cy.wait(1500);
          }
        );
      }   
    });
  });
});