var express = require('express');
var router = express.Router();
const { list, register, login, verify, createcomplain, deletecomplain, listcomplian } = require('./../controller/peopleController');

/* GET users listing. */
router.get('/', list);
router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/complain', createcomplain);
router.post('/deletecomplain', deletecomplain);
router.post('/listcomplian', listcomplian);
module.exports = router;
