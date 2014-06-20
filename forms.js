angular.module('forms',[])
    .directive('rebootInput', function () {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                caption: '@',
                placeholder: '@',
                ngModel: '='
            },
            templateUrl: 'templ/input.html'
        }
    })
    .directive('rebootSelect', function () {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                caption: '@',
                placeholder: '@',
                optionSource: '@',
                ngModel: '='
            },
            controller: function($scope, $compile, $http) {
                $http.get($scope.optionSource).then(function (articlesResponse) {
                    $scope.options = articlesResponse.data;
                });
            },
            templateUrl: 'templ/select.html'
        }
    })
;