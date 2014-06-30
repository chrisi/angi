angular.module('contactApp', ['forms', 'ui.bootstrap'])
    .factory('ContactStore', function ($http) {
        var contacts = [];
        return {
            loadContacts: function () {
                $http.get('data/contacts.json').then(function (articlesResponse) {
                    contacts = articlesResponse.data;
                });
            },
            updateContact: function (contact) {
                var i = 0; // TODO: weiter hier
            },
            getContacts: function () {
                return contacts;
            }
        }
    })
    .controller('ContactFormCtrl', function ($rootScope, $scope) {
        $scope.submit = function (contact) {
            $rootScope.$broadcast('contactSubmitted', contact);
        };

        $scope.reset = function () {
            $scope.form = angular.copy($scope.pristine);
        };

        $scope.$on('contactSelected-rb', function (event, args) {
            $scope.form = args;
            $scope.pristine = angular.copy(args);
            $scope.showDialog = true;
        });
    })
    .controller('ContactListCtrl', function ($rootScope, $scope, $http, ContactStore) {
        $scope.store = ContactStore;
        $scope.name = "Christian";

        $scope.selectContact = function (contact, mode) {
            if (mode == 'rb')
                $rootScope.$broadcast('contactSelected-rb', contact);
            if (mode == 'ng')
                $rootScope.$broadcast('contactSelected-ng', contact);
        };

        $scope.$on('contactSubmitted', function (event, args) {
            ContactStore.updateContact(args);
        });
    })
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, form) {
        $scope.form = form;

        $scope.ok = function () {
            $modalInstance.close($scope.form);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log) {
        $scope.open = function (origform) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    form: function () {
                        return angular.copy(origform);
                    }
                }
            });

            modalInstance.result.then(function (editForm) {
                angular.copy(editForm, origform);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$on('contactSelected-ng', function (event, args) {
            $scope.open(args);
        });

    }])
;