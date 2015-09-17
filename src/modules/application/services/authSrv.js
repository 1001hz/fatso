(function () {

    'use strict';

    angular
        .module("app")
        .factory("AuthSrv", AuthSrv);

    AuthSrv.$inject = ["$q", "DataSrv"];

    function AuthSrv($q, DataSrv) {

        var userDefer = $q.defer();
        var userPromise = userDefer.promise;

        var service = {
            setUser: setUser,
            resetUser: resetUser,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            user: null
        }

        return service;

        function setUser(user) {
            DataSrv.dbSync(user)
                .then(function(){
                    service.user = user;
                    userDefer.resolve(user);
                })
                .catch(function(error){
                    service.user = null;
                    userDefer.reject(error);
                });
            return userPromise;
        }

        function resetUser(){
            service.user = null;
        }

        function getUser(){
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