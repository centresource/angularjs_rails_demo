/* http://docs.angularjs.org/#!angular.widget */

angular.directive("my:cycle", function(expr,el){
   return function(container){
       var scope = this;
       var $defer = scope.$service("$defer");

       scope.$watch(expr, function(value) {
         if (value < 1) return;

         $defer(function() {
              $(container).cycle({ fx: 'fade',
                                   speed: 500,
                                   timeout: 3000,
                                   pause: 1,
                                   next: '#next',
                                   prev: '#prev'});
         });
      });
   }
});
