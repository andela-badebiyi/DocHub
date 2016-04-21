angular.module('dochub.controllers', []);
angular.module('dochub.services', []);

require('./controllers/authController');
require('./services/auth');

angular.module('dochub', [require('angular-ui-router'), require('angular-loading-bar'), 'dochub.controllers', 'dochub.services', 'ngMaterial', 'ngFlash', 'ngAnimate']).config(function($stateProvider, $locationProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.ejs',
    controller: 'authController'
  }).
  state('register', {
    url: '/register',
    templateUrl: 'views/register.ejs'
  }).
  state('home', {
    url: '/',
    templateUrl: 'views/home.ejs'
  }).
  state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.ejs'
  })
  $locationProvider.html5Mode(true);
}).run(function($rootScope){
  $rootScope.apiBaseUrl = "http://localhost:3000/api/";
})