(function () {

    'use strict';

    angular
        .module("app")
        .factory("SearchSrv", SearchSrv);

    SearchSrv.$inject = ["$q"];

    function SearchSrv($q) {

        var searchDefer = $q.defer();
        var searchPromise = searchDefer.promise;

        var service = {
            searchFood: searchFood
        }

        return service;

        function searchFood(query) {
            searchDefer.resolve(["chicken","chickpeas","chili"]);
            return searchPromise;
        }

    }

})();