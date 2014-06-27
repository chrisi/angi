angular.module('forms', [])
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
            controller: function ($scope, $compile, $http) {
                $http.get($scope.optionSource).then(function (articlesResponse) {
                    $scope.options = articlesResponse.data;
                });
            },
            templateUrl: 'templ/select.html'
        }
    })
    .directive('rebootDialog', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: false,
//            {
//                title: '@',
//                desc: '@',
//                name: '@',
//                modalShow: "="
            //TODO: Trennung reinbringen, 2 Dialoge parallel sonst nicht moeglich
//            },
            templateUrl: 'templ/dialog.html',
            link: function (scope, element, attrs) {
                scope.title = attrs.title;
                scope.name = attrs.title;
            }
        }
    }).
    directive("modalShow", function ($parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                //Hide or show the modal
                scope.showModal = function (visible, elem) {
                    if (!elem)
                        elem = element;

                    if (visible)
                        $(elem).modal("show");
                    else
                        $(elem).modal("hide");
                };
                //Watch for changes to the modal-visible attribute
                scope.$watch(attrs.modalShow, function (newValue, oldValue) {
                    scope.showModal(newValue, attrs.$$element);
                });
                //Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
                $(element).bind("hide.bs.modal", function () {
                    $parse(attrs.modalShow).assign(scope, false);
                    if (!scope.$$phase && !scope.$root.$$phase)
                        scope.$apply();
                });
            }
        };
    })
;
