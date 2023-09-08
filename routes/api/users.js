// Purpose: Now that the AJAX req is being made from the browser, we need a route defined on the server that matches that req. However, we want to help other devs know that the router is designed to respond to AJAX reqs with JSON instead of rendering a template or redirecting. To do so, we've created we've namespaced these routes by prefacing them with `/api`. Additionally, we created the route module within a `routes/api` folder.

/* Define the Route */
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', usersCtrl.checkToken);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;