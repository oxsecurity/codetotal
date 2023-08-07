import { submitSnippet } from "./utils/submit-snippet";

describe("report", () => {
  it("should show initial report state", () => {
    cy.visit("/");

    submitSnippet();

    // asset the score & progress is 0
    cy.get(`[data-cy="score"]`).should("contain.text", "0");
    cy.get(`[data-cy="progress"]`).should("contain.text", "0%");

    // asset resource value and header not empty
    cy.get(`[data-cy="resource-value"]`).should("not.be.empty");
    cy.get(`[data-cy="report-header"]`).should("not.be.empty");
  });
});
