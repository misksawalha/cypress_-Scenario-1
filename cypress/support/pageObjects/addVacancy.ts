class Vacancy {
    element = {
        Recruitment: () => cy.get(':nth-child(5) > .oxd-main-menu-item > .oxd-text'),
        vacancyBtn: () => cy.get('.oxd-topbar-body-nav > ul > :nth-child(2)'),
        tableRecord: () => cy.get('.oxd-table-body .oxd-table-row'),
        loader:()=>cy.get('.oxd-form-loader > .oxd-loading-spinner-container'),
        uploadeBtn:()=>cy.get('.orangehrm-header-container > .oxd-button'),
        tableLoader:()=>cy.get('.oxd-table-loader > .oxd-loading-spinner-container')
    }

    vacancyPage() {
        this.element.Recruitment().click();
        this.element.vacancyBtn().click();
    }

    findMyVacancy(vacancyName: string) {
        cy.get('.oxd-table-row.oxd-table-row--with-border')
            .find(`:contains(${vacancyName})`)
            .should('exist')
            .then(($element) => {
                // Navigate to the parent container and find the button element inside it
                cy.wrap($element)
                    .parent('.oxd-table-row')
                    .find('i.oxd-icon.bi-pencil-fill')
                    .click({ force: true });
            });
    }
    uploadFile(){
        this.element.loader().should('not.exist')
        this.element.uploadeBtn().click()
    }
    loaderFun(){
        this.element.loader().should('not.exist')
        this.element.tableLoader().should('not.exist')
    }
}

export default Vacancy;
