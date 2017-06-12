angular
  .module('mtcApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$location'];
function MainCtrl($rootScope, CurrentUserService, $state, $location) {

  const vm = this;

  vm.showHeader = false;

  SC
  .initialize({
    client_id: 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM'
  });

  $rootScope.$on('showHeader', () => {
    vm.showHeader = true;
  });

  $rootScope.$on('hideHeader', () => {
    vm.showHeader = false;
  });

  
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
