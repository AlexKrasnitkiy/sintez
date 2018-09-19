(function () {
    "use strict";

    angular
        .module('test.app.Core')
        .factory('CoreService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var service = {
            getAllCategories: getAllCategories,
            getQuestions: getQuestions
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

        function getQuestions(request) {
            var deferred = $q.defer();
            // что бы просто в запрос добавить обьект post('https://opentdb.com/api.php', request)
            //Выбивает ошибку
            // Failed to load https://opentdb.com/api.php: Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
            //https://stackoverflow.com/questions/35147450/angularjs-and-php-request-header-field-access-control-allow-origin-is-not-allo
            //нашел годное решение но бекенд не могу править
            //потому буду строку запроса через пень колоду собирать
            var url = 'https://opentdb.com/api.php?';
            request.amount !== null && request.amount !== "" && request.amount !== undefined ? url += 'amount=' + request.amount : '';
            request.category !== null && request.category !== "" && request.category !== undefined ? url +='&category=' + request.category : '';
            request.difficulty !== null && request.difficulty !== "" && request.difficulty !== undefined ? url += '&difficulty=' + request.difficulty: '';

            $http.post(url).then(function (response) {
                if (!response.data){
                    deferred.reject()
                } else {
                    console.log('response.data', response.data);
                    deferred.resolve(response.data);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }

})();