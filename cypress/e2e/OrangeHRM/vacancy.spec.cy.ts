
import { login, logout, requestLeave, approveReject } from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'
import Vacancy from '../../support/pageObjects/addVacancy';
//https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies
const min = 200;
const max = 500;
const randomValue = min + Math.floor(Math.random() * (max - min + 1));
let vacancyId: number
let username = `misksawallha${randomValue}`;
let password = "misk123";
let vacancyObject: Vacancy = new Vacancy()
let vacancyName: string
describe('Vacancy Scenario', () => {
    beforeEach(() => {
        cy.fixture('addEmployee').as('data')
        cy.fixture('leaveData').as('leaveData')
        cy.fixture('vacancy').as('vacancyData')
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        login("Admin", "admin123");

        cy.get('@vacancyData').then((infoData: any) => {
            vacancyName = infoData.vacancyData.name + randomValue + `m`
            cy.request({
                method: 'POST',
                url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies',
                body: {
                    description: infoData.vacancyData.description,
                    employeeId: infoData.vacancyData.employeeId,
                    isPublished: infoData.vacancyData.isPublished,
                    jobTitleId: infoData.vacancyData.jobTitleId,
                    name: infoData.vacancyData.name + randomValue + `m`,
                    numOfPositions: infoData.vacancyData.numOfPositions,
                    status: infoData.vacancyData.status
                }
            }).then((response) => {
                console.log(response)
                vacancyId = response.body.data.id
                vacancyObject.vacancyPage()
                vacancyObject.findMyVacancy(vacancyName)
            })

        })
    });
    it('update vacancy', () => {
        vacancyObject.uploadFile()
        cy.get('.oxd-file-div > .oxd-icon').click({force:true}) 
        cy.get('input[type=file]').selectFile("cypress/fixtures/test.txt",{force:true}); 
        cy.wait(200)
       cy.get(':nth-child(3) > .oxd-form > .oxd-form-actions > .oxd-button--secondary').click({force:true}) 
       cy.get('.orangehrm-container',{timeout:30000}).should('contain','test.txt') 
    })
});
