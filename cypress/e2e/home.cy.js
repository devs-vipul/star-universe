describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should load the home page and display character list", () => {
    cy.get("h1").contains("Characters");
    cy.get(".character-card").should("have.length.greaterThan", 0);
  });

  it("should navigate to character details when a character is clicked", () => {
    cy.get(".character-card").first().click();
    cy.url().should("include", "/character/");
    cy.get("h1").should("exist");
  });
});
