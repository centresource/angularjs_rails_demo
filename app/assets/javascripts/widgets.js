/* http://docs.angularjs.org/#!angular.widget */

angular.directive("my:cycle", function(expr,el){
   return function(container){
        var scope = this;
        var lastChildID = container.children().last().attr('id');

        var doIt = function() {
            var lastID = container.children().last().attr('id');
            if (lastID != lastChildID) {
                lastChildID = lastID;
                $(container).cycle({ fx: 'fade',
                                     speed: 500,
                                     timeout: 3000,
                                     pause: 1,
                                     next: '#next',
                                     prev: '#prev'});
            }
        }

        var defer = this.$service("$defer");
        scope.$onEval( function() {
            defer(doIt);
        });
   }
});
