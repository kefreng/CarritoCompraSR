describe("Save Product", () => {
  it("Should save product", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Guardar producto").click();

    cy.contains("Nombre:").click().type("TestNombre");
    cy.contains("Descripcion:").click().type("DescriptProduct");
    cy.contains("Imagen:").click().type("www.localhost.com/product1");
    cy.contains("Precio:").click().type("112233");

    cy.contains("Guardar").click();

    cy.contains("Felicitaciones!. Producto guardado").should("be.visible");
  });

  it("Should save product using only tabs", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Guardar producto").should("be.visible");

    cy.get("body").tab();
    cy.focused().contains("Guardar producto").click();

    cy.contains("Formulario para guardar producto").should("be.visible");
    cy.get("body")
      .tab()
      .type("TestNombre")
      .tab()
      .type("DescriptProduct")
      .tab()
      .type("www.localhost.com/product1")
      .tab()
      .type("112233")
      .tab()
      .type("{enter}");

    cy.contains("Felicitaciones!. Producto guardado").should("be.visible");
  });
});
