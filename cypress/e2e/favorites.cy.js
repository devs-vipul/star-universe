describe("Favorites Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should add a character to favorites", () => {
    cy.get(".character-card").first().find("button").click();
    cy.get(".toast").should("contain", "Added");
    cy.get("nav").contains("Favorites").click();
    cy.get(".favorite-card").should("have.length", 1);
  });

  it("should remove a character from favorites", () => {
    cy.get(".character-card").first().find("button").click();
    cy.get("nav").contains("Favorites").click();
    cy.get("[data-testid='remove']").click();
    cy.get(".toast").should("contain", "Removed");
    cy.get(".favorite-card").should("have.length", 0);
  });

  it("should edit a character's details", () => {
    cy.get(".character-card").first().find("button").click();
    cy.get("nav").contains("Favorites").click();
    cy.get("[data-testid='edit']").click();
    cy.get("input[type='text']").first().clear().type("150");
    cy.get("input[type='text']").last().clear().type("Female");
    cy.get("button").contains("Save Changes").click();
    cy.get(".toast").should("contain", "Details Updated!");
    cy.get(".favorite-card").first().should("contain", "150");
    cy.get(".favorite-card").first().should("contain", "Female");
  });
});
