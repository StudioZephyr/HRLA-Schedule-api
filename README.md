# HRLA-Scheduler-api

## Start up

Create new ``` .env ``` and copy contents of ``` sample.env ```.
Fill in as necessary.
Use DEV_DB_URL during development.
(ElephantSQL is recommended).

Install dependencies:
```
npm install
or
yarn install
```

Use following script to start dev :
```
npm run start-dev
```

## Database Models + Attributes

Example: 
```
### MODEL NAME

* Attribute Name: data type & (additional information)
```

### USER

* type: String & Cannot be null
* login: String & Cannot be null
* password: String & Cannot be null
* groupName: String & Can be null
* isNew: Boolean & Cannot be null (Default: true)

### CONTACT

* name: String & Cannot be null
* email: String & Cannot be null

### ROOM

* name: String & Cannot be null

### TIMESLOT

* title: String & Cannot be null
* start: Date & Cannot be null
* end: Date & Cannot be null
* finished: Boolean & Cannot be null (Default: false)

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

### '/rooms'

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all rooms
  * FAILURE: returns obj with error message and rooms boolean as false

### '/room'

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all rooms including array of their timeslots
  * FAILURE: returns obj with error message and rooms boolen as false

* POST: accepts - ``` { name } ``` | response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful creation of room
  * FAILURE: returns obj with error message and room boolean as false

### '/room/:id'

PARAM: ROOM ID.

* PUT: accepts - ``` { name } ``` | response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful update
  * FAILURE: returns obj with error message and updated boolean as false

* DELETE: response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful deletion
  * FAILURE: returns obj with error message and deleted boolean as false

### '/timeslot'

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all active Timeslots
  * FAILURE: returns obj with error message and timeslot boolean as false

* POST: accepts - ``` { title, start, end, finished } ``` | response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful creation
  * FAILURE: returns obj with error message and timeslot boolean as false

### '/timeslot/:id'

PARAM: USER ID.

* GET: response - ``` { result: obj } ```
  * SUCCESS: returns array of all active Timeslots for single User Id
  * FAILURE: returns obj with error message and timeslot boolean as false

PARAM: TIMESLOT ID.

* PUT: accepts - ``` { title, start, end, finished } ``` | response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful update
  * FAILURE: returns obj with error message and updated boolean as false

* DELETE: response - ``` { result: str/obj } ```
  * SUCCESS: returns string indicating successful deletion
  * FAILURE: returns obj with error message and deleted boolean as false
