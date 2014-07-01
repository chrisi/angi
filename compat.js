angular.module('compat', [])
    .factory('plainFormSerializer', function () {

        return {
            // I serialize the given Object into a key-value pair string. This
            // method expects an object and will default to the toString() method.
            // --
            // NOTE: This is an altered version of the jQuery.param() method which
            // will serialize a data collection for Form posting.
            // --
            // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
            // Quelle: http://www.bennadel.com/blog/2615-posting-form-data-with-http-in-angularjs.htm
            serializeData: function (data) {

                // If this is not an object, defer to native stringification.
                if (!angular.isObject(data)) {
                    return((data == null) ? '' : data.toString());
                }

                var buffer = [];

                // Serialize each key in the object.
                for (var name in data) {

                    if (!data.hasOwnProperty(name)) {
                        continue;
                    }

                    var value = data[name];
                    buffer.push(encodeURIComponent(name) + '=' + encodeURIComponent((value == null) ? '' : value));
                }

                // Serialize the buffer and clean it up for transportation.
                return buffer.join('&').replace(/%20/g, '+');
            }
        }
    })
    .factory('plainTransformRequest', ['plainFormSerializer', function (serializer) {

        function transformRequest(data, getHeaders) {
            var headers = getHeaders();
            headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            return(serializer.serializeData(data));
        }

        return transformRequest;
    }])
    .factory('jQueryTransformRequest', function () {

        function transformRequest(data, getHeaders) {
            var headers = getHeaders();
            headers['Content-type'] = 'application/x-www-form-urlencoded; charset=utf-8';
            return($.param(data));
        }

        return transformRequest;
    })
    .config(function ($httpProvider) {
        //Quelle: http://stackoverflow.com/questions/12190166
        $httpProvider.defaults.transformRequest = function (data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }
    })
;

//Quelle: http://stackoverflow.com/questions/12190166
//var transform = function (data) {
//    return $.param(data);
//}
//
//$http.post("/foo/bar", requestData, {
//    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
//    transformRequest: transform
//}).success(function (responseData) {
//    //do stuff with response
//});