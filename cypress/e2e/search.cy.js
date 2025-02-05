describe("Search Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should filter characters based on search input", () => {
    cy.get('input[placeholder="Search characters..."]').type("Luke");
    cy.get(".character-card").should("have.length.greaterThan", 0);
    cy.get(".character-card").first().should("contain", "Luke");
  });
});
