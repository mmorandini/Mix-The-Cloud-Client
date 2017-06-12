angular
.module('mtcApp')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', ];
function Router($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/js/views/users/index.html',
    controller: 'UserIndexCtrl as usersIndex'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UserShowCtrl as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/js/views/users/edit.html',
    controller: 'UsersEditCtrl as usersEdit'
  })
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl as home'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('test', {
    url: '/mixer',
    templateUrl: '/js/views/test.html',
    controller: 'TestCtrl as test'
  });

  $urlRouterProvider.otherwise('/');
}
