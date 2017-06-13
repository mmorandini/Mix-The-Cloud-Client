angular
  .module('mtcApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state', '$rootScope'];
function RegisterCtrl(User, CurrentUserService, $state, $rootScope) {
  const vm = this;
  $rootScope.$broadcast('showHeader');
  vm.emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  vm.register = () => {
    if (vm.registerForm.$valid) {
      User
        .register(vm.user)
        .$promise
        .then(() => {
          CurrentUserService.getUser();
          $state.go('home');
        }, err => {
          console.log(err);
        });
    }

  };
}
