angular.module("randoApp").directive('onEnter', ['$window', function($window) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attributes) {
      var ENTER = 13;
      element.bind("keydown keypress", function (event) {
        if (event.which === ENTER) {
          scope.$apply(function (){
            scope.$eval(attributes.onEnter);
          });

          event.preventDefault();
        }
      });
    }
  }
}]);
