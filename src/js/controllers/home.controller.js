angular
.module('mtcApp')
.controller('HomeCtrl', HomeCtrl);


HomeCtrl.$inject = ['$rootScope'];
function HomeCtrl($rootScope){

	$rootScope.$broadcast('hideHeader');

}