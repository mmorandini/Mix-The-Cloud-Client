angular
  .module('mtcApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$location'];
function MainCtrl($rootScope, CurrentUserService, $state, $location) {

  const vm = this;

  // $rootScope.currentPath = $location.$$url;
  // console.log(vm.currentPath);

  SC
  .initialize({
    client_id: 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM'
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
