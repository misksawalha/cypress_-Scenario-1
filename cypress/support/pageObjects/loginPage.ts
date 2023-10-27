export default class loginPage{
    elements = {
        userName: () => cy.get('[placeholder = "Username"]'),
        password: () => cy.get('[placeholder = "Password"]'),
        loginBtn: () => cy.get('button'),
        forgetPassword: () => cy.get('.orangehrm-login-forgot'),
        resetUserName: () => cy.get('[placeholder = "Username"]'),
        forgetBtn: () => cy.get('[type = "submit"]'),
        message: () => cy.get('.orangehrm-forgot-password-title'),

        //logout
        logout: () => cy.get('.oxd-userdropdown-name'),

    }

    login (userName: string, password: string){
        this.elements.userName().type(userName);
        this.elements.password().type(password);
        this.elements.loginBtn().click();
    }
    forgetPassword(resetPassword: string, message: string){
        this.elements.forgetPassword().click();
        this.elements.resetUserName().type(resetPassword);
        this.elements.forgetBtn().click(); 
        this.elements.message().should('contain', message);
    }
    logout(){
        this.elements.logout().click({ force: true })
        cy.contains('Logout').click({ force: true })
    }
   
}