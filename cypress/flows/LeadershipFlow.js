const selectors = require("../fixtures/app/selectors.json");

class LeadershipFlow {
  initSession() {
    cy.session("login", () => {
      cy.visitSite("app");
      cy.visitSite("app", "about-acrisure/leadership", {
        skipOnetrust: true,
        skipLogin: true,
      });
    });
  }

  itAssertsLeaders({ section, leaders, delay = 0 }) {
    beforeEach(() => {
      this.initSession();
    });

    for (const { name, title } of leaders) {
      it(`${title}`, () => this.assertLeader({ section, name, title, delay }));
    }
  }

  assertLeader({ section, name, title, delay = 0 }) {
    cy.log(name, title);
    cy.visitSite("app", "about-acrisure/leadership", {
      skipOnetrust: true,
      skipLogin: true,
    });
    // cy.scrollTo(500, 0);
    // cy.pause();
    // cy.scrollTo(2000, 0).trigger("scroll");

    this.scrollToLeaderSection({ section });
    this.assertLeaderNameHeading({ section, name });
    this.assertLeaderTitleMatch({ section, name, title });

    cy.wait(delay);
  }

  scrollToLeaderSection({ section }) {
    let sel;

    switch (section) {
      case "executive":
        sel = selectors.leadership.executive_section;
        break;

      case "senior":
        sel = selectors.leadership.senior_section;
        break;

      default:
        throw new Error(`Invalid leadership section: ${section}`);
    }

    if (Cypress.config("viewportWidth") < 768) {
        // Scroll section so items show        
        cy.xpath(selectors.common.onetrust1).click({ force: true });    
        cy.get(selectors.leadership.container).eq(1).trigger("scroll");
    }

    if (Cypress.config("viewportWidth") > 1441) {
      // Scroll section so items show        
      cy.xpath(selectors.common.onetrust1).click({ force: true });    
      cy.get(selectors.leadership.container).eq(1).trigger("scroll");
    }
 
    // Scroll to section
    cy.xpath(sel).should("be.visible");
    cy.xpath(sel).scrollIntoView();
    this.loadAllLeaders({ section });
  }

  loadAllLeaders({ section }) {
    if (Cypress.config("viewportWidth") < 1366) {
      // Only click more if small viewport
      if (section == "senior") {
        cy.xpath(selectors.leadership.see_more_btn)
          .scrollIntoView()
          .click({ force: true });
        cy.wait(2000);
      }
    }
  }

  /**
   * Asserts that a leader's name is found for the correct section
   * @param {*} section Name of the section
   * @param {*} name Name of the leader
   */
  assertLeaderNameHeading({ section = "exec", name }) {
    let leaderNameHeading;

    switch (section) {
      case "executive":
        leaderNameHeading = selectors.leadership.exec_name.replace("%s", name);
        break;

      case "senior":
        leaderNameHeading = selectors.leadership.senior_name.replace("%s", name);
        break;

      default:
        throw new Error(`Invalid leadership section: ${section}`);
    }
    cy.xpath(selectors.home_insurance.onetrust1).click({ force: true });
    cy.xpath(leaderNameHeading).scrollIntoView({ offset: { top: -400, left: 0 } });
    //cy.xpath(leaderNameHeading).click();
    cy.wait(6000);
    cy.xpath(leaderNameHeading).should("exist");
  }

  /**
   * Asserts that a leader's name is found in the correct section with the correct position title
   * @param {*} section Name of the section
   * @param {*} name Name of the leader
   * @param {*} title Title of the leader
   */
  assertLeaderTitleMatch({ section, name, title }) {
    let matchingLeaderTitle;
    //cy.wait(3000);
    switch (section) {
      case "executive":
        matchingLeaderTitle = selectors.leadership.exec_name_title
          .replace("%n", name)
          .replace("%t", title);
        break;

      case "senior":
        matchingLeaderTitle = selectors.leadership.senior_name_title
          .replace("%n", name)
          .replace("%t", title);
        break;

      default:
        throw new Error(`Invalid leadership section: ${section}`);
    }

    cy.xpath(matchingLeaderTitle)
      .scrollIntoView({ offset: { top: -400, left: 0 } })
      .should("exist");
  }
}

export default new LeadershipFlow();
