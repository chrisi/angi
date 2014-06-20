angular.module('angiApp', ['ngAnimate', 'ngRoute'])
    .factory('Cart', function () {
        var items = [];
        return {
            getItems: function () {
                return items;
            },
            addArticle: function (article) {
                if ($.inArray(article, items) == -1)
                    items.push(article);
                else
                    alert("Der Artikel befindet sich bereits im Wahrenkorb");
            },
            sum: function () {
                return items.reduce(function (total, article) {
                    return total + article.price;
                }, 0);
            }
        };
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'shop.html'})
            .when('/about', {template: 'Über unsere Pizzeria'})
            .otherwise({redirectTo: '/'});
    })
    .controller('ArticlesCtrl', function ($scope, $http, Cart) {
        $http.get('articles.json').then(function (articlesResponse) {
            $scope.articles = articlesResponse.data;
            $scope.cart = Cart;
        });
    })
    .controller('CartCtrl', function ($scope, Cart) {
        $scope.cart = Cart;
    })
    .directive('price', function () {
        return {
            restrict: ['E', 'C'],
            scope: {
                value: '='
            },
            template: '<span ng-show="value == 0">kostenlos</span>' +
            '<span ng-show="value > 0">{{value | currency}}</span>'
        }
    })
;

