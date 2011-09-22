(function() {
  APP.Helpers = {};

  /*
   * Force the DOM to render bound data so you can access the DOM elements
   *
   * If the expected dom elements are not present when you try to execute
   * forceRender on something, try a larger delay (for example, when rendering
   * more complicated dom structures or a lot of data)
   */
  APP.Helpers.forceRender = function(arg1, arg2) {
        var delay = (arg1 instanceof Function ? 5 : arg1);
        var func = (arg1 instanceof Function ? arg1 : arg2);
        /*
         * http://docs.angularjs.org/#!/api/angular.service.$updateView reports
         * that scope.$root.$eval() should force an immediate render; however,
         * angular.scope().$root.$eval() wasn't immediate enough for new elements
         * to be present when using jQuery on an expected DOM element
         */
        angular.service('$updateView').delay = 0;
        var updated_function = function() {
          func();
          angular.service('$updateView').delay = 25;
        };
        setTimeout(updated_function, delay);
  };

})();
