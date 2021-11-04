describe("Task input form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("visit home page", () => {
    cy.focused().should("have.class", "task-input");
  });

  it("type value in input tag", () => {
    const text = "hello";

    cy.get(".task-input").type(text).should("have.value", text);
  });
});
