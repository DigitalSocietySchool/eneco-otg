# eneco-otg
a [Sails](http://sailsjs.org) application
Eneco on the Go

# Deployment
* Install `PM2` for production or `nodemon` for development globally on your system
* Run a local MongoDB instance
* Replace sample environment variables
* Launch using `launch.sh` or `launchdev.sh`
To access the API you will need to include a header in an HTTP request called 'apikey' with the value of what is set in launch/launchdev.sh on the API.

The routes are as follows:

GET /api/v1/store
GET /api/v1/store/:id
POST /api/v1/store
PUT /api/v1/store/:id
DELETE /api/v1/store/:id
 
GET /api/v1/card
GET /api/v1/card/:id
POST /api/v1/card
PUT /api/v1/card/:id
DELETE /api/v1/card/:id
 
GET /api/v1/client
GET /api/v1/client/:id
POST /api/v1/client
PUT /api/v1/client/:id
DELETE /api/v1/client/:id
 
GET /api/v1/loan
GET /api/v1/loan/:id
POST /api/v1/loan
PUT /api/v1/loan/:id
DELETE /api/v1/loan/:id
POST /api/v1/loan/:id/start
POST /api/v1/loan/:id/end
POST /api/v1/loan/:id/start
POST /api/v1/loan/:id/end
 
GET /api/v1/powerbank
GET /api/v1/powerbank/:id
POST /api/v1/powerbank
PUT /api/v1/powerbank/:id
DELETE /api/v1/powerbank/:id

The schema for what input each Model takes is available at https://github.com/MediaLab-Amsterdam/eneco-otg/tree/master/api/models

EXAMPLE:
Request: POST /api/v1/store (create a store)
{
  "name": "Test Iain",
  "address": "Amsterdam Centraal"
}
Response:
{
  "name": "Test Iain",
  "address": "Amsterdam Centraal",
  "createdAt": "2016-12-19T10:24:16.985Z",
  "updatedAt": "2016-12-19T10:24:16.985Z",
  "id": "5857b5502d90aab804b4797f"
}


Request: POST /api/v1/client (create a client)
{
  "firstName": "Iain",
  "lastName": "Kettles",
  "address": "MediaLAB"
}
Response:
{
  "firstName": "Iain",
  "lastName": "Kettles",
  "address": "MediaLAB",
  "createdAt": "2016-12-19T10:28:14.587Z",
  "updatedAt": "2016-12-19T10:28:14.587Z",
  "id": "5857b63e2d90aab804b47981"
}

Request: POST /api/v1/card (create a card)
{
  "client": "5857b63e2d90aab804b47981",
  "identifier": "19023889342"
}
Response:
{
  "client": "5857b63e2d90aab804b47981",
  "identifier": "19023889342",
  "status": "inactivated",
  "active": false,
  "createdAt": "2016-12-19T10:29:57.270Z",
  "updatedAt": "2016-12-19T10:29:57.270Z",
  "id": "5857b6a52d90aab804b47982"
}

Request: POST /api/v1/powerbank (create a powerbank)
{
  "store": "5857b5502d90aab804b4797f",
  "identifier": "o2384yo2734234"
}
Response:
{
  "store": "5857b5502d90aab804b4797f",
  "identifier": "o2384yo2734234",
  "status": "unavailable",
  "cycleCount": 0,
  "createdAt": "2016-12-19T10:31:17.884Z",
  "updatedAt": "2016-12-19T10:31:17.884Z",
  "id": "5857b6f52d90aab804b47983"
}

Request: POST /api/v1/loan (create a loan)
{
  "card": "5857b6a52d90aab804b47982",
  "powerbank": "5857b6f52d90aab804b47983"
}
Response:
{
  "card": "5857b6a52d90aab804b47982",
  "powerbank": "5857b6f52d90aab804b47983",
  "status": "inactive",
  "createdAt": "2016-12-19T10:32:05.475Z",
  "updatedAt": "2016-12-19T10:32:05.475Z",
  "id": "5857b7252d90aab804b47984"
}

Request: POST /api/v1/loan/5857b7252d90aab804b47984/start (start a loan)
{
  
}
Response:
{
  "card": "585168162d90aab804b4797b",
  "powerbank": {
    "store": "5851339f2d90aab804b47976",
    "status": "unavailable",
    "identifier": "en1000001",
    "cycleCount": 0,
    "createdAt": "2016-12-14T15:11:22.902Z",
    "updatedAt": "2016-12-19T10:35:10.787Z",
    "id": "5851611a2d90aab804b47978"
  },
  "status": "loaned",
  "createdAt": "2016-12-19T10:32:05.475Z",
  "updatedAt": "2016-12-19T10:35:10.783Z",
  "loanedAt": "2016-12-19T10:35:10.782Z",
  "id": "5857b7252d90aab804b47984"
}
