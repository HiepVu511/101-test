describe("Login and redirect flow", () => {
  it("Redirect to correct route before and after login.", () => {
    const url = "http://localhost:5173";

    cy.visit(url);

    cy.url().should("equal", `${url}/login?reAuth=1`);

    cy.contains("Your session has expired. Please login again.");

    cy.get('input[name="username"]').type("abc");
    cy.get('input[type="password"]').type("abc");
    cy.get('button[type="submit"]').click();
  });

  it("Show error message correctly when login with incorrect credentials.", () => {
    cy.intercept(
      {
        method: "POST",
        url: "https://sandbox.101digital.io/token",
      },
      { statusCode: 400 }
    );

    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("abc");
    cy.get('input[type="password"]').type("this is a incorrect password???");
    cy.get('button[type="submit"]').click();

    cy.contains("Incorrect username or password.");
  });

  it("Validate password correctly.", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[name="username"]').type("abc");
    cy.get('input[type="password"]').type("abc");
    cy.get('button[type="submit"]').click();

    cy.contains("Your password must have at least 10 characters.");
  });
});
