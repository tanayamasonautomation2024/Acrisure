const selectors = require("../../fixtures/app/selectors.json");
const cy_selectors = require("../../fixtures/app/cy_selectors.json");
const acm_constants = require("../../fixtures/app/constants.json");
const config = require("../../../cypress.env.json");

const currentEnv = config.sites.app.config.env[0].toUpperCase() + config.sites.app.config.env.slice(1);

    const isLargeDesktop = Cypress.config().viewportWidth < 2000 
                       && Cypress.config().viewportWidth >= 1441;
    const isTablet = Cypress.config().viewportWidth < 1441 
              && Cypress.config().viewportWidth >= 768;
    const isMobile = Cypress.config().viewportWidth < 768;

describe(`Acrisure Cloud Website - ${currentEnv} Environment`, () => {
  describe("Homepage - Functional Tests", () => {
    it("Can visit the home page", () => {
      cy.visitSite("app");
      cy.url().should("include", "acrisure");
      cy.xpath(selectors.theme_container).should("exist");
    });

    describe("Testing Hyperlinks within the App", () => {4
      it("Checking Nav Bar Hyperlinks", () => {
        cy.visitSite("app");
        cy.url().should("include", "acrisure"); 

        cy.xpath(selectors.topnav.header_component, {timeout: 10000}).within(($navbar) => {
          // Get all the links within the nav bar that aren't part of a submenu
          // This will target the Acrisure logo, "Why Acrisure", and "Insights" links
        
          cy.get('a').each(link => {
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          })
        });
        cy.wait(10000);
        //if(isMobile || isTablet){
          if(isMobile){
          cy.get(cy_selectors.topnav.mobile_menu_button).click();
          cy.wait(10000);
          cy.get('.mobile .menu-link li[data-index] > a').each(link => {
            // Get all the links within the mobile menu
            // Skips buttons that don't have a href attribute
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          });
        }
  
        cy.get(cy_selectors.topnav.personal_solutions)
          .should("be.visible")
          .click();
  
        cy.get(cy_selectors.topnav.personal_solutions_submenu).within(($submenu) => {
          // Get all the links within the sub menu for "Personal Solutions"
        
          cy.get('a').each(link => {
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          })
        });

        if(isMobile){
        //if(isMobile || isTablet){
          cy.get(cy_selectors.topnav.submenu_back_button).click();
        }

        cy.get(cy_selectors.topnav.business_solutions)
          .should("be.visible")
          .click();
  
        cy.get(cy_selectors.topnav.business_solutions_submenu).within(($submenu) => {
          // Get all the links within the sub menu for "Business Solutions"" 
        
          cy.get('a').each(link => {
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          })
        });
      });

      it("Checking Main Homepage Hyperlinks", () => {
        cy.visitSite("app");
        cy.url().should("include", "acrisure");

        cy.xpath(selectors.main_container).within(($mainWebpage) => {
          // Get all the links within the main webpage
        
          cy.get('a').each(link => {
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          })
        });
      });

      it("Checking Footer Hyperlinks", () => {
        cy.visitSite("app");
        cy.url().should("include", "acrisure");

        cy.xpath(selectors.footer_container).within(($footer) => {
          // Get all the links within the main webpage
        
          cy.get("a:not([href*='javascript:'])").each(link => {
            if (link.prop('href')) {
              cy.request({ url: link.prop('href'), failOnStatusCode: true });
              cy.log( link.prop('href'));
            }
          })
        });
      });
    });
  });

  describe("Homepage - Design Tests", () => { 
    it("Validate Acrisure Homepage", () => {
      cy.visitSite("app");
      cy.url().should("include", "acrisure");``

      /* ---------------------------------------------------------
       * Homepage Hero Component - Carousel & Corner-Cut Container
       * ---------------------------------------------------------
       */
      {
        cy.get(cy_selectors.homepage.hero_component_hero_video).should("exist");

        // Corner-cut container over hero image
        cy.get(cy_selectors.homepage.corner_cut_container_hero_component).should("be.visible");
        cy.get(cy_selectors.homepage.corner_cut_container_caption)
          .should("have.text", acm_constants.homepage.corner_cut_container_caption);

        cy.get(cy_selectors.homepage.corner_cut_container_h4_header)
          .should("have.text", acm_constants.homepage.corner_cut_container_h4_header);

        cy.get(cy_selectors.homepage.corner_cut_container_body_text)
          .should("have.text", acm_constants.homepage.corner_cut_container_body_text);
          
        cy.get(cy_selectors.homepage.corner_cut_container_primary_button).should("be.visible");
        cy.get(cy_selectors.homepage.corner_cut_container_primary_button).click({ force: true });
        cy.wait(3000); 
        cy.title().should('eq', 'Business Solutions');        
        cy.go('back');

        cy.get(cy_selectors.homepage.corner_cut_container_secondary_button).should("be.visible");
        cy.get(cy_selectors.homepage.corner_cut_container_secondary_button).click({ force: true });        
        cy.title().should('eq', 'Personal Insurance Solutions | Get Your Personalized Quote');        
        cy.go('back');     

      }
      cy.xpath(selectors.common.onetrust1).click({ force: true });
      /* ----------------------------------------------------
       * Homepage Hero Component - Illustration & Banner Text
       * ----------------------------------------------------
       */
      {
        // Illustration Banner
        cy.wait(3000);
        cy.get(cy_selectors.homepage.hero_section).scrollIntoView();        
        cy.get(cy_selectors.homepage.hero_image).should("be.visible");
        cy.get(cy_selectors.homepage.hero_banner_pills_1).should("be.visible");
        cy.get(cy_selectors.homepage.hero_banner_pills_2).should("be.visible");
        cy.get(cy_selectors.homepage.hero_banner_pills_3).should("be.visible");

        // Banner Text
        cy.get(cy_selectors.homepage.hero_banner_body_text1)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.hero_banner_body_text1);
        
        cy.get(cy_selectors.homepage.hero_banner_body_text2)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.hero_banner_body_text2);
      }

      cy.xpath(selectors.common.onetrust1).click({ force: true });

      /* ----------------------------------------------------
       * Homepage Hero Component - Business Solutions
       * ----------------------------------------------------
       */
      {
        // Business Solution Captions
        cy.get(cy_selectors.homepage.bentobox_section).scrollIntoView();

        cy.get(cy_selectors.homepage.business_component_caption).should("have.text",
          acm_constants.homepage.business_component_caption);

        // Top Content Text (header and body text)
        cy.get(cy_selectors.homepage.business_component_h3_header).should("have.text",
          acm_constants.homepage.business_component_h3_header);

        cy.get(cy_selectors.homepage.business_component_body_text).contains(
          acm_constants.homepage.business_component_body_text);
        
      }

        // Business Coverage Cards (Button, Header, Body Text)
        cy.get(cy_selectors.homepage.business_coverage_card_container)
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .find(cy_selectors.homepage.business_coverage_card).each(($ele, coverageCardIndex) => {

            cy.wrap($ele)              
              .find(cy_selectors.homepage.business_coverage_card_h6_headers)              
              .should("have.text", acm_constants.homepage.business_coverage_card_h6_headers[coverageCardIndex]);

            cy.wrap($ele)
              .find(cy_selectors.homepage.business_coverage_card_body_text)
              .should("have.text", acm_constants.homepage.business_coverage_card_body_text[coverageCardIndex]);

            cy.wrap($ele)
              .find(cy_selectors.homepage.business_coverage_card_button)
              .scrollIntoView({ offset: { top: -120, left: 0 } })
              //.click({ scrollBehavior: false });
            cy.wait(1500);

            if(!(isTablet || isMobile)){
              cy.wrap($ele)
                .find(cy_selectors.homepage.business_coverage_card_body_text)
                .should("be.visible");
            }
          });

        // Business Solutions - Card Navigations 
        cy.get(cy_selectors.homepage.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });

        cy.get(cy_selectors.homepage.business_coverage_card_button1).click({ force: true });
        cy.title().should('eq', 'Small Business Insurance | Request a Personalized Quote');        
        cy.go('back');
        
        cy.wait(2000);
        cy.get(cy_selectors.homepage.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.homepage.business_coverage_card_button2).click({ force: true });
        cy.title().should('eq', 'Large Business Solutions');        
        cy.go('back');

        cy.wait(2000);
        cy.get(cy_selectors.homepage.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.homepage.business_coverage_card_button3).click({ force: true });
        cy.title().should('eq', 'Cybersecurity');        
        cy.go('back');
        
        cy.wait(2000);
        cy.get(cy_selectors.homepage.business_coverage_card_container).scrollIntoView({ offset: { top: -100, left: 0 } });
        
        cy.get(cy_selectors.homepage.business_coverage_card_button4).click({ force: true });
        cy.title().should('eq', 'Employee Benefit Services | Request A Personalized Quote');        
        cy.go('back'); 
        cy.wait(2000);       

      /* ------------------------------------------------
       * Homepage Carousel Component - Personal Solution
       * ------------------------------------------------
       */
      {
        // Personal Solution
        cy.get(cy_selectors.homepage.carousel_component).scrollIntoView();
        cy.get(cy_selectors.homepage.carousel_component_caption)
          .should("have.text", acm_constants.homepage.carousel_component_caption)
          .should("be.visible");

        cy.get(cy_selectors.homepage.carousel_component_h3_header)
          .should("have.text", acm_constants.homepage.carousel_component_h3_header)
          .should("be.visible");

        cy.get(cy_selectors.homepage.carousel_component_large_body_text)
          .should("have.text", acm_constants.homepage.carousel_component_large_body_text)
          .should("be.visible")

        // Cards within the slide carousel
        // Cards in Slide : 5
        cy.get(cy_selectors.homepage.card_slide_wrapper)
          .children()
          .then(($slides) => {
            return $slides.length;
          })
          .as("slideCount");

        // Loop through slideCount and validate the active card in the slide
        cy.get(cy_selectors.homepage.carousel_component_large_body_text).scrollIntoView({ offset: { top: -30, left: 0 } });
        cy.get("@slideCount").then((slideCount) => {
          for (let index = 0; index < slideCount; index++) {
            cy.get(cy_selectors.homepage.active_card_slide)
              .should("have.attr", "data-swiper-slide-index", index);

            cy.get(cy_selectors.homepage.active_card_slide)
              .find(cy_selectors.homepage.card_slide_cards)
              .should("have.class", acm_constants.homepage.card_slide_class[index])
              .should("be.visible");

            cy.get(cy_selectors.homepage.active_card_slide)
              .find(cy_selectors.homepage.card_slide_image)
              .should("have.attr", "alt", acm_constants.homepage.card_slide_alt_text[index])
              .should("be.visible");

            cy.get(cy_selectors.homepage.active_card_slide)
              .find(cy_selectors.homepage.card_slide_h6_header)
              .should("have.text", acm_constants.homepage.card_slide_h6_header[index])
              .should("be.visible");

            cy.get(cy_selectors.homepage.active_card_slide)
              .find(cy_selectors.homepage.card_slide_body_text)
              .should("have.text", acm_constants.homepage.card_slide_body_text[index])
              .should("be.visible");

            cy.get(cy_selectors.homepage.active_card_slide)
              .find(cy_selectors.homepage.card_slide_button)
              .should("have.text", acm_constants.homepage.card_slide_button_text)  
              .should("be.visible");

            cy.wait(10000);
            cy.get(cy_selectors.homepage.card_slide_next_button)
              .should("be.visible")
              .click( {scrollBehavior: true} );

            cy.wait(1750);
          }
        });
      }

      // Personal Solutions - Card Navigations 
                                                                                                                                                                                                     
      cy.get(cy_selectors.homepage.carousel_component).scrollIntoView({ offset: { top: -100, left: 0 } });

      cy.get(cy_selectors.homepage.card_slide_home_button).click({ force: true });
      cy.title().should('eq', 'Homeowners Insurance | Get Your Personalized Quote');        
      cy.go('back');
      
      cy.wait(2000);
      cy.get(cy_selectors.homepage.carousel_component).scrollIntoView({ offset: { top: -100, left: 0 } });
      
      cy.get(cy_selectors.homepage.card_slide_auto_button).click({ force: true });
      cy.title().should('eq', 'Auto Insurance | Get Your Personalized Quote');        
      cy.go('back');

      cy.wait(2000);
      cy.get(cy_selectors.homepage.carousel_component).scrollIntoView({ offset: { top: -100, left: 0 } });
      
      cy.get(cy_selectors.homepage.card_slide_flood_button).click({ force: true });
      cy.title().should('eq', 'Flood Insurance | Get Your Personalized Quote');        
      cy.go('back');
      
      cy.wait(2000);
      cy.get(cy_selectors.homepage.carousel_component).scrollIntoView({ offset: { top: -100, left: 0 } });
      
      cy.get(cy_selectors.homepage.card_slide_health_button).click({ force: true });
      cy.title().should('eq', 'Health Insurance | Get Your Personalized Quote');        
      cy.go('back'); 
      cy.wait(2000);  
      
      cy.get(cy_selectors.homepage.carousel_component).scrollIntoView({ offset: { top: -100, left: 0 } });
      
      cy.get(cy_selectors.homepage.card_slide_life_button).click({ force: true });
      cy.title().should('eq', 'Term Life Insurance | Get Your Personalized Quote');        
      cy.go('back'); 
      cy.wait(2000); 

      /* ------------------------------------------------
       * Homepage Logo Parade Component - Company Logos
       * ------------------------------------------------
       */
      {
        // Logo Text
        cy.get(cy_selectors.homepage.logo_parade_body_text)
          .should("have.text", acm_constants.homepage.logo_parade_body_text);

        cy.get(cy_selectors.homepage.logo_parade_body_text).scrollIntoView({ offset: { top: -100, left: 0 } });
        //cy.wait(5000);
        
        // Confirm Order of Logos as it displays on the app
        cy.get(cy_selectors.homepage.logo_list)
          .children()
          .then(($listEl) => {
            const getIMG = (el) => Array.from(el.children)[0];
            const getALTTtext = (img) => img.getAttribute("alt");

            return Cypress._.map($listEl, (el) => getALTTtext(getIMG(el)));
          })
          .as("imageArray");
        cy.get("@imageArray").then((array) => {
          expect(array).to.include.ordered.members(acm_constants.homepage.company_logos, "Checking order of company logos");
        });
      
        cy.get(cy_selectors.homepage.logo_parade).scrollIntoView();

        if(isMobile){
          cy.get(cy_selectors.homepage.logo_parade_image).scrollIntoView();
        }
      }        
      
      /* --------------------------------------------------------------------
       * Homepage States and Quotes Component - Why Acrisure and Testimonials
       * --------------------------------------------------------------------
       */
      {
        cy.get(cy_selectors.homepage.stats_component).scrollIntoView();

        // Component Headers and Text
        cy.get(cy_selectors.homepage.stats_component_caption)
          .should("have.text", acm_constants.homepage.stats_component_caption);

        cy.get(cy_selectors.homepage.stats_component_h2_header)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.stats_component_h2_header);

        cy.get(cy_selectors.homepage.stats_component_body_text)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.stats_component_body_text);

        // Stat List Sections
        cy.get(cy_selectors.homepage.stat_box_wrapper)
          .find(cy_selectors.homepage.stat_box)
          .each(($statBox, index) => {
            cy.wrap($statBox)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .should("be.visible");

            cy.wrap($statBox)
              .find(cy_selectors.homepage.stat_box_count)
              .should("have.text", acm_constants.homepage.stat_list_counts[index])
              .should("be.visible");
        
            cy.wrap($statBox)
              .find(cy_selectors.homepage.stat_box_data_count)
              .should("have.text", acm_constants.homepage.stat_list_data_counts[index])
              .should("be.visible");
            
            cy.wrap($statBox)
              .find(cy_selectors.homepage.stat_box_h7_header)
              .should("have.text", acm_constants.homepage.stat_list_h7_headers[index])
              .should("be.visible");
            
              cy.wrap($statBox)
              .find(cy_selectors.homepage.stat_box_medium_body_text)
              .should("have.text", acm_constants.homepage.stat_list_medium_body_texts[index])
              .should("be.visible");
          });
      }

      /* --------------------------------------
       * Homepage Insights Component - Insights
       * --------------------------------------
       */
      {
        // Insights top section
        cy.get(cy_selectors.homepage.insights_component).scrollIntoView();
        cy.get(cy_selectors.homepage.insights_component_caption)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.insights_component_caption);
        cy.get(cy_selectors.homepage.insights_component_h4_header)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.insights_component_h4_header);

        // Insights - Central Blog Link
        cy.get(cy_selectors.homepage.insights_central_blog_container).should("be.visible");
        cy.get(cy_selectors.homepage.insights_central_blog_h5_header)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.insights_central_blog_h5_header);
        cy.get(cy_selectors.homepage.insights_central_blog_body_text)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.insights_central_blog_body_text);
        cy.get(cy_selectors.homepage.insights_central_blog_image)
          .should("be.visible")

        // Blog Links
        // Blog link count: 3
        cy.get(".card-list > .MuiList-root")
          .children()
          .each(($blogLink, index) => {
            cy.wrap($blogLink)
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .should("be.visible");

            cy.wrap($blogLink)
              .find("img")
              .should("be.visible");

            cy.wrap($blogLink)
              .find(".h7")
              .should("have.text", acm_constants.homepage.blog_link_h7_headers[index]);  
            });

        // See More Insights Button
        cy.get(cy_selectors.homepage.see_more_insights_button)
          .should("be.visible")
          .should("have.text", acm_constants.homepage.see_more_insights_button);
      }

      /* -----------------------------------
       * Homepage Global Component - Nav Bar
       * -----------------------------------
       */
      cy.xpath(selectors.common.onetrust1).click({ force: true });
      
      {
        // Acrisure Logo
        cy.xpath(selectors.topnav.acrisure_logo)
          .should("be.visible");

        //if(isMobile || isTablet){
        if(isMobile){
          cy.get(cy_selectors.topnav.mobile_menu_button).click();
        }        
        // Personal Solutions Button and Links
        cy.get(cy_selectors.topnav.personal_solutions)
          .should("have.text", acm_constants.topnav.personal_solutions)
          .click();        
        cy.get(cy_selectors.topnav.mortgage_origination_card_title)
          .should("have.text", acm_constants.topnav.mortgage_origination_card_title);
        cy.get(cy_selectors.topnav.mortgage_origination_description)
          .should("have.text", acm_constants.topnav.mortgage_origination_description);
        cy.get(cy_selectors.topnav.mortgage_origination_image)
          .should("be.visible");

        cy.get(cy_selectors.topnav.personal_insurance_card_title)
          .should("have.text", acm_constants.topnav.personal_insurance_card_title);
        cy.get(cy_selectors.topnav.personal_insurance_description)
          .should("have.text", acm_constants.topnav.personal_insurance_description);
        cy.get(cy_selectors.topnav.personal_insurance_image)
          .should("be.visible");

        cy.get(cy_selectors.topnav.homeowners_insurance_link)
          .should("have.text", acm_constants.topnav.homeowners_insurance_link);
        cy.get(cy_selectors.topnav.flood_insurance_link)
          .should("have.text", acm_constants.topnav.flood_insurance_link);
        cy.get(cy_selectors.topnav.auto_insurance_link)
          .should("have.text", acm_constants.topnav.auto_insurance_link);
        cy.get(cy_selectors.topnav.health_insurance_link)
          .should("have.text", acm_constants.topnav.health_insurance_link);
        cy.get(cy_selectors.topnav.life_insurance_link)
          .should("have.text", acm_constants.topnav.life_insurance_link);

        //if(isMobile || isTablet){
        if(isMobile){
          cy.get(cy_selectors.topnav.submenu_back_button).click();
        }
        
        // Business Solutions Button and Links
        cy.get(cy_selectors.topnav.business_solutions)
          .should("have.text", acm_constants.topnav.business_solutions)
          .click();

        cy.get(cy_selectors.topnav.employee_benefits_origination_card_title)
          .should("have.text", acm_constants.topnav.employee_benefits_origination_card_title);
        cy.get(cy_selectors.topnav.employee_benefits_origination_description)
          .should("have.text", acm_constants.topnav.employee_benefits_origination_description);
        cy.get(cy_selectors.topnav.employee_benefits_origination_image)
          .should("be.visible");

        cy.get(cy_selectors.topnav.business_insurance_card_title)
          .should("have.text", acm_constants.topnav.business_insurance_card_title);
        cy.get(cy_selectors.topnav.business_insurance_description)
          .should("have.text", acm_constants.topnav.business_insurance_description);
        cy.get(cy_selectors.topnav.business_insurance_image)
          .should("be.visible");

        cy.get(cy_selectors.topnav.commercial_general_liability_insurance_link)
          .should("have.text", acm_constants.topnav.commercial_general_liability_insurance_link);
        cy.get(cy_selectors.topnav.professional_liability_insurance_link)
          .should("have.text", acm_constants.topnav.professional_liability_insurance_link);
        cy.get(cy_selectors.topnav.business_owners_policy_link)
          .should("have.text", acm_constants.topnav.business_owners_policy_link);
        cy.get(cy_selectors.topnav.cyber_insurance_link)
          .should("have.text", acm_constants.topnav.cyber_insurance_link);
        cy.get(cy_selectors.topnav.workers_compensation_insurance_link)
          .should("have.text", acm_constants.topnav.workers_compensation_insurance_link);

        //if(isMobile || isTablet){
        if(isMobile){
          cy.get(cy_selectors.topnav.submenu_back_button).click();
        }
        else{
          cy.xpath(selectors.topnav.business_solutions)
          .click();
        }
        
        // Why Acrisure Link
        cy.get(cy_selectors.topnav.why_acrisure_link)
          .should("have.text", acm_constants.topnav.why_acrisure_link);

        // Insights Link
        cy.get(cy_selectors.topnav.insights_link)
          .should("have.text", acm_constants.topnav.insights_link);

        //if(isMobile || isTablet){
        if(isMobile){
          cy.get(cy_selectors.topnav.mobile_menu_button).click();
        }
      }

      /* ----------------------------------
       * Homepage Global Component - Footer
       * ----------------------------------
       */
      {
        cy.xpath(selectors.footer.footer_component).scrollIntoView();

        // Company related links
        cy.get(cy_selectors.footer.footer_column_title_1)
          .should("have.text", acm_constants.footer.footer_column_title_1);

        cy.xpath(selectors.footer.about_us)
          .should("have.text", acm_constants.footer.about_us);
        cy.xpath(selectors.footer.leadership)
          .should("have.text", acm_constants.footer.leadership);
        cy.xpath(selectors.footer.contact_us)
          .should("have.text", acm_constants.footer.contact_us);

        // Solutions related links
        cy.get(cy_selectors.footer.footer_column_title_2)
          .should("have.text", acm_constants.footer.footer_column_title_2);

        cy.xpath(selectors.footer.personal_insurance)
          .should("have.text", acm_constants.footer.personal_insurance);
        cy.xpath(selectors.footer.mortgages)
          .should("have.text", acm_constants.footer.mortgages);
        cy.xpath(selectors.footer.small_business)
          .should("have.text", acm_constants.footer.small_business);
        cy.xpath(selectors.footer.large_business)
          .should("have.text", acm_constants.footer.large_business);
        cy.xpath(selectors.footer.employee_benefits)
          .should("have.text", acm_constants.footer.employee_benefits);
        cy.xpath(selectors.footer.managed_cybersecurity)
          .should("have.text", acm_constants.footer.managed_cybersecurity);

        // Resources related links
        cy.get(cy_selectors.footer.footer_column_title_3)
          .should("have.text", acm_constants.footer.footer_column_title_3);

        cy.xpath(selectors.footer.insights)
          .should("have.text", acm_constants.footer.insights);
        cy.xpath(selectors.footer.newsroom)
          .should("have.text", acm_constants.footer.newsroom);

        // Footer copyright links
        cy.xpath(selectors.footer.terms_of_use)
          .should("have.text", acm_constants.footer.terms_of_use);
        cy.xpath(selectors.footer.privacy)
          .should("have.text", acm_constants.footer.privacy);
        cy.xpath(selectors.footer.your_privacy)
          .should("have.text", acm_constants.footer.your_privacy);
        cy.xpath(selectors.footer.legal)
          .should("have.text", acm_constants.footer.legal);

        cy.get(cy_selectors.footer.copyright)
          .should("have.text", acm_constants.footer.copyright);
      }
    });
  });
});