### Sela Backend REST API
Sela includes a REST API in the backend that performs business-critical operations on behalf of the client. The following is an outline of the REST API\*:

- **VerifyToken**
  - Route: /verifyToken
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: ----------------
  - Response: ----------------

- **Register**
  - Route: /register
  - Method: POST
  - Parameters:
    - Header: ----------------
    - Body:
      - *firstName*: user's first name
      - *lastName*: user's last name
      - *email*: user's e-mail address
      - *phone*: user's phone number
      - *publicKey*: user's public key
      - *password*: user's password
  - Response: ----------------

- **Login**
  - Route: /login
  - Method: POST
  - Parameters:
    - Header: ----------------
    - Body:
      - *email*: user's e-mail address
      - *phone*: user's phone number
      - *password*: user's password
  - Response: ----------------

- **GetPhone**
  - Route: /phone
  - Method: GET
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: ----------------
  - Response:
    - *phone*: user's current phone number

- **GetEmail**
  - Route: /email
  - Method: GET
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: ----------------
  - Response:
    - *phone*: user's current e-mail address

- **ChangePhone**
  - Route: /changePhone
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body:
      - *newPhone*: user's new phone number
  - Response: ----------------

- **ChangeEmail**
  - Route: /changeEmail
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body:
      - *newEmail*: user's new email address
  - Response: ----------------

- **ChangePassword**
  - Route: /changePassword
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body:
      - *oldPassword*: user's old password
      - *newPassword*: user's new password
  - Response: ----------------

- **PostProject**
  - Route: /project
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body:
      - *name*: name of project
      - *description*: description of project
      - *startDate*: start date of project
      - *endDate*: end date of project
  - Response: ----------------

- **GetProjects**
  - Route: /projects
  - Method: GET
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: ----------------
  - Response:
    - *projects*: list of projects with which user is associated

- **PostTask**
  - Route: /task
  - Method: POST
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: 
      - *name*: name of task
      - *description*: description of task
      - *project*: id of project with which task is associated
      - *dueDate*: due date of task 
      - *assignedTo*: id of task assignee
      - *createdBy*: id of task creator
  - Response: ----------------

- **GetTasks**
  - Route: /tasks
  - Method: GET
  - Parameters:
    - Header:
      - *token*: token authenticating user in system
    - Body: ----------------
  - Response:
    - *tasks*: list of tasks with which user is associated

\**Note*:
- The root URL for each route is https://sela-labs.herokuapp.com.
- All routes return a *success* field, indicating whether the call was successful, and a *message* field for unseccussful calls, explaining the failure mode
