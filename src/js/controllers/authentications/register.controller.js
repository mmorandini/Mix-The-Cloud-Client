angular
  .module('mtcApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state) {
  const vm = this;

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
