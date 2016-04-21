var express = require('express');
var bodyparser = require('body-parser');
var config = require('./config');
var documentRoute = require('./server/routes/document');
var userRoute = require('./server/routes/user');
var roleRoute = require('./server/routes/role');
var authRoutes = require('./server/controllers/authController');
var userRoutes = require('./server/controllers/userController');


var middleware = require('./server/middleware/middlewares');

var app = express();
var router = express.Router();
var roleRouter = express.Router();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use("/assets",express.static(__dirname + "/app/views/assets"));
app.use("/scripts",express.static(__dirname + "/app/scripts"));
app.use("/views", express.static(__dirname + "/app/views"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//register middleware for routes
router.use(middleware.userIsAuthenticated);
roleRouter.use(middleware.userIsAdmin);

//use this middleware on all routes
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({extended: true}));

//log a user in
app.post('/api/users/login', authRoutes.login);

//create a new user
app.post('/api/users', userRoutes.register);

//homepage
app.get('/api', function(req, res){
  return res.json({response: 'Welcome to our home page'});
});

userRoute(router);
documentRoute(router);
roleRoute(roleRouter);


//mount roleRouter
app.use('/api/roles', roleRouter);

//mount router
app.use('/api', router);

//go to web page
app.use(function(req, res){
  res.render('index');
})

//deploy
server = app.listen(3000);


//export for testing
exports.app = app;
exports.serv = server;