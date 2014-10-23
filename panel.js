angular.module('Panel', [])

    .directive('panel', function ($compile, $timeout) {
        "use strict";

        return {

            restrict: 'EA',

            scope: { title: '@',
                     controls: '@', 
                     height: '@' }, 

            transclude: true,

            templateUrl: 'paneldirective.html',

            controller: function ($scope, $attrs) {

                if (angular.isUndefined($scope.height)) {   
                    $scope.height = "350px";
                }
                //Observe the scope to know the changes, before reading the values for the other directive.
                $attrs.$observe('expandable', function() {
                    if ($attrs.expandable === "true") {
                        $scope.expandable = true;
                    } else {
                        $scope.expandable = false;
                    }
                });

                $attrs.$observe('collapsed', function() {
                    if ($attrs.collapsed === "true") {
                        $scope.expandable = true;
                        $scope.collapsed = true;
                    } else {
                        $scope.collapsed = false;
                    }
                });

               
                $scope.toggleExpander = function () {
                    if ($scope.expandable === true) {
                        $scope.collapsed = !$scope.collapsed;  
                    }
                };

            },

            link: function (scope, element) {
               var compiledControl = $compile(angular.element(scope.controls))(scope.$parent);
                
                //attach the resulting dom object to the controls-container
                $(element).find(".controls").append(compiledControl);
            }
        };
    });
