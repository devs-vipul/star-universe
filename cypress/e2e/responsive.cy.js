describe("Responsive Design", () => {
  it("should collapse sidebar on small screens", () => {
    cy.viewport("iphone-6");
    cy.visit("http://localhost:5173");
    cy.get("aside").should("have.class", "w-16");
  });
});
