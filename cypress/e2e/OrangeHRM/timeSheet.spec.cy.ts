
import { login, logout, requestLeave, approveReject } from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'
import TimeSheet from '../../support/pageObjects/timeSheet';
//https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/timesheets/269/entries

const min = 200;
const max = 500;
const randomValue = min + Math.floor(Math.random() * (max - min + 1));
let empNumberResponse: number
let username = `misksawallha${randomValue}`;
let password = "misk123";
let id:any
let timeSheetObject:TimeSheet = new TimeSheet()
describe('Time sheet Scenario', () => {
    beforeEach(() => {
        cy.fixture('addEmployee').as('data')
        cy.fixture('leaveData').as('leaveData')
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        login("Admin", "admin123");
        // add employee 
        cy.get('@data').then((infoData: any) => {
            cy.request({
                method: 'POST',
                url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
                body: {
                    firstName: infoData.addEmployee.firstName,
                    middleName: infoData.addEmployee.middleName,
                    lastName: infoData.addEmployee.lastName,
                    empPicture: infoData.addEmployee.empPicture,
                    employeeId: infoData.addEmployee.employeeId
                }
            }).then((response) => {
                //the id for the emp
                empNumberResponse = response.body.data.empNumber
            }).then(() => {
                cy.request({
                    method: 'POST',
                    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users',
                    body: {
                        username: username,
                        password: password,
                        status: true,
                        userRoleId: 2,
                        empNumber: empNumberResponse
                    }
                }).then((response) => {
                    expect(response).property('status').to.eq(200);
                });
            })
        })
    });
    it("logout and then login", () => {
        logout();
        login(username, password);
        cy.wait(100)
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/time/viewMyTimesheet')
        cy.api({
            method: 'GET',
            url: '/web/index.php/api/v2/time/timesheets/default?date=2023-10-23',
        }).then((response) => {
            id=response.body.data.id
            console.log(response)
            cy.api({
                method: 'PUT',
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/timesheets/${id}/entries`,
                body: {
                    "entries": [
                        {
                            projectId: 2,
                            activityId: 11,
                            dates: {
                                "2023-10-23": { "duration": "09:00" }
                            }
                        }
                    ],
                    deletedEntries: []
                }
            })
        })
        .then(()=>{
                cy.request({
                    method: 'PUT',
                    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/timesheets/${id}`,
                    body: {
                        action:"SUBMIT"
                    }
                  }).then((response)=>{
                     console.log(response)
                  }).then(()=>{
            logout();
            login('Admin', 'admin123');
            cy.get(':nth-child(4) > .oxd-main-menu-item').click()
            timeSheetObject.findMyTimeSheet('Misk Naser sawallha')
        })
       
    })
})
});