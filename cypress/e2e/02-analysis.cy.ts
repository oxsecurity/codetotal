import { submitSnippet } from "./utils/submit-snippet";

describe("analysis", () => {
  it("should pass the happy flow", () => {
    cy.visit("/");

    // submit button disabled by default
    cy.get(`[data-cy="submit"]`).should("be.disabled");

    submitSnippet();

    // assert location changed to /report/:requestId
    cy.location().should((loc) => {
      expect(loc.pathname.startsWith("/report")).to.be.true;
    });
  });
});
