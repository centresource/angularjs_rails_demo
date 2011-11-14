/* http://docs.angularjs.org/#!angular.widget */

angular.directive('my:cycle', function(expr,el){
  return function(container){
    this.$watch(function() {
      if ($(container).children().length) {
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
