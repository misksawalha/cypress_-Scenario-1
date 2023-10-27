import addUser from '../../../support/helpers/APIExampleHelper/signupHelper'

describe('Signup logic',{tags:'@test'},()=>{
        it('signup: user should be able to create new user',()=>{
            addUser.addNewUserViaApi().then((resolve)=>{
              cy.log(`${resolve}`)
            })
        })
})