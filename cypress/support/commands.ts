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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


declare namespace Cypress{
    interface Chainable <Subject>{
        getByPlaceholder: typeof getByPlaceholder
    }

    interface Chainable {
        // Define the custom command to add a new employee and return their employee number
        addNewEmployee(firstName: string, middleName: string, lastName: string, employeeId: string): Chainable<number>;
      }

}
function getByPlaceholder(placeholder: string){
    return cy.get(`[placeholder=${placeholder}]`)
}
Cypress.Commands.add('getByPlaceholder', getByPlaceholder)


function addNewEmployee(firstName: string, middleName: string, lastName: string, employeeId: string){
    cy.request({
        method: 'POST',
        url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
        body: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          empPicture: null,
          employeeId: employeeId,
        },
      }).then((response) => {
        return response.body.data.empNumber;
      });
}

Cypress.Commands.add('addNewEmployee', addNewEmployee);