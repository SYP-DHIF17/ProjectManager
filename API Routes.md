# API Routes

## User

* POST `/api/auth/login` -- einloggen
* GET `/api/user/:id` -- infos holen
* PUT `/api/user/:id` -- infos ändern
* GET `/api/user/:id/events` -- events holen
* POST `/api/user/:id/event` -- event erstellen
* PUT `/api/user/:id/events/:eventid` -- event ändern

## Project

* GET `/api/project/:id` -- Projektinfos kriegen

### Members

* GET `/api/project/:id/members` -- Members kriegen
* GET `/api/project/:id/member/:memberid`

### Customer

* GET `/api/project/:id/customers` -- Customers kriegen
* GET `/api/project/:id/customer/:customerid` -- customer kriegen

### Teams

* GET `/api/project/:id/teams` -- Teams holen
* GET `/api/project/:id/team/:teamid` -- team holen
* POST `/api/project/:id/team` -- Team erstellen
* PUT `/api/project/:id/team/:teamid` -- Team ändern
* GET `/api/project/:id/team/:teamid/members` -- teammember kriegen

### Events

* GET `/api/project/:id/events` -- Events holen
* GET `/api/project/:id/event/:eventid` -- Event holen
* POST `/api/project/:id/event` -- Event erstellen
* PUT `/api/project/:id/event/:eventid` -- Event ändern

### ProjectParts

* GET `/api/project/:id/parts` -- Project Parts holen

* GET `/api/project/:id/part/:partid` -- Part holen

* POST `/api/project/:id/part` -- Part erstellen

* PUT `/api/project/:id/part/:partid` -- part ändern

### WorkPackages
* GET `/api/project/:id/part/:partid/workpackages` -- workpackages kriegen für projectparts
* GET `/api/project/:id/part/:partid/workpackage/:workpackeid` -- workpackage infos kriegen
* GET `/api/project/:id/part/:partid/workpackage/:workpackageid/tickets` -- tickets holen
* GET `/api/project/:id/part/:partid/workpackage/:workpackageid/ticket/:tickedid` -- ticket infos holen
* POST `/api/project/:id/part/:partid/workpackage/:workpackageid/ticket` -- ticket erstellen

### Employee

* GET `/api/project/:id/employees` -- Employees holen
* spezifischen employee holen durch: GET user
* POST `/api/project/:id/employee` -- Employee erstellen
* DELETE `/api/project/:id/employee` -- EmplyeeID mitgeben

