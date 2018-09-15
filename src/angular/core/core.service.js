(function () {
    "use strict";

    angular
        .module('test.app.Core')
        .factory('CoreService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var service = {
            getAllCategories: getAllCategories
        };

        return service;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        function getAllCategories() {
            var deferred = $q.defer();
            $http.get('https://opentdb.com/api_category.php').then(function (response) {
                if (!response.data){
                    deferred.reject()
                } else {
                    deferred.resolve(response.data);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    }

})();