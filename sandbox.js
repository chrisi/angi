angular.module('sandbox', [])
    .directive('hallo', function () {
        return {
            restrict: 'E',
            template: '<span>Hallo Welt</span>'
        }
    })
    .config(function ($provide) {
        $provide.decorator('halloDirective', function ($delegate) {
            var directive = $delegate[0];

            //var compile = directive.compile;

            directive.compile = function (tElement, tAttrs) {
              //  var link = compile.apply(this, arguments);
                tElement.parentElement.removeChild(tElement);
                var prev = tElement.previousSibling;
                    prev.append('<div style="padding: 20px; background-color: red;">');
                tElement.nextNode.append('</div>');
                return function (scope, elem, attrs) {
                //    link.apply(this, arguments);
                    // We can extend the link function here
                };
            };

            return $delegate;
        });
    })
;