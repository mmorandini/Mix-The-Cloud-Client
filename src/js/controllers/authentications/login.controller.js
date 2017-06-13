angular
  .module('mtcApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService','$state','$rootScope'];
function LoginCtrl(User, CurrentUserService, $state, $rootScope) {
  const vm = this;
  $rootScope.$broadcast('showHeader');
  vm.login = () => {
    User
      .login(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.getUser();
        if(vm.user){
          $state.go('home');
          console.log('hey, u are logged in');
        }
      }, err => {
        console.log('LoginCtrl error: ', err);
      });
  };
}
