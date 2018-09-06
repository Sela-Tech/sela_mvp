### Sela Backend REST API

Sela includes a REST API in the backend that performs business-critical operations on behalf of the client. The following is an outline of the REST API\*:

- **Get Organizations**

  - Route: /organizations
  - Method: GET
  - Parameters:
    - Header: ----------
    - Body: ----------------
  - Response: ----------------

* **VerifyToken**

  - Route: /verifyToken
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body: ----------------
  - Response: ----------------

* **Register**

  - Route: /register
  - Method: POST
  - Parameters:

    - Header: ----------------
    - Body:

      - _firstName_: user's first name
      - _lastName_: user's last name
      - _email_: user's e-mail address
      - _phone_: user's phone number
      - _publicKey_: user's public key
      - _password_: user's password
      - _organization_: Obj -> {
        name: i.e name of organization
        }

  - Response: ----------------

* **Login**

  - Route: /login
  - Method: POST
  - Parameters:
    - Header: ----------------
    - Body:
      - _email_: user's e-mail address
      - _phone_: user's phone number
      - _password_: user's password
  - Response: ----------------

* **GetPhone**

  - Route: /phone
  - Method: GET
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body: ----------------
  - Response:
    - _phone_: user's current phone number

* **GetEmail**

  - Route: /email
  - Method: GET
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body: ----------------
  - Response:
    - _phone_: user's current e-mail address

* **ChangePhone**

  - Route: /changePhone
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body:
      - _newPhone_: user's new phone number
  - Response: ----------------

* **ChangeEmail**

  - Route: /changeEmail
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body:
      - _newEmail_: user's new email address
  - Response: ----------------

* **ChangePassword**

  - Route: /changePassword
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body:
      - _oldPassword_: user's old password
      - _newPassword_: user's new password
  - Response: ----------------

* **PostProject**

  - Route: /project
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body:
      - _name_: name of project
      - _description_: description of project
      - _startDate_: start date of project
      - _endDate_: end date of project
      - _location_: Obj -> {
        name: i.e name of location,
        }
  - Response: ----------------

* **GetProjects**

  - Route: /projects
  - Method: GET
  - Parameters:
    - Header:
      - _token_: token authenticating user in system)
      - _public_: boolean value representing visibility of project
    - Body: ----------------
  - Response:
    - _projects_: list of projects with which user is associated

* **PostTask**

  - Route: /task
  - Method: POST
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body:
      - _name_: name of task
      - _description_: description of task
      - _project_: id of project with which task is associated
      - _dueDate_: due date of task
      - _assignedTo_: id of task assignee
      - _createdBy_: id of task creator
  - Response: ----------------

* **GetTasks**
  - Route: /tasks
  - Method: GET
  - Parameters:
    - Header:
      - _token_: token authenticating user in system
    - Body: ----------------
  - Response:
    - _tasks_: list of tasks with which user is associated

\*_Note_:

- The root URL for each route is https://sela-labs.herokuapp.com.
- All routes return a _success_ field, indicating whether the call was successful, and a _message_ field for unseccussful calls, explaining the failure mode
