describe("toggle-theme", () => {
  it("should change theme", async () => {
    cy.visit("/");

    cy.get("body").then((el) => {
      const body = el.get(0);
      const { backgroundColor } = getComputedStyle(body);

      // toggle the theme
      cy.get(`[data-cy="toggle-theme"]`).click();

      cy.get("body").then((elNext) => {
        const bodyNext = elNext.get(0);
        const backgroundColorNext = getComputedStyle(bodyNext).backgroundColor;

        // asset body background-color changed
        expect(backgroundColor).not.to.eq(backgroundColorNext);
      });
    });
  });
});
