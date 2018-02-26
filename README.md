# HRLA-Scheduler-api

## API Routes + Responses

List of all API endpoints and what to expect:

### '/login'

* GET: response - ``` { result } ```
** SUCCESS: returns all User info with contact info
** FAILURE: returns obj with error message and error boolean

* POST: accepts - ``` { login, password } ``` response - ``` { result } ```
** SUCCESS: User is authorized and returns User info
** FAILURE: returns obj with error message and login, password boolean describing which one failed. Example: Login fail = ``` { message: 'Error finding Login', login: false, password: null } ```

