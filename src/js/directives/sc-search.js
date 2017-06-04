angular
.module('mtcApp')
.directive('scSearch', scSearch);

scSearch.$inject = [];
function scSearch (){
  return{
    restrict: 'E',
    replace: 'true',
    templateUrl: '/js/views/sc-search.html'
  };
}
