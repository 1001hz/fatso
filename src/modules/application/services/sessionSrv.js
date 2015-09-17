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
            isLoggedIn: isLoggedIn,
            user: null
        }

        return service;

        function setUser(user) {
            service.user = user;
            userDefer.resolve(user);
        }

        function getUser(){
            if(service.user !== null){
                userDefer.resolve(service.user);
            }
            return userPromise;
        }

        function isLoggedIn(){
            if(service.user == null){
                return false;
            }
            return true;
        }

    }

})();