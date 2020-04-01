require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

const app = express();
const UserRouter = require('./routes/users');
const OffreRouter = require('./routes/offers');


mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true,  useUnifiedTopology: true,useFindAndModify: false  ,useCreateIndex: true})
mongoose.connection.on('connected', () => {console.log('connected in the database');})
mongoose.connection.on('error', (err) => { console.log('error '+err);});


//------------middlewares----------//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization, Accept, X-Request-With");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
 

app.use(express.static(path.join(__dirname, 'dist ')));


//---------------routes------------//
app.get('/',(req,res) => {
    res.send('i am here')
});
app.use('/users', UserRouter);
app.use('/offers', OffreRouter);
 


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
/*const _PORT= process.env.PORT 
app.listen(_PORT , ()=>{
    console.log('server connected') ;
});  */