/* http://docs.angularjs.org/#!angular.widget */

angular.module("directives", []).directive('myCycle', function(){

  return function(scope, container){
    scope.$watch(function() {
      if (container.children().length) {
        $(container).cycle({ fx: 'fade',
                           speed: 500,
                           timeout: 3000,
                           pause: 1,
                           next: '#next',
                           prev: '#prev' });
      }
    });
  }
});
