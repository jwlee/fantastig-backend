
Using node.js,express.js for backend, jwt for auth, mongodb for DB

To test endpoint, you can access it in https://jwlee-playground-backend.herokuapp.com/

Available endpoints:

POST /api/user/register
POST /api/user/login
POST /api/user/characters

GET /api/character		- get all characters
GET /api/character/:id		- get a character from given id
POST /api/character		- create a character
PUT /api/character/:id		- update a character for given id
DELETE /api/character/:id	- delete a character for given id

To run in dev: `npm run dev`
To run in prod: `npm start`
