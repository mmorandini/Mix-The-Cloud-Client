angular
  .module('mtcApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  SC
  .initialize({
    client_id: 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM'
  });

  const vm = this;
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });
  vm.logout = () => {
    CurrentUserService.removeUser();
    // $state.go('login');
  };
  
  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });


}
