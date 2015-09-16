(function () {

    'use strict';

    angular
        .module("app")
        .factory("SessionSrv", SessionSrv);

    SessionSrv.$inject = ["$q"];

    function SessionSrv($q) {

        var userDefer = $q.defer();
        var userPromise = userDefer.promise;

        var service = {
            setUser: setUser,
            getUser: getUser,
            user: null
        }

        return service;

        function setUser(user) {
            service.user = user;
            userDefer.resolve(user);
        }

        function getUser(){
            if(service.user == null){
                return userPromise;
            }
            else{
                userDefer.resolve(service.user);
                return userPromise;
            }

        }

    }

})();