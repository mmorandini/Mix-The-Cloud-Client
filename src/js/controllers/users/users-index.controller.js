angular
.module('mtcApp')
.controller('UserIndexCtrl', UserIndexCtrl);

UserIndexCtrl.$inject = ['User', '$state'];
function UserIndexCtrl(User, $state){
  const vm  = this;
  vm.users = User.query();
  vm.delete  = usersDelete;


  function usersDelete(user) {
    User
    .remove({ id: user._id })
    .$promise
    .then(() => {
      $state.go('login');
    });
  }

}
