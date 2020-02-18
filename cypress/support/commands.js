// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
let token;
Cypress.Commands.add('Login', () => {
    cy.visit('/#/admin')
    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: {
            username : 'admin',
            password: 'password'
        }
    })
    .then((response) => {
      expect(response.body.token).to.exist;
      token = response.body.token;
    });
});

Cypress.Commands.add('uiLogin', () => {
    cy.get('#username').type('admin')
    cy.get('#password').type('password')
    cy.get('#doLogin').click()
})

Cypress.Commands.add('closeWizard', () => {
    for (let step = 1; step < 5; step++) {
        cy.get('#next').click()
    }
    cy.get('#closeModal').click()
})