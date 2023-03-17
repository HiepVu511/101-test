import Login from "./Login";

describe("<Login />", () => {
  it("renders with all required inputs", () => {
    const customErrorMessage = "Test custom error";

    cy.mount(<Login customError={customErrorMessage} />);

    const form = cy.get("form");

    form.get('input[name="username"]').should("exist");
    form.get('input[type="password"]').should("exist");
    form.get('button[type="submit"]').should("exist");

    cy.contains(customErrorMessage);
  });

  it("validate inputs and show errors correctly", () => {
    cy.mount(<Login />);

    const btn = cy.get('button[type="submit"]');

    cy.get('input[name="username"]').type("abc@gmail.com");
    cy.get('input[type="password"]').type("password");
    btn.click();

    cy.contains("Your password must have at least 10 characters.");
  });
});
