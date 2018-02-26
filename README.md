# HRLA-Scheduler-api

## API Routes + Responses

List of all API endpoints and what to expect:

### '/login'

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all User info array of all its contact info
  * FAILURE: returns obj with error message and error boolean

* POST: accepts - ``` { login, password } ``` | response - ``` { result: obj } ```
  * SUCCESS: User is authorized and returns User info
  * FAILURE: returns obj with error message and login, password boolean describing which one failed. Example: Login fail = ``` { message: 'Error finding Login', login: false, password: null } ```

### '/login/:id'

PARAM: USER ID.

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns User info obj
  * FAILURE: returns obj with error message and user boolean as false

* PUT: accepts - ``` { login, password, groupName, isNew, type } ``` | response - ``` { result: obj } ```
  * SUCCESS: returns updated User info
  * FAILURE: returns obj with error message and user boolean as false

* DELETE: response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful deletion
  * FAILURE: returns obj with error message and deleted boolean as false

### '/signup'

* POST: accepts - ``` { login, password, groupName, isNew, type } ``` | response - ``` { result: obj } ```
  * SUCCESS: returns created User info obj
  * FAILURE: returns obj with error message and found, user boolean describing which one failed

### 'contact/:id'

PARAM: USER ID.

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all contacts of User Id
  * FAILURE: returns obj with error message and error boolean as false

* POST: accepts - ``` { name, email } ``` | response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful creation of contact
  * FAILURE: returns obj with error message and contact boolean as false

PARAM: CONTACT ID.

* PUT: accepts - ``` { name, email, UserId } ``` | response - ``` { result: obj } ```
  * SUCCESS: returns obj of updated Contact info
  * FAILURE: returns obj with error message and update, contact boolean describing which one or if both failed

* DELETE: response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful deletion
  * FAILURE: returns obj with error message and found/contact boolean describing which one failed
