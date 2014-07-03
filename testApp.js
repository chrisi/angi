angular.module('testApp', ['sandbox'])
    .controller('TestCtrl', ['$scope', '$log', function ($scope, $log) {
        $log.info("Controller aufgerufen");
        $scope.wert = "Hallo Welt";
    }])
;