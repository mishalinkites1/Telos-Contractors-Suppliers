//----------------PACKAGES----------------
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



//----------------MODELS----------------
const models = require('./models/models');
const Estate = models.Estate;
const Resident = models.Resident;
const Poll = models.Poll;
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'telosppj123';


// -----------------ROUTES -----------------
const authRoutes = require('./routes/auth');
const tenderRoutes = require('./routes/tender');


// ----------------- AWS -----------------
const AWS = require('aws-sdk');
let s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});
const fs = require("fs");
const s3Bucket = new AWS.S3( { params: {Bucket: 'telospdf'} } )
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));




//----------------ROUTING----------------
app.use('/', authRoutes);
app.use('/', tenderRoutes);


app.listen(process.env.PORT || 4000, function(){
  console.log("app successfully listening on port 4000");
})
