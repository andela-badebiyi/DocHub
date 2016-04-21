angular.module('dochub.services').service('Auth', ['$http', '$rootScope', '$window', function($http, $rootScope, $window){
  this.login = function(user, cb){
    config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    req = $http.post($rootScope.apiBaseUrl+'users/login', user);
    req.success(function(data){
      $window.localStorage.setItem('user', data);
      $rootScope.currentUser = data;
      cb(data);
    })
  }
  this.logout = function(cb){
    $window.localStorage.setItem('user', undefined);
    cb(data);
  }
  this.isUserLoggedIn = function(){
    user = $window.localStorage.getItem('user');
    if(user){
      if(this.tokenHasExpired(user.token)){
        return false;
      } else {
        return true;
      }
    }else{
      return false;
    }
  }
  this.tokenHasExpired = function(){

  }
}]);