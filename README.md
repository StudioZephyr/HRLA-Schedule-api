# HRLA-Scheduler-api

## API Routes + Responses

List of all API endpoints and what to expect:

### '/login'

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns all User info with contact info
  * FAILURE: returns obj with error message and error boolean

* POST: accepts - ``` { login, password } ``` | response - ``` { result: obj } ```
  * SUCCESS: User is authorized and returns User info
  * FAILURE: returns obj with error message and login, password boolean describing which one failed. Example: Login fail = ``` { message: 'Error finding Login', login: false, password: null } ```

### '/login/:id'

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
  * FAILURE: return obj with error message and found, user boolean describing which one failed


