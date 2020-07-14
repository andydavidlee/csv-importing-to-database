const express = require('express');


const router = express.Router();

module.exports = params => {

const {jsonService} = params;
  
   router.get('/', async(req, res, next) => {
       try {
        const csvList = await jsonService.getList();
        return res.render('index', {csvList});
       } catch(err) {
           return next(err);
       }
  });
  
  return router; 
  };