const express = require('express');
const route = express.Router();

//Import Controllers
const homeController = require('../controllers/homeController')
const excelController = require('../controllers/excelController')

//Routers
route.get('/', homeController.index);

route.get('/excel', excelController.createExcel)

module.exports = route;