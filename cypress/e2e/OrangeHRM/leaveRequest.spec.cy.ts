
import { login, logout, requestLeave, approveReject } from '../../support/helpers/orangeHRM/leaveRequestHelper';
import { checkDataInTable } from '../../support/utils/orangeHRMUtils/checkDataInTable'

const min = 200;
const max = 500;
const randomValue = min + Math.floor(Math.random() * (max - min + 1));
let empNumberResponse: number
let username = `misksawallha${randomValue}`;
let password = "misk123";

describe('Leave Request Scenario', () => {
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
          firstName:  infoData.addEmployee.firstName,
          middleName: infoData.addEmployee.middleName,
          lastName:   infoData.addEmployee.lastName,
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
      }).then(() => {
        //add
        cy.request({
          method: 'POST',
          url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements',
          body: {
            empNumber: empNumberResponse,
            leaveTypeId: 9,
            fromDate: "2023-01-01",
            toDate: "2024-08-31",
            entitlement: "20"
          }
        }).then((response) => {
          expect(response).property('status').to.eq(200);
        });
      });
    })
  });


  it("logout and then login", () => {
    logout();
    login(username, password);
    cy.get('@leaveData').then((infoData: any) => {
      requestLeave(
        infoData.leaveRequest.comment,
        infoData.leaveRequest.duration,
        infoData.leaveRequest.fromDate,
        infoData.leaveRequest.leaveTypeId,
        infoData.leaveRequest.partialOption,
        infoData.leaveRequest.toDate);

    cy.then(() => {
      logout();
      login("Admin", "admin123");
      approveReject();
      logout();
      login(username, password);
      console.log("after login")
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList")
      cy.get('@data').then((infoData1: any) => {
      checkDataInTable('.oxd-table', ["", `${infoData.leaveRequest.fromDate} to ${infoData.leaveRequest.toDate}`, `${infoData1.addEmployee.firstName} ${infoData1.addEmployee.middleName} ${infoData1.addEmployee.lastName}`]);
      })

    });
    });
  })

});