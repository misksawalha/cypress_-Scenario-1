import LoginPage from '../../support/pageObjects/loginPage' 
 
const loginObj: LoginPage = new LoginPage(); 
 
describe("upload file ", () => { 
 
 
    beforeEach( () => { 
     
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"); 
      loginObj.login("Admin", "admin123"); 
 
      cy.get('.oxd-sidepanel-body').contains('Buzz').click(); 
      cy.writeFile('test.txt', 'File test'); 
 
    }) 
 
    it("Add file to the post", () => { 
        cy.fixture('test.txt').then((postText) => { 
            cy.get('.oxd-buzz-post-input').type(postText); 
            cy.get('.oxd-buzz-post-slot > .oxd-button').click({force: true}); 
          }); 
        cy.contains('misk sawallha'); 
      }) 
     
 
})