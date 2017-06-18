angular
.module('mtcApp')
.controller('HomeCtrl', HomeCtrl);


HomeCtrl.$inject = ['$rootScope'];
function HomeCtrl($rootScope){

	$rootScope.$broadcast('hideHeader');

	$('#home-animated-logo').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
		$('#start-btn').css('display', 'block');
		$('#start-btn').addClass('animated fadeIn');
	});

}