angular
.module('mtcApp')
.controller('UserIndexCtrl', UserIndexCtrl);

UserIndexCtrl.$inject = ['User', '$state', '$rootScope'];
function UserIndexCtrl(User, $state, $rootScope){
  const vm  = this;
  vm.users = User.query();
  vm.delete  = usersDelete;

  $rootScope.$broadcast('showHeader');
  function usersDelete(user) {
    User
    .remove({ id: user._id })
    .$promise
    .then(() => {
      $state.go('login');
    });
  }

}
