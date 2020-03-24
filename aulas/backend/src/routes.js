const express = require('express');
const routes = express.Router();

/**
* importação dos controllers
*/

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionControlle = require('./controllers/SessionCOntroller');

routes.post('/sessions', SessionControlle.create);

routes.get('/ongs', OngController.index);
routes.post("/ongs", OngController.create);

routes.get('/profile', ProfileController.index);

routes.post("/incidents", IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.delete);


module.exports = routes;