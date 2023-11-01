class TimeSheet {
    element = {
        Recruitment: () => cy.get(':nth-child(5) > .oxd-main-menu-item > .oxd-text'),
        vacancyBtn: () => cy.get('.oxd-topbar-body-nav > ul > :nth-child(2)'),
        tableRecord: () => cy.get('.oxd-table-body .oxd-table-row'),
        loader:()=>cy.get('.oxd-loading-spinner-container'),
       
    }

    findMyTimeSheet(timeSheet: string) {
        this.element.loader().should('not.exist')
        cy.get('.oxd-table-row.oxd-table-row--with-border')
            .find(`:contains(${timeSheet})`)
            .should('exist')
            // .then(($element) => {
            //     // Navigate to the parent container and find the button element inside it
            //     cy.wrap($element)
            //         .parent('.oxd-table-row')
            //         .find('i.oxd-icon.bi-pencil-fill')
            //         .click({ force: true });
            // });
    }
    
}

export default TimeSheet;
