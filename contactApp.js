angular.module('contactApp', ['forms'])
    .factory('ContactStore', function ($http) {
        var contacts = [];
        return {
            loadContacts: function () {
                $http.get('contacts.json').then(function (articlesResponse) {
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

        $scope.$on('contactSelected', function (event, args) {
            $scope.form = args;
            $scope.pristine = angular.copy(args);
            $scope.showDialog = true;
        });
    })
    .controller('ContactListCtrl', function ($rootScope, $scope, $http, ContactStore) {
        $scope.store = ContactStore;
        $scope.name = "Christian";

        $scope.selectContact = function (contact) {
            $rootScope.$broadcast('contactSelected', contact);
        };

        $scope.$on('contactSubmitted', function (event, args) {
            ContactStore.updateContact(args);
        });
    })
;