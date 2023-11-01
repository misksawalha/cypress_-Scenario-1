class addPost {
    element = {
        buzzBtn: () => cy.get(':nth-child(12) > .oxd-main-menu-item'),
        postLoader:()=>cy.get('.oxd-loading-spinner-container'),
        postBtn:()=>cy.get('.oxd-buzz-post-slot > .oxd-button')
    }

    buzzBtnClick() {
        this.element.buzzBtn().click()
    }
    loaderStatus(){
        this.element.postLoader().should('not.exist')
    }
    postBtnClick(){
        this.element.postBtn().click({force:true})
    }
}
export default addPost