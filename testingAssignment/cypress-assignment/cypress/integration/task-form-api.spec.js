describe("Task form submit", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Add a new item on submit of form", () => {
    const taxt = "hello";

    cy.server();
    cy.route("POST", "/api/task", {
      id: 1,
      taskName: taxt,
      isCompleted: false,
    });

    cy.get(".task-input").type(taxt).type("{enter}");

    cy.get(".task-list li").should("have.length", 1).and("contain", taxt);
  });

  it("add a new item on failure", () => {
    const taxt = "hello";

    cy.server();
    cy.route("POST", "/api/task", {});

    cy.get(".task-input").type(taxt).type("{enter}");

    cy.get(".error-id").should("be.visible");
  });
});
