angular
.module('mtcApp')
.controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$stateParams'];
function UserShowCtrl(User, $stateParams){
  const vm  = this;
  vm.user = User.get($stateParams);
}
