import LoginPage from '../../pageObjects/loginPage'

const loginObj: LoginPage = new LoginPage();

const baseUrl =`https://opensource-demo.orangehrmlive.com`
let leaveId: number

export const URLs = {
    users: `${baseUrl}/api/users`,
    leaveRequests: `${baseUrl}/web/index.php/api/v2/leave/leave-requests`,
}

export function login(username: string, password: string) {
    loginObj.login(username, password);
  }

export function logout(){
    loginObj.logout()
  }

export function requestLeave(comment: string, duration:any, fromDate: string, leaveTypeId: number, partialOption: string, toDate: string){
    cy.request({
        method: 'POST',
        url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-requests`,
        body: {
            comment: comment,
            duration: duration,
            fromDate: fromDate,
            leaveTypeId: leaveTypeId,
            partialOption: partialOption,
            toDate: toDate,
        }
      }).then((response) => {
        console.log(response.body)
        leaveId = response.body.data.id;
        console.log("hi")
        return response
      });
}



export function approveReject(){
  console.log("approveReject " +leaveId )
  cy.request({
      method: 'PUT',
      url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
      body: {
        action: "APPROVE"
      }
    })
}
