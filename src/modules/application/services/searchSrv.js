(function () {

    'use strict';

    angular
        .module("app")
        .factory("SearchSrv", SearchSrv);

    SearchSrv.$inject = ["$q","$http"];

    function SearchSrv($q, $http) {

        var service = {
            searchFood: searchFood,
            searchNutrition: searchNutrition
        }

        return service;

        function searchFood(query) {

            var searchDefer = $q.defer();
            var searchPromise = searchDefer.promise;
            $http.get('http://api.nal.usda.gov/ndb/search/?format=json&q='+query+'&sort=r&max=100&offset=0&api_key=KaTJsBJtWQtrwKIypcqZJV70C6kqFP0oJp8S3ODc').
                then(function(response) {
                    searchDefer.resolve(response.data.list.item);
                })
                .catch(function(response) {
                    searchDefer.reject(response.statusText);
                });

            return searchPromise;
        }

        function searchNutrition(foodId) {

            var searchDefer = $q.defer();
            var searchPromise = searchDefer.promise;
            $http.get('http://api.nal.usda.gov/ndb/nutrients/?format=json&ndbno='+foodId+'&sort=c&nutrients=208&nutrients=268&nutrients=208&nutrients=269&nutrients=203&nutrients=204&nutrients=645&nutrients=646&nutrients=606&nutrients=605&nutrients=205&nutrients=307&nutrients=291&ndbno=01009&api_key=KaTJsBJtWQtrwKIypcqZJV70C6kqFP0oJp8S3ODc')
                .then(function(response) {
                    if(response.data.report.foods[0] !== undefined){
                        searchDefer.resolve(response.data.report.foods[0]);
                    }
                    else{
                        searchDefer.reject(null);
                    }
                })
                .catch(function(response) {
                    searchDefer.reject(null);
                });

            return searchPromise;
        }

    }

})();