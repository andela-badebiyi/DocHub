angular.module('dochub.controllers').controller('authController', ['$scope', 'Flash', 'Auth', '$state', '$rootScope', function($scope, Flash, Auth, $state, $rootScope){
  $scope.model = {};
  $scope.model.username = '';
  $scope.model.password = '';
  $scope.model.validation = false;
  $scope.model.submit = function(valid){
    if(valid){
      $scope.login();
    } else {
      Flash.create('danger', 'invalid username/email');
    }
  }
  $scope.login = function(){
    user = {username: $scope.model.username,
      password: $scope.model.password};

    Auth.login(user, function(res){
      if(res.status == 'failed'){
        Flash.create('danger', res.response);
      } else {
        console.log($rootScope.currentUser);
        $state.go('dashboard');
      }
    });
  }
}]);