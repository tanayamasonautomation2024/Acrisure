const leadershipFlow = require("../../flows/LeadershipFlow");
const leadershipData = require("../../fixtures/app/leadershipData.json");

describe("Executive Leadership Tests", () => {
  leadershipFlow.itAssertsLeaders({
    section: "executive",
    leaders: leadershipData.executive,
  });
});

describe("Senior Leadership Tests", () => {
  leadershipFlow.itAssertsLeaders({
    section: "senior",
    leaders: leadershipData.senior,
  });
});
